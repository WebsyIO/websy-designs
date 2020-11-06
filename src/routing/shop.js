// file for routing shop tasks (add to basket, checkout etc)
const express = require('express')
const router = express.Router()

function ShopRoutes (dbHelper) {
  if (!dbHelper.client) {
    dbHelper.onReadyShopCallbackFn = readyCallback
  }
  else {
    readyCallback()
  }
  router.get('/:basketCompare', (req, res) => {
    console.log('get basket')
    console.log(req.session.user)    
    getBasket(req).then(basket => {
      res.json(Object.values(basket))
    }, err => res.json(err))     
  })

  router.put('/:basketCompare', (req, res) => {    
    const basketItemId = getBasketItemId(req)
    getBasket(req).then(basket => {
      basket[basketItemId] = req.body
      if (req.session && req.session.user) {
        saveBasket(req, basket).then(() => res.json(Object.values(basket)))
      }
      else {
        res.json([])
      }
    })        
  })

  router.post('/:basketCompare', (req, res) => {
    console.log(`add to ${req.params.basketCompare}`)
    console.log('user', req.session && req.session.user)
    const basketItemId = getBasketItemId(req)
    getBasket(req).then(basket => {
      if (basket[basketItemId]) {
        console.log('should be here')
        console.log(basketItemId)
        basket[basketItemId].qty += req.body.qty
      }
      else {
        basket[basketItemId] = req.body
      }
      if (req.session && req.session.user) {
        saveBasket(req, basket).then(() => res.json(Object.values(basket)))
      }
      else {
        res.json(Object.values([]))
      }
    })        
  })

  router.delete('/:basketCompare', (req, res) => {
    const basketItemId = getBasketItemId(req)
    getBasket(req).then(basket => {
      delete basket[basketItemId]
      if (req.session && req.session.user) {
        saveBasket(req, basket).then(() => res.json(Object.values(basket)))
      }
      else {
        res.json(Object.values([]))
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
            let items = result.rows[0].items
            if (items === '') {
              items = {}
            }
            else {
              console.log(typeof items)
              console.log(items)
              if (typeof items === 'undefined') {
                items = {}
              }
              items = JSON.parse(items)
            }
            resolve(items)
          }
          else {
            resolve({})
          }
        })
      }
      else {      
        resolve([])
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
            UPDATE ${req.params.basketCompare} SET items = '${JSON.stringify(basket)}' WHERE userid = '${req.session.user.id}'
          `
          console.log(sql)
          dbHelper.execute(sql).then(result => {
            resolve()
          }, err => reject(err))
        }
        else {
          // insert
          const sql = `
            INSERT INTO ${req.params.basketCompare} (userid, items) VALUES ('${req.session.user.id}', '${JSON.stringify(basket)}')
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
      SELECT COUNT(*) AS tableExists FROM information_schema.tables 
        WHERE  table_name   = 'basket'
      `).then(result => {
        console.log(result)
        if (result.rows && result.rows[0] && +result.rows[0].tableExists === 0) {
          dbHelper.execute(`
            CREATE TABLE basket (
              id SERIAL PRIMARY KEY,
              userid integer,
              items text DEFAULT ''
            );          
          `).then(() => resolve)
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
        SELECT COUNT(*) AS tableExists FROM information_schema.tables 
        WHERE  table_name   = 'compare'
      `).then(result => {
        console.log(result)
        if (result.rows && result.rows[0] && +result.rows[0].tableExists === 0) {
          dbHelper.execute(`
            CREATE TABLE compare (
              id SERIAL PRIMARY KEY,
              userid integer,
              items text DEFAULT ''
            );          
          `).then(() => resolve)
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
