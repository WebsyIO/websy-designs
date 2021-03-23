/* global
  include
  WebsyPopupDialog 
  WebsyLoadingDialog 
  WebsyNavigationMenu 
  WebsyPubSub
  WebsyForm
  WebsyResultList
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
      this.toggleMobileMenu('remove')
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
  toggleMobileMenu (method) {
    if (typeof method === 'undefined') {
      method = 'toggle'
    }
    const buttonEl = document.getElementById(`${this.elementId}_menuIcon`)
    if (buttonEl) {
      buttonEl.classList[method]('open')
    }
    const menuEl = document.getElementById(`${this.elementId}_menuContainer`)
    if (menuEl) {
      menuEl.classList[method]('open')
    }
    const maskEl = document.getElementById(`${this.elementId}_mask`)
    if (maskEl) {
      maskEl.classList[method]('open')
    }
  }
}

/* global WebsyDesigns FormData grecaptcha ENVIRONMENT GlobalPubSub */ 
class WebsyForm {
  constructor (elementId, options) {
    const defaults = {
      submit: { text: 'Save', classes: '' },
      clearAfterSave: false,
      fields: [],
      onSuccess: function (data) {},
      onError: function (err) { console.log('Error submitting form data:', err) }
    }
    GlobalPubSub.subscribe('recaptchaready', this.recaptchaReady.bind(this))
    this.recaptchaResult = null
    this.options = Object.assign(defaults, {}, {
      // defaults go here
    }, options)
    if (!elementId) {
      console.log('No element Id provided')
      return
    }
    this.apiService = new WebsyDesigns.APIService('')
    this.elementId = elementId
    const el = document.getElementById(elementId)
    if (el) {
      if (this.options.classes) {
        this.options.classes.forEach(c => el.classList.add(c))
      }
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      el.addEventListener('keydown', this.handleKeyDown.bind(this))
      this.render()
    }
  }
  checkRecaptcha () {
    return new Promise((resolve, reject) => {
      if (this.options.useRecaptcha === true) {
        if (this.recaptchaValue) {        
          this.apiService.add('/google/checkrecaptcha', JSON.stringify({grecaptcharesponse: this.recaptchaValue})).then(response => {
            if (response.success && response.success === true) {
              resolve(true)
            }
            else {
              reject(false)              
            }
          })
        }
        else {
          reject(false)
        }
      }
      else {
        resolve(true)
      }
    })
  }
  set data (d) {
    if (!this.options.fields) {
      this.options.fields = []
    }
    for (let key in d) {      
      this.options.fields.forEach(f => {
        if (f.field === key) {
          f.value = d[key]
          const el = document.getElementById(`${this.elementId}_input_${f.field}`)
          el.value = f.value
        }
      })      
    }
    this.render()
  }
  handleClick (event) {
    if (event.target.classList.contains('submit')) {
      this.submitForm()
    }
  }
  handleKeyDown (event) {
    if (event.key === 'enter') {
      this.submitForm()
    }
  }
  handleKeyUp (event) {

  }
  recaptchaReady () {
    const el = document.getElementById(`${this.elementId}_recaptcha`)
    if (el) {
      grecaptcha.render(`${this.elementId}_recaptcha`, {
        sitekey: ENVIRONMENT.RECAPTCHA_KEY,
        callback: this.validateRecaptcha.bind(this)
      }) 
    }    
  }
  render (update, data) {
    const el = document.getElementById(this.elementId)
    if (el) {      
      let html = `
        <form id="${this.elementId}Form">
      `
      this.options.fields.forEach(f => {
        if (f.type === 'longtext') {
          html += `
            ${f.label ? `<label for="${f.field}">${f.label}</label>` : ''}
            <textarea
              id="${this.elementId}_input_${f.field}"
              ${f.required === true ? 'required' : ''} 
              placeholder="${f.placeholder || ''}"
              name="${f.field}" 
              class="websy-input websy-textarea ${f.classes}"
            ></textarea>
          ` 
        }
        else {
          html += `
            ${f.label ? `<label for="${f.field}">${f.label}</label>` : ''}
            <input 
              id="${this.elementId}_input_${f.field}"
              ${f.required === true ? 'required' : ''} 
              type="${f.type || 'text'}" 
              class="websy-input ${f.classes}" 
              name="${f.field}" 
              placeholder="${f.placeholder || ''}"
              value="${f.value || ''}"
              oninvalidx="this.setCustomValidity('${f.invalidMessage || 'Please fill in this field.'}')"
            />
          `
        }        
      })
      html += `          
        </form>
      `
      if (this.options.useRecaptcha === true) {
        html += `
          <div id='${this.elementId}_recaptcha'></div>
        ` 
      }      
      html += `
        <button class="websy-btn submit ${this.options.submit.classes}">${this.options.submit.text || 'Save'}</button>
      `
      el.innerHTML = html
      if (this.options.useRecaptcha === true && typeof grecaptcha !== 'undefined') {
        this.recaptchaReady()
      }
    }
  }
  submitForm () {
    const formEl = document.getElementById(`${this.elementId}Form`)
    if (formEl.reportValidity() === true) {  
      this.checkRecaptcha().then(result => {
        if (result === true) {
          const formData = new FormData(formEl)
          const data = {}
          const temp = new FormData(formEl)
          temp.forEach((value, key) => {
            data[key] = value
          })
          if (this.options.url) {
            this.apiService.add(this.options.url, data).then(result => {
              if (this.options.clearAfterSave === true) {
                // this.render()
                formEl.reset()
              }
              this.options.onSuccess.call(this, result)
            }, err => {
              console.log('Error submitting form data:', err)
              this.options.onError.call(this, err)
            }) 
          }
          else if (this.options.submitFn) {
            this.options.submitFn(data)
            if (this.options.clearAfterSave === true) {
              // this.render()
              formEl.reset()
            }
          }          
        }
        else {
          console.log('bad recaptcha')
        }        
      })         
    }    
  }
  validateRecaptcha (token) {
    this.recaptchaValue = token
  }
}

/* global WebsyDesigns */ 
class WebsyResultList {
  constructor (elementId, options) {
    const DEFAULTS = {
      listeners: {
        click: {}
      }
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.elementId = elementId
    this.rows = []
    this.apiService = new WebsyDesigns.APIService('/api')
    this.templateService = new WebsyDesigns.APIService('')
    if (!elementId) {
      console.log('No element Id provided for Websy Search List')		
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
    }
    if (typeof options.template === 'object' && options.template.url) {
      this.templateService.get(options.template.url).then(templateString => {
        this.options.template = templateString
        this.render()
      })
    }
    else {
      this.render()
    }    
  }
  appendData (d) {
    this.rows = this.rows.concat(d)
    const html = this.buildHTML(d)
    const el = document.getElementById(this.elementId)
    el.innerHTML += html.replace(/\n/g, '')
  }
  buildHTML (d) {
    let html = ``
    if (this.options.template) {      
      if (d.length > 0) {
        d.forEach((row, ix) => {
          let template = `${ix > 0 ? '-->' : ''}${this.options.template}${ix < d.length - 1 ? '<!--' : ''}`
          // find conditional elements
          let ifMatches = [...template.matchAll(/<\s*if[^>]*>([\s\S]*?)<\s*\/\s*if>/g)]
          ifMatches.forEach(m => {
            // get the condition
            if (m[0] && m.index > -1) {
              let conditionMatch = m[0].match(/(\scondition=["|']\w.+)["|']/g)
              if (conditionMatch && conditionMatch[0]) {
                let c = conditionMatch[0].trim().replace('condition=', '')
                if (c.split('')[0] === '"') {
                  c = c.replace(/"/g, '')
                }
                else if (c.split('')[0] === '\'') {
                  c = c.replace(/'/g, '')
                }
                let parts = []
                let polarity = true
                if (c.indexOf('===') !== -1) {
                  parts = c.split('===')
                }
                else if (c.indexOf('!==') !== -1) {
                  parts = c.split('!==')
                  polarity = false
                }
                else if (c.indexOf('==') !== -1) {
                  parts = c.split('==')
                }
                else if (c.indexOf('!=') !== -1) {
                  parts = c.split('!=')
                  polarity = false
                }
                let removeAll = true
                if (parts.length === 2) {
                  if (!isNaN(parts[1])) {
                    parts[1] = +parts[1]
                  }
                  if (parts[1] === 'true') {
                    parts[1] = true
                  }
                  if (parts[1] === 'false') {
                    parts[1] = false
                  }
                  if (typeof parts[1] === 'string') {
                    if (parts[1].indexOf('"') !== -1) {
                      parts[1] = parts[1].replace(/"/g, '')
                    }
                    else if (parts[1].indexOf('\'') !== -1) {
                      parts[1] = parts[1].replace(/'/g, '')
                    } 
                  }
                  if (polarity === true) {
                    if (typeof row[parts[0]] !== 'undefined' && row[parts[0]] === parts[1]) {
                      // remove the <if> tags
                      removeAll = false
                    }
                    else if (parts[0] === parts[1]) {
                      removeAll = false
                    }
                  } 
                  else if (polarity === false) {
                    if (typeof row[parts[0]] !== 'undefined' && row[parts[0]] !== parts[1]) {
                      // remove the <if> tags
                      removeAll = false
                    }
                  }                                                
                }
                if (removeAll === true) {
                  // remove the whole markup                
                  template = template.replace(m[0], '')
                }
                else {
                  // remove the <if> tags
                  let newMarkup = m[0]
                  newMarkup = newMarkup.replace('</if>', '').replace(/<\s*if[^>]*>/g, '')
                  template = template.replace(m[0], newMarkup) 
                }
              }
            }
          })
          let tagMatches = [...template.matchAll(/(\sdata-event=["|']\w.+)["|']/g)]
          tagMatches.forEach(m => {
            if (m[0] && m.index > -1) {
              template = template.replace(m[0], `${m[0]} data-id=${ix}`)
            }
          })
          for (let key in row) {
            let rg = new RegExp(`{${key}}`, 'gm')                            
            template = template.replace(rg, row[key])
          }
          html += template        
        })
      }
      else if (this.options.noRowsHTML) {
        html += this.options.noRowsHTML
      }
    }
    return html
  }
  set data (d) {
    this.rows = d || []
    this.render()
  }
  get data () {
    return this.rows
  } 
  findById (id) {
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].id === id) {
        return this.rows[i]
      }      
    }
    return null
  }
  handleClick (event) {    
    if (event.target.classList.contains('clickable')) {
      let l = event.target.getAttribute('data-event')
      if (l) {
        l = l.split('(')
        let params = []
        const id = event.target.getAttribute('data-id')
        if (l[1]) {
          l[1] = l[1].replace(')', '')
          params = l[1].split(',')      
        }
        l = l[0]
        params = params.map(p => {
          if (typeof p !== 'string' && typeof p !== 'number') {
            if (this.rows[+id]) {
              p = this.rows[+id][p]
            }
          }
          else if (typeof p === 'string') {
            p = p.replace(/"/g, '').replace(/'/g, '')
          }
          return p
        })
        if (event.target.classList.contains('clickable') && this.options.listeners.click[l]) {      
          event.stopPropagation()
          this.options.listeners.click[l].call(this, event, this.rows[+id], ...params)
        }  
      }
    }
  }
  render () {
    if (this.options.entity) {
      this.apiService.get(this.options.entity).then(results => {
        this.rows = results.rows  
        this.resize()
      })
    }
    else {
      this.resize()
    }
  }
  resize () {
    const html = this.buildHTML(this.rows)
    const el = document.getElementById(this.elementId)
    el.innerHTML = html.replace(/\n/g, '')    
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

/* global XMLHttpRequest fetch */
class APIService {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }
  add (entity, data, options = {}) {
    const url = this.buildUrl(entity)
    return this.run('POST', url, data, options)
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
  fetchData (method, url, data, options = {}) {
    return fetch(url, {
      method,
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(response => {
      return response.json()
    })
  } 
  run (method, url, data, options = {}, returnHeaders = false) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)		
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.responseType = 'text'
      if (options.responseType) {
        xhr.responseType = options.responseType
      }
      if (options.headers) {
        for (let key in options.headers) {
          xhr.setRequestHeader(key, options.headers[key])
        }
      }
      xhr.withCredentials = true
      console.log('using this')
      xhr.onload = () => {
        if (xhr.status === 401) {
          reject('401 - Unathorized')
          return
        }      
        let response = xhr.responseType === 'text' ? xhr.responseText : xhr.response
        if (response !== '' && response !== 'null') {
          try {
            response = JSON.parse(response)
          }
          catch (e) {
            // Either a bad Url or a string has been returned
          }
        }
        else {
          response = []
        }      
        if (response.err) {					
          reject(JSON.stringify(response))
        }
        else {					
          if (returnHeaders === true) {
            resolve([response, parseHeaders(xhr.getAllResponseHeaders())])	 
          }
          else {
            resolve(response)
          }
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
    function parseHeaders (headers) {
      headers = headers.split('\r\n')
      let ouput = {}
      headers.forEach(h => {
        h = h.split(':')
        if (h.length === 2) {
          ouput[h[0]] = h[1].trim() 
        }        
      })
      return ouput
    }
  }	
}


const WebsyDesigns = {
  WebsyPopupDialog,
  WebsyLoadingDialog,
  WebsyNavigationMenu,
  WebsyForm,
  WebsyResultList,
  WebsyPubSub,
  APIService
}

const GlobalPubSub = new WebsyPubSub('empty', {})

function recaptchaReadyCallBack () {
  GlobalPubSub.publish('recaptchaready')
}

// need a way of initializing these based on environment variables
const rcs = document.createElement('script')
rcs.src = '//www.google.com/recaptcha/api.js?onload=recaptchaReadyCallBack'
document.getElementsByTagName('body')[0].appendChild(rcs)

const pps = document.createElement('script')
rcs.src = '//www.paypal.com/sdk/js'
document.getElementsByTagName('body')[0].appendChild(pps)
