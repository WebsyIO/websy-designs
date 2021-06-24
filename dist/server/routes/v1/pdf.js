const express = require('express')
const router = express.Router()
const pdfHelper = require('../../helpers/v1/pdfHelper')

router.get('/:file', (req, res) => {  
  res.setHeader('Content-Disposition', 'attachment')
  res.setHeader('filename', req.params.file)
  res.sendFile(`${process.env.APP_ROOT}/pdf/${req.params.file}`)
})

router.get('/lasthtml', (req, res) => {
  res.send(pdfHelper.getLastHTML())
})

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
