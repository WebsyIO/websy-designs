/* global */
class ButtonGroup {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      style: 'button',
      subscribers: {},
      activeItem: 0    
    }
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      this.render() 
    }
  }
  handleClick (event) {    
    if (event.target.classList.contains('websy-button-group-item')) {
      const index = +event.target.getAttribute('data-index')
      if (this.options.activeItem !== index) {
        if (this.options.onDeactivate) {
          this.options.onDeactivate(this.options.items[this.options.activeItem], this.options.activeItem)
        }
        this.options.activeItem = index
        if (this.options.onActivate) {
          this.options.onActivate(this.options.items[index], index)
        }
        this.render()
      } 
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
    if (el && this.options.items) {
      el.innerHTML = this.options.items.map((t, i) => `
        <div ${(t.attributes || []).join(' ')} data-id="${t.id || t.label}" data-index="${i}" class="websy-button-group-item ${(t.classes || []).join(' ')} ${this.options.style}-style ${i === this.options.activeItem ? 'active' : ''}">${t.label}</div>
      `).join('')
    }
  }
}
