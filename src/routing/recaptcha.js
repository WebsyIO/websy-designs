const express = require('express')
const router = express.Router()
const request = require('request')

router.post('/checkrecaptcha', function (req, res) {
  const body = {
    secret: process.env.RECAPTCHA_SECRET,
    response: req.body.grecaptcharesponse
  }  
  if (req.headers['x-appengine-user-ip']) {
    body.remoteip = req.headers['x-appengine-user-ip']
  }
  request.post('https://www.google.com/recaptcha/api/siteverify', { form: body }, (err, response, body) => {
    if (err) {
      res.json({ err: err })
    }
    else {
      res.json(response.body)
    }
  })
})

module.exports = router
