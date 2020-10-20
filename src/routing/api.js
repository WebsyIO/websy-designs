const express = require('express')
const router = express.Router()
// const PG = require('../helpers/dbHelper')
// const dbHelper = new PG()
// const AuthHelper = require('../helpers/auth')

function APIRoutes (dbHelper) {
  router.delete('/:entity', (req, res) => {
    const sql = dbHelper.buildDelete(req.params.entity, req.query.where)
    dbHelper.execute(sql).then(response => res.json(response), err => res.json(err))
  })
  // router.get('/:entity', AuthHelper.checkPermissions, (req, res) => {
  router.get('/:entity', (req, res) => {
    let lang = null
    if (req.session && req.session.language) {
      lang = req.session.language
    }
    const sql = dbHelper.buildSelect(req.params.entity, req.query, req.query.columns, lang)
    dbHelper.execute(sql).then(response => {
      if (process.env.TRANSLATE && response.rows) {      
        for (let r = 0; r < response.rows.length; r++) {
          const row = response.rows[r]
          for (let key in row) {          
            try {
              if (row.translation) {
                row.translation = JSON.parse(row.translation)              
                row[key] = row.translation[key] || row[key]
              }            
            } 
            catch (error) {
              row[key] = row.translation[key] || row[key]
            }          
          }
        }
      }
      res.json(response)
    }, err => res.json(err))
  })
  router.post('/:entity', (req, res) => {
    // const sql = dbHelper.buildInsert(req.params.entity, req.body, req.session.passport.user.id)
    const sql = dbHelper.buildInsert(req.params.entity, req.body)
    dbHelper.execute(sql).then(response => res.json(response), err => res.json(err))
  })
  router.put('/:entity', (req, res) => {
    const sql = dbHelper.buildUpdate(req.params.entity, req.query.where, req.body)
    dbHelper.execute(sql).then(response => res.json(response), err => res.json(err))
  })
  return router
}

module.exports = APIRoutes
