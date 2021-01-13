/* global paypal */
class PayPalPayment {
  constructor (elementId, options) {
    this.elementId = elementId
    this.options = Object.assign({}, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.innerHTML = `<div id='${this.elementId}_payPalButtons'></div>`
      this.render()
    }
  }
  render () {
    if (typeof paypal !== 'undefined') {
      paypal.Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.01'
              }
            }]
          })
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            console.log('Transaction completed by ' + details.payer.name.given_name)
          })
        }
      }).render(`#${this.elementId}_payPalButtons`) 
    }    
  }
}
