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
      label text
    );
  `,
  translations: `
    CREATE TABLE translations (
      id SERIAL PRIMARY KEY,
      table_name text,
      entity_id integer NOT NULL,
      field_name text,
      language character varying(28),
      text text
    );
  `  
}

class PGHelper {
  constructor () {    
    const pool = new pg.Pool(config)
    this.pool = pool
    this.onReadyAuthCallbackFn = null
    this.onReadyShopCallbackFn = null
    this.updateIgnores = [
      'id',
      'create_date'
    ]    
  }
  init () {
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
    delete data.id
    // data.create_user = user
    return `
      INSERT INTO ${entity} (${Object.keys(data).join(',')})
      VALUES (${Object.values(data).map(d => (d === null ? `${d}` : `'${d}'`)).join(',')})
      RETURNING id
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
          FROM translations
          WHERE table_name = '${entity}' AND language = '${lang}'
          GROUP BY entity_id
        ) as translations 
        ON ${entity}.id = translations.entity_id
      `
    }    
    sql += `      
      WHERE ${this.buildWhere(query.where)}
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
  buildWhere (input) {   
    if (typeof input === 'undefined') {
      return '1=1'
    }
    else {
      let list = input.split(';').map(d => {
        let parts = d.split(':')
        if (parts[1].indexOf('%') !== -1) {
          return `${parts[0]} LIKE '${parts[1]}'`
        }
        else {
          return `${parts[0]} = '${parts[1]}'`
        }        
      })
      return `
        ${list.join(' AND ')}
      `
    }    
  }
  checkTables () {
    this.createContentTable().then(() => {
      this.createTranslationTable()
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
    this.client.query('ROLLBACK', function (err) {
      console.log(err)
      // done()
      callbackFn(err)
    })
  }
}
module.exports = new PGHelper()
