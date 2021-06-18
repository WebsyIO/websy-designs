const express = require('express')
const router = express.Router()
const pdfHelper = require('../../helpers/v1/pdfHelper')

router.post('/', (req, res) => {
  pdfHelper.createPDF(req.body, (err, pdfId) => {
    if (err) {
      res.status(400)
      res.send({err})
    }
    else {
      res.setHeader('Content-Type', 'application/octet-stream')
      res.send(pdfId)
    }    
  })
})

module.exports = router
