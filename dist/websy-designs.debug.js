/* global
  include
  WebsyPopupDialog 
  WebsyLoadingDialog 
  WebsyNavigationMenu 
  WebsyPubSub
  WebsyForm
  WebsySearchList
  APIService
*/ 

class WebsyPopupDialog {
  constructor (elementId, options) {
    this.options = Object.assign({}, options)
    if (!elementId) {
      console.log('No element Id provided for Websy Popup')		
      return
    }
    this.closeOnOutsideClick = true
    const el = document.getElementById(elementId)
    this.elementId = elementId
    el.addEventListener('click', this.handleClick.bind(this))			
  }
  hide () {
    const el = document.getElementById(this.elementId)
    el.innerHTML = ''
  }
  handleClick (event) {		
    if (event.target.classList.contains('websy-btn')) {
      const buttonIndex = event.target.getAttribute('data-index')
      const buttonInfo = this.options.buttons[buttonIndex]
      if (buttonInfo.preventClose !== true) {
        this.hide()
      }
      if (buttonInfo.fn) {
        buttonInfo.fn(buttonInfo)
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
    let html = `
			<div class='websy-popup-dialog-container'>
				<div class='websy-popup-dialog'>
		`
    if (this.options.title) {
      html += `<h1>${this.options.title}</h1>`
    }
    if (this.options.message) {
      html += `<p>${this.options.message}</p>`
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
  show (options) {
    if (options) {
      this.options = Object.assign({}, options)
    }
    this.render()
  }
}

class WebsyLoadingDialog {
  constructor (elementId, options) {
    this.options = Object.assign({}, options)				
    if (!elementId) {
      console.log('No element Id provided')
      return
    }
    this.elementId = elementId
  }
  hide () {
    const el = document.getElementById(this.elementId)
    el.classList.remove('loading')
    el.innerHTML = ''
  }
  render () {
    if (!this.elementId) {
      console.log('No element Id provided for Websy Loading Dialog')	
      return
    }
    const el = document.getElementById(this.elementId)
    let html = `
			<div class='websy-loading-container ${(this.options.classes || []).join(' ')}'>
				<div class='websy-ripple'>
					<div></div>
					<div></div>
				</div>
				<h4>${this.options.title || 'Loading...'}</h4>
		`
    if (this.options.messages) {
      for (let i = 0; i < this.options.messages.length; i++) {
        html += `<p>${this.options.messages[i]}</p>`
      }
    }				
    html += `
			</div>	
    `
    el.classList.add('loading')
    el.innerHTML = html
  }	
  show (options, override = false) {
    if (options) {
      if (override === true) {
        this.options = Object.assign({}, options)	
      }
      else {
        this.options = Object.assign({}, this.options, options)
      }
    }
    this.render()
  }
}

class WebsyNavigationMenu {
  constructor (elementId, options) {
    this.options = Object.assign({}, {
      orientation: 'horizontal'
    }, options)
    if (!elementId) {
      console.log('No element Id provided for Websy Menu')		
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      this.elementId = elementId
      el.classList.add(`websy-${this.options.orientation}-list-container`)
      if (this.options.classes) {
        this.options.classes.forEach(c => el.classList.add(c))
      }
      el.addEventListener('click', this.handleClick.bind(this))	
      this.render()      
    }    
  }
  handleClick (event) {
    if (event.target.classList.contains('websy-menu-icon') || 
      event.target.nodeName === 'svg' ||
      event.target.nodeName === 'rect') {
      this.toggleMobileMenu()
    }
    if (event.target.classList.contains('trigger-item') &&
      event.target.classList.contains('websy-menu-header')) {
      this.toggleMobileMenu()
    }
    if (event.target.classList.contains('websy-menu-mask')) {
      this.toggleMobileMenu()
    }
  }
  normaliseString (text) {
    return text.replace(/-/g, '').replace(/\s/g, '_')
  }
  render () {
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = ``
      if (this.options.logo) {
        html += `
          <div id='${this.elementId}_menuIcon' class='websy-menu-icon'>
            <svg width="40" height="40">              
              <rect x="0" y="0" width="40" height="4" rx="2"></rect>
              <rect x="0" y="12" width="40" height="4" rx="2"></rect>
              <rect x="0" y="24" width="40" height="4" rx="2"></rect>
            </svg>
            </div>
          <div class='logo ${this.options.logo.classes && this.options.logo.classes.join(' ')}'><img src='${this.options.logo.url}'></img></div>
          <div id='${this.elementId}_mask' class='websy-menu-mask'></div>
          <div id="${this.elementId}_menuContainer" class="websy-menu-block-container">
        `
      }
      html += this.renderBlock(this.options.items, 'main', 1)
      html += `</div>`
      el.innerHTML = html
      if (this.options.navigator) {
        this.options.navigator.registerElements(el)
      }
    }
  }
  renderBlock (items, block, level) {
    let html = `
		  <ul class='websy-${this.options.orientation}-list ${(block !== 'main' ? 'websy-menu-collapsed' : '')}' id='${this.elementId}_${block}_list'
	  `	
    if (block !== 'main') {
      html += ` data-collapsed='${(block !== 'main' ? 'true' : 'false')}'`
    }
    html += '>'
    for (let i = 0; i < items.length; i++) {		
      // update the block to the current item		
      let selected = '' // items[i].default === true ? 'selected' : ''
      let active = items[i].default === true ? 'active' : ''
      let currentBlock = this.normaliseString(items[i].text)		
      html += `
			<li class='websy-${this.options.orientation}-list-item'>
				<div class='websy-menu-header ${items[i].classes && items[i].classes.join(' ')} ${selected} ${active}' 
						 id='${this.elementId}_${currentBlock}_label' 
						 data-id='${currentBlock}' 
						 data-popout-id='${level > 1 ? block : currentBlock}'
						 data-text='${items[i].text}'
						 style='padding-left: ${level * this.options.menuHPadding}px'
						 ${items[i].attributes && items[i].attributes.join(' ')}
        >
      `
      if (this.options.orientation === 'horizontal') {
        html += items[i].text
      }
      html += `
          <span class='selected-bar'></span>
          <span class='active-square'></span>
          <span class='${items[i].items && items[i].items.length > 0 ? 'menu-carat' : ''}'></span>
      `
      if (this.options.orientation === 'vertical') {
        html += `
          &nbsp;
        `
      }  
      html += `    
				</div>
		  `
      if (items[i].items) {
        html += this.renderBlock(items[i].items, currentBlock, level + 1)			
      }
      // map the item to it's parent
      if (block && block !== 'main') {
        if (!this.options.parentMap[currentBlock]) {
          this.options.parentMap[currentBlock] = block
        }			
      }
      html += `
			</li>
		`
    }
    html += `</ul>`
    return html
  }
  toggleMobileMenu () {
    const buttonEl = document.getElementById(`${this.elementId}_menuIcon`)
    if (buttonEl) {
      buttonEl.classList.toggle('open')
    }
    const menuEl = document.getElementById(`${this.elementId}_menuContainer`)
    if (menuEl) {
      menuEl.classList.toggle('open')
    }
    const maskEl = document.getElementById(`${this.elementId}_mask`)
    if (maskEl) {
      maskEl.classList.toggle('open')
    }
  }
}

/* global WebsyDesigns FormData */ 
class WebsyForm {
  constructor (elementId, options) {
    const defaults = {
      submit: { text: 'Save', classes: '' },
      clearAfterSave: false,
      fields: []
    }
    this.options = Object.assign(defaults, {}, {
      // defaults go here
    }, options)
    if (!elementId) {
      console.log('No element Id provided')
      return
    }
    this.apiService = new WebsyDesigns.APIService('/api')
    this.elementId = elementId
    const el = document.getElementById(elementId)
    if (el) {
      if (this.options.classes) {
        this.options.classes.forEach(c => el.classList.add(c))
      }
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      this.render()
    }
  }
  handleClick (event) {
    if (event.target.classList.contains('submit')) {
      this.submitForm()
    }
  }
  handleKeyUp (event) {

  }
  render () {
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = `
        <form id="${this.elementId}Form">
      `
      this.options.fields.forEach(f => {
        html += `
          ${f.label ? `<label for="${f.field}">${f.label}</label>` : ''}
          <input class="websy-input ${f.classes}" name="${f.field}" placeholder="${f.placeholder || ''}"/>
        `
      })
      html += `          
        </form>
        <button class="websy-btn submit ${this.options.submit.classes}">${this.options.submit.text || 'Save'}</button>
      `
      el.innerHTML = html
    }
  }
  submitForm () {
    const formEl = document.getElementById(`${this.elementId}Form`)
    const formData = new FormData(formEl)
    const data = {}
    const temp = new FormData(formEl)
    temp.forEach((value, key) => {
      data[key] = value
    })  
    this.apiService.add('products', data).then(result => {
      if (this.options.clearAfterSave === true) {
        this.render()
      }
    }, err => console.log(err))
  }
}

/* global WebsyDesigns */ 
class WebsySearchList {
  constructor (elementId, options) {
    this.options = Object.assign({}, options)
    this.elementId = elementId
    this.apiService = new WebsyDesigns.APIService('/api')
    if (!elementId) {
      console.log('No element Id provided for Websy Search List')		
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      // 
    }
    this.render()
  }
  render () {
    if (this.options.entity) {
      this.apiService.get(this.options.entity).then(results => {
        if (this.options.template) {
          let html = ``          
          results.rows.forEach(row => {
            let template = this.options.template
            for (let key in row) {
              let rg = new RegExp(`{${key}}`, 'gm')
              template = template.replace(rg, row[key])
            }
            html += template
          })
          const el = document.getElementById(this.elementId)
          el.innerHTML = html
        }
      })
    }
  }
  resize () {
    // 
  }
}

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
      this.subscriptions[method](data)
    }
  }
  subscribe (method, fn) {
    if (!this.subscriptions[method]) {
      this.subscriptions[method] = fn
    }
  }
}

/* global XMLHttpRequest */
class APIService {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }
  add (entity, data) {
    const url = this.buildUrl(entity)
    return this.run('POST', url, data)
  }
  buildUrl (entity, id, query) {
    if (typeof query === 'undefined') {
      query = []
    }
    if (id) {
      query.push(`id:${id}`)
    }
    // console.log(`${this.baseUrl}/${entity}${id ? `/${id}` : ''}`)
    return `${this.baseUrl}/${entity}${query.length > 0 ? `?where=${query.join(';')}` : ''}`
  }
  delete (entity, id) {
    const url = this.buildUrl(entity, id)
    return this.run('DELETE', url)
  }
  get (entity, id, query) {
    const url = this.buildUrl(entity, id, query)
    return this.run('GET', url)
  }	
  update (entity, id, data) {
    const url = this.buildUrl(entity, id)
    return this.run('PUT', url, data)
  }	
  run (method, url, data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)		
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.onload = () => {        
        let response = xhr.responseText
        if (response !== '' && response !== 'null') {
          try {
            response = JSON.parse(response)
          }
          catch (e) {
            response = {
              err: e
            }
          }
        }
        else {
          response = []
        }      
        if (response.err) {					
          reject(JSON.stringify(response))
        }
        else {					
          resolve(response)	
        }				
      }
      xhr.onerror = () => reject(xhr.statusText)
      if (data) {
        xhr.send(JSON.stringify(data))	
      }
      else {
        xhr.send()
      }			
    })
  }	
}


const WebsyDesigns = {
  WebsyPopupDialog,
  WebsyLoadingDialog,
  WebsyNavigationMenu,
  WebsyForm,
  WebsySearchList,
  WebsyPubSub,
  APIService
}
