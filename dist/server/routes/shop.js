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
  router.get('/basket', (req, res) => {
    console.log('get basket')
    console.log(req.session.user)
    if (!req.session.basket) {
      if (req.session && req.session.user) {
        const sql = `
          SELECT * FROM basket WHERE userid = ${req.session.user.id}
        `
        dbHelper.execute(sql).then(result => {
          if (result.rows.length > 0) {
            let items = result.rows[0].items
            if (items === '') {
              items = {}
            }
            else {
              items = JSON.parse(items)
            }
            req.session.basket = items
          }
        })
      }
      else {
        req.session.basket = {}
        res.json(Object.values(req.session.basket))
      }
    }
    else {
      console.log(req.session.basket)
      res.json(Object.values(req.session.basket))
    }   
  })

  router.put('/basket', (req, res) => {
    console.log('update basket')
    console.log(req.session.user)
    const basketItemId = getBasketItemId(req)
    if (!req.session.basket) {
      req.session.basket = {}      
    }
    req.session.basket[basketItemId] = req.body
    console.log(req.session.basket)
    if (req.session && req.session.user) {
      saveBasket(req).then(() => res.json(Object.values(req.session.basket)))
    }
    else {
      res.json(Object.values(req.session.basket))
    }
  })

  router.post('/basket', (req, res) => {
    console.log('add to basket')
    console.log(req.session.user)
    const basketItemId = getBasketItemId(req)
    if (!req.session.basket) {
      req.session.basket = {}      
    }
    if (req.session.basket[basketItemId]) {
      console.log('should be here')
      console.log(basketItemId)
      req.session.basket[basketItemId].qty += req.body.qty
    }
    else {
      req.session.basket[basketItemId] = req.body
    }
    console.log(req.session.basket)
    if (req.session && req.session.user) {
      saveBasket(req).then(() => res.json(Object.values(req.session.basket)))
    }
    else {
      res.json(Object.values(req.session.basket))
    }
  })

  router.delete('/basket', (req, res) => {
    const basketItemId = getBasketItemId(req)
    if (!req.session.basket) {
      req.session.basket = {}      
    }
    delete req.session.basket[basketItemId]
    if (req.session && req.session.user) {
      saveBasket(req).then(() => res.json(Object.values(req.session.basket)))
    }
    else {
      res.json(Object.values(req.session.basket))
    }
  })

  function saveBasket (req) {
    return new Promise((resolve, reject) => {
      const checkSql = `
        SELECT COUNT(*) as count FROM basket WHERE userid = ${req.session.user.id}
      `
      dbHelper.execute(checkSql).then(result => {
        if (result.rows.length > 0 && result.rows[0].count > 0) {
          // update
          const sql = `
            UPDATE basket SET items = '${JSON.stringify(req.session.basket)}' WHERE userid = ${req.session.user.id}
          `
          dbHelper.execute(sql).then(result => {
            resolve()
          }, err => reject(err))
        }
        else {
          // insert
          const sql = `
            INSERT INTO basket (userid, items) VALUES (${req.session.user.id}, '${JSON.stringify(req.session.basket)}')
          `
          dbHelper.execute(sql).then(result => {
            resolve()
          }, err => reject(err))
        }
      }, err => reject(err))      
    })
  }

  function readyCallback () {
    dbHelper.execute(`
      SELECT COUNT(*) AS tableExists FROM information_schema.tables 
      WHERE  table_schema = 'public'
      AND    table_name   = 'basket'
    `).then(result => {
      console.log(result)
      if (result.rows && result.rows[0] && +result.rows[0].tableExists === 0) {
        dbHelper.execute(`
          CREATE TABLE basket (
            id SERIAL PRIMARY KEY,
            userid integer,
            items text DEFAULT ''::text
          );
          
          CREATE UNIQUE INDEX basket_pkey ON basket(id int4_ops);
        `)
      }
    }, err => console.log(err))
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
