class WebsyPopupDialog {
  constructor (elementId, options) {
    this.DEFAULTS = {
      buttons: [],
      classes: [],
      style: ''
    }
    this.options = Object.assign({}, this.DEFAULTS, options)
    if (!elementId) {
      console.log('No element Id provided for Websy Popup')		
      return
    }
    this.closeOnOutsideClick = true
    const el = document.getElementById(elementId)
    this.elementId = elementId
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))			
    }
  }
  hide () {
    const el = document.getElementById(this.elementId)
    if (el) {
      el.innerHTML = ''
    }
  }
  handleClick (event) {		
    if (event.target.classList.contains('websy-btn')) {
      const buttonIndex = event.target.getAttribute('data-index')
      const buttonInfo = this.options.buttons[buttonIndex]            
      if (buttonInfo && buttonInfo.fn) {
        if (typeof this.options.collectData !== 'undefined') {
          const collectEl = document.getElementById(`${this.elementId}_collect`)
          if (collectEl) {
            buttonInfo.collectedData = collectEl.value
          }
        }
        if (buttonInfo.preventClose !== true) {
          this.hide()
        }
        buttonInfo.fn(buttonInfo)
      }
      else if (buttonInfo && buttonInfo.preventClose !== true) {
        this.hide()
      }
    }
    else if (this.closeOnOutsideClick === true) {
      this.hide()
    }
  }
  render () {
    if (!this.elementId) {
      console.log('No element Id provided for Websy Popup')	
      return
    }
    const el = document.getElementById(this.elementId)
    if (el) {      
      let html = ''
      if (this.options.mask === true) {
        html += `<div class='websy-mask'></div>`
      }
      html += `
        <div class='websy-popup-dialog-container'>
          <div class='websy-popup-dialog ${this.options.classes.join(' ')}' style='${this.options.style}'>
      `
      if (this.options.title) {
        html += `<h1>${this.options.title}</h1>`
      }
      if (this.options.message) {
        html += `<p>${this.options.message}</p>`
      }
      if (typeof this.options.collectData !== 'undefined') {
        html += `
          <div>
            <input id="${this.elementId}_collect" class="websy-input" value="${typeof this.options.collectData === 'boolean' ? '' : this.options.collectData}" placeholder="${this.options.collectPlaceholder || ''}">
          </div>
        `
      }
      this.closeOnOutsideClick = true
      if (this.options.buttons) {
        if (this.options.allowCloseOnOutsideClick !== true) {
          this.closeOnOutsideClick = false
        }			
        html += `<div class='websy-popup-button-panel'>`
        for (let i = 0; i < this.options.buttons.length; i++) {				
          html += `
            <button class='websy-btn ${(this.options.buttons[i].classes || []).join(' ')}' data-index='${i}'>
              ${this.options.buttons[i].label}
            </button>
          `
        }
        html += `</div>`
      }
      html += `
          </div>
        </div>
      `
      el.innerHTML = html		
    }
  }
  show (options) {
    if (options) {
      this.options = Object.assign({}, this.DEFAULTS, options)
    }
    this.render()
  }
}
