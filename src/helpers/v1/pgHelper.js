const pg = require('pg')
const url = require('url')
const params = url.parse(process.env.DATABASE_URL)
const auth = params.auth.split(':')
const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: { rejectUnauthorized: false },  
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
}

const sql = {  
  content: `
    CREATE TABLE content (
      id SERIAL PRIMARY KEY,
      text text,
      tags text,
      label text,
      createuser text,
      edituser text,
      createdate timestamp without time zone DEFAULT now(),
      editdate timestamp without time zone DEFAULT now()
    );
  `,
  translations: `
    CREATE TABLE translations (
      id SERIAL PRIMARY KEY,
      table_name text,
      entity_id integer NOT NULL,
      field_name text,
      language character varying(28),
      text text,
      createuser text,
      edituser text,
      createdate timestamp without time zone DEFAULT now(),
      editdate timestamp without time zone DEFAULT now()
    );
  `,
  sessions: `
    CREATE TABLE "sessions" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);

    ALTER TABLE "sessions" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

    CREATE INDEX "IDX_session_expire" ON "sessions" ("expire");
  `,
  users: `
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username character varying(128),
      salt character varying(128) UNIQUE,
      pepper character varying(128) UNIQUE,
      created timestamp without time zone DEFAULT now(),
      edited timestamp without time zone,
      email character varying(256),      
      role character varying(50) DEFAULT 'User'::character varying,
      lastlogon timestamp without time zone,      
      activated boolean DEFAULT false,
      activationcode uuid,
      activationexpiry bigint,      
      optedin boolean DEFAULT false,      
      language character varying(5) DEFAULT 'en'::character varying,      
      referredby character varying(128)      
    );
  `
}

class PGHelper {
  constructor () {    
    const pool = new pg.Pool(config)
    this.pool = pool
    this.onReadyAuthCallbackFn = null
    this.onReadyShopCallbackFn = null
    this.options = { entityConfig: {}, fieldValueSeparator: ':' }    
    this.updateIgnores = [
      'id',
      'create_date'
    ]    
  }
  init (options) {       
    this.options = Object.assign({}, this.options, options)
    return new Promise((resolve, reject) => {
      this.pool.connect().then(client => {	        	
        this.client = client
        if (this.onReadyAuthCallbackFn) {
          this.onReadyAuthCallbackFn()
        }
        if (this.onReadyShopCallbackFn) {
          this.onReadyShopCallbackFn()
        }        
        this.checkTables()
        resolve()
      }, err => reject(err))
    })
  }
  buildDelete (entity, where) {
    return `
      DELETE FROM ${entity}      
      WHERE ${this.buildWhere(where)}
    `
  }
  buildInsert (entity, data, user) {
    delete data[(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id']
    // data.create_user = user
    if (process.env.CREATE_USER_FIELD && process.env.USERID_FIELD && user) {
      data[process.env.CREATE_USER_FIELD] = user[process.env.USERID_FIELD || 'id']
      data[process.env.EDIT_USER_FIELD] = user[process.env.USERID_FIELD || 'id']      
    }
    if (process.env.EDIT_DATE_FIELD) {
      data[process.env.EDIT_DATE_FIELD] = (new Date()).toISOString()
    }
    return `
      INSERT INTO ${entity} (${Object.keys(data).join(',')})
      VALUES (${Object.values(data).map(d => (d === null ? `${d}` : `'${d}'`)).join(',')})
      RETURNING ${(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id'}
    `
  }
  buildOrderBy (query) {
    return `
      ${query.by ? 'ORDER BY ' + query.by : ''} ${query.order ? query.order : ''}      
    `
  }
  buildSelect (entity, query, columns, lang) {
    let sql = `
      SELECT ${columns || '*'}
      FROM ${entity}
    `
    if ((process.env.TRANSLATE === true || process.env.TRANSLATE === 'true') && lang !== null) {
      sql += `      
        LEFT JOIN (
          SELECT entity_id, json_object_agg(field_name, text) as translation
          FROM translations as t
          WHERE table_name = '${entity}' AND language = '${lang}'
          GROUP BY entity_id
        ) t2 
        ON ${entity}.${(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id'} = t2.entity_id
      `
    }    
    sql += `      
      WHERE ${this.buildWhere(query.where, entity)}
      ${this.buildOrderBy(query)}
    `
    if (query.limit) {
      sql += ` LIMIT ${query.limit}`
    }
    if (query.offset) {
      sql += ` OFFSET ${query.offset}`
    }
    return sql
  }
  buildSelectWithId (entity, id, query, columns, lang) {
    let sql = `
      SELECT ${columns || '*'}
      FROM ${entity}
    `
    if ((process.env.TRANSLATE === true || process.env.TRANSLATE === 'true') && lang !== null) {
      sql += `      
        LEFT JOIN (
          SELECT entity_id, json_object_agg(field_name, text) as translation
          FROM translations as t
          WHERE table_name = '${entity}' AND language = '${lang}'
          GROUP BY entity_id
        ) t2 
        ON ${entity}.${(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id'} = t2.entity_id
      `
    }    
    sql += `      
      WHERE ${this.buildWhereWithId(entity, id)}
      ${this.buildOrderBy(query)}
    `
    return sql
  }
  buildUpdate (entity, where, data) {
    let updates = []
    for (let key in data) {
      if (this.updateIgnores.indexOf(key) === -1) {
        if (typeof data[key] === 'string') {
          data[key] = data[key].replace(/''/gm, `'`).replace(/'/gm, `''`).replace(/\\\\/gm, '\\')
        }
        updates.push(`${key} = ${(data[key] === null ? data[key] : `'${data[key]}'`)}`)
      }      
    }
    return `
      UPDATE ${entity}
      SET ${updates.join(',')}
      WHERE ${this.buildWhere(where)}
    `
  }
  buildUpdateWithId (entity, id, data) {
    let updates = []
    for (let key in data) {
      if (this.updateIgnores.indexOf(key) === -1) {
        updates.push(`${key} = ${(data[key] === null ? data[key] : `'${data[key]}'`)}`)
      }      
    }
    return `
      UPDATE ${entity}
      SET ${updates.join(',')}
      WHERE ${this.buildWhereWithId(entity, id)}
    `
  }
  buildWhere (input, entity) {   
    if (typeof input === 'undefined') {
      return '1=1'
    }
    else {
      try {
        input = decodeURI(input)
      }
      catch (error) {
        // console.log(error)
      }
      console.log('where input', input)
      console.log('splitter is', this.options.fieldValueSeparator)
      let list = input.split(';').map(d => {
        let parts = d.split(this.options.fieldValueSeparator)
        if (parts.length === 2) {
          let partValues = parts[1]
          partValues = partValues.split('|')
          if (partValues.length === 1) {
            if (parts[1].indexOf('>') !== -1) {
              return `${entity ? entity + '.' : ''}${parts[0]} > '${parts[1].replace('>', '')}'`
            }
            else if (parts[1].indexOf('<') !== -1) {
              return `${entity ? entity + '.' : ''}${parts[0]} < '${parts[1].replace('<', '')}'`
            }
            else if (parts[1].indexOf('%') !== -1) {
              return `LOWER(${entity ? entity + '.' : ''}${parts[0]}) LIKE '${parts[1]}'`
            }
            else {
              return `${entity ? entity + '.' : ''}${parts[0]} = '${parts[1]}'`
            } 
          }  
          else {
            console.log(`${entity ? entity + '.' : ''}${parts[0]} IN ('${partValues.join('\',\'')}')`)
            return `${entity ? entity + '.' : ''}${parts[0]} IN ('${partValues.join('\',\'')}')`
          }         
        }  
        else {
          parts = d.split('!')
          if (parts.length === 2) {
            return `${entity ? entity + '.' : ''}${parts[0]} <> '${parts[1]}'`
          }
        }              
      })
      return `
        ${list.join(' AND ')}
      `
    }    
  }
  buildWhereWithId (entity, id) {
    if (typeof id === 'undefined') {
      return '1=1'
    }
    else {
      return `${(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id'} = ${id}`
    }
  }
  checkTables () {
    this.createContentTable().then(() => {
      this.createTranslationTable().then(() => {
        this.createSessionTable().then(() => {
          this.createUserTable()
        })
      })
    })
  }
  createContentTable () {
    return new Promise((resolve, reject) => {
      this.execute(`
        SELECT COUNT(*) AS tableexists FROM information_schema.tables 
        WHERE  table_name   = 'content'
      `).then(result => {
        if (result.rows && result.rows[0] && +result.rows[0].tableexists === 0) {
          this.execute(sql.content).then(() => {
            resolve()
          })
        }
        else {
          resolve()
        }
      })
    })
  }
  createSessionTable () {
    return new Promise((resolve, reject) => {
      if (process.env.SESSION_TABLE) {
        resolve()
      }
      else {
        this.execute(`
          SELECT COUNT(*) AS tableexists FROM information_schema.tables 
          WHERE  table_name   = 'sessions'
        `).then(result => {
          if (result.rows && result.rows[0] && +result.rows[0].tableexists === 0) {
            this.execute(sql.sessions).then(() => {
              resolve()
            })
          }
          else {
            resolve()
          }
        })
      }
    })
  }
  createTranslationTable () {
    return new Promise((resolve, reject) => {
      this.execute(`
        SELECT COUNT(*) AS tableexists FROM information_schema.tables 
        WHERE  table_name   = 'translations'
      `).then(result => {
        if (result.rows && result.rows[0] && +result.rows[0].tableexists === 0) {
          this.execute(sql.translations).then(() => {
            resolve()
          })
        }
        else {
          resolve()
        }
      })
    })
  }  
  createUserTable () {
    return new Promise((resolve, reject) => {
      this.execute(`
        SELECT COUNT(*) AS tableexists FROM information_schema.tables 
        WHERE  table_name   = 'users'
      `).then(result => {
        if (result.rows && result.rows[0] && +result.rows[0].tableexists === 0) {
          this.execute(sql.users).then(() => {
            resolve()
          })
        }
        else {
          resolve()
        }
      })
    })
  }
  execute (query) {
    return new Promise((resolve, reject) => {
      // console.log(query)
      if (query !== null) {
        this.client.query(query, (err, queryResponse) => {
          if (err) {              
            console.log('Error creating request')
            console.log(err)
            console.log(query)
            this.rollback(err, reject)
          }
          else {						
            resolve({
              rowCount: queryResponse.rowCount,
              rows: queryResponse.rows
            })
          }						
        })					
      } 
      else {				
        this.client.end()
        resolve()
      }	
    })
  }
  getBasket (req, basketCompare) {
    return new Promise((resolve, reject) => {
      if (req.session && req.session.user) {
        const sql = `
          SELECT * FROM ${basketCompare} WHERE userid = '${req.session.user.id}'
        `
        this.execute(sql).then(result => {
          if (result.rows.length > 0) {
            let basket = result.rows[0] 
            try {
              basket.items = JSON.parse(this.JSONSafeRead(basket.items))            
            }
            catch (error) {
              if (basket.items) {
                basket.items = JSON.parse(basket.items) 
              }              
              else {
                basket.items = {}
              }
            }
            try {
              basket.meta = JSON.parse(this.JSONSafeRead(basket.meta))
            }
            catch (error) {
              // console.log('data got saved incorrectly')
              if (basket.meta) {
                try {
                  basket.meta = JSON.parse(basket.meta) 
                } 
                catch (error) {
                  //
                }                
              }              
              else {
                basket.meta = {}
              }
            }            
            resolve(basket)
          }
          else {
            resolve({items: {}, meta: {}})
          }
        })
      }
      else {      
        resolve({items: {}, meta: {}})
      } 
    })
  }
  JSONSafeWrite (v) {    
    return v.replace(/'/g, '\'\'').replace(/\\(?=[bfnrtv0'"])/g, '\\\\')
  }
  JSONSafeRead (v) {    
    return v.replace(/''/g, `'`).replace(/\\(?=[^bfnrtv0'"])/g, '\\\\')
  }
  rollback (err, callbackFn) {
    console.log('Rolling Back')
    console.log(err)
    this.client.query('ROLLBACK', function (rollbackErr) {
      console.log(err)
      // done()
      callbackFn(err)
    })
  }
}
module.exports = new PGHelper()
