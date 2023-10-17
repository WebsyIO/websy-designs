/* global */
class ButtonGroup {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      style: 'button',
      subscribers: {},
      activeItem: -1,
      tag: 'div',
      allowNone: false,
      onActivate: () => {},
      onDeactivate: () => {}
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
      if (this.options.multiSelect === true) {
        if (event.target.classList.contains('active')) {
          this.options.onDeactivate(this.options.items[index], index, event)
          event.target.classList.remove('active')  
          event.target.classList.add('inactive')               
        }
        else {
          this.options.onActivate(this.options.items[index], index, event)                 
          event.target.classList.add('active')  
          event.target.classList.remove('inactive')
        }
      }
      else if (this.options.activeItem !== index) {                       
        const el = document.getElementById(this.elementId)
        let buttons = Array.from(el.querySelectorAll('.websy-button-group-item'))
        buttons.forEach(el => {
          let buttonIndex = el.getAttribute('data-index')
          el.classList.add('inactive')
          el.classList.remove('active')                    
        })        
        event.target.classList.remove('inactive')
        event.target.classList.add('active')  
        if (this.options.onDeactivate && this.options.activeItem !== -1) {
          this.options.onDeactivate(this.options.items[this.options.activeItem], this.options.activeItem, true)
        }      
        this.options.activeItem = index 
        if (this.options.onActivate) {
          this.options.onActivate(this.options.items[index], index, event)
        }
      }
      else if (this.options.activeItem === index && this.options.allowNone === true) { 
        if (this.options.onDeactivate) {
          this.options.onDeactivate(this.options.items[this.options.activeItem], this.options.activeItem)
        }
        this.options.activeItem = -1
        event.target.classList.remove('active')
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
      el.innerHTML = this.options.items.map((t, i) => {
        let activeClass = ''
        if (this.options.activeItem !== -1) {
          activeClass = i === this.options.activeItem ? 'active' : 'inactive'
        }        
        return `
          <${this.options.tag} ${(t.attributes || []).join(' ')} data-id="${t.id || t.label}" data-index="${i}" class="websy-button-group-item ${(t.classes || []).join(' ')} ${this.options.style}-style ${activeClass}">${t.label}</${this.options.tag}>
        `
      }).join('')
    }
  }
}
