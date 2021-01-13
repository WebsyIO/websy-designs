const express = require('express')
const router = express.Router()
const PayPalSDK = require('@paypal/checkout-server-sdk')
const PayPalHelper = require('../../helpers/v1/paypalHelper')
const BasketHelper = require('../../helpers/v1/basketHelper')

function CheckoutRoutes (dbHelper, options, app) {
  this.paypalEnvironment = new PayPalSDK.core[`${options.paypalEnv || 'SandboxEnvironment'}`](options.paypalClient, options.paypalSecret)
  this.paypalClient = new PayPalSDK.core.PayPalHttpClient(this.paypalEnvironment)
  router.post('/paypal', (req, res) => {
    BasketHelper.getBasket(req, dbHelper).then(basket => {
      if (basket.items.length === 0) {
        res.json({err: 'Basket Empty'})
      }
      else {
        const paypayBasket = PayPalHelper.convertBasketToPayPalOrder()
        const request = new PayPalSDK.orders.OrdersCreateRequest()
        request.prefer('return=representation')
        request.requestBody({
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: '220.00'
            }
          }]
        })
        let order
        try {
          this.paypalClient.client().execute(request).then(order => {
            res.status(200).json({
              orderID: order.result.id
            })
          }, err => {
            console.log('err in promise')
            console.error(err)
            res.send(err)
          })
        } 
        catch (err) {
          // 4. Handle any errors from the call
          console.error(err)
          res.send(err)
        }        
      }
    }, err => {
      console.log(err)
      res.json(err)
    })
  })
}

module.exports = CheckoutRoutes
