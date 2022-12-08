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
  publish (id, method, data) {
    if (arguments.length === 3) {    
      if (this.subscriptions[id] && this.subscriptions[id][method]) {
        this.subscriptions[id][method](data)
      }
    }
    else {
      if (this.subscriptions[id]) {
        this.subscriptions[id].forEach(fn => {
          fn(method)
        })
      }
    }
  }
  subscribe (id, method, fn) {
    if (arguments.length === 3) {      
      if (!this.subscriptions[id]) {
        this.subscriptions[id] = {}
      }
      if (!this.subscriptions[id][method]) {
        this.subscriptions[id][method] = fn
      }
    }
    else {
      if (!this.subscriptions[id]) {
        this.subscriptions[id] = []
      }
      this.subscriptions[id].push(method)
    }
  }
}
