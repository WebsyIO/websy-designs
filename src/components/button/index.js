/* global */
class Button {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      text: 'Websy Designs button' 
    }
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.innerHTML = this.options.text
    }    
  }
  handleClick (event) {  
    if (this.options.onClick) {
      this.options.onClick(event)
    } 
  }
}
