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
    this.options = { entityConfig: {}, fieldValueSeparator: ':', whereValueSeparator: ';' }    
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
  buildDelete (entity, whereQuery) {
    if (!this.options.entityConfig[entity]) {
      return { sql: 'SELECT 1=1', values: [] }
    }
    const { where, values } = this.buildWhere(whereQuery)
    return { 
      sql: `
        DELETE FROM ${entity}      
        WHERE ${where}
      `,
      values
    }
  }
  buildInsert (entity, data, user) {
    if (!this.options.entityConfig[entity]) {
      return { sql: 'SELECT 1=1', values: [] }
    }
    delete data[(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id']
    // data.create_user = user
    if (process.env.CREATE_USER_FIELD && process.env.USERID_FIELD && user) {
      data[process.env.CREATE_USER_FIELD] = user[process.env.USERID_FIELD || 'id']
      data[process.env.EDIT_USER_FIELD] = user[process.env.USERID_FIELD || 'id']      
    }
    if (process.env.EDIT_DATE_FIELD) {
      data[process.env.EDIT_DATE_FIELD] = (new Date()).toISOString()
    }
    let sql = `
      INSERT INTO ${entity} (${Object.keys(data).join(',')})
      VALUES (
    `
    const placeholders = []
    const values = []
    Object.values(data).forEach(d => {
      if (d === null) {
        // return d
      }
      else {
        if (typeof d === 'string') { 
          d = d.replace(/'/g, `''`)
        }
        values.push(d)
        placeholders.push(`$${values.length}`)        
      }
    })    
    sql += `
      ${placeholders.join(',')}
      )
      RETURNING ${(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id'}
    `
    return { sql, values }
  }
  buildOrderBy (query) {
    return `
      ${query.by ? 'ORDER BY ' + query.by : ''} ${query.order ? query.order : ''}      
    `
  }
  buildSelect (entity, query, columns, lang) {
    if (!this.options.entityConfig[entity]) {
      return { sql: 'SELECT 1=1', values: [] }
    }
    let sql = `
      SELECT ${columns || '*'}
      FROM ${entity}
    `
    if ((process.env.TRANSLATE === true || process.env.TRANSLATE === 'true') && lang) {
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
    const { where, values } = this.buildWhere(query.where, entity)
    sql += `      
      WHERE ${where}
      ${this.buildOrderBy(query)}
    `
    if (query.limit) {
      sql += ` LIMIT ${query.limit}`
    }
    if (query.offset) {
      sql += ` OFFSET ${query.offset}`
    }        
    return { sql, values }
  }
  buildSelectWithId (entity, id, query, columns, lang) {
    if (!this.options.entityConfig[entity]) {
      return { sql: 'SELECT 1=1', values: [] }
    }
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
    const { where, values } = this.buildWhereWithId(entity, id)
    sql += `      
      WHERE ${where}
      ${this.buildOrderBy(query)}
    `
    return { sql, values }
  }
  buildUpdate (entity, whereQuery, data, user) {
    // disabling bulk updates for now
    return { sql: `SELECT 'Cannot perform bulk update' as result`, values: [] }
    // if (!this.options.entityConfig[entity]) {
    //   return { sql: 'SELECT 1=1', values: [] }
    // }
    // if (!whereQuery || whereQuery === '') {
    // }
    // let updates = []
    // let updateValues = []
    // for (let key in data) {
    //   if (this.updateIgnores.indexOf(key) === -1) {
    //     if (typeof data[key] === 'string') {
    //       data[key] = data[key].replace(/''/gm, `'`).replace(/'/gm, `''`).replace(/\\\\/gm, '\\')
    //     }
    //     updateValues.push((data[key] === null ? data[key] : `'${data[key]}'`))
    //     updates.push(`${key} = $${updateValues.length}`)
    //   } 
    // }
    // if (process.env.CREATE_USER_FIELD && process.env.USERID_FIELD && user) {
    //   let userId = user[process.env.USERID_FIELD || 'id']
    //   updateValues.push(userId)
    //   updates.push(`${process.env.EDIT_USER_FIELD} = $${updateValues.length}`)            
    // }
    // if (process.env.EDIT_DATE_FIELD) {
    //   updateValues.push((new Date()).toISOString())
    //   updates.push(`${process.env.EDIT_DATE_FIELD} = $${updateValues.length}`)
    // }
    // const { where, values } = this.buildWhere(whereQuery, entity, updateValues.length)
    // return {
    //   sql: `
    //     UPDATE ${entity}
    //     SET ${updates.join(',')}
    //     WHERE ${where}
    //   `,
    //   values: updateValues.concat(values)
    // }
  }
  buildUpdateWithId (entity, id, data, user) {
    if (!this.options.entityConfig[entity]) {
      return { sql: 'SELECT 1=1', values: [] }
    }
    let updates = []
    let updateValues = []
    for (let key in data) {
      if (this.updateIgnores.indexOf(key) === -1) {
        if (typeof data[key] === 'string') {
          data[key] = data[key].replace(/''/gm, `'`).replace(/'/gm, `''`).replace(/\\\\/gm, '\\')
        }
        updateValues.push((data[key] === null ? data[key] : data[key]))
        updates.push(`${key} = $${updateValues.length}`)
      }      
    }
    if (process.env.CREATE_USER_FIELD && process.env.USERID_FIELD && user) {
      let userId = user[process.env.USERID_FIELD || 'id']
      updateValues.push(userId)
      updates.push(`${process.env.EDIT_USER_FIELD} = $${updateValues.length}`)        
    }
    if (process.env.EDIT_DATE_FIELD) {
      updateValues.push((new Date()).toISOString())
      updates.push(`${process.env.EDIT_DATE_FIELD} = $${updateValues.length}`)
    }
    const { where, values } = this.buildWhereWithId(entity, id, updateValues.length)
    return {
      sql: `
        UPDATE ${entity}
        SET ${updates.join(',')}
        WHERE ${where}
      `,
      values: updateValues.concat(values)
    }
  }
  buildUpsert (entity, data, user) {    
    if (!this.options.entityConfig[entity]) {
      return { sql: 'SELECT 1=1', values: [] }
    }
    const queries = []
    data.forEach(row => {
      let sql = ``
      let allValues = []
      if (process.env.CREATE_USER_FIELD && process.env.USERID_FIELD && user) {
        row[process.env.CREATE_USER_FIELD] = user[process.env.USERID_FIELD || 'id']
        row[process.env.EDIT_USER_FIELD] = user[process.env.USERID_FIELD || 'id']      
      }
      if (process.env.EDIT_DATE_FIELD) {
        row[process.env.EDIT_DATE_FIELD] = (new Date()).toISOString()
      }
      if (typeof row[(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id'] !== 'undefined') {        
        let id = row[(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id']    
        delete row[(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id']    
        let updates = []
        for (let key in row) {
          if (this.updateIgnores.indexOf(key) === -1) {
            if (typeof row[key] === 'string') {
              row[key] = row[key].replace(/''/gm, `'`).replace(/'/gm, `''`).replace(/\\\\/gm, '\\')
            }
            allValues.push((row[key] === null ? row[key] : `'${row[key]}'`))
            updates.push(`${key} = $${allValues.length}`)
          }      
        }          
        allValues.push(id)
        sql = `
          UPDATE ${entity}
          SET ${updates.join(',')}
          WHERE ${(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id'} = $${allValues.length};
        `
      }
      else {    
        delete row[(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id']    
        const placeholders = []        
        Object.values(row).forEach(d => {
          if (d === null) {
            // return d
          }
          else {
            if (typeof d === 'string') { 
              d = d.replace(/'/g, `''`)
            }
            allValues.push(d)
            placeholders.push(`$${allValues.length}`)        
          }
        })                  
        sql = `
          INSERT INTO ${entity} (${Object.keys(row).join(',')})
          VALUES (${placeholders.join(',')})
          RETURNING ${(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id'};
        `
      }
      queries.push({ sql, values: allValues })
    })
    return queries
  }
  buildWhere (input, entity, startCount = 0) {      
    if (typeof input === 'undefined' || input.trim() === '') {
      return { where: '1=1', values: [] }
    }
    else {
      try {
        input = decodeURI(input)
      }
      catch (error) {
        // console.log(error)
      }      
      let values = []
      let list = input.split(this.options.whereValueSeparator).map(d => {
        let parts = d.split(this.options.fieldValueSeparator)           
        if (parts.length === 2) {
          parts[1] = parts[1].replace(/%20/g, ' ')
          let partValues = parts[1]
          partValues = partValues.split('|')
          if (partValues.length === 1) {            
            if (parts[1].indexOf('_gt') !== -1) {
              values.push(parts[1].replace('_gt', ''))
              return `${entity ? entity + '.' : ''}${parts[0]} > $${startCount + values.length}`
            }
            else if (parts[1].indexOf('_lt') !== -1) {
              values.push(parts[1].replace('_lt', ''))
              return `${entity ? entity + '.' : ''}${parts[0]} < $${startCount + values.length}`
            }
            else if (parts[1].indexOf('%') !== -1) {
              values.push(parts[1])
              return `LOWER(${entity ? entity + '.' : ''}${parts[0]}) LIKE $${startCount + values.length}`
            }
            else {              
              values.push(parts[1])
              return `${entity ? entity + '.' : ''}${parts[0]} = $${startCount + values.length}`
            } 
          }  
          else {            
            const placeholders = partValues.map((p, i) => `$${i + startCount + values.length}`).join(', ')
            values.push(...partValues)
            return `${entity ? entity + '.' : ''}${parts[0]} IN (${placeholders})`
          }         
        }  
        else {
          parts = d.split('!')
          if (parts.length === 2) {
            values.push(parts[1])
            return `${entity ? entity + '.' : ''}${parts[0]} <> $${startCount + values.length}`
          }
        }              
      })
      return {
        where: `${list.length > 0 ? list.join(' AND ') : ''}`,
        values
      }
    }    
  }
  buildWhereWithId (entity, id, startCount = 0) {
    if (typeof id === 'undefined') {
      return { where: '1=1', values: [] }
    }
    else {
      return { where: `${(this.options.entityConfig[entity] && this.options.entityConfig[entity].idColumn) || 'id'} = $${startCount + 1}`, values: [id] }
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
  execute (query, values) {     
    return new Promise((resolve, reject) => {      
      const params = [query]
      if (values && values.length > 0) {
        params.push(values)
      }
      if (query !== null) {
        this.client.query(...params).then(queryResponse => {                    					
          resolve({
            rowCount: queryResponse.rowCount,
            rows: queryResponse.rows
          })
        }, err => {
          if (err) {              
            console.log('Error creating request')
            console.log(err)
            console.log(query)
            this.rollback(err, reject)
          }
        })					
      } 
      else {				
        this.client.end()
        resolve()
      }	
    })
  }
  executeUpsert (index, queries, callbackFn) {     
    if (!queries[index]) {
      callbackFn()
    }
    else {
      this.execute(queries[index].sql, queries[index].values).then(() => {
        index++
        this.executeUpsert(index, queries, callbackFn)
      }, callbackFn)
    }
  }
  getBasket (req, basketCompare) {
    return new Promise((resolve, reject) => {
      if (req.session && req.session.user) {
        const sql = `
          SELECT * FROM ${basketCompare} WHERE userid = $1
        `
        this.execute(sql, [req.session.user.id]).then(result => {
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
    this.client.query('ROLLBACK').then(() => {
      console.log(err)      
      callbackFn(err)
    })
  }
}
module.exports = new PGHelper()
