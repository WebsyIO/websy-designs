const express = require('express')
const router = express.Router()
// const PG = require('../helpers/dbHelper')
// const dbHelper = new PG()
// const AuthHelper = require('../helpers/auth')

function APIRoutes (dbHelper) {
  router.delete('/:entity/:id', (req, res) => {
    const sql = `DELETE FROM ${req.params.entity} WHERE ${dbHelper.buildWhereWithId(req.params.entity, req.params.id)}`
    dbHelper.execute(sql).then(response => res.json(response), err => res.json(err))
  })
  router.delete('/:entity', (req, res) => {
    const sql = dbHelper.buildDelete(req.params.entity, req.query.where)
    dbHelper.execute(sql).then(response => res.json(response), err => res.json(err))
  })
  router.get('/:entity/:id', (req, res) => {
    let lang = null
    if (req.session && req.session.language && req.query.notranslate !== 'true') {
      lang = req.session.language
    }
    const sql = dbHelper.buildSelectWithId(req.params.entity, req.params.id, req.query, req.query.columns, lang)
    dbHelper.execute(sql).then(response => {      
      res.json(translate(response))
    }, err => res.json(err))
  })
  router.get('/:entity', (req, res) => {
    let lang = null
    if (req.session && req.session.language && req.query.notranslate !== 'true') {
      lang = req.session.language
    }
    const sql = dbHelper.buildSelect(req.params.entity, req.query, req.query.columns, lang)
    dbHelper.execute(sql).then(response => {
      res.json(translate(response))
    }, err => res.json(err))
  })
  router.post('/:entity', (req, res) => {
    // const sql = dbHelper.buildInsert(req.params.entity, req.body, req.session.passport.user.id)
    console.log(req.body)
    const sql = dbHelper.buildInsert(req.params.entity, req.body)
    console.log(sql)
    dbHelper.execute(sql).then(response => res.json(response), err => {
      res.statusCode = 404
      res.json({err})
    })
  })
  router.put('/:entity/:id', (req, res) => {
    const sql = dbHelper.buildUpdateWithId(req.params.entity, req.params.id, req.body)
    dbHelper.execute(sql).then(response => res.json(response), err => res.json(err))
  })
  router.put('/:entity', (req, res) => {
    const sql = dbHelper.buildUpdate(req.params.entity, req.query.where, req.body)
    dbHelper.execute(sql).then(response => res.json(response), err => res.json(err))
  })
  return router
}

function translate (response) {
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
  return response
}

module.exports = APIRoutes
