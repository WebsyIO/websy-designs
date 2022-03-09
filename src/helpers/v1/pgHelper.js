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
    
    ALTER TABLE "sessions" ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
    
    CREATE INDEX "IDX_sessions_expire" ON "sessions" ("expire");
  `
}

class PGHelper {
  constructor () {    
    const pool = new pg.Pool(config)
    this.pool = pool
    this.onReadyAuthCallbackFn = null
    this.onReadyShopCallbackFn = null
    this.options = { entityConfig: {} }    
    this.updateIgnores = [
      'id',
      'create_date'
    ]    
  }
  init (options) {   
    if (options.entityConfig) {
      this.options = Object.assign({}, options)
    } 
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
      let list = input.split(';').map(d => {
        let parts = d.split(':')
        if (parts[1].indexOf('%') !== -1) {
          return `${entity ? entity + '.' : ''}${parts[0]} LIKE '${parts[1]}'`
        }
        else {
          return `${entity ? entity + '.' : ''}${parts[0]} = '${parts[1]}'`
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
        this.createSessionTable()
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
  execute (query) {
    console.log(query)    
    return new Promise((resolve, reject) => {
      if (query !== null) {
        this.client.query(query, (err, queryResponse) => {
          if (err) {              
            console.log('Error creating request')
            console.log(err)
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
  JSONSafeWrite (v) {    
    return v.replace(/'/g, '\'\'').replace(/\\(?=[bfnrtv0'"])/g, '\\\\')
  }
  JSONSafeRead (v) {    
    return v.replace(/''/g, '\'').replace(/\\(?=[^bfnrtv0'"])/g, '\\\\')
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
