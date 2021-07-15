/* global
  include
  WebsyPopupDialog 
  WebsyLoadingDialog 
  WebsyNavigationMenu 
  WebsyPubSub
  WebsyForm
  WebsyDatePicker
  WebsyDropdown
  WebsyResultList
  WebsyTable
  WebsyChart
  WebsyMap
  WebsyKPI
  WebsyPDFButton
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
    let html = ''
    if (this.options.mask === true) {
      html += `<div class='websy-mask'></div>`
    }
    html += `
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
            <svg viewbox="0 0 40 40" width="40" height="40">              
              <rect x="0" y="0" width="40" height="4" rx="2"></rect>
              <rect x="0" y="12" width="40" height="4" rx="2"></rect>
              <rect x="0" y="24" width="40" height="4" rx="2"></rect>
            </svg>
            </div>
          <div 
            class='logo ${(this.options.logo.classes && this.options.logo.classes.join(' ')) || ''}'
            ${this.options.logo.attributes && this.options.logo.attributes.join(' ')}
          >
          <img src='${this.options.logo.url}'></img>
          </div>
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
    const el = document.getElementById(`${this.elementId}`)
    if (el) {
      el.classList[method]('open')
    }
    if (this.options.onToggle) {
      this.options.onToggle(method)
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

class WebsyDatePicker {
  constructor (elementId, options) {
    this.oneDay = 1000 * 60 * 60 * 24
    this.currentselection = []
    const DEFAULTS = {
      defaultRange: 2,
      minAllowedDate: new Date(new Date((new Date().setFullYear(new Date().getFullYear() - 5))).setDate(1)),
      maxAllowedDate: new Date((new Date().setFullYear(new Date().getFullYear() + 1))),
      daysOfWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      monthMap: {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
      },
      ranges: [
        {
          label: 'Today',
          range: [new Date().floor()]
        },
        {
          label: 'Yesterday',
          range: [new Date(new Date().setDate(new Date().getDate() - 1)).floor()]
        },
        {
          label: 'Last 7 Days',
          range: [new Date(new Date().setDate(new Date().getDate() - 6)).floor(), new Date().floor()]
        },
        {
          label: 'This Month',
          range: [new Date(new Date().setDate(1)).floor(), new Date(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() + 1) - this.oneDay).floor()]
        },
        {
          label: 'Last Month',
          range: [new Date(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() - 1)).floor(), new Date(new Date(new Date().setDate(1)).setMonth(new Date().getMonth()) - this.oneDay).floor()]
        },
        {
          label: 'This Year',
          range: [new Date(`1/1/${new Date().getFullYear()}`).floor(), new Date(`12/31/${new Date().getFullYear()}`).floor()]
        },
        {
          label: 'Last Year',
          range: [new Date(`1/1/${new Date().getFullYear() - 1}`).floor(), new Date(`12/31/${new Date().getFullYear() - 1}`).floor()]
        }
      ]
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.selectedRange = this.options.defaultRange || 0
    this.selectedRangeDates = [...this.options.ranges[this.options.defaultRange || 0].range]
    this.priorSelectedDates = null
    if (!elementId) {
      console.log('No element Id provided')
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      this.elementId = elementId
      el.addEventListener('click', this.handleClick.bind(this))
      let html = `
        <div class='websy-date-picker-container'>
          <span class='websy-dropdown-header-label'>${this.options.label || 'Date'}</span>
          <div class='websy-date-picker-header'>
            <span id='${this.elementId}_selectedRange'>${this.options.ranges[this.selectedRange].label}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z"/></svg>
          </div>
          <div id='${this.elementId}_mask' class='websy-date-picker-mask'></div>
          <div id='${this.elementId}_content' class='websy-date-picker-content'>
            <div class='websy-date-picker-ranges'>
              <ul>
                ${this.options.ranges.map((r, i) => `
                  <li data-index='${i}' class='websy-date-picker-range ${i === this.selectedRange ? 'active' : ''}'>${r.label}</li>
                `).join('')}
              </ul>
            </div><!--
            --><div id='${this.elementId}_datelist' class='websy-date-picker-custom'>${this.renderDates()}</div>
            <div class='websy-dp-button-container'>
              <button class='websy-btn websy-dp-cancel'>Cancel</button>
              <button class='websy-btn websy-dp-confirm'>Confirm</button>
            </div>
          </div>          
        </div>
      `
      el.innerHTML = html
      this.render()
    }
    else {
      console.log('No element found with Id', elementId)
    }    
  }
  close (confirm) {
    const maskEl = document.getElementById(`${this.elementId}_mask`)
    const contentEl = document.getElementById(`${this.elementId}_content`)
    maskEl.classList.remove('active')
    contentEl.classList.remove('active')
    if (confirm === true) {
      if (this.options.onChange) {
        this.options.onChange(this.selectedRangeDates)        
      }
      this.updateRange()
    }
    else {
      this.selectedRangeDates = [...this.priorSelectedDates]
      this.selectedRange = this.priorSelectedRange
    }
  }
  handleClick (event) {
    if (event.target.classList.contains('websy-date-picker-header')) {
      this.open()
    }
    else if (event.target.classList.contains('websy-date-picker-mask')) {
      this.close()
    }
    else if (event.target.classList.contains('websy-date-picker-range')) {
      const index = event.target.getAttribute('data-index')
      this.selectRange(index)
      this.updateRange(index)
    }
    else if (event.target.classList.contains('websy-dp-date')) {
      if (event.target.classList.contains('websy-disabled-date')) {
        return
      }
      const timestamp = event.target.id.split('_')[0]
      this.selectDate(+timestamp)
    }
    else if (event.target.classList.contains('websy-dp-confirm')) {
      this.close(true)
    }
    else if (event.target.classList.contains('websy-dp-cancel')) {
      this.close()
    }
  }
  highlightRange () {
    const el = document.getElementById(`${this.elementId}_dateList`)
    const dateEls = el.querySelectorAll('.websy-dp-date')
    for (let i = 0; i < dateEls.length; i++) {      
      dateEls[i].classList.remove('selected')
      dateEls[i].classList.remove('first')
      dateEls[i].classList.remove('last')
    }
    let daysDiff = Math.floor((this.selectedRangeDates[this.selectedRangeDates.length - 1].getTime() - this.selectedRangeDates[0].getTime()) / this.oneDay)
    if (this.selectedRangeDates[0].getMonth() !== this.selectedRangeDates[this.selectedRangeDates.length - 1].getMonth()) {
      daysDiff += 1
    }
    for (let i = 0; i < daysDiff + 1; i++) {
      let d = new Date(this.selectedRangeDates[0].getTime() + (i * this.oneDay)).floor()
      const dateEl = document.getElementById(`${d.getTime()}_date`)
      if (dateEl) {
        dateEl.classList.add('selected')
        if (d.getTime() === this.selectedRangeDates[0].getTime()) {
          dateEl.classList.add('first')
        }
        if (d.getTime() === this.selectedRangeDates[this.selectedRangeDates.length - 1].getTime()) {
          dateEl.classList.add('last')
        }
      }
    }
  }
  open (options, override = false) {
    const maskEl = document.getElementById(`${this.elementId}_mask`)
    const contentEl = document.getElementById(`${this.elementId}_content`)
    maskEl.classList.add('active')
    contentEl.classList.add('active')
    this.priorSelectedDates = [...this.selectedRangeDates]
    this.priorSelectedRange = this.selectedRange
    this.scrollRangeIntoView()
  }
  render (disabledDates) {
    if (!this.elementId) {
      console.log('No element Id provided for Websy Loading Dialog')	
      return
    }
    const el = document.getElementById(`${this.elementId}_datelist`)
    if (el && disabledDates) {
      el.innerHTML = this.renderDates(disabledDates)
    }
    this.highlightRange()
  }
  renderDates (disabledDates) {
    let disabled = []
    if (disabledDates) {
      disabled = disabledDates.map(d => d.getTime())
    }    
    let daysDiff = Math.floor((this.options.maxAllowedDate.getTime() - this.options.minAllowedDate.getTime()) / this.oneDay)
    let months = {}
    for (let i = 0; i < daysDiff; i++) {
      let d = new Date(this.options.minAllowedDate.getTime() + (i * this.oneDay)).floor()
      let monthYear = `${this.options.monthMap[d.getMonth()]} ${d.getFullYear()}`
      if (!months[monthYear]) {
        months[monthYear] = []
      }
      months[monthYear].push({date: d, dayOfMonth: d.getDate(), dayOfWeek: d.getDay(), id: d.getTime(), disabled: disabled.indexOf(d.getTime()) !== -1})
    }
    let html = ''
    html += `
      <ul class='websy-dp-days-header'>
    `
    html += this.options.daysOfWeek.map(d => `<li>${d}</li>`).join('')
    html += `
      </ul>
      <div id='${this.elementId}_dateList' class='websy-dp-date-list'>
    `
    for (let key in months) {      
      html += `
        <div class='websy-dp-month-container'>
          <span id='${key.replace(/\s/g, '_')}'>${key}</span>
          <ul>
      `
      if (months[key][0].dayOfWeek > 0) {
        let paddedDays = []
        for (let i = 0; i < months[key][0].dayOfWeek; i++) {
          paddedDays.push(`<li>&nbsp;</li>`)          
        }
        html += paddedDays.join('')
      }
      html += months[key].map(d => `<li id='${d.id}_date' class='websy-dp-date ${d.disabled === true ? 'websy-disabled-date' : ''}'>${d.dayOfMonth}</li>`).join('')
      html += `
          </ul>
        </div>
      `
    }
    html += '</div>'
    return html
  }
  scrollRangeIntoView () {    
    if (this.selectedRangeDates[0]) {
      const el = document.getElementById(`${this.selectedRangeDates[0].getTime()}_date`)
      const parentEl = document.getElementById(`${this.elementId}_dateList`)
      if (el && parentEl) {        
        parentEl.scrollTo(0, el.offsetTop)
      } 
    }
  }
  selectDate (timestamp) {
    if (this.currentselection.length === 0) {
      this.currentselection.push(timestamp)
    }
    else {
      if (timestamp > this.currentselection[0]) {
        this.currentselection.push(timestamp)
      }
      else {
        this.currentselection.splice(0, 0, timestamp)
      }
    }
    this.selectedRangeDates = [new Date(this.currentselection[0]), new Date(this.currentselection[1] || this.currentselection[0])]
    if (this.currentselection.length === 2) {
      this.currentselection = [] 
    }    
    this.selectedRange = -1
    this.highlightRange()
  }
  selectRange (index) {
    if (this.options.ranges[index]) {
      this.selectedRangeDates = [...this.options.ranges[index].range]
      this.selectedRange = index
      this.highlightRange()      
      this.close(true)
    }
  }
  selectCustomRange (range) {
    this.selectedRange = -1
    this.selectedRangeDates = range
    this.highlightRange()
    this.updateRange()
  }
  updateRange () {    
    let range
    if (this.selectedRange === -1) {
      let start = this.selectedRangeDates[0].toLocaleDateString()
      let end = ''
      if (this.selectedRangeDates[1] && (this.selectedRangeDates[0].getTime() !== this.selectedRangeDates[1].getTime())) {
        end = ` - ${this.selectedRangeDates[1].toLocaleDateString()}`
      }      
      range = { label: `${start}${end}` }
    }
    else {
      range = this.options.ranges[this.selectedRange]
    }    
    const el = document.getElementById(this.elementId)
    const labelEl = document.getElementById(`${this.elementId}_selectedRange`)
    const rangeEls = el.querySelectorAll(`.websy-date-picker-range`)
    for (let i = 0; i < rangeEls.length; i++) {
      rangeEls[i].classList.remove('active')
      if (i === this.selectedRange) {
        rangeEls[i].classList.add('active')
      }
    }
    if (labelEl) {
      labelEl.innerHTML = range.label      
    }
  }
}

Date.prototype.floor = function () {
  return new Date(`${this.getMonth() + 1}/${this.getDate()}/${this.getFullYear()}`)
}

class WebsyDropdown {
  constructor (elementId, options) {
    const DEFAULTS = {
      multiSelect: false,
      allowClear: true,
      style: 'plain',
      items: [],
      label: '',
      minSearchCharacters: 2
    }
    this.options = Object.assign({}, DEFAULTS, options)    
    this.selectedItems = []
    if (!elementId) {
      console.log('No element Id provided')
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      this.elementId = elementId
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      this.render()
    }
    else {
      console.log('No element found with Id', elementId)
    }
  }
  set selections (d) {
    this.selectedItems = d || []    
  }
  set data (d) {
    this.options.items = d || []
    const el = document.getElementById(`${this.elementId}_items`)
    if (el.childElementCount === 0) {
      this.render()
    }
    else {
      if (this.options.items.length === 0) {
        this.options.items = [{label: this.options.noItemsText || 'No Items'}]
      }
      this.renderItems()
    }    
  }
  get data () {
    return this.options.items
  }
  clearSelected () {
    this.selectedItems = []
    this.updateHeader()
    if (this.options.onClearSelected) {
      this.options.onClearSelected()
    }
  }
  close () {
    const maskEl = document.getElementById(`${this.elementId}_mask`)
    const contentEl = document.getElementById(`${this.elementId}_content`)
    maskEl.classList.remove('active')
    contentEl.classList.remove('active')
    const searchEl = document.getElementById(`${this.elementId}_search`)
    if (searchEl) {
      if (this.options.onCancelSearch) {            
        this.options.onCancelSearch('')        
      }
      searchEl.value = ''
    }
  }
  handleClick (event) {
    if (event.target.classList.contains('websy-dropdown-header')) {
      this.open()
    }
    else if (event.target.classList.contains('websy-dropdown-mask')) {
      this.close()
    }
    else if (event.target.classList.contains('websy-dropdown-item')) {
      const index = event.target.getAttribute('data-index')
      this.updateSelected(+index)
    }
    else if (event.target.classList.contains('clear')) {
      this.clearSelected()
    }
  }
  handleKeyUp (event) {
    if (event.target.classList.contains('websy-dropdown-search')) {
      if (event.target.value.length >= this.options.minSearchCharacters) {
        if (event.key === 'Enter') {
          if (this.options.onConfirmSearch) {
            this.options.onConfirmSearch(event.target.value)
            event.target.value = ''
          }
        }
        else if (event.key === 'Escape') {
          if (this.options.onCancelSearch) {            
            this.options.onCancelSearch(event.target.value)
            event.target.value = ''
          }
        }
        else {
          if (this.options.onSearch) {
            this.options.onSearch(event.target.value)
          }
        }
      }
      else {
        if (this.options.onCancelSearch) {            
          this.options.onCancelSearch(event.target.value)
        }
      }
    }
  }
  open (options, override = false) {
    const maskEl = document.getElementById(`${this.elementId}_mask`)
    const contentEl = document.getElementById(`${this.elementId}_content`)
    maskEl.classList.add('active')
    contentEl.classList.add('active')
    if (this.options.disableSearch !== true) {
      const searchEl = document.getElementById(`${this.elementId}_search`)
      if (searchEl) {
        searchEl.focus()
      }
    }
  }
  render () {
    if (!this.elementId) {
      console.log('No element Id provided for Websy Dropdown')	
      return
    }
    const el = document.getElementById(this.elementId)
    let html = `
      <div class='websy-dropdown-container ${this.options.disableSearch !== true ? 'with-search' : ''}'>
        <div id='${this.elementId}_header' class='websy-dropdown-header ${this.selectedItems.length === 1 ? 'one-selected' : ''} ${this.options.allowClear === true ? 'allow-clear' : ''}'>
          <span id='${this.elementId}_headerLabel' class='websy-dropdown-header-label'>${this.options.label}</span>
          <span class='websy-dropdown-header-value' id='${this.elementId}_selectedItems'>${this.selectedItems.map(s => this.options.items[s].label).join(',')}</span>
          <svg class='arrow' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z"/></svg>
    `
    if (this.options.allowClear === true) {
      html += `
        <svg class='clear' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><title>ionicons-v5-l</title><line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>
      `
    }
    html += `          
        </div>
        <div id='${this.elementId}_mask' class='websy-dropdown-mask'></div>
        <div id='${this.elementId}_content' class='websy-dropdown-content'>
    `
    if (this.options.disableSearch !== true) {
      html += `
        <input id='${this.elementId}_search' class='websy-dropdown-search' placeholder='${this.options.searchPlaceholder || 'Search'}'>
      `
    }
    html += `
          <div class='websy-dropdown-items'>
            <ul id='${this.elementId}_items'>              
            </ul>
          </div><!--
          --><div class='websy-dropdown-custom'></div>
        </div>
      </div>
    `
    el.innerHTML = html
    this.renderItems()
  }
  renderItems () {
    let html = this.options.items.map((r, i) => `
      <li data-index='${i}' class='websy-dropdown-item ${this.selectedItems.indexOf(i) !== -1 ? 'active' : ''}'>${r.label}</li>
    `).join('')
    const el = document.getElementById(`${this.elementId}_items`)
    if (el) {
      el.innerHTML = html
    }
    let item
    if (this.selectedItems.length === 1) {
      item = this.options.items[this.selectedItems[0]]
    }
    this.updateHeader(item)
  }
  updateHeader (item) {
    const el = document.getElementById(this.elementId)
    const headerEl = document.getElementById(`${this.elementId}_header`)
    const headerLabelEl = document.getElementById(`${this.elementId}_headerLabel`)
    const labelEl = document.getElementById(`${this.elementId}_selectedItems`)
    const itemEls = el.querySelectorAll(`.websy-dropdown-item`)
    for (let i = 0; i < itemEls.length; i++) {
      itemEls[i].classList.remove('active')
      if (this.selectedItems.indexOf(i) !== -1) {
        itemEls[i].classList.add('active')
      }
    }
    if (headerLabelEl) {
      headerLabelEl.innerHTML = this.options.label
    }
    if (headerEl) {
      headerEl.classList.remove('one-selected')
      headerEl.classList.remove('multi-selected')
      if (this.selectedItems.length === 1) {
        headerEl.classList.add('one-selected')
      }
      else if (this.selectedItems.length > 1) {
        headerEl.classList.add('multi-selected')
      }
    }
    if (labelEl) {
      if (this.selectedItems.length === 1) {
        labelEl.innerHTML = item.label 
      }
      else if (this.selectedItems.length > 1) {
        labelEl.innerHTML = `${this.selectedItems.length} selected`
      }
      else {        
        labelEl.innerHTML = ''
      }
    }
  }
  updateSelected (index) {
    if (typeof index !== 'undefined' && index !== null) {
      if (this.selectedItems.indexOf(index) !== -1) {
        return
      }
      if (this.options.multiSelect === false) {
        this.selectedItems = [index]
      }
      else {
        this.selectedItems.push(index)
      } 
    }    
    const item = this.options.items[index]
    this.updateHeader(item)
    if (item && this.options.onItemSelected) {
      this.options.onItemSelected(item, this.selectedItems, this.options.items)
    }
    this.close()
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
    let startIndex = this.rows.length
    this.rows = this.rows.concat(d)
    const html = this.buildHTML(d, startIndex)
    const el = document.getElementById(this.elementId)
    el.innerHTML += html.replace(/\n/g, '')
  }
  buildHTML (d, startIndex = 0) {
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
              template = template.replace(m[0], `${m[0]} data-id=${startIndex + ix}`)
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

/* global XMLHttpRequest fetch ENV */
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
          if (ENV && ENV.AUTH_REDIRECT) {
            window.location = ENV.AUTH_REDIRECT
          }
          else {
            window.location = '/login'
          }
          // reject('401 - Unauthorized')
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

/* global WebsyDesigns Blob */ 
class WebsyPDFButton {
  constructor (elementId, options) {
    const DEFAULTS = {
      classes: [],
      wait: 0
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.service = new WebsyDesigns.APIService('pdf')
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      if (options.html) {
        el.innerHTML = options.html
      }
      else {
        el.innerHTML = `
          <!--<form style='display: none;' id='${this.elementId}_form' action='/pdf' method='POST'>
            <input id='${this.elementId}_pdfHeader' value='' name='header'>
            <input id='${this.elementId}_pdfHTML' value='' name='html'>
            <input id='${this.elementId}_pdfFooter' value='' name='footer'>
          </form>-->
          <button class='websy-btn websy-pdf-button ${this.options.classes.join(' ')}'>
            Create PDF
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 184.153 184.153" style="enable-background:new 0 0 184.153 184.153;" xml:space="preserve">
              <g>
                <g>
                  <g>
                    <path d="M129.318,0H26.06c-1.919,0-3.475,1.554-3.475,3.475v177.203c0,1.92,1.556,3.475,3.475,3.475h132.034
                      c1.919,0,3.475-1.554,3.475-3.475V34.131C161.568,22.011,140.771,0,129.318,0z M154.62,177.203H29.535V6.949h99.784
                      c7.803,0,25.301,18.798,25.301,27.182V177.203z"/>
                    <path d="M71.23,76.441c15.327,0,27.797-12.47,27.797-27.797c0-15.327-12.47-27.797-27.797-27.797
                      c-15.327,0-27.797,12.47-27.797,27.797C43.433,63.971,55.902,76.441,71.23,76.441z M71.229,27.797
                      c11.497,0,20.848,9.351,20.848,20.847c0,0.888-0.074,1.758-0.183,2.617l-18.071-2.708L62.505,29.735
                      C65.162,28.503,68.112,27.797,71.229,27.797z M56.761,33.668l11.951,19.869c0.534,0.889,1.437,1.49,2.462,1.646l18.669,2.799
                      c-3.433,6.814-10.477,11.51-18.613,11.51c-11.496,0-20.847-9.351-20.847-20.847C50.381,42.767,52.836,37.461,56.761,33.668z"/>
                    <rect x="46.907" y="90.339" width="73.058" height="6.949"/>
                    <rect x="46.907" y="107.712" width="48.644" height="6.949"/>
                    <rect x="46.907" y="125.085" width="62.542" height="6.949"/>
                  </g>
                </g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              </svg>
          </button>          
          <div id='${this.elementId}_loader'></div>
          <div id='${this.elementId}_popup'></div>
        `
        this.loader = new WebsyDesigns.WebsyLoadingDialog(`${this.elementId}_loader`, { classes: ['global-loader'] })
        this.popup = new WebsyDesigns.WebsyPopupDialog(`${this.elementId}_popup`)
        // const formEl = document.getElementById(`${this.elementId}_form`)
        // if (formEl) {
        //   formEl.addEventListener('load', () => {
        //     this.loader.hide()
        //   })
        // }        
      }
    }
  }
  handleClick (event) {
    if (event.target.classList.contains('websy-pdf-button')) {
      this.loader.show()
      setTimeout(() => {        
        if (this.options.targetId) {
          const el = document.getElementById(this.options.targetId)
          if (el) {
            const pdfData = { options: {} }
            if (this.options.pdfOptions) {
              pdfData.options = Object.assign({}, this.options.pdfOptions)
            }
            if (this.options.header) {
              if (this.options.header.elementId) {
                const headerEl = document.getElementById(this.options.header.elementId)
                if (headerEl) {
                  pdfData.header = headerEl.outerHTML  
                  if (this.options.header.css) {
                    pdfData.options.headerCSS = this.options.header.css
                  }
                }
              }
              else {
                pdfData.header = this.options.header
              }
            }
            if (this.options.footer) {
              if (this.options.footer.elementId) {
                const footerEl = document.getElementById(this.options.footer.elementId)
                if (footerEl) {
                  pdfData.footer = footerEl.outerHTML  
                  if (this.options.footer.css) {
                    pdfData.options.footerCSS = this.options.footer.css
                  }
                }
              }
              else {
                pdfData.footer = this.options.footer
              }
            }
            pdfData.html = el.outerHTML
            // document.getElementById(`${this.elementId}_pdfHeader`).value = pdfData.header
            // document.getElementById(`${this.elementId}_pdfHTML`).value = pdfData.html
            // document.getElementById(`${this.elementId}_pdfFooter`).value = pdfData.footer
            // document.getElementById(`${this.elementId}_form`).submit()
            this.service.add('', pdfData, {responseType: 'blob'}).then(response => {
              this.loader.hide()
              const blob = new Blob([response], {type: 'application/pdf'})
              this.popup.show({
                message: `
                  <div class='text-center websy-pdf-download'>
                    <div>Your file is ready to download</div>
                    <a href='${URL.createObjectURL(blob)}' target='_blank'>
                      <button class='websy-btn'>Download</button>
                    </a>
                  </div>
                `,
                mask: true
              })
            }, err => {
              console.error(err)
            })
          }
        } 
      }, this.options.wait)           
    }
  }
  render () {
    // 
  }
}

class WebsyTable {
  constructor (elementId, options) {
    const DEFAULTS = {
      pageSize: 20
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.rowCount = 0
    this.busy = false
    const el = document.getElementById(this.elementId)
    if (el) {
      el.innerHTML = `
        <div class='websy-vis-table'>
          <!--<div class="download-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z"/></svg>
          </div>-->
          <table>
            <thead id="${this.elementId}_head">
            </thead>
            <tbody id="${this.elementId}_body">
            </tbody>
          </table>
        </div>
      `
      el.addEventListener('click', this.handleClick.bind(this))
      const scrollEl = document.getElementById(`${this.elementId}`)
      scrollEl.addEventListener('scroll', this.handleScroll.bind(this))
      this.init()
    } 
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  appendRows (page) {
    let bodyHTML = ''

    if (page) {
      bodyHTML += page.qMatrix.map((r, rowIndex) => {
        return '<tr>' + r.map((c, i) => {
          if (this.columns[i].show !== false) {
            if (this.columns[i].showAsLink === true && c.qText.trim() !== '') {
              return `
                <td data-view='${c.qText}' data-index='${rowIndex}' class='trigger-item ${this.columns[i].selectOnClick === true ? 'selectable' : ''} ${this.columns[i].classes || ''}' ${this.columns[i].width ? 'style="width: ' + this.columns[i].width + '"' : ''}>${this.columns[i].linkText || 'Link'}</td>
              `
            } 
            else {
              let v = c.qNum === 'NaN' ? c.qText : c.qNum.toReduced(2, c.qText.indexOf('%') !== -1)
              
              if (c.qText && c.qText.indexOf('€') !== -1) {
                v = v.toCurrency('€')
              }
              return `
                <td class='${this.columns[i].classes || ''}' ${this.columns[i].width ? 'style="width: ' + this.columns[i].width + '"' : ''}>${v}</td>
              `
            }
          }
        }).join('') + '</tr>'
      }).join('')
    }
    const bodyEl = document.getElementById(`${this.elementId}_body`)
    bodyEl.innerHTML += bodyHTML
  }
  buildSearchIcon (field) {
    return `
      <div>
        <svg
          class="tableSearchIcon"
          data-field="${field}"
          xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"
        >
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
    `
  }
  getData (callbackFn) {
    if (this.busy === false) {
      this.busy = true
      const pageDefs = [{
        qTop: this.rowCount,
        qLeft: 0,
        qWidth: this.dataWidth,
        qHeight: this.dataWidth * this.options.pageSize > 10000 ? Math.floor(10000 / this.dataWidth) : this.options.pageSize
      }]
      if (this.rowCount < this.layout.qHyperCube.qSize.qcy) {
        this.options.model.getHyperCubeData('/qHyperCubeDef', pageDefs).then(pages => {
          if (pages && pages[0]) {
            pages[0].qMatrix = pages[0].qMatrix.filter(r => r[0].qText !== '-')
            this.layout.qHyperCube.qDataPages.push(pages[0])
            this.rowCount += pages[0].qMatrix.length
            this.busy = false
            if (callbackFn) {
              callbackFn(pages[0])
            }
          }
        })
      } 
      else {
        this.busy = false
      }
    }
  }
  handleClick (event) {
    if (event.target.classList.contains('download-button')) {
      window.viewManager.dataExportController.exportData(this.options.model)
    }
    if (event.target.classList.contains('sortable-column')) {
      const colIndex = +event.target.getAttribute('data-index')
      const dimIndex = +event.target.getAttribute('data-dim-index')
      const expIndex = +event.target.getAttribute('data-exp-index')
      const reverse = event.target.getAttribute('data-reverse') === 'true'
      const patchDefs = [{
        qOp: 'replace',
        qPath: '/qHyperCubeDef/qInterColumnSortOrder',
        qValue: JSON.stringify([colIndex])
      }]
      patchDefs.push({
        qOp: 'replace',
        qPath: `/qHyperCubeDef/${dimIndex > -1 ? 'qDimensions' : 'qMeasures'}/${dimIndex > -1 ? dimIndex : expIndex}/qDef/qReverseSort`,
        qValue: JSON.stringify(reverse)
      })
      this.options.model.applyPatches(patchDefs) // .then(() => this.render())
    } 
    else if (event.target.classList.contains('tableSearchIcon')) {
      let field = event.target.getAttribute('data-field')
      window.viewManager.views.global.objects[1].instance.show(field, { x: event.pageX, y: event.pageY }, () => {
        event.target.classList.remove('active')
      })
    }
    else if (event.target.classList.contains('selectable')) {
      const index = +event.target.getAttribute('data-index')
      const data = this.layout.qHyperCube.qDataPages[0].qMatrix[index]
      this.options.model.selectHyperCubeValues('/qHyperCubeDef', 0, [data[0].qElemNumber], false)
    }
  }
  handleScroll (event) {
    if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
      this.getData(page => {
        this.appendRows(page)
      })
    }
  }
  init () {
    this.render()
  }
  render () {
    const bodyEl = document.getElementById(`${this.elementId}_body`)
    bodyEl.innerHTML = ''
    this.rowCount = 0
    this.options.model.getLayout().then(layout => {
      this.layout = layout
      this.dataWidth = this.layout.qHyperCube.qSize.qcx
      this.columnOrder = this.layout.qHyperCube.qColumnOrder
      if (typeof this.columnOrder === 'undefined') {
        this.columnOrder = (new Array(this.layout.qHyperCube.qSize.qcx)).fill({}).map((r, i) => i)
      }
      this.columns = this.layout.qHyperCube.qDimensionInfo.concat(this.layout.qHyperCube.qMeasureInfo)
      this.columns = this.columns.map((c, i) => {
        c.colIndex = this.columnOrder.indexOf(i)
        return c
      })
      this.columns.sort((a, b) => {
        return a.colIndex - b.colIndex
      })
      this.activeSort = this.layout.qHyperCube.qEffectiveInterColumnSortOrder[0]      
      this.getData(page => {
        this.update()
      })
    })
  }
  update () {
    if (this.layout.allowDownload === true) {
      const el = document.getElementById(this.elementId)
      if (el) {
        el.classList.add('allow-download')
      } 
      else {
        el.classList.remove('allow-download')
      }
    }
    let headHTML = '<tr>' + this.columns.map((c, i) => {
      if (c.show !== false) {
        return `
        <th ${c.width ? 'style="width: ' + c.width + '"' : ''}>
          <div class ="tableHeader">
            <div class="leftSection">
              <div
                class="tableHeaderField ${['A', 'D'].indexOf(c.qSortIndicator) !== -1 ? 'sortable-column' : ''}"
                data-index="${i}"
                data-dim-index="${i < this.layout.qHyperCube.qDimensionInfo.length ? i : -1}"
                data-exp-index="${i >= this.layout.qHyperCube.qDimensionInfo.length ? i - this.layout.qHyperCube.qDimensionInfo.length : -1}"
                data-sort="${c.qSortIndicator}"
                data-reverse="${this.activeSort === i && c.qReverseSort !== true}"
              >
                ${c.qFallbackTitle}
              </div>
            </div>
            <div class="${this.activeSort === i ? 'sortOrder' : ''} ${c.qSortIndicator === 'A' ? 'ascending' : 'descending'}"></div>
            ${c.searchable === true ? this.buildSearchIcon(c.qGroupFieldDefs[0]) : ''}
          </div>
        </th>
        `
      }
    }).join('') + '</tr>'
    const headEl = document.getElementById(`${this.elementId}_head`)
    headEl.innerHTML = headHTML
    this.appendRows(this.layout.qHyperCube.qDataPages[0])
  }
}

/* global d3 include */ 
class WebsyChart {
  constructor (elementId, options) {
    const DEFAULTS = {
      margin: { top: 3, left: 3, bottom: 3, right: 3, axisBottom: 0, axisLeft: 0, axisRight: 0 },
      orientation: 'vertical',
      colors: d3.schemeCategory10,
      transitionDuration: 650,
      curveStyle: 'curveLinear',
      lineWidth: 2,
      forceZero: true,
      fontSize: 14,
      symbolSize: 20,
      timeParseFormat: '%b/%m/%Y'
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.leftAxis = null
    this.rightAxis = null
    this.topAxis = null
    this.bottomAxis = null
    if (!elementId) {
      console.log('No element Id provided for Websy Chart')		
      return
    }
    const el = document.getElementById(this.elementId)    
    if (el) {
      el.classList.add('websy-chart')
      if (typeof d3 === 'undefined') {
        console.error('d3 library has not been loaded')
      }
      else {        
        this.svg = d3.select(el).append('svg')
        this.prep()
      }      
    }
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  set data (d) {
    this.options.data = d
    this.render()
  }
  createDomain (side) {
    let domain = []
    /* global d3 side domain:writable */ 
if (typeof this.options.data[side].min !== 'undefined' && typeof this.options.data[side].max !== 'undefined') {
  // domain = [this.options.data[side].min - (this.options.data[side].min * 0.1), this.options.data[side].max * 1.1]
  domain = [this.options.data[side].min, this.options.data[side].max]
  if (this.options.forceZero === true) {
    domain = [Math.min(0, this.options.data[side].min), this.options.data[side].max]
  }
}
if (this.options.data[side].data) {
  domain = this.options.data[side].data.map(d => d.value)  
}
if (this.options.data[side].scale === 'Time') {
  let min = this.options.data[side].data[0].value
  let max = this.options.data[side].data[this.options.data[side].data.length - 1].value
  min = this.parseX(min)
  max = this.parseX(max)
  domain = [min, max]
}

    return domain
  }
  createIdentity (size = 10) {	
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
    for (let i = 0; i < size; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }
  handleEventMouseOut (event, d) {
    console.log('mouse out', event, d)
  }
  handleEventMouseMove (event, d) {
    // console.log('mouse move', event, d, d3.pointer(event))
    let x0 = this.bottomAxis.invert(d3.pointer(event)[0])
    console.log(x0)
    // this.trackingLineLayer
    //   .select('.tracking-line')
    //   .attr('x1', xPoint)
    //   .attr('x2', xPoint)
    //   .attr('y1', 0)
    //   .attr('y2', this.plotHeight)
    //   .attr('stroke-width', 1)
    //   .attr('stroke', '#CCCCCC')
    //   .attr('stroke-opacity', 1)
  }
  prep () {
    /* global d3 */ 
this.leftAxisLayer = this.svg.append('g')
this.rightAxisLayer = this.svg.append('g')
this.bottomAxisLayer = this.svg.append('g')
this.plotArea = this.svg.append('g')
this.areaLayer = this.svg.append('g')
this.lineLayer = this.svg.append('g')
this.barLayer = this.svg.append('g')
this.symbolLayer = this.svg.append('g')
this.trackingLineLayer = this.svg.append('g')
this.trackingLineLayer.append('line').attr('class', 'tracking-line')
this.eventLayer = this.svg.append('g').append('rect')
this.eventLayer
  .on('mouseout', this.handleEventMouseOut.bind(this))
  .on('mousemove', this.handleEventMouseMove.bind(this))
this.render()

  }
  render (options) {
    /* global d3 options */ 
if (typeof options !== 'undefined') {
  this.options = Object.assign({}, this.options, options)
}
if (!this.options.data) {
  // tell the user no data has been provided
}
else {
  this.transition = d3.transition().duration(this.options.transitionDuration)
  if (this.options.data.bottom.scale && this.options.data.bottom.scale === 'Time') {
    this.parseX = d3.timeParse(this.options.timeParseFormat)
  } 
  else {
    this.parseX = function (input) {
      return input
    }
  }
  if (this.options.disableTransitions === true) {
    this.transition = d3.transition().duration(0)
  }
  // Add placeholders for the data entries that don't exist
  if (!this.options.data.left) {
    this.options.data.left = { data: [] }
  }
  if (!this.options.data.right) {
    this.options.data.right = { data: [] }
  }
  if (!this.options.data.bottom) {
    this.options.data.bottom = { data: [] }
  }  
  if (this.options.orientation === 'vertical') {
    this.leftAxisLayer.attr('class', 'y-axis')
    this.rightAxisLayer.attr('class', 'y-axis')
    this.bottomAxisLayer.attr('class', 'x-axis')
  }
  else {
    this.leftAxisLayer.attr('class', 'x-axis')
    this.rightAxisLayer.attr('class', 'x-axis')
    this.bottomAxisLayer.attr('class', 'y-axis')
  }
  const el = document.getElementById(this.elementId)
  if (el) {
    this.width = el.clientWidth
    this.height = el.clientHeight
    this.svg
      .attr('width', this.width)
      .attr('height', this.height)
    this.longestLeft = 0
    this.longestRight = 0
    this.longestBottom = 0
    if (this.options.data.bottom && this.options.data.bottom.data && typeof this.options.data.bottom.max === 'undefined') {
      this.options.data.bottom.max = this.options.data.bottom.data.reduce((a, b) => a.length > b.value.length ? a : b.value, '')
      this.options.data.bottom.min = this.options.data.bottom.data.reduce((a, b) => a.length < b.value.length ? a : b.value, this.options.data.bottom.max)      
    }
    if (this.options.data.bottom && typeof this.options.data.bottom.max !== 'undefined') {
      this.longestBottom = this.options.data.bottom.max.toString().length
      if (this.options.data.bottom.formatter) {
        this.longestBottom = this.options.data.bottom.formatter(this.options.data.bottom.max).toString().length
      } 
    }
    if (this.options.data.left && this.options.data.left.data && this.options.data.left.max === 'undefined') {
      this.options.data.left.min = d3.min(this.options.data.left.data)
      this.options.data.left.max = d3.max(this.options.data.left.data)
    }    
    if (!this.options.data.left.max && this.options.data.left.data) {
      this.options.data.left.max = this.options.data.left.data.reduce((a, b) => a.length > b.value.length ? a : b.value, '')
    }
    if (!this.options.data.left.min && this.options.data.left.data) {
      this.options.data.left.min = this.options.data.left.data.reduce((a, b) => a.length < b.value.length ? a : b.value, this.options.data.left.max)
    }
    if (this.options.data.left && typeof this.options.data.left.max !== 'undefined') {
      this.longestLeft = this.options.data.left.max.toString().length
      if (this.options.data.left.formatter) {
        this.longestLeft = this.options.data.left.formatter(this.options.data.left.max).toString().length
      } 
    } 
    if (this.options.data.right && this.options.data.right.data && this.options.data.right.max === 'undefined') {
      this.options.data.right.min = d3.min(this.options.data.right.data)
      this.options.data.right.max = d3.max(this.options.data.right.data)
    }   
    if (this.options.data.right && typeof this.options.data.right.max !== 'undefined') {
      this.longestRight = this.options.data.right.max.toString().length
      if (this.options.data.right.formatter) {
        this.longestRight = this.options.data.right.formatter(this.options.data.right.max).toString().length
      }
    }    
    // establish the space needed for the various axes    
    this.options.margin.axisLeft = this.longestLeft * ((this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize) * 0.7
    this.options.margin.axisRight = this.longestRight * ((this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize) * 0.7
    this.options.margin.axisBottom = ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) + 10
    if (this.options.data.bottom.rotate) {
      // this.options.margin.bottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)   
      this.options.margin.axisBottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) * 0.4
      // this.options.margin.bottom = this.options.margin.bottom * (1 + this.options.data.bottom.rotate / 100)
    }  
    // hide the margin if necessary
    if (this.options.axis) {
      if (this.options.axis.hideAll === true) {
        this.options.margin.axisLeft = 0
        this.options.margin.axisRight = 0
        this.options.margin.axisBottom = 0
      }
      if (this.options.axis.hideLeft === true) {
        this.options.margin.axisLeft = 0
      }
      if (this.options.axis.hideRight === true) {
        this.options.margin.axisRight = 0
      }
      if (this.options.axis.hideBottom === true) {
        this.options.margin.axisBottom = 0
      }
    }
    // Define the plot size
    this.plotWidth = this.width - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight
    this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom
    // Translate the layers
    this.leftAxisLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
    this.rightAxisLayer
      .attr('transform', `translate(${this.options.margin.left + this.plotWidth + this.options.margin.axisLeft}, ${this.options.margin.top})`)
    this.bottomAxisLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.plotHeight})`)
    this.plotArea
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
    this.areaLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
    this.lineLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
    this.barLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
    this.symbolLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
    this.trackingLineLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)         
    this.eventLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)         
    let that = this
    this.eventLayer      
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.plotWidth)
      .attr('height', this.plotHeight)
      .attr('fill-opacity', '0')
    // Configure the bottom axis
    let bottomDomain = this.createDomain('bottom')
    // if (typeof this.options.data.bottom.min !== 'undefined' && typeof this.options.data.bottom.max !== 'undefined') {
    //   bottomDomain = [this.options.data.bottom.min - (this.options.data.bottom.min * 0.1), this.options.data.bottom.max * 1.1]
    //   if (this.options.forceZero === true) {
    //     bottomDomain = [Math.min(0, this.options.data.bottom.min), this.options.data.bottom.max]
    //   }
    // }
    // if (this.options.data.bottom.data) {
    //   bottomDomain = this.options.data.bottom.data.map(d => d.value)  
    // }
    // if (this.options.data.bottom.scale === 'Time') {
    //   let min = this.options.data.bottom.data[0].value
    //   let max = this.options.data.bottom.data[this.options.data.bottom.data.length - 1].value
    //   min = this.parseX(min)
    //   max = this.parseX(max)
    //   bottomDomain = [min, max]
    // }
    this.bottomAxis = d3[`scale${this.options.data.bottom.scale || 'Band'}`]()
      .domain(bottomDomain)
      .range([0, this.plotWidth])
    if (this.bottomAxis.padding && this.options.data.bottom.padding) {
      this.bottomAxis.padding(this.options.data.bottom.padding || 0)   
    }
    if (this.options.margin.axisBottom > 0) {
      this.bottomAxisLayer.call(
        d3.axisBottom(this.bottomAxis)
          .ticks(this.options.data.bottom.ticks || 5)
          .tickFormat(d => {
            if (this.options.data.bottom.formatter) {
              d = this.options.data.bottom.formatter(d)
            }            
            if (d.toLocaleDateString) {
              return d.toLocaleDateString()
            }
            return d
          })
      )
      if (this.options.data.bottom.rotate) {
        this.bottomAxisLayer.selectAll('text')
          .attr('transform', `rotate(${this.options.data.bottom.rotate})`)
          .style('text-anchor', 'end')
      } 
    }  
    // Configure the left axis
    let leftDomain = this.createDomain('left')
    // if (typeof this.options.data.left.min !== 'undefined' && typeof this.options.data.left.max !== 'undefined') {
    //   leftDomain = [this.options.data.left.min - (this.options.data.left.min * 0.1), this.options.data.left.max * 1.1]
    //   if (this.options.forceZero === true) {
    //     leftDomain = [Math.min(0, this.options.data.left.min), this.options.data.left.max]
    //   }
    // }
    // else if (this.options.data.left.data) {
    //   leftDomain = this.options.data.left.data.map(d => d.value)  
    // }
    this.leftAxis = d3[`scale${this.options.data.left.scale || 'Linear'}`]()
      .domain(leftDomain)
      .range([this.plotHeight, 0])
    if (this.leftAxis.padding && this.options.data.left.padding) {
      this.leftAxis.padding(this.options.data.left.padding || 0)   
    }
    if (this.options.margin.axisLeft > 0) {
      this.leftAxisLayer.call(
        d3.axisLeft(this.leftAxis)
          .ticks(this.options.data.left.ticks || 5)
          .tickFormat(d => {
            if (this.options.data.left.formatter) {
              d = this.options.data.left.formatter(d)
            }            
            return d
          })
      )
    }  
    // Configure the right axis
    let rightDomain = this.createDomain('right')
    // if (typeof this.options.data.right.min !== 'undefined' && typeof this.options.data.right.max !== 'undefined') {
    //   rightDomain = [this.options.data.right.min - (this.options.data.right.min * 0.15), this.options.data.right.max * 1.15]
    //   if (this.options.forceZero === true) {
    //     rightDomain = [Math.min(0, this.options.data.right.min - (this.options.data.right.min * 0.15)), this.options.data.right.max * 1.15]
    //   }
    // }
    // else if (this.options.data.right.data) {
    //   rightDomain = this.options.data.right.data.map(d => d.value)  
    // }
    if (rightDomain.length > 0) {
      this.rightAxis = d3[`scale${this.options.data.right.scale || 'Linear'}`]()
        .domain(rightDomain)
        .range([this.plotHeight, 0])
      if (this.options.margin.axisRight > 0) {
        this.rightAxisLayer.call(
          d3.axisRight(this.rightAxis)
            .ticks(this.options.data.left.ticks || 5)
            .tickFormat(d => {
              if (this.options.data.right.formatter) {
                d = this.options.data.right.formatter(d)
              }            
              return d
            })
        )
      }
    }  
    // Draw the series data
    this.options.data.series.forEach((series, index) => {
      if (!series.key) {
        series.key = this.createIdentity()
      }
      if (!series.color) {
        series.color = this.options.colors[index % this.options.colors.length]
      }
      this[`render${series.type || 'bar'}`](series, index)
    })
  }  
}

  }
  renderarea (series, index) {
    /* global d3 series index */
const drawArea = (xAxis, yAxis, curveStyle) => {
  return d3
    .area()
    .x(d => {
      return this[xAxis](this.parseX(d.x.value))
    })
    .y0(d => {
      return this[yAxis](0)
    })
    .y1(d => {
      return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value)
    })
    .curve(d3[curveStyle || this.options.curveStyle])
}
let xAxis = 'bottomAxis'
let yAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis'
if (this.options.orienation === 'horizontal') {  
  xAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis'
  yAxis = 'bottomAxis'
}
let areas = this.areaLayer.selectAll(`.area_${series.key}`)
  .data([series.data])
// Exit
areas.exit()
  .transition(this.transition)
  .style('fill-opacity', 1e-6)
  .remove()
// Update
areas
  // .style('stroke-width', series.lineWidth || this.options.lineWidth)
  // .attr('id', `line_${series.key}`)
  // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
  // .attr('fill', series.colour)
  // .attr('stroke', 'transparent')
  .transition(this.transition)
  .attr('d', d => drawArea(xAxis, yAxis, series.curveStyle)(d))
// Enter
areas.enter().append('path')
  .attr('d', d => drawArea(xAxis, yAxis, series.curveStyle)(d))
  .attr('class', `area_${series.key}`)
  .attr('id', `area_${series.key}`)
  // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
  // .style('stroke-width', series.lineWidth || this.options.lineWidth)
  .attr('fill', series.color)
  .style('fill-opacity', 0)
  .attr('stroke', 'transparent')
  .transition(this.transition)
  .style('fill-opacity', series.opacity || 1)

  }
  renderbar (series, index) {
    /* global series index d3 */
let xAxis = 'bottomAxis'
let yAxis = 'leftAxis'
let bars = this.barLayer.selectAll(`.bar_${series.key}`).data(series.data)
if (this.options.orientation === 'horizontal') {
  xAxis = 'leftAxis'
  yAxis = 'bottomAxis'
}
let barWidth = this[xAxis].bandwidth()
function getBarHeight (d) {
  if (this.options.orientation === 'horizontal') {
    return barWidth
  }
  else {
    return this[yAxis](d.y.value)
  }
}
function getBarWidth (d) {
  if (this.options.orientation === 'horizontal') {
    return this[yAxis](d.y.value)
  }
  else {
    return barWidth
  }
}
function getBarX (d) {
  if (this.options.orientation === 'horizontal') {
    return 0
  }
  else {
    return this[xAxis](this.parseX(d.x.value))
  }
}
function getBarY (d) {
  if (this.options.orientation === 'horizontal') {
    return this[xAxis](this.parseX(d.x.value))
  }
  else {
    return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value)
  }
}
bars
  .exit()
  .transition(this.transition)
  .style('stroke-opacity', 1e-6)
  .remove()

bars
  .attr('width', getBarWidth.bind(this))
  .attr('height', getBarHeight.bind(this))
  .attr('x', getBarX.bind(this))  
  .attr('y', getBarY.bind(this))
  .transition(this.transition)  
  .attr('fill', series.color)

bars
  .enter()
  .append('rect')
  .attr('width', getBarWidth.bind(this))
  .attr('height', getBarHeight.bind(this))
  .attr('x', getBarX.bind(this))  
  .attr('y', getBarY.bind(this))
  .transition(this.transition)
  .attr('fill', series.color)
  .attr('class', d => {
    return `bar bar_${series.key}`
  })

  }
  renderline (series, index) {
    /* global series index d3 */
const drawLine = (xAxis, yAxis, curveStyle) => {
  return d3
    .line()
    .x(d => {
      return this[xAxis](this.parseX(d.x.value))
    })
    .y(d => {
      return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value)
    })
    .curve(d3[curveStyle || this.options.curveStyle])
}
let xAxis = 'bottomAxis'
let yAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis'
if (this.options.orienation === 'horizontal') {  
  xAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis'
  yAxis = 'bottomAxis'
}
let lines = this.lineLayer.selectAll(`.line_${series.key}`)
  .data([series.data])
// Exit
lines.exit()
  .transition(this.transition)
  .style('stroke-opacity', 1e-6)
  .remove()
// Update
lines
  .style('stroke-width', series.lineWidth || this.options.lineWidth)
  // .attr('id', `line_${series.key}`)
  // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
  .attr('stroke', series.color)
  .attr('fill', 'transparent')
  .transition(this.transition)
  .attr('d', d => drawLine(xAxis, yAxis, series.curveStyle)(d))
// Enter
lines.enter().append('path')
  .attr('d', d => drawLine(xAxis, yAxis, series.curveStyle)(d))
  .attr('class', `line_${series.key}`)
  .attr('id', `line_${series.key}`)
  // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
  .style('stroke-width', series.lineWidth || this.options.lineWidth)
  .attr('stroke', series.color)
  .attr('fill', 'transparent')
  .transition(this.transition)
  .style('stroke-opacity', 1)

if (series.showArea === true) {
  this.renderarea(series, index)
}
if (series.showSymbols === true) {
  this.rendersymbol(series, index)
}

  }
  rendersymbol (series, index) {
    /* global d3 series index series.key */
const drawSymbol = (size) => {
  return d3
    .symbol()
    // .type(d => {
    //   return d3.symbols[0]
    // })
    .size(size || this.options.symbolSize)
}
let xAxis = 'bottomAxis'
let yAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis'
if (this.options.orienation === 'horizontal') {  
  xAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis'
  yAxis = 'bottomAxis'
}
let symbols = this.symbolLayer.selectAll(`.symbol_${series.key}`)
  .data(series.data)
// Exit
symbols.exit()
  .transition(this.transition)
  .style('fill-opacity', 1e-6)
  .remove()
// Update
symbols
  .attr('d', d => drawSymbol(d.y.size || series.symbolSize)(d))
  .transition(this.transition)
  .attr('fill', 'white')
  .attr('stroke', series.color)
  .attr('transform', d => { return `translate(${this[xAxis](this.parseX(d.x.value))}, ${this[yAxis](d.y.value)})` })   
// Enter
symbols.enter()
  .append('path')
  .attr('d', d => drawSymbol(d.y.size || series.symbolSize)(d))
  .transition(this.transition)
  .attr('fill', 'white')
  .attr('stroke', series.color)
  .attr('class', d => { return `symbol symbol_${series.key}` })
  .attr('transform', d => {
    return `translate(${this[xAxis](this.parseX(d.x.value))}, ${this[yAxis](d.y.value)})` 
  })

  }
  resize () {
    /* global d3 */ 
const el = document.getElementById(this.elementId)
if (el) {
  this.width = el.clientWidth
  this.height = el.clientHeight
  this.svg
    .attr('width', this.width)
    .attr('height', this.height)
    // Define the plot height  
  this.plotWidth = this.width - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight
  this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom
  // establish the space needed for the various axes
  this.longestRight = 5
  this.longestBottom = 5
  this.options.margin.axisLeft = this.longestLeft * ((this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize) * 0.7
  this.options.margin.axisRight = this.longestRight * ((this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize) * 0.7
  this.options.margin.axisBottom = ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) + 10
  if (this.options.data.bottom.rotate) {
    // this.options.margin.bottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)   
    this.options.margin.axisBottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) * 0.4
    // this.options.margin.bottom = this.options.margin.bottom * (1 + this.options.data.bottom.rotate / 100)
  }  
  // hide the margin if necessary
  if (this.options.axis) {
    if (this.options.axis.hideAll === true) {
      this.options.margin.axisLeft = 0
      this.options.margin.axisRight = 0
      this.options.margin.axisBottom = 0
    }
    if (this.options.axis.hideLeft === true) {
      this.options.margin.axisLeft = 0
    }
    if (this.options.axis.hideRight === true) {
      this.options.margin.axisRight = 0
    }
    if (this.options.axis.hideBottom === true) {
      this.options.margin.axisBottom = 0
    }
  }
  // Translate the layers
  this.leftAxisLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.rightAxisLayer
    .attr('transform', `translate(${this.options.margin.left + this.plotWidth + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.bottomAxisLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.plotHeight})`)
  this.plotArea
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.areaLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.lineLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.barLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.symbolLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.trackingLineLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
}

  }
}

/* global */
class WebsyKPI {
  constructor (elementId, options) {
    const DEFAULTS = {
      tooltip: {},
      label: {},
      value: {},
      subValue: {}
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
  }
  render (options) {
    this.options = Object.assign({}, this.options, options)
    if (!this.options.label.classes) {
      this.options.label.classes = []
    }
    if (!this.options.value.classes) {
      this.options.value.classes = []
    }
    if (!this.options.subValue.classes) {
      this.options.subValue.classes = []
    }
    if (!this.options.tooltip.classes) {
      this.options.tooltip.classes = []
    }
    this.resize()
  }
  resize () {
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = `
        <div class="websy-kpi-container">
      `
      if (this.options.icon) {
        html += `
          <div class="websy-kpi-icon"><img src="${this.options.icon}"></div>   
        `
      }      
      html += `   
          <div class="websy-kpi-info">
            <div class="websy-kpi-label ${this.options.label.classes.join(' ') || ''}">
              ${this.options.label.value || ''}
      `
      if (this.options.tooltip && this.options.tooltip.value) {
        html += `
          <div class="websy-info ${this.options.tooltip.classes.join(' ') || ''}" data-info="${this.options.tooltip.value}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm48,226H216a16,16,0,0,1,0-32h28V244H228a16,16,0,0,1,0-32h32a16,16,0,0,1,16,16V332h28a16,16,0,0,1,0,32Z"/></svg>
          </div>   
        `
      }
      html += `
            </div>
            <div class="websy-kpi-value ${this.options.value.classes.join(' ') || ''}">${this.options.value.value}</div>
      `
      if (this.options.subValue) {
        html += `
          <div class="websy-kpi-sub-value ${this.options.subValue.classes.join(' ') || ''}">${this.options.subValue.value}</div>
        `
      }
      html += `                                
          </div>
        </div>
      `
      el.innerHTML = html
    }
  }  
}

/* global L */ 
class WebsyMap {
  constructor (elementId, options) {
    const DEFAULTS = {
      tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      disablePan: false,
      disableZoom: false,
      markerSize: 10,
      useClustering: false,
      maxMarkerSize: 50,
      minMarkerSize: 20
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    if (!elementId) {
      console.log('No element Id provided for Websy Map')		
      return
    }
    const mapOptions = {
      click: this.handleMapClick.bind(this)
    }
    if (this.options.disableZoom === true) {
      mapOptions.scrollWheelZoom = false
      mapOptions.zoomControl = false
    }
    if (this.options.disablePan === true) {
      mapOptions.dragging = false
    }
    const el = document.getElementById(this.elementId)    
    if (el) {
      if (typeof d3 === 'undefined') {
        console.error('d3 library has not been loaded')
      }
      if (typeof L === 'undefined') {
        console.error('Leaflet library has not been loaded')
      }
      el.addEventListener('click', this.handleClick.bind(this))
      this.map = L.map(this.elementId, mapOptions)
      this.render()
    }
  }
  handleClick (event) {

  }
  handleMapClick (event) {

  }
  render () {
    const el = document.getElementById(`${this.options.elementId}_map`)
    
    const t = L.tileLayer(this.options.tileUrl, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)
    if (this.options.geoJSON) {
      L.geoJSON(this.options.geoJSON, {
        style: feature => {
          console.log(feature)
          return {color: '#ffaa00'}
        }
      }).addTo(this.map)
    }
    this.markers = []    
    if (this.cluster) {
      this.map.removeLayer(this.cluster)
    }
    // this.cluster = L.markerClusterGroup({
    //   iconCreateFunction: cluster => {
    //     let markerSize = this.options.minMarkerSize + ((this.options.maxMarkerSize - this.options.minMarkerSize) * (cluster.getChildCount() / this.data.length))
    //     console.log(this.data.length, cluster.getChildCount(), markerSize)
    //     return L.divIcon({
    //       html: `
    //         <div
    //           class='simple-marker'
    //           style='
    //             height: ${markerSize}px;
    //             width: ${markerSize}px;
    //             margin-top: -${markerSize / 2}px;
    //             margin-left: -${markerSize / 2}px;
    //             text-align: center;
    //             line-height: ${markerSize}px;
    //           '>
    //           ${cluster.getChildCount()}
    //         </div>
    //       `
    //     })
    //   }
    // })
    this.data = [] // this.data.filter(d => d.Latitude.qNum !== 0 && d.Longitude.qNum !== 0)    
    this.data.forEach(r => {
      // console.log(r)
      if (r.Latitude.qNum !== 0 && r.Longitude.qNum !== 0) {
        const markerOptions = {}
        if (this.options.simpleMarker === true) {
          markerOptions.icon = L.divIcon({className: 'simple-marker'})
        }
        if (this.options.markerUrl) {
          markerOptions.icon = L.icon({iconUrl: this.options.markerUrl})
        }
        markerOptions.data = r
        let m = L.marker([r.Latitude.qText, r.Longitude.qText], markerOptions)
        m.on('click', this.handleMapClick.bind(this))
        if (this.options.useClustering === false) {
          m.addTo(this.map)
        }
        this.markers.push(m)
        if (this.options.useClustering === true) {
          this.cluster.addLayer(m)
        }
      }
    })
    if (this.data.length > 0) {            
      el.classList.remove('hidden')
      if (this.options.useClustering === true) {
        this.map.addLayer(this.cluster)
      }
      const g = L.featureGroup(this.markers)
      this.map.fitBounds(g.getBounds())
      this.map.invalidateSize()
    }
    else if (this.options.center) {
      this.map.setView(this.options.center, this.options.zoom || null)
    }
  }
}


const WebsyDesigns = {
  WebsyPopupDialog,
  WebsyLoadingDialog,
  WebsyNavigationMenu,
  WebsyForm,
  WebsyDatePicker,
  WebsyDropdown,
  WebsyResultList,
  WebsyPubSub,
  WebsyTable,
  WebsyChart,
  WebsyMap,
  WebsyKPI,
  WebsyPDFButton,
  PDFButton: WebsyPDFButton,
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
