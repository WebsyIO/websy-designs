const express = require('express')
const router = express.Router()
const PayPalSDK = require('@paypal/checkout-server-sdk')

function CheckoutRoutes (dbHelper, options, app) {
  this.paypalEnvironment = new PayPalSDK.core[`${options.paypalEnv || 'SandboxEnvironment'}`](options.paypalClient, options.paypalSecret)
  this.paypalClient = new PayPalSDK.core.PayPalHttpClient(this.paypalEnvironment)
  router.post('/paypal', (req, res) => {

  })
}

module.exports = CheckoutRoutes
