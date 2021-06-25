const express = require('express')
const router = express.Router()
const pdfHelper = require('../../helpers/v1/pdfHelper')
const utils = require('../../utils')

router.get('/', (req, res) => {  
  // res.setHeader('Content-Disposition', 'attachment')
  // res.setHeader('filename', `${req.params.name || utils.createIdentity()}.pdf`)
  res.setHeader('Content-Disposition', `attachment;filename=${utils.createIdentity()}.pdf`)
  res.contentType('application/pdf')
  console.log(req.session.pdf)
  res.send(req.session.pdf)
})

router.get('/lasthtml', (req, res) => {
  res.send(req.session.pdf)
})

router.post('/', (req, res) => {
  pdfHelper.createPDF(req.body, (err, pdf) => {
    if (err) {
      res.status(400)
      res.send({err})
    }
    else {
      res.setHeader('Content-Disposition', `attachment;filename=${req.body.name || utils.createIdentity()}.pdf`)
      res.contentType('application/pdf')
      // res.setHeader('filename', `${req.body.name || utils.createIdentity()}.pdf`)
      // req.session.pdf = pdf
      res.send(pdf)
    }    
  })
})

module.exports = router
