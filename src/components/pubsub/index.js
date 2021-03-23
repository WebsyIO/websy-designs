class WebsyPubSub {
  constructor (elementId, options) {
    this.options = Object.assign({}, options)
    if (!elementId) {
      console.log('No element Id provided')
      return
    }
    this.elementId = elementId
    this.subscriptions = {}
  }
  publish (method, data) {
    if (this.subscriptions[method]) {
      this.subscriptions[method].forEach(fn => {
        fn(data)
      })
    }
  }
  subscribe (method, fn) {
    if (!this.subscriptions[method]) {
      this.subscriptions[method] = []
    }
    this.subscriptions[method].push(fn)
  }
}
