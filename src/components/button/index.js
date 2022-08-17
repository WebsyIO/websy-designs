/* global */
class Button {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      style: '',
      class: ''  
    }
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      // this.render() 
    }    
  }

  functionToExecute () {
    console.log('clicked')
  }

  handleClick (event) {  
    if (event.target.classList.contains('websy-btn')) {
      this.functionToExecute()
    }
  }
  
  // render () {

  // }
}
