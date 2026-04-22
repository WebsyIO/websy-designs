const express = require('express')
const router = express.Router()

function APIRoutes (dbHelper, authHelper) {  
  router.delete('/:entity/:id', authHelper.checkPermissions.bind(authHelper), (req, res) => {
    const { where, values } = dbHelper.buildWhereWithId(req.params.entity, req.params.id)
    let sql = `DELETE FROM ${req.params.entity} WHERE ${where}`
    if (!dbHelper.options.entityConfig[req.params.entity]) {
      sql = 'SELECT 1=1'
    }
    dbHelper.execute(sql, values).then(response => res.json(response), err => res.json(err))
  })
  router.delete('/:entity', authHelper.checkPermissions.bind(authHelper), (req, res) => {
    // if (!dbHelper.options.entityConfig[req.params.entity]) {
    //   return 'SELECT 1=1'
    // }
    // const { sql, values } = dbHelper.buildDelete(req.params.entity, req.query.where)
    const sql = `SELECT 'Cannot perform bulk delete' as result`
    dbHelper.execute(sql).then(response => res.json(response), err => res.json(err))
  })
  router.get('/currentuser', authHelper.checkPermissions.bind(authHelper), (req, res) => {
    let user = {}
    if (req.session && req.session.user) {
      user = req.session.user
    }
    if (process.env.SENSITIVE_USERPROPS) {
      process.env.SENSITIVE_USERPROPS.split(',').forEach(d => {
        delete user[d.trim()]
      })
    }
    res.json(user)
  })
  router.get('/:entity/:id', authHelper.checkPermissions.bind(authHelper), (req, res) => {
    let lang = process.env.DEFAULT_LANGUAGE
    if (req.session && req.session.language && req.query.notranslate !== 'true') {
      lang = req.session.language
    }
    const { sql, values } = dbHelper.buildSelectWithId(req.params.entity, req.params.id, req.query, req.query.columns, lang)
    dbHelper.execute(sql, values).then(response => {      
      res.json(translate(response))
    }, err => res.json(err))
  })
  router.get('/:entity', authHelper.checkPermissions.bind(authHelper), (req, res) => {
    let lang = process.env.DEFAULT_LANGUAGE
    if (req.session && req.session.language && req.query.notranslate !== 'true') {
      lang = req.session.language
    }
    const { sql, values } = dbHelper.buildSelect(req.params.entity, req.query, req.query.columns, lang)    
    
    dbHelper.execute(sql, values).then(response => {
      if (process.env.RETURN_COUNTS === true || process.env.RETURN_COUNTS === 'true') {        
        const { where: countWhere, values: countValues } = dbHelper.buildWhere(req.query.where, req.params.entity)
        const countSql = `SELECT COUNT(*) as total FROM ${req.params.entity} WHERE ${countWhere}`
        dbHelper.execute(countSql, countValues).then(countResponse => {
          response.totalCount = countResponse.rows[0].total
          res.json(translate(response))  
        })
      }
      else {
        res.json(translate(response))
      }      
    }, err => res.json(err))
  })
  router.post('/:entity/upsert', authHelper.checkPermissions.bind(authHelper), (req, res) => {
    let user
    if (req.session && req.session.user) {
      user = req.session.user
    }
    if (req.body && req.body.data) {
      const queries = dbHelper.buildUpsert(req.params.entity, req.body.data, user)            
      dbHelper.executeUpsert(0, queries, (err) => {
        if (err) {          
          res.json(err)
        }
        else {
          res.json(true)
        }
      })      
    }
    else {
      res.status(400)
      res.json({ err: 'Malformed body. Missing data prop' })
    }
  })
  router.post('/:entity', authHelper.checkPermissions.bind(authHelper), (req, res) => {
    let user
    if (req.session && req.session.user) {
      user = req.session.user
    }
    const { sql, values } = dbHelper.buildInsert(req.params.entity, req.body, user)
    
    dbHelper.execute(sql, values).then(response => res.json(response), err => {
      res.statusCode = 404
      res.json({err})
    })
  })
  router.put('/:entity/:id', authHelper.checkPermissions.bind(authHelper), (req, res) => {
    let user
    if (req.session && req.session.user) {
      user = req.session.user
    }
    const { sql, values } = dbHelper.buildUpdateWithId(req.params.entity, req.params.id, req.body, user)
    dbHelper.execute(sql, values).then(response => res.json(response), err => res.json(err))
  })
  router.put('/:entity', authHelper.checkPermissions.bind(authHelper), (req, res) => {
    let user
    if (req.session && req.session.user) {
      user = req.session.user
    }
    const { sql, values } = dbHelper.buildUpdate(req.params.entity, req.query.where, req.body, user)
    dbHelper.execute(sql, values).then(response => res.json(response), err => res.json(err))
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
