/*

{
  connectionLimit : 10,
  host            : process.env.DATABASE_HOST,
  user            : process.env.DATABASE_USER,
  password        : process.env.DATABASE_PASSWORD,
  database        : process.env.DATABASE_DB
}

*/

const mysql = require('mysql')

class MySqlHelper {
  constructor () {
    this.onReadyAuthCallbackFn = null
    this.onReadyShopCallbackFn = null
  }
  init () {
    return new Promise((resolve, reject) => {
      this.pool = mysql.createPool(process.env.DATABASE_URL)      
      this.pool.getConnection((err, connection) => {
        if (err) {
          reject(err)
        }
        else {
          this.client = connection
          if (this.onReadyAuthCallbackFn) {
            this.onReadyAuthCallbackFn()
          }
          if (this.onReadyShopCallbackFn) {
            this.onReadyShopCallbackFn()
          }
          console.log('connected to mysql')
          resolve()
        }        
      })
      this.pool.on('connection', function (connection) {        
      })
      // this.client = this.pool      
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
          SELECT entity_id, JSON_OBJECTAGG(field_name, text) as translation
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
      let list = input.split(';').map(d => `${d.split(':')[0]} = '${d.split(':')[1]}'`)
      return `
        ${list.join(' AND ')}
      `
    }    
  }
  execute (query) {
    console.log(query)
    return new Promise((resolve, reject) => {
      if (query !== null) {
        // this.pool.getConnection((err, connection) => {
        //   if (err) {
        //     reject(err) // not connected!
        //   }
        //   // Use the connection
        //   console.log('pooled')
        this.client.beginTransaction(err => {
          if (err) {
            reject(err) 
          }
          else {
            this.client.query(query, (error, results, fields) => {                                             
              if (error) {
                return this.client.rollback(() => {                    
                  reject(error)
                })
              }
              this.client.commit(err => {
                if (err) {
                  return this.client.rollback(() => {                   
                    reject(err)
                  })
                }                  
                resolve({rows: results})
              })          
            })
          }
        })        
        // })			
      } 
      else {
        reject(new Error('No query provided'))
      }	
    })
  }
}

module.exports = new MySqlHelper()
