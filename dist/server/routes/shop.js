// file for routing shop tasks (add to basket, checkout etc)
const express = require('express')
const router = express.Router()

const sql = {
  pg: {
    basket: `
      CREATE TABLE basket (
        id SERIAL PRIMARY KEY,
        userid integer,
        items text DEFAULT ''::mediumtext,
        meta text DEFAULT ''::text
      );
    `,
    compare: `
      CREATE TABLE compare (
        id SERIAL PRIMARY KEY,
        userid integer,
        items text DEFAULT ''::mediumtext,
        meta text DEFAULT ''::text
      );
    `
  },
  mysql: {
    basket: `
    
    `,
    compare: `
    
    `
  }
}

function ShopRoutes (dbHelper, engine, app) {
  if (!dbHelper.client) {
    dbHelper.onReadyShopCallbackFn = readyCallback
  }
  else {
    readyCallback()
  }
  router.get('/:basketCompare', (req, res) => {
    getBasket(req).then(basket => {
      basket.items = Object.values(basket.items)
      res.json(basket)
    }, err => res.json(err))     
  })

  router.put('/:basketCompare/item', (req, res) => {    
    const basketItemId = getBasketItemId(req)
    getBasket(req).then(basket => {
      basket.items[basketItemId] = req.body
      if (req.session && req.session.user) {        
        saveBasket(req, basket).then(() => {
          basket.items = Object.values(basket.items)
          res.json(basket)
        })
      }
      else {
        res.json([])
      }
    })        
  })

  router.put('/:basketCompare/meta', (req, res) => {    
    const basketItemId = getBasketItemId(req)
    getBasket(req).then(basket => {
      basket.meta = req.body
      if (req.session && req.session.user) {
        saveBasket(req, basket).then(() => {
          basket.items = Object.values(basket.items)
          res.json(basket)
        })
      }
      else {
        res.json({items: [], meta: {}})
      }
    })        
  })

  router.post('/:basketCompare/item', (req, res) => {
    const basketItemId = getBasketItemId(req)
    getBasket(req).then(basket => {
      if (basket.items[basketItemId]) {
        basket.items[basketItemId].qty += req.body.qty
      }
      else {
        basket.items[basketItemId] = req.body
      }
      if (req.session && req.session.user) {
        saveBasket(req, basket).then(() => {
          basket.items = Object.values(basket.items)
          res.json(basket)
        })
      }
      else {
        res.json({items: [], meta: {}})
      }
    })        
  })

  router.post('/:basketCompare/meta', (req, res) => {    
    getBasket(req).then(basket => {
      basket.meta = req.body
      if (req.session && req.session.user) {
        saveBasket(req, basket).then(() => {
          basket.items = Object.values(basket.items)
          res.json(basket)
        })
      }
      else {
        res.json({items: [], meta: {}})
      }
    })        
  })

  router.post('/:basketCompare/item/delete', (req, res) => {
    const basketItemId = getBasketItemId(req)
    getBasket(req).then(basket => {
      delete basket.items[basketItemId]
      if (req.session && req.session.user) {
        saveBasket(req, basket).then(() => {
          basket.items = Object.values(basket.items)
          res.json(basket)
        })
      }
      else {
        res.json({items: [], meta: {}})
      }
    })    
  })

  function getBasket (req) {
    return new Promise((resolve, reject) => {
      if (req.session && req.session.user) {
        const sql = `
          SELECT * FROM ${req.params.basketCompare} WHERE userid = '${req.session.user.id}'
        `
        dbHelper.execute(sql).then(result => {
          if (result.rows.length > 0) {
            let basket = result.rows[0] 
            basket.items = JSON.parse(basket.items)            
            basket.meta = JSON.parse(basket.meta)
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

  function saveBasket (req, basket) {
    return new Promise((resolve, reject) => {
      const checkSql = `
        SELECT COUNT(*) as count FROM ${req.params.basketCompare} WHERE userid = '${req.session.user.id}'
      `
      dbHelper.execute(checkSql).then(result => {
        if (result.rows.length > 0 && result.rows[0].count > 0) {
          // update
          const sql = `
            UPDATE ${req.params.basketCompare} SET items = '${JSON.stringify(basket.items)}', meta = '${JSON.stringify(basket.meta)}' WHERE userid = '${req.session.user.id}'
          `
          console.log(sql)
          dbHelper.execute(sql).then(result => {
            resolve()
          }, err => reject(err))
        }
        else {
          // insert
          const sql = `
            INSERT INTO ${req.params.basketCompare} (userid, items, meta) VALUES ('${req.session.user.id}', '${JSON.stringify(basket.items)}', '${JSON.stringify(basket.meta)}')
          `
          console.log(sql)
          dbHelper.execute(sql).then(result => {
            resolve()
          }, err => reject(err))
        }
      }, err => reject(err))      
    })
  }

  function readyCallback () {
    createBasketTable().then(() => {      
      createCompareTable()
    })    
  }

  function createBasketTable () {
    return new Promise((resolve, reject) => {
      dbHelper.execute(`
      SELECT COUNT(*) AS tableexists FROM information_schema.tables 
        WHERE  table_name   = 'basket'
      `).then(result => {
        console.log(result)
        if (result.rows && result.rows[0] && +result.rows[0].tableexists === 0) {
          dbHelper.execute(sql[engine].basket).then(() => resolve)
        }
        else {
          resolve()
        }
      }, err => reject(err))
    })
  }
  
  function createCompareTable () {
    return new Promise((resolve, reject) => {
      dbHelper.execute(`
        SELECT COUNT(*) AS tableexists FROM information_schema.tables 
        WHERE  table_name   = 'compare'
      `).then(result => {
        console.log(result)
        if (result.rows && result.rows[0] && +result.rows[0].tableexists === 0) {
          dbHelper.execute(sql[engine].compare).then(() => resolve)
        }
        else {
          resolve()
        }
      }, err => reject(err))
    })
  }

  return router
}

function getBasketItemId (req) {
  let id = req.body.id
  if (process.env.BASKET_ID_COMPOSITION) {      
    const composition = process.env.BASKET_ID_COMPOSITION.split(',')
    id = composition.map(c => req.body[c.trim()]).join('_')
  }
  console.log('setting id')
  console.log(req.body)
  return id
}

module.exports = ShopRoutes
