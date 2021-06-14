const express = require('express')
const router = express.Router()
function AdminRoutes (dbHelper) {
  router.get('/', (req, res) => {
    res.sendFile(`${process.env.wdRoot}/src/views/v1/admin/index.html`)
  })
  return router
}

module.exports = AdminRoutes
