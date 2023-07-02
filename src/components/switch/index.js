/* global */
class Switch {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {      
      enabled: false
    }
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      this.render() 
    }    
  }
  disable () {
    this.options.enabled = false
    let method = this.options.enabled === true ? 'add' : 'remove'
    const el = document.getElementById(`${this.elementId}_switch`)
    el.classList[method]('enabled')
    if (this.options.onToggle) {
      this.options.onToggle(this.options.enabled)      
    } 
  }
  enable () {
    this.options.enabled = true
    let method = this.options.enabled === true ? 'add' : 'remove'
    const el = document.getElementById(`${this.elementId}_switch`)
    el.classList[method]('enabled')
    if (this.options.onToggle) {
      this.options.onToggle(this.options.enabled)      
    } 
  }  
  handleClick (event) {        
    this.options.enabled = !this.options.enabled
    let method = this.options.enabled === true ? 'add' : 'remove'
    const el = document.getElementById(`${this.elementId}_switch`)
    el.classList[method]('enabled')
    if (this.options.onToggle) {
      this.options.onToggle(this.options.enabled)      
    }     
  }
  on (event, fn) {
    if (!this.options.subscribers[event]) {
      this.options.subscribers[event] = []
    }
    this.options.subscribers[event].push(fn)
  }
  publish (event, params) {
    this.options.subscribers[event].forEach((item) => {
      item.apply(null, params)
    })
  }
  render () {
    const el = document.getElementById(this.elementId)
    if (el) {
      el.innerHTML = `
        <div class="websy-switch-container">
          <div class="websy-switch-label">${this.options.label || ''}</div>
          <div id="${this.elementId}_switch" class="websy-switch ${this.options.enabled === true ? 'enabled' : ''}"></div>      
        </div>
      `
    }
  }
}
