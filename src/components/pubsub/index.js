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
  globalPublish (method, data) {
    if (this.subscriptions[method]) {
      this.subscriptions[method].forEach(fn => {
        fn(data)
      })
    }
  }
  globalSubscribe (method, fn) {
    if (!this.subscriptions[method]) {
      this.subscriptions[method] = []
    }
    this.subscriptions[method].push(fn)
  }
  publish (id, method, data) {
    if (this.subscriptions[id] && this.subscriptions[id][method]) {
      this.subscriptions[id][method](data)
    }
  }
  subscribe (id, method, fn) {
    if (!this.subscriptions[id]) {
      this.subscriptions[id] = {}
    }
    if (!this.subscriptions[id][method]) {
      this.subscriptions[id][method] = fn
    }
  }
}
