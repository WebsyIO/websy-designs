/* global
  include
  WebsyPopupDialog 
  WebsyLoadingDialog 
  WebsyNavigationMenu 
  WebsyPubSub
  WebsyForm
  WebsyDatePicker
  WebsyDragDrop
  WebsyDropdown
  WebsyRouter
  WebsyResultList
  WebsyTable
  WebsyTable2
  WebsyTable3
  WebsyChart
  WebsyChartTooltip
  WebsyLegend
  WebsyMap
  WebsyKPI
  WebsyIcons
  WebsyPDFButton
  Switch
  WebsyTemplate
  APIService
  ButtonGroup
  WebsyUtils
  Pager
  ResponsiveText
*/ 
import WebsyDesignsQlikPlugins from '@websy/websy-designs-qlik-plugin/dist/websy-designs-qlik-plugin-es6'
/* global XMLHttpRequest fetch ENV */
class APIService {
  constructor (baseUrl = '', options = {}) {
    this.baseUrl = baseUrl    
    this.options = Object.assign({}, {
      fieldValueSeparator: ':'
    }, options)
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
      query.push(`id${this.options.fieldValueSeparator}${id}`)
    }    
    return `${this.baseUrl}/${entity}${query.length > 0 ? `${entity.indexOf('?') === -1 ? '?' : '&'}where=${query.join(';')}` : ''}`
  }
  delete (entity, id) {
    const url = this.buildUrl(entity, id)
    return this.run('DELETE', url)
  }
  get (entity, id, query, offset, limit) {
    let url = this.buildUrl(entity, id, query)
    if (offset) {
      if (url.indexOf('?') !== -1) {
        url += `&offset=${offset}`
      }
      else {
        url += `?offset=${offset}`
      }
    }
    if (limit) {
      if (url.indexOf('?') !== -1) {
        url += `&limit=${limit}`
      }
      else {
        url += `?limit=${limit}`
      }
    }
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
      xhr.onload = () => {
        if (xhr.status === 401) { // || xhr.status === 403) {
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

/* global */
class ButtonGroup {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      style: 'button',
      subscribers: {},
      activeItem: -1,
      tag: 'div',
      allowNone: false
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
        if (this.options.activeItem && this.options.activeItem !== -1) {
          activeClass = i === this.options.activeItem ? 'active' : 'inactive'
        }
        return `
          <${this.options.tag} ${(t.attributes || []).join(' ')} data-id="${t.id || t.label}" data-index="${i}" class="websy-button-group-item ${(t.classes || []).join(' ')} ${this.options.style}-style ${activeClass}">${t.label}</${this.options.tag}>
        `
      }).join('')
    }
  }
}

class WebsyDatePicker {
  constructor (elementId, options) {
    this.oneDay = 1000 * 60 * 60 * 24
    this.currentselection = []
    this.validDates = []
    this.validYears = []
    this.validHours = []
    this.customRangeSelected = true    
    this.shiftPressed = false
    const DEFAULTS = {
      defaultRange: 0,
      dateFormat: '%_m/%_d/%Y',
      allowClear: true,
      hideRanges: false,
      arrowIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z"/></svg>`,
      clearIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,
      confirmIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><polyline points="416 128 192 384 96 288" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,      
      minAllowedDate: this.floorDate(new Date(new Date((new Date().setFullYear(new Date().getFullYear() - 1))).setDate(1))),
      maxAllowedDate: this.floorDate(new Date((new Date()))),
      minAllowedYear: 1970,
      maxAllowedYear: new Date().getFullYear(),
      daysOfWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      monthsOfYear: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      hours: new Array(24).fill(0).map((d, i) => ({text: (i < 10 ? '0' : '') + i + ':00', num: (1 / 24 * i)})),
      mode: 'date',
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
      ranges: []
    }
    DEFAULTS.ranges = {
      date: [
        {
          label: 'All Dates',
          range: [DEFAULTS.minAllowedDate, DEFAULTS.maxAllowedDate]
        },
        {
          label: 'Today',
          range: [this.floorDate(new Date())]
        },
        {
          label: 'Yesterday',
          range: [this.floorDate(new Date().setDate(new Date().getDate() - 1))]
        },
        {
          label: 'Last 7 Days',
          range: [this.floorDate(new Date().setDate(new Date().getDate() - 6)), this.floorDate(new Date())]
        },
        {
          label: 'This Month',
          range: [this.floorDate(new Date().setDate(1)), this.floorDate(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() + 1) - this.oneDay)]
        },
        {
          label: 'Last Month',
          range: [this.floorDate(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() - 1)), this.floorDate(new Date(new Date().setDate(1)).setMonth(new Date().getMonth()) - this.oneDay)]
        },
        {
          label: 'This Year',
          range: [this.floorDate(new Date(`1/1/${new Date().getFullYear()}`)), this.floorDate(new Date(`12/31/${new Date().getFullYear()}`))]
        },
        {
          label: 'Last Year',
          range: [this.floorDate(new Date(`1/1/${new Date().getFullYear() - 1}`)), this.floorDate(new Date(`12/31/${new Date().getFullYear() - 1}`))]
        }
      ],
      year: [
        {
          label: 'All Years',
          range: [DEFAULTS.minAllowedYear, DEFAULTS.maxAllowedYear]
        },
        {
          label: 'Last 5 Years',
          range: [new Date().getFullYear() - 4, DEFAULTS.maxAllowedYear]
        },
        {
          label: 'Last 10 Years',
          range: [new Date().getFullYear() - 9, DEFAULTS.maxAllowedYear]
        }
      ],
      monthyear: [
        {
          label: 'All Month Years',
          range: [DEFAULTS.minAllowedDate, DEFAULTS.maxAllowedDate]
        },
        {
          label: 'Last 12 Months',          
          range: [this.floorDate(new Date(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() - 12))), this.floorDate(new Date(new Date().setDate(1)))]
        },
        {
          label: 'Last 18 Months',
          range: [this.floorDate(new Date(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() - 18))), this.floorDate(new Date(new Date().setDate(1)))]
        },
        {
          label: 'Last 24 Months',
          range: [this.floorDate(new Date(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() - 24))), this.floorDate(new Date(new Date().setDate(1)))]
        }
      ],
      hour: [
        {
          label: 'All Hours',
          range: ['00:00', '23:00']
        }
      ]
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.selectedRange = this.options.defaultRange || 0
    this.selectedRangeDates = [...this.options.ranges[this.options.mode][this.options.defaultRange || 0].range]
    this.priorSelectedDates = null
    this.priorselection = null
    this.priorCustomRangeSelected = null
    if (!elementId) {
      console.log('No element Id provided')
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      this.elementId = elementId
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('mousedown', this.handleMouseDown.bind(this))
      el.addEventListener('mouseover', this.handleMouseOver.bind(this))
      el.addEventListener('mouseup', this.handleMouseUp.bind(this))
      document.addEventListener('keydown', this.handleKeyDown.bind(this))
      document.addEventListener('keyup', this.handleKeyUp.bind(this))
      let html = `
        <div class='websy-date-picker-container ${this.options.mode}'>
          <span class='websy-dropdown-header-label'>${this.options.label || 'Date'}</span>
          <div id="${this.elementId}_header" class='websy-date-picker-header ${this.options.allowClear === true ? 'allow-clear' : ''}'>
            <span id='${this.elementId}_selectedRange'>${this.options.ranges[this.options.mode][this.selectedRange].label}</span>
            ${this.options.arrowIcon}
      `
      if (this.options.allowClear === true) {
        html += `<div class='clear-selection'>${this.options.clearIcon}</div>`
      }
      html += `
          </div>
          <div id='${this.elementId}_mask' class='websy-date-picker-mask'></div>
          <div id='${this.elementId}_content' class='websy-date-picker-content ${this.options.hideRanges === true ? 'hide-ranges' : ''}'>
            <div class='websy-date-picker-ranges' >
              <ul id='${this.elementId}_rangelist'>
                ${this.renderRanges()}
              </ul>
            </div><!--
            --><div id='${this.elementId}_datelist' class='websy-date-picker-custom'>${this.renderDates()}</div>
            <div class='websy-dp-button-container'>
              <span class="dp-footnote">Click and drag or hold Shift and click to select a range of values</span>
              <button class='${this.options.cancelBtnClasses || ''} websy-btn websy-dp-cancel'>
                ${this.options.clearIcon}
              </button>
              <button class='${this.options.confirmBtnClasses || ''} websy-btn websy-dp-confirm'>
                ${this.options.confirmIcon}
              </button>
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
  close (confirm, isRange = false) {
    const maskEl = document.getElementById(`${this.elementId}_mask`)
    const contentEl = document.getElementById(`${this.elementId}_content`)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.style.zIndex = ''
    }
    maskEl.classList.remove('active')
    contentEl.classList.remove('active')
    if (confirm === true) {
      if (this.options.onChange) {        
        if (this.customRangeSelected === true) {     
          if (this.options.mode === 'hour') {
            let hoursOut = []
            for (let i = this.selectedRangeDates[0]; i < this.selectedRangeDates[1] + 1; i++) {
              hoursOut.push(this.options.hours[i])
            }            
            this.options.onChange(hoursOut, true, this.selectedRange)        
          }     
          else {
            this.options.onChange(this.selectedRangeDates, true, this.selectedRange)        
          }          
        }
        else {
          if (this.options.mode === 'hour') {
            let hoursOut = this.currentselection.map(h => this.options.hours[h])
            this.options.onChange(hoursOut, true, this.selectedRange)        
          }     
          else {
            this.options.onChange(this.currentselection, isRange, this.selectedRange)
          }
        }
      }
      this.priorSelectedDates = [...this.selectedRangeDates]
      this.priorSelectedRange = this.selectedRange
      this.priorselection = [...this.currentselection]
      this.priorCustomRangeSelected = this.customRangeSelected
      this.updateRange()
    }
    else {
      this.selectedRangeDates = [...(this.priorSelectedDates || [])]
      this.selectedRange = this.priorSelectedRange
      this.customRangeSelected = this.priorCustomRangeSelected
      this.currentselection = [...(this.priorselection || [])]
      this.highlightRange()
    }
  }
  floorDate (d) {
    if (typeof d === 'number') {
      d = new Date(d)
    }
    // d.setTime(d.getTime() + d.getTimezoneOffset() * 60000)
    return new Date(d.setUTCHours(12, 0, 0, 0))
  }
  handleClick (event) {
    if (event.target.classList.contains('websy-date-picker-header')) {
      this.open()
    }
    else if (event.target.classList.contains('websy-date-picker-mask')) {
      this.close()
    }
    else if (event.target.classList.contains('websy-date-picker-range')) {
      if (event.target.classList.contains('websy-disabled-range')) {
        return
      }
      const index = event.target.getAttribute('data-index')
      this.selectRange(index)
      this.updateRange(index)
    }
    else if (event.target.classList.contains('websy-dp-date')) {
      // 
    }
    else if (event.target.classList.contains('websy-dp-confirm')) {
      this.close(true)
    }
    else if (event.target.classList.contains('websy-dp-cancel')) {
      this.close()
    }
    else if (event.target.classList.contains('clear-selection')) {
      this.currentselection = []
      this.selectedRangeDates = []
      this.selectRange(0, false)
      if (this.options.onClear) {
        this.options.onClear()
      }
      // this.updateRange(0)
    }
  }
  handleKeyDown (event) {    
    if (event.key === 'Shift') {
      this.dragging = true
      this.shiftPressed = true
    }
  }
  handleKeyUp (event) {
    this.dragging = false
    this.shiftPressed = false
  }
  handleMouseDown (event) {    
    if (this.shiftPressed === true && this.currentselection.length > 0) {
      this.mouseDownId = this.currentselection[this.currentselection.length - 1]
      let dateId = event.target.getAttribute('data-id')
      this.selectDate(+dateId)
    }
    else {
      this.mouseDown = true
      this.dragging = false       
      if (event.target.classList.contains('websy-dp-date')) {
        if (event.target.classList.contains('websy-disabled-date')) {
          return
        }
        if (this.customRangeSelected === true) {
          this.currentselection = []
          this.customRangeSelected = false 
        }       
        this.mouseDownId = +event.target.getAttribute('data-id')
        this.selectDate(this.mouseDownId)
      }
    }    
  }
  handleMouseOver (event) {
    if (this.mouseDown === true) {
      if (event.target.classList.contains('websy-dp-date')) {
        if (event.target.classList.contains('websy-disabled-date')) {
          return
        }
        let dateId = +event.target.getAttribute('data-id')
        if (dateId !== this.mouseDownId) {
          this.dragging = true
          this.selectDate(dateId)
        }
      }
    }
  }
  handleMouseUp (event) {    
    this.mouseDown = false
    this.dragging = false
    this.mouseDownId = null    
  }
  highlightRange () {
    const el = document.getElementById(`${this.elementId}_dateList`)
    if (el) {
      const dateEls = el.querySelectorAll('.websy-dp-date')
      for (let i = 0; i < dateEls.length; i++) {      
        dateEls[i].classList.remove('selected')
        dateEls[i].classList.remove('first')
        dateEls[i].classList.remove('last')
      }
    }    
    if (this.selectedRange === 0) {
      return
    }
    if (this.customRangeSelected === true) {
      if (this.isContinuousRange || this.mouseDown) {
        let diff
        if (this.options.mode === 'date') {
          diff = Math.floor((this.selectedRangeDates[this.selectedRangeDates.length - 1].getTime() - this.selectedRangeDates[0].getTime()) / this.oneDay)
          // if (this.selectedRangeDates[0].getMonth() !== this.selectedRangeDates[this.selectedRangeDates.length - 1].getMonth()) {
          //   diff += 1
          // }
        }  
        else if (this.options.mode === 'year') {
          diff = this.selectedRangeDates[this.selectedRangeDates.length - 1] - this.selectedRangeDates[0]
          if (this.selectedRangeDates[this.selectedRangeDates.length - 1] !== this.selectedRangeDates[0]) {
            // diff += 1
          }
        }  
        else if (this.options.mode === 'monthyear') {
          let yearDiff = (this.selectedRangeDates[this.selectedRangeDates.length - 1].getFullYear() - this.selectedRangeDates[0].getFullYear()) * 12
          diff = Math.floor((this.selectedRangeDates[this.selectedRangeDates.length - 1].getMonth() - this.selectedRangeDates[0].getMonth())) + yearDiff        
        }
        else if (this.options.mode === 'hour') {
          diff = this.selectedRangeDates[this.selectedRangeDates.length - 1] - this.selectedRangeDates[0]
        }  
        for (let i = 0; i < diff + 1; i++) {
          let d
          let rangeStart
          let rangeEnd
          if (this.options.mode === 'date') {          
            d = this.floorDate(new Date(this.selectedRangeDates[0].getTime() + (i * this.oneDay)))          
            // d.setUTCHours(12, 0, 0, 0)
            d = d.getTime()
            // console.log('highlighting', this.selectedRangeDates[0].getTime(), d)
            rangeStart = this.selectedRangeDates[0].getTime()
            rangeEnd = this.selectedRangeDates[this.selectedRangeDates.length - 1].getTime()
          }      
          else if (this.options.mode === 'year') {
            d = this.selectedRangeDates[0] + i
            rangeStart = this.selectedRangeDates[0]
            rangeEnd = this.selectedRangeDates[this.selectedRangeDates.length - 1]
          }
          else if (this.options.mode === 'monthyear') {          
            d = this.floorDate(new Date(this.selectedRangeDates[0].getTime()).setMonth(this.selectedRangeDates[0].getMonth() + i))          
            d = d.getTime()
            console.log('highlighting', this.selectedRangeDates[0].getTime(), d)
            rangeStart = this.selectedRangeDates[0].getTime()
            rangeEnd = this.selectedRangeDates[this.selectedRangeDates.length - 1].getTime()
          }
          else if (this.options.mode === 'hour') {
            d = this.selectedRangeDates[0] + i
            rangeStart = this.selectedRangeDates[0]
            rangeEnd = this.selectedRangeDates[this.selectedRangeDates.length - 1]
          }
          let dateEl 
          if (this.options.mode === 'date') {
            dateEl = document.getElementById(`${this.elementId}_${d}_date`)
          }
          else if (this.options.mode === 'year') {
            dateEl = document.getElementById(`${this.elementId}_${d}_year`)
          }
          else if (this.options.mode === 'monthyear') {          
            dateEl = document.getElementById(`${this.elementId}_${d}_monthyear`)
          }
          else if (this.options.mode === 'hour') {
            dateEl = document.getElementById(`${this.elementId}_${d}_hour`)
          }      
          if (dateEl) {
            dateEl.classList.add('selected')
            if (d === rangeStart) {
              dateEl.classList.add(`${this.options.sortDirection === 'desc' ? 'last' : 'first'}`)
            }
            if (d === rangeEnd) {
              dateEl.classList.add(`${this.options.sortDirection === 'desc' ? 'first' : 'last'}`)
            }
          }
        }
      }         
      else { 
        this.selectedRangeDates.forEach(dIn => {
          let d   
          let suffix = '_date'
          if (this.options.mode === 'date') { 
            d = this.floorDate(new Date(dIn.getTime()))  
            d = d.getTime()        
          }      
          else if (this.options.mode === 'year') {
            d = dIn
            suffix = '_year'
          }
          else if (this.options.mode === 'monthyear') {
            d = this.floorDate(new Date(dIn.getTime()).setMonth(dIn.getMonth()))          
            d = d.getTime()
            suffix = '_monthyear'
          }
          else if (this.options.mode === 'hour') {
            d = dIn
            suffix = '_hour'
          }
          const dateEl = document.getElementById(`${this.elementId}_${d}${suffix}`)          
          if (dateEl) {
            dateEl.classList.add('selected', 'first', 'last')
          }
        })            
      }
    }
    else {      
      this.currentselection.forEach(d => {
        let dateEl
        if (this.options.mode === 'date') {
          dateEl = document.getElementById(`${this.elementId}_${d}_date`)
        }
        else if (this.options.mode === 'year') {
          dateEl = document.getElementById(`${this.elementId}_${d}_year`)
        }
        else if (this.options.mode === 'monthyear') {
          dateEl = document.getElementById(`${this.elementId}_${d}_monthyear`)
        }
        else if (this.options.mode === 'hour') {
          dateEl = document.getElementById(`${this.elementId}_${d}_hour`)
        }
        if (dateEl) {
          dateEl.classList.add('selected')
          dateEl.classList.add('first')
          dateEl.classList.add('last')
        }        
      })
    }
  }
  open (options, override = false) {
    const maskEl = document.getElementById(`${this.elementId}_mask`)
    const contentEl = document.getElementById(`${this.elementId}_content`)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.style.zIndex = 999
    }
    maskEl.classList.add('active')
    contentEl.classList.add('active')
    this.priorSelectedDates = [...this.selectedRangeDates]
    this.priorSelectedRange = this.selectedRange
    this.priorselection = [...this.currentselection]
    this.priorCustomRangeSelected = this.customRangeSelected
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
    const rangeEl = document.getElementById(`${this.elementId}_rangelist`)
    if (rangeEl && disabledDates) {
      rangeEl.innerHTML = this.renderRanges()
    }
    this.highlightRange()
  }
  renderDates (disabledDates) {
    let disabled = []
    this.validDates = []
    this.validYears = []
    this.validHours = []
    this.monthYears = {}
    this.monthYearMonths = []
    if (disabledDates) {
      disabled = disabledDates.map(d => {
        if (this.options.mode === 'date') {
          return d.getTime() 
        }        
        else if (this.options.mode === 'year') {
          return d
        } 
        else if (this.options.mode === 'monthyear') {
          // 
        }
        else if (this.options.mode === 'hour') {
          return d
        }
        return d.getTime()
      })
    }        
    // first disabled all of the ranges
    this.options.ranges[this.options.mode].forEach(r => (r.disabled = true))    
    let diff
    if (this.options.mode === 'date') {
      diff = Math.ceil((this.options.maxAllowedDate.getTime() - this.options.minAllowedDate.getTime()) / this.oneDay) + 1 
    }    
    else if (this.options.mode === 'year') {
      diff = (this.options.maxAllowedYear - this.options.minAllowedYear) + 1
    }
    else if (this.options.mode === 'monthyear') {
      diff = Math.ceil((this.options.maxAllowedDate.getTime() - this.options.minAllowedDate.getTime()) / this.oneDay) + 1 
    }
    else if (this.options.mode === 'hour') {
      diff = 24 
    }
    let months = {}
    let yearList = []
    for (let i = 0; i < diff; i++) {
      if (this.options.mode === 'date' || this.options.mode === 'monthyear') {
        let d = this.floorDate(new Date(this.options.minAllowedDate.getTime() + (i * this.oneDay)))
        let monthYear = `${this.options.monthMap[d.getMonth()]} ${d.getFullYear()}`
        if (!months[monthYear]) {
          months[monthYear] = []
        }
        if (!this.monthYears[d.getFullYear()]) {
          this.monthYears[d.getFullYear()] = []
        }
        if (this.monthYearMonths.indexOf(`${d.getMonth()}-${d.getFullYear()}`) === -1) {
          this.monthYearMonths.push(`${d.getMonth()}-${d.getFullYear()}`)
          let firstOfMonth = new Date(new Date(d).setDate(1))
          this.monthYears[d.getFullYear()].push({
            date: firstOfMonth,
            month: this.options.monthMap[d.getMonth()],
            monthNum: d.getMonth(),
            year: d.getFullYear(),
            id: firstOfMonth.getTime()
          })
        }
        if (disabled.indexOf(d.getTime()) === -1) {
          this.validDates.push(d.getTime())
        }
        months[monthYear].push({date: d, dayOfMonth: d.getDate(), dayOfWeek: d.getDay(), id: d.getTime(), disabled: disabled.indexOf(d.getTime()) !== -1}) 
      }
      else if (this.options.mode === 'year') {              
        let d = this.options.minAllowedYear + i
        yearList.push({year: d, id: d, disabled: disabled.indexOf(d) !== -1})        
        if (disabled.indexOf(d) === -1) {
          this.validYears.push(d)
        }
      }      
      else if (this.options.mode === 'hour') {
        //
      }      
    }
    if (this.options.mode === 'hour') {
      this.options.hours.forEach(h => {
        if (disabled.indexOf(h.text) === -1) {
          this.validHours.push(h)
        }
      })      
    }    
    // check each range to see if it can be enabled
    for (let i = 0; i < this.options.ranges[this.options.mode].length; i++) {
      const r = this.options.ranges[this.options.mode][i]
      if (this.options.mode === 'date' || this.options.mode === 'monthyear') {
        // check the first date
        if (this.validDates.indexOf(r.range[0].getTime()) !== -1) {
          r.disabled = false        
        }
        else if (r.range[1]) {
          // check the last date
          if (this.validDates.indexOf(r.range[1].getTime()) !== -1) {
            r.disabled = false
          }
          else {
            // check the full range until a match is found
            for (let i = r.range[0].getTime(); i <= r.range[1].getTime(); i += this.oneDay) {
              let testDate = this.floorDate(new Date(i))            
              if (this.validDates.indexOf(testDate.getTime()) !== -1) {
                r.disabled = false
                break
              }          
            }
          }                        
        }  
      }
      else if (this.options.mode === 'year') {
        if (this.validYears.indexOf(r.range[0]) !== -1) {
          r.disabled = false
        }
        else if (r.range[1]) {
          if (this.validYears.indexOf(r.range[1]) !== -1) {
            r.disabled = false
          } 
          else {
            // check the full range until a match is found
            for (let i = r.range[0]; i <= r.range[1]; i++) {                          
              if (this.validYears.indexOf(r.range[0] + i) !== -1) {
                r.disabled = false
                break
              }          
            }
          }
        }
      }
      else if (this.options.mode === 'monthyear') {
        // 
      }
      else if (this.options.mode === 'hour') {
        if (this.validDates.indexOf(r.range[0]) !== -1) {
          r.disabled = false
        }
        else if (r.range[1]) {
          if (this.validDates.indexOf(r.range[1]) !== -1) {
            r.disabled = false
          } 
          else {
            // check the full range until a match is found
            for (let i = r.range[0]; i <= r.range[1]; i++) {                          
              if (this.validDates.indexOf(r.range[0] + i) !== -1) {
                r.disabled = false
                break
              }          
            }
          }
        }
      }          
    }    
    let html = ''
    if (this.options.mode === 'date') {
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
        html += months[key].map(d => `<li id='${this.elementId}_${d.id}_date' data-id='${d.id}' class='websy-dp-date ${d.disabled === true ? 'websy-disabled-date' : ''}'>${d.dayOfMonth}</li>`).join('')
        html += `
            </ul>
          </div>
        `
      }
      html += '</div>' 
    } 
    else if (this.options.mode === 'year') {
      if (this.options.sortDirection === 'desc') {
        yearList.reverse()
      }
      html += `<div id='${this.elementId}_dateList' class='websy-dp-date-list'><ul>`
      html += yearList.map(d => `<li id='${this.elementId}_${d.id}_year' data-id='${d.id}' class='websy-dp-date websy-dp-year ${d.disabled === true ? 'websy-disabled-date' : ''}'>${d.year}</li>`).join('')
      html += `</ul></div>`
    }
    else if (this.options.mode === 'monthyear') {
      html += `<div id='${this.elementId}_dateList' class='websy-dp-monthyear-container'>`
      for (const year in this.monthYears) {
        html += `
          <ul>
            <li>${year}</li>
        `
        if (this.monthYears[year][0].monthNum > 0) {
          let paddedMonths = []
          for (let i = 0; i < this.monthYears[year][0].monthNum; i++) {
            paddedMonths.push(`<li>&nbsp;</li>`)          
          }
          html += paddedMonths.join('')
        }
        html += this.monthYears[year].map(d => `<li id='${this.elementId}_${d.id}_monthyear' data-id='${d.id}' data-year='${d.year}' class='websy-dp-date websy-dp-monthyear'>${d.month}</li>`).join('')        
        html += `</ul>`
      }
      html += `</div>`
    }
    else if (this.options.mode === 'hour') {
      html += `<div id='${this.elementId}_dateList' class='websy-dp-date-list'><ul>`
      html += this.options.hours.map(h => `<li id='${this.elementId}_${+h.text.split(':')[0]}_hour' data-id='${+h.text.split(':')[0]}' data-hour='${h.text}' class='websy-dp-date websy-dp-hour'>${h.text}</li>`).join('')
      html += `</ul></div>`
    }   
    return html
  }
  renderRanges () {
    return this.options.ranges[this.options.mode].map((r, i) => `
      <li data-index='${i}' class='websy-date-picker-range ${i === this.selectedRange ? 'active' : ''} ${r.disabled === true ? 'websy-disabled-range' : ''}'>${r.label}</li>
    `).join('') + `<li data-index='-1' class='websy-date-picker-range ${this.selectedRange === -1 ? 'active' : ''}'>Custom</li>`
  }
  scrollRangeIntoView () {    
    if (this.selectedRangeDates[0]) {
      let el
      if (this.options.mode === 'date') {
        el = document.getElementById(`${this.elementId}_${this.selectedRangeDates[0].getTime()}_date`) 
      }      
      else if (this.options.mode === 'year') {
        if (this.options.sortDirection === 'desc') {
          el = document.getElementById(`${this.elementId}_${this.selectedRangeDates[this.selectedRangeDates.length - 1]}_year`) 
        }
        else {
          el = document.getElementById(`${this.elementId}_${this.selectedRangeDates[0]}_year`) 
        }        
      }
      else if (this.options.mode === 'monthyear') {
        // 
      }
      else if (this.options.mode === 'hour') {
        // 
      }
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
      if (this.dragging === true) {
        this.currentselection = [this.mouseDownId]      
        if (timestamp > this.currentselection[0]) {
          this.currentselection.push(timestamp)
        }
        else {
          this.currentselection.splice(0, 0, timestamp)
        } 
        this.customRangeSelected = true        
      }
      else {
        let index = this.currentselection.indexOf(timestamp)
        if (index !== -1) {
          this.currentselection.splice(index, 1) 
        }
        else {
          this.currentselection.push(timestamp)
        }        
        this.currentselection.sort((a, b) => a - b)
        this.customRangeSelected = false
      }      
    }
    if (this.options.mode === 'date' || this.options.mode === 'monthyear') {
      this.selectedRangeDates = [new Date(this.currentselection[0]), new Date(this.currentselection[1] || this.currentselection[0])]      
    }    
    else if (this.options.mode === 'year') {
      this.selectedRangeDates = [this.currentselection[0], this.currentselection[1] || this.currentselection[0]]
    }
    else if (this.options.mode === 'monthyear') {
      // 
    }
    else if (this.options.mode === 'hour') {
      this.selectedRangeDates = [this.currentselection[0], this.currentselection[1] || this.currentselection[0]]
    }
    // if (this.currentselection.length === 2) {
    //   this.currentselection = [] 
    // }    
    this.selectedRange = -1
    this.highlightRange()
  }
  selectRange (index, confirm = true) {
    if (this.options.ranges[this.options.mode][index]) {
      this.selectedRangeDates = [...this.options.ranges[this.options.mode][index].range]
      this.currentselection = []
      // this.currentselection = this.options.ranges[this.options.mode][index].range.map(d => {
      //   if (this.options.mode === 'date' || this.options.mode === 'monthyear') {
      //     return d.getTime()
      //   }
      //   else {
      //     return d
      //   }
      // })
      this.selectedRange = +index
      this.highlightRange()
      this.updateRange()
      if (confirm === true) {
        this.close(confirm, true)
      }            
    }
  }
  selectCustomRange (rangeInput) {
    this.selectedRange = -1
    this.isContinuousRange = true
    // if (rangeInput.length === 1) {
    //   this.selectedRangeDates = [...rangeInput]
    //   this.customRangeSelected = true
    // }
    // else if (rangeInput.length === 2) {      
    //   this.selectedRangeDates = [...rangeInput]
    //   this.customRangeSelected = true
    // }
    this.selectedRangeDates = [...rangeInput]
    this.customRangeSelected = true
    rangeInput.forEach((r, i) => {
      if (i > 0) {
        if (this.options.mode === 'date' || this.options.mode === 'monthyear') {          
          if ((r.getTime() / this.oneDay) - (rangeInput[i - 1] / this.oneDay) > 1) {
            this.isContinuousRange = false
          }          
        }
        else if (this.options.mode === 'hour' || this.options.mode === 'year') {
          if (r - rangeInput[i - 1] > 1) {
            this.isContinuousRange = false
          }
        } 
      }      
    })   
    if (rangeInput.length > 2 && this.isContinuousRange === true) {
      this.selectedRangeDates = [rangeInput[0], rangeInput[rangeInput.length - 1]]
      this.customRangeSelected = true
    } 
    if (this.isContinuousRange === false) {
      this.currentselection = []
    }          
    // check if the custom range matches a configured range
    for (let i = 0; i < this.options.ranges[this.options.mode].length; i++) {
      if (this.options.ranges[this.options.mode][i].range.length === 1) {
        let a = this.options.ranges[this.options.mode][i].range[0]
        let b = rangeInput[0]        
        if (this.options.mode === 'date') {
          a = a.getTime()
          b = b.getTime()          
        }
        if (a === b) {
          this.selectedRange = i
          this.customRangeSelected = false
          break
        }
      }
      else if (this.options.ranges[this.options.mode][i].range.length === 2) {
        let a = this.options.ranges[this.options.mode][i].range[0]
        let b = rangeInput[0]
        let c = this.options.ranges[this.options.mode][i].range[1]
        let d = rangeInput[rangeInput.length - 1]
        if (this.options.mode === 'date') {
          a = a.getTime()
          b = b.getTime()
          c = c.getTime()
          d = d.getTime()
        }
        if (a === b && c === d) {
          this.selectedRange = i
          this.customRangeSelected = false
          break
        }
      }      
    }
    this.highlightRange()
    this.updateRange()
  }
  setDateBounds (range) {
    if (['All Dates', 'All Years', 'All'].indexOf(this.options.ranges[this.options.mode][0].label) !== -1) {
      this.options.ranges[this.options.mode][0].range = [range[0], range[1] || range[0]]
    }
    if (this.options.mode === 'date') {
      this.options.minAllowedDate = range[0]
      this.options.maxAllowedDate = range[1] || range[0] 
    } 
    else if (this.options.mode === 'year') {
      this.options.minAllowedYear = range[0]
      this.options.maxAllowedYear = range[1] || range[0] 
    }
    else if (this.options.mode === 'monthyear') {
      this.options.minAllowedDate = range[0]
      this.options.maxAllowedDate = range[1] || range[0] 
    }
    else if (this.options.mode === 'hour') {
      this.options.minAllowedHour = range[0]
      this.options.maxAllowedHour = range[1] || range[0] 
    }   
  }
  updateRange () {    
    let range
    if (this.selectedRange === -1) {
      const list = (this.currentselection.length > 0 ? this.currentselection : this.selectedRangeDates).map(d => {
        if (this.options.mode === 'date') {      
          if (!d.toLocaleDateString) {
            d = new Date(d)
          }  
          return d.toLocaleDateString()
        }
        else if (this.options.mode === 'year') {
          return d
        }
        else if (this.options.mode === 'monthyear') {
          if (!d.getMonth) {
            d = new Date(d)
          }
          return `${this.options.monthMap[d.getMonth()]} ${d.getFullYear()}`
        }
        else if (this.options.mode === 'hour') {
          return d
        }
      })
      let start = list[0]
      let end = ''
      if (this.customRangeSelected === true && this.isContinuousRange === true) {        
        end = ` - ${list[list.length - 1]}`
        if (this.options.mode === 'hour') {
          start = this.options.hours[start].text
          end = `${this.customRangeSelected === true ? ' - ' : ''}${this.options.hours[list[list.length - 1]].text}`
        }
      }
      else {
        if (list.length > 1) {
          start = `${list.length} selected` 
        }
        else {
          if (this.options.mode === 'hour') {
            start = this.options.hours[start].text            
          }
        }        
      }      
      range = { label: `${start}${end}` }       
    }
    else {
      range = this.options.ranges[this.options.mode][this.selectedRange]
    }    
    const el = document.getElementById(this.elementId)
    const labelEl = document.getElementById(`${this.elementId}_selectedRange`)
    if (el) {
      const rangeEls = el.querySelectorAll(`.websy-date-picker-range`)
      for (let i = 0; i < rangeEls.length; i++) {
        rangeEls[i].classList.remove('active')
        if (i === this.selectedRange) {
          rangeEls[i].classList.add('active')
        }
      }
    }    
    if (labelEl) {
      labelEl.innerHTML = range.label      
    }
    const headerEl = document.getElementById(`${this.elementId}_header`)
    if (headerEl) {
      if (this.selectedRange === 0) {
        headerEl.classList.remove('range-selected')
      }
      else {
        headerEl.classList.add('range-selected')
      }
    }
  }
}

Date.prototype.floor = function () {
  return new Date(`${this.getMonth() + 1}/${this.getDate()}/${this.getFullYear()}`)
}

/* global WebsyDesigns GlobalPubSub */ 
class WebsyDragDrop {
  constructor (elementId, options) {
    const DEFAULTS = {
      items: [],
      orientation: 'horizontal',
      dropPlaceholder: 'Drop item here',
      accepts: 'application/wd-item'
    }
    this.busy = false
    this.options = Object.assign({}, DEFAULTS, options)
    this.elementId = elementId
    if (!elementId) {
      console.log('No element Id provided for Websy DragDrop')		
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      el.innerHTML = `
        <div id='${this.elementId}_container' class='websy-drag-drop-container ${this.options.orientation}'>
          <div>
        </div>
      `
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('dragstart', this.handleDragStart.bind(this))      
      el.addEventListener('dragover', this.handleDragOver.bind(this))
      el.addEventListener('dragleave', this.handleDragLeave.bind(this))
      el.addEventListener('drop', this.handleDrop.bind(this))
      window.addEventListener('dragend', this.handleDragEnd.bind(this))
    }
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
    GlobalPubSub.subscribe(this.elementId, 'requestForDDItem', this.handleRequestForItem.bind(this))        
    GlobalPubSub.subscribe(this.elementId, 'add', this.addItem.bind(this))
    this.render()
  }
  addItem (data) {
    if (data.target === this.elementId && this.busy === false) {
      this.busy = true
      console.log('adding item to dd')
      // check that an item with the same id doesn't already exist
      let index = this.getItemIndex(data.item.id)
      if (index === -1) {
        this.options.items.splice(data.index, 0, data.item)
        const startEl = document.getElementById(`${this.elementId}start_item`)
        if (startEl) {
          if (this.options.items.length === 0) {
            startEl.classList.add('empty')
          }
          else {
            startEl.classList.remove('empty')
          }
        }
        if (this.options.onItemAdded) {
          this.options.onItemAdded()
        } 
      }       
      this.busy = false
    }    
  }
  createItemHtml (elementId, index, item) {
    if (!item.id) {
      item.id = WebsyDesigns.Utils.createIdentity()
    }
    let html = `
      <div id='${item.id}_item' class='websy-dragdrop-item ${(item.classes || []).join(' ')}' draggable='true' data-id='${item.id}'>        
        <div id='${item.id}_itemInner' class='websy-dragdrop-item-inner' data-id='${item.id}'>
    `
    if (item.component) {
      html += `<div id='${item.id}_component'></div>`
    }
    else {
      html += `${item.html || item.label || ''}`
    }
    html += `
        </div>
        <div id='${item.id}_dropZone' class='websy-drop-zone droppable' data-index='${item.id}' data-side='right' data-id='${item.id}' data-placeholder='${this.options.dropPlaceholder}'></div>    
      </div>
    `
    return html
  }
  getItemIndex (id) {
    for (let i = 0; i < this.options.items.length; i++) {
      if (this.options.items[i].id === id) {
        return i
      }      
    }
    return -1
  }
  handleClick (event) {

  }
  handleDragStart (event) {    
    this.draggedId = event.target.getAttribute('data-id')      
    event.dataTransfer.effectAllowed = 'move'    
    event.dataTransfer.setData(this.options.accepts, JSON.stringify({el: event.target.id, id: this.elementId, itemId: this.draggedId}))     
    event.target.classList.add('dragging')
    // event.target.style.opacity = 0.5
    this.dragging = true
  }
  handleDragOver (event) {    
    if (event.preventDefault) {
      event.preventDefault()
    }
    console.log('drag', event.target.classList)
    if (!event.target.classList.contains('droppable')) {
      return
    }
    if (event.dataTransfer.types.indexOf(this.options.accepts) === -1) {
      return
    }       
    event.target.classList.add('drag-over')
  }
  handleDragLeave (event) {
    // console.log('drag leave', event.target.classList)
    if (!event.target.classList.contains('droppable')) {
      return
    }
    event.target.classList.remove('drag-over')
    // let side = event.target.getAttribute('data-side')
    // let id = event.target.getAttribute('data-id')    
    // let droppedItem = this.options.items[id]
    // this.removeExpandedDrop(side, id, droppedItem)  
  }
  handleDrop (event) {
    // console.log('drag drop')
    // console.log(event.dataTransfer.getData('application/wd-item'))    
    const data = JSON.parse(event.dataTransfer.getData(this.options.accepts))
    if (event.preventDefault) {
      event.preventDefault()
    }
    if (!event.target.classList.contains('droppable')) {
      return
    }
    if (event.dataTransfer.types.indexOf(this.options.accepts) === -1) {
      return
    }
    let side = event.target.getAttribute('data-side')
    let id = event.target.getAttribute('data-id')
    let index = this.getItemIndex(id)
    let draggedIndex = this.getItemIndex(data.id)
    let droppedItem = this.options.items[index]
    if (side === 'right') {
      index += 1
    }   
    if (draggedIndex === -1) {
      // console.log('requestForDDItem')
      GlobalPubSub.publish(data.id, 'requestForDDItem', {
        group: this.options.group,
        source: data.id,
        target: this.elementId,
        index,
        id: data.itemId
      })
    } 
    else if (index > draggedIndex) {            
      // insert and then remove     
      this.options.items.splice(index, 0, droppedItem)
      this.options.items.splice(draggedIndex, 1)     
      if (this.options.onOrderUpdated) {
        this.options.onOrderUpdated()
      }              
    }
    else {      
      // remove and then insert
      this.options.items.splice(draggedIndex, 1)
      this.options.items.splice(index, 0, droppedItem)
      if (this.options.onOrderUpdated) {
        this.options.onOrderUpdated()
      } 
    }
    // this.removeExpandedDrop(side, id, droppedItem)
    // const draggedEl = document.getElementById(`${this.elementId}_${this.draggedId}_item`)
    const draggedEl = document.getElementById(data.el)
    const droppedEl = document.getElementById(`${id}_item`)
    if (draggedEl) {
      droppedEl.insertAdjacentElement('afterend', draggedEl) 
    }    
    let dragOverEl = droppedEl.querySelector('.drag-over')
    if (dragOverEl) {
      dragOverEl.classList.remove('drag-over')
    }
  }
  handleDragEnd (event) {    
    // console.log('drag end')
    event.target.style.opacity = 1
    event.target.classList.remove('dragging')
    this.draggedId = null
    this.dragging = false
    const startEl = document.getElementById(`${this.elementId}start_item`)
    if (startEl) {
      if (this.options.items.length === 0) {
        startEl.classList.add('empty')
      }
      else {
        startEl.classList.remove('empty')
      }
    }
  }
  handleRequestForItem (data) {
    if (data.group === this.options.group) {
      let index = this.getItemIndex(data.id)
      if (index !== -1) {
        let itemToAdd = this.options.items.splice(index, 1)
        GlobalPubSub.publish(data.target, 'add', {
          target: data.target,
          index: data.index,
          item: itemToAdd[0]
        })        
      }
    }
  }
  measureItems () {
    const el = document.getElementById(`${this.elementId}_container`)
    this.options.items.forEach(d => {

    })
  }
  // removeExpandedDrop (side, id, droppedItem) {
  //   let dropEl
  //   const dropImageEl = document.getElementById(`${id}_itemInner`)
  //   // const placeholderEl = document.getElementById(`${this.elementId}_${id}_dropZonePlaceholder`)
  //   if (side === 'left') {
  //     dropEl = document.getElementById(`${this.elementId}_${id}_dropZoneLeft`) 
  //     dropImageEl.style.left = `0px`
  //   }
  //   else if (side === 'right') {
  //     dropEl = document.getElementById(`${this.elementId}_${id}_dropZoneRight`)      
  //   }
  //   else {
  //     dropEl = document.getElementById(`${this.elementId}_${id}_dropZoneEnd`)  
  //   }
  //   if (dropEl) {
  //     const dropElSize = dropEl.getBoundingClientRect()      
  //     dropEl.style.width = `${(dropElSize.width / 2)}px`
  //     dropEl.style.marginLeft = null
  //     dropEl.style.border = null
  //   }
  //   if (placeholderEl) {
  //     placeholderEl.classList.remove('active')
  //     placeholderEl.style.left = null
  //     placeholderEl.style.right = null
  //     placeholderEl.style.width = null
  //     placeholderEl.style.height = null
  //   }
  // }
  removeItem (id) {

  }
  render () {
    const el = document.getElementById(`${this.elementId}_container`)
    if (el) {
      this.measureItems()
      let html = `
        <div id='${this.elementId}start_item' class='websy-dragdrop-item ${this.options.items.length === 0 ? 'empty' : ''}' data-id='${this.elementId}start'>
          <div id='${this.elementId}start_dropZone' class='websy-drop-zone droppable' data-index='start' data-side='start' data-id='${this.elementId}start' data-placeholder='${this.options.dropPlaceholder}'></div>
        </div>
      `
      html += this.options.items.map((d, i) => this.createItemHtml(this.elementId, i, d)).join('')
      el.innerHTML = html
      this.options.items.forEach((item, i) => {
        if (item.component) {          
          if (item.isQlikPlugin && WebsyDesigns.QlikPlugin[item.component]) {
            item.instance = new WebsyDesigns.QlikPlugin[item.component](`${item.id}_component`, item.options)
          }
          else if (WebsyDesigns[item.component]) {
            item.instance = new WebsyDesigns[item.component](`${item.id}_component`, item.options)
          }
          else {
            console.error(`Component ${item.component} not found.`)
          }
        }
      })
    }
  }
}

/* global WebsyUtils */ 
class WebsyDropdown {
  constructor (elementId, options) {
    const DEFAULTS = {
      multiSelect: false,
      multiValueDelimiter: ',',
      allowClear: true,
      style: 'plain',
      items: [],
      label: '',
      disabled: false,
      minSearchCharacters: 2,
      showCompleteSelectedList: false,
      closeAfterSelection: true,
      customActions: [],
      searchIcon: `<svg width="20" height="20" viewBox="0 0 512 512"><path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><line x1="338.29" y1="338.29" x2="448" y2="448" style="fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg>`,
      clearIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><title>ionicons-v5-l</title><line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,
      arrowIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z"/></svg>`,
      actionsIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512">><circle cx="256" cy="256" r="32" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><circle cx="416" cy="256" r="32" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><circle cx="96" cy="256" r="32" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/></svg>`
    }
    this.options = Object.assign({}, DEFAULTS, options)    
    if (this.options.items.length > 0) {
      this.options.items = this.options.items.map((d, i) => {
        d.index = i
        return d
      }) 
    }
    this.searchText = ''
    this.tooltipTimeoutFn = null
    this._originalData = [...this.options.items]
    this.selectedItems = this.options.selectedItems || []
    if (!elementId) {
      console.log('No element Id provided')
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      this.elementId = elementId
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      el.addEventListener('mouseout', this.handleMouseOut.bind(this))
      el.addEventListener('mousemove', this.handleMouseMove.bind(this))      
      const headerLabel = this.selectedItems.map(s => this.options.items[s].label || this.options.items[s].value).join(this.options.multiValueDelimiter)
      const headerValue = this.selectedItems.map(s => this.options.items[s].value || this.options.items[s].label).join(this.options.multiValueDelimiter)
      let html = `
        <div id='${this.elementId}_container' class='websy-dropdown-container ${this.options.disabled ? 'disabled' : ''} ${this.options.disableSearch !== true ? 'with-search' : ''} ${this.options.style} ${this.options.customActions.length > 0 ? 'with-actions' : ''}'>
          <div id='${this.elementId}_header' class='websy-dropdown-header ${this.selectedItems.length === 1 ? 'one-selected' : ''} ${this.options.allowClear === true ? 'allow-clear' : ''}'>
      `
      if (this.options.disableSearch !== true) {
        html += `<div class='search'>${this.options.searchIcon}</div>`
      }
      html += `
            <div class='header-label'>
              <span class='websy-dropdown-header-value' data-info='${headerLabel}' id='${this.elementId}_selectedItems'>${headerLabel}</span> 
              <span class='websy-dropdown-header-label' id='${this.elementId}_headerLabel'>${this.options.label}</span>
            </div>
            <input class='dropdown-input' id='${this.elementId}_input' name='${this.options.field || this.options.label}' value='${headerValue}'>
            <div class='arrow'>${this.options.arrowIcon}</div>
      `
      if (this.options.allowClear === true) {
        html += `<div class='clear'>${this.options.clearIcon}</div>`
      }
      html += `          
          </div>
          <div id='${this.elementId}_mask' class='websy-dropdown-mask'></div>
          <div id='${this.elementId}_content' class='websy-dropdown-content'>
      `
      if (this.options.customActions.length > 0) {
        html += `
          <div class='websy-dropdown-action-container'>
            ${this.options.actionsTitle || ''}
            <button class='websy-dropdown-action-button'>
              ${this.options.actionsIcon}
            </button>
            <ul id='${this.elementId}_actionContainer'>
        `
        this.options.customActions.forEach((a, i) => {
          html += `
            <li class='websy-dropdown-custom-action' data-index='${i}'>${a.label}</li>
          `
        })
        html += `
            </ul>
          </div>
        `
      }
      if (this.options.disableSearch !== true) {
        html += `
          <div class='websy-dropdown-search-container'>
            <input id='${this.elementId}_search' class='websy-dropdown-search' placeholder='${this.options.searchPlaceholder || 'Search'}'>
          </div>
        `
      }
      html += `
            <div id='${this.elementId}_itemsContainer' class='websy-dropdown-items'>
              <ul id='${this.elementId}_items'>              
              </ul>
            </div><!--
            --><div class='websy-dropdown-custom'></div>
          </div>
        </div>
      `
      el.innerHTML = html
      const scrollEl = document.getElementById(`${this.elementId}_itemsContainer`)
      scrollEl.addEventListener('scroll', this.handleScroll.bind(this))
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
    this.options.items = (d || []).map((d, i) => {
      if (typeof d.index === 'undefined') {
        d.index = i        
      }
      d.currentIndex = i
      return d
    })    
    const headerEl = document.getElementById(`${this.elementId}_header`)   
    if (headerEl) {
      headerEl.classList[`${this.options.allowClear === true ? 'add' : 'remove'}`]('allow-clear')
    }
    const el = document.getElementById(`${this.elementId}_items`)
    if (el) {
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
  }
  get data () {
    return this.options.items
  }
  appendRows () {

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
    const scrollEl = document.getElementById(`${this.elementId}_itemsContainer`)
    const actionEl = document.getElementById(`${this.elementId}_actionContainer`)
    if (actionEl) {
      actionEl.classList.remove('active')
    }
    const el = document.getElementById(this.elementId)
    if (el) {
      el.style.zIndex = ''
    }
    if (scrollEl) {
      scrollEl.scrollTo(0, 0)
    }   
    if (maskEl) {
      maskEl.classList.remove('active')
    }     
    if (contentEl) {
      contentEl.classList.remove('active')
      contentEl.classList.remove('on-top')    
    }    
    const searchEl = document.getElementById(`${this.elementId}_search`)
    if (searchEl) {
      if (searchEl.value.length > 0 && this.options.onCancelSearch) {            
        this.options.onCancelSearch('')
        searchEl.value = ''
      }      
    }
    if (this.options.onClose) {
      this.options.onClose(this.elementId)
    }
  }
  handleClick (event) {
    if (this.options.disabled === true) {
      return
    }
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
    else if (event.target.classList.contains('search')) {
      const el = document.getElementById(`${this.elementId}_container`)
      el.classList.toggle('search-open')
    }
    else if (event.target.classList.contains('websy-dropdown-custom-action')) {
      const actionIndex = +event.target.getAttribute('data-index')
      if (this.options.customActions[actionIndex] && this.options.customActions[actionIndex].fn) {
        this.options.customActions[actionIndex].fn()
      }
    }
    else if (event.target.classList.contains('websy-dropdown-action-button')) {
      const el = document.getElementById(`${this.elementId}_actionContainer`)
      if (el) {
        el.classList.toggle('active')
      }
    }
  }
  handleKeyUp (event) {
    if (event.target.classList.contains('websy-dropdown-search')) {
      this.searchText = event.target.value
      if (this._originalData.length === 0) {
        this._originalData = [...this.options.items]
      }
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
          else {
            this.data = this._originalData
            this._originalData = []
          }
        }
        else {
          if (this.options.onSearch) {
            this.options.onSearch(event.target.value)
          }
          else {
            this.data = this._originalData.filter(d => d.label.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
          }
        }
      }
      else {
        if (this.options.onCancelSearch) {            
          this.options.onCancelSearch(event.target.value)
        }
        else {
          this.data = this._originalData
          this._originalData = []
        }
      }
    }
  }
  handleMouseMove (event) {  
    if (this.tooltipTimeoutFn) {
      event.target.classList.remove('websy-delayed')
      event.target.classList.remove('websy-delayed-info')
      if (event.target.children[1]) {
        event.target.children[1].classList.remove('websy-delayed-info')
      }
      clearTimeout(this.tooltipTimeoutFn)
    }  
    if (event.target.tagName === 'LI') {
      this.tooltipTimeoutFn = setTimeout(() => {
        event.target.classList.add('websy-delayed')        
      }, 500)  
    }
    if (event.target.classList.contains('websy-dropdown-header') && event.target.children[1]) {
      this.tooltipTimeoutFn = setTimeout(() => {
        event.target.children[1].classList.add('websy-delayed-info')
      }, 500)  
    }
  }
  handleMouseOut (event) {
    if (this.tooltipTimeoutFn) {
      event.target.classList.remove('websy-delayed')
      event.target.classList.remove('websy-delayed-info')
      if (event.target.children[1]) {
        event.target.children[1].classList.remove('websy-delayed-info')
      }
      clearTimeout(this.tooltipTimeoutFn)
    }
  }
  handleScroll (event) {
    if (event.target.classList.contains('websy-dropdown-items')) {
      if (this.options.onScroll) {
        this.options.onScroll(event)
      }
    }
  }
  open (options, override = false) {
    const maskEl = document.getElementById(`${this.elementId}_mask`)
    const contentEl = document.getElementById(`${this.elementId}_content`)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.style.zIndex = 999
    }
    maskEl.classList.add('active')
    contentEl.classList.add('active')
    if (WebsyUtils.getElementPos(contentEl).bottom > window.innerHeight) {
      contentEl.classList.add('on-top')
    }
    if (this.options.disableSearch !== true) {
      const searchEl = document.getElementById(`${this.elementId}_search`)
      if (searchEl) {
        searchEl.focus()
      }
    }
    if (this.options.onOpen) {
      this.options.onOpen(this.elementId)
    }
  }
  render () {
    if (!this.elementId) {
      console.log('No element Id provided for Websy Dropdown')	
      return
    }
    // const el = document.getElementById(this.elementId)
    // const headerLabel = this.selectedItems.map(s => this.options.items[s].label || this.options.items[s].value).join(this.options.multiValueDelimiter)
    // const headerValue = this.selectedItems.map(s => this.options.items[s].value || this.options.items[s].label).join(this.options.multiValueDelimiter)
    // let html = `
    //   <div class='websy-dropdown-container ${this.options.disabled ? 'disabled' : ''} ${this.options.disableSearch !== true ? 'with-search' : ''}'>
    //     <div id='${this.elementId}_header' class='websy-dropdown-header ${this.selectedItems.length === 1 ? 'one-selected' : ''} ${this.options.allowClear === true ? 'allow-clear' : ''}'>
    //       <span id='${this.elementId}_headerLabel' class='websy-dropdown-header-label'>${this.options.label}</span>
    //       <span data-info='${headerLabel}' class='websy-dropdown-header-value' id='${this.elementId}_selectedItems'>${headerLabel}</span>
    //       <input class='dropdown-input' id='${this.elementId}_input' name='${this.options.field || this.options.label}' value='${headerValue}'>
    //       <svg class='arrow' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z"/></svg>
    // `
    // if (this.options.allowClear === true) {
    //   html += `
    //     <svg class='clear' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><title>ionicons-v5-l</title><line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>
    //   `
    // }
    // html += `          
    //     </div>
    //     <div id='${this.elementId}_mask' class='websy-dropdown-mask'></div>
    //     <div id='${this.elementId}_content' class='websy-dropdown-content'>
    // `
    // if (this.options.disableSearch !== true) {
    //   html += `
    //     <input id='${this.elementId}_search' class='websy-dropdown-search' placeholder='${this.options.searchPlaceholder || 'Search'}'>
    //   `
    // }
    // html += `
    //       <div class='websy-dropdown-items'>
    //         <ul id='${this.elementId}_items'>              
    //         </ul>
    //       </div><!--
    //       --><div class='websy-dropdown-custom'></div>
    //     </div>
    //   </div>
    // `
    // el.innerHTML = html    
    this.renderItems()
  }
  renderItems () {
    let html = this.options.items.map((r, i) => `
      <li data-index='${r.index}' class='websy-dropdown-item ${(r.classes || []).join(' ')} ${this.selectedItems.indexOf(r.index) !== -1 ? 'active' : ''}'>${r.label}</li>
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
    const inputEl = document.getElementById(`${this.elementId}_input`)
    const itemEls = el.querySelectorAll(`.websy-dropdown-item`)
    let dataToUse = this._originalData
    if (this._originalData.length === 0 && this.searchText === '') {
      dataToUse = this.options.items
    }    
    if (this.options.onSearch) {
      dataToUse = this.options.items
    }
    for (let i = 0; i < itemEls.length; i++) {
      itemEls[i].classList.remove('active')
      let index = itemEls[i].getAttribute('data-index')
      if (this.selectedItems.indexOf(+index) !== -1) {
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
        if (this.options.showCompleteSelectedList === true) {
          headerEl.classList.add('one-selected')
        }
        else {
          headerEl.classList.add('multi-selected')
        }        
      }
    }
    if (labelEl) {
      if (this.selectedItems.length === 1) {
        if (item) {
          labelEl.innerHTML = item.label
          labelEl.setAttribute('data-info', item.label)
          inputEl.value = item.value 
        }        
      }
      else if (this.selectedItems.length > 1) {
        if (this.options.showCompleteSelectedList === true) {
          let selectedLabels = this.selectedItems.map(s => dataToUse[s].label || dataToUse[s].value).join(this.options.multiValueDelimiter)
          let selectedValues = this.selectedItems.map(s => dataToUse[s].value || dataToUse[s].label).join(this.options.multiValueDelimiter)
          labelEl.innerHTML = selectedLabels
          labelEl.setAttribute('data-info', selectedLabels)
          inputEl.value = selectedValues
        }
        else {
          let selectedValues = this.selectedItems.map(s => dataToUse[s].value || dataToUse[s].label).join(this.options.multiValueDelimiter)
          labelEl.innerHTML = `${this.selectedItems.length} selected`
          labelEl.setAttribute('data-info', '')
          inputEl.value = selectedValues
        }        
      }
      else {        
        labelEl.innerHTML = ''
        labelEl.setAttribute('data-info', '')
        inputEl.value = ''
      }
    }
  }
  updateSelected (index) {
    let dataToUse = this._originalData && this._originalData.length > 0 ? this._originalData : this.options.items
    if (this.options.onSearch) {
      dataToUse = this.options.items
    }
    if (typeof index !== 'undefined' && index !== null) {
      let pos = this.selectedItems.indexOf(index)      
      if (this.options.multiSelect === false) {
        this.selectedItems = [index]
      }
      else {
        if (pos !== -1) {
          this.selectedItems.splice(pos, 1)
        }
        else {
          this.selectedItems.push(index)
        }
      } 
    }    
    // const item = this.options.items[index]
    const item = dataToUse[index]
    this.updateHeader(item)
    if (item && this.options.onItemSelected) {
      this.options.onItemSelected(item, this.selectedItems, dataToUse, this.options)
    }
    if (this.options.closeAfterSelection === true) {
      this.close() 
    }    
  }
}

/* global WebsyDesigns FormData grecaptcha ENVIRONMENT GlobalPubSub */ 
class WebsyForm {
  constructor (elementId, options) {
    const defaults = {
      submit: { text: 'Save', classes: '' },
      useRecaptcha: false,
      clearAfterSave: false,
      fields: [],
      mode: 'add',
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
      // if (this.options.classes) {
      //   this.options.classes.forEach(c => el.classList.add(c))
      // }
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      el.addEventListener('keydown', this.handleKeyDown.bind(this))
      this.render()
    }
  }
  cancelForm () {
    const formEl = document.getElementById(`${this.elementId}Form`)
    formEl.reset()
    if (this.options.cancelFn) {
      this.options.cancelFn(this.elementId)
    }
  }
  checkRecaptcha () {
    return new Promise((resolve, reject) => {
      if (this.options.useRecaptcha === true) {
        if (this.recaptchaValue) {                  
        // grecaptcha.ready(() => {
          // grecaptcha.execute(this.recaptchaValue, { action: 'submit' }).then(token => {
          this.apiService.add('google/checkrecaptcha', {grecaptcharesponse: this.recaptchaValue}).then(response => {
            if (response.success && response.success === true) {
              resolve(true)
              grecaptcha.reset(`${this.elementId}_recaptcha`, {sitekey: ENVIRONMENT.RECAPTCHA_KEY})
            }
            else {
              resolve(false)              
            }            
          })
          // }, err => {
          //   reject(err)
          // })
        // })
        }
        else {
          resolve(false)
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
  confirmValidation () {
    const el = document.getElementById(`${this.elementId}_validationFail`)
    if (el) {
      el.innerHTML = ''
    }
  }
  failValidation (msg) {
    const el = document.getElementById(`${this.elementId}_validationFail`)
    if (el) {
      el.innerHTML = msg
    }
  }
  handleClick (event) {    
    if (event.target.classList.contains('submit')) {
      event.preventDefault()
      this.submitForm()
    }
    else if (event.target.classList.contains('cancel')) {
      event.preventDefault()
      this.cancelForm()
    }
  }
  handleKeyDown (event) {
    if (event.key === 'enter') {
      this.submitForm()
    }
  }
  handleKeyUp (event) {

  }
  processComponents (components, callbackFn) {
    if (components.length === 0) {
      callbackFn()
    }
    else {
      components.forEach(c => {
        if (typeof WebsyDesigns[c.component] !== 'undefined') {
          c.instance = new WebsyDesigns[c.component](`${this.elementId}_input_${c.field}_component`, c.options)
        }
        else {
          // some user feedback here
        }
      })
    }
  }
  recaptchaReady () {
    const el = document.getElementById(`${this.elementId}_recaptcha`)
    if (el) {
      grecaptcha.ready(() => {
        grecaptcha.render(`${this.elementId}_recaptcha`, {
          sitekey: ENVIRONMENT.RECAPTCHA_KEY,
          callback: this.validateRecaptcha.bind(this)
        }) 
      })
    }    
  }
  render (update, data) {
    const el = document.getElementById(this.elementId)
    let componentsToProcess = []
    if (el) {      
      let html = `
        <form id="${this.elementId}Form" class="websy-form ${this.options.classes || ''}">
      `
      this.options.fields.forEach((f, i) => {
        if (f.component) {
          componentsToProcess.push(f)
          html += `
            ${i > 0 ? '-->' : ''}<div class='${f.classes || ''}'>
              ${f.label ? `<label for="${f.field}">${f.label}</label>` : ''}
              <div id='${this.elementId}_input_${f.field}_component' class='form-component'></div>
            </div><!--
          `
        }
        else if (f.type === 'longtext') {
          html += `
            ${i > 0 ? '-->' : ''}<div class='${f.classes || ''}'>
              ${f.label ? `<label for="${f.field}">${f.label}</label>` : ''}
              <textarea
                id="${this.elementId}_input_${f.field}"
                ${f.required === true ? 'required' : ''} 
                placeholder="${f.placeholder || ''}"
                name="${f.field}" 
                ${(f.attributes || []).join(' ')}
                class="websy-input websy-textarea"
              ></textarea>
            </div><!--
          ` 
        }
        else {
          html += `
            ${i > 0 ? '-->' : ''}<div class='${f.classes || ''}'>
              ${f.label ? `<label for="${f.field}">${f.label}</label>` : ''}
              <input 
                id="${this.elementId}_input_${f.field}"
                ${f.required === true ? 'required' : ''} 
                type="${f.type || 'text'}" 
                class="websy-input" 
                ${(f.attributes || []).join(' ')}
                name="${f.field}" 
                placeholder="${f.placeholder || ''}"
                value="${f.value || ''}"
                valueAsDate="${f.type === 'date' ? f.value : ''}"
                oninvalidx="this.setCustomValidity('${f.invalidMessage || 'Please fill in this field.'}')"
              />
            </div><!--
          `
        }        
      })
      if (this.options.useRecaptcha === true) {
        html += `
          --><div id='${this.elementId}_recaptcha' data-sitekey='${ENVIRONMENT.RECAPTCHA_KEY}' class='websy-form-recaptcha'></div>
          <div id='${this.elementId}_recaptchaError' class='websy-alert websy-alert-error websy-hidden'>Invalid recaptcha response</div><!--
        ` 
      } 
      html += `
        --><button class="websy-btn submit ${this.options.submit.classes || ''}">${this.options.submit.text || 'Save'}</button>${this.options.cancel ? '<!--' : ''}
      `
      if (this.options.cancel) {
        html += `
          --><button class="websy-btn cancel ${this.options.cancel.classes || ''}">${this.options.cancel.text || 'Cancel'}</button>
        `
      }
      html += `          
        </form>
        <div id="${this.elementId}_validationFail" class="websy-validation-failure"></div>
      `
      el.innerHTML = html
      this.processComponents(componentsToProcess, () => {
        if (this.options.useRecaptcha === true && typeof grecaptcha !== 'undefined') {
          this.recaptchaReady()
        }
      })      
    }
  }
  submitForm () {
    const formEl = document.getElementById(`${this.elementId}Form`)
    const buttonEl = formEl.querySelector('button.websy-btn.submit')
    const recaptchErrEl = document.getElementById(`${this.elementId}_recaptchaError`)    
    if (formEl.reportValidity() === true) {  
      if (buttonEl) {
        buttonEl.setAttribute('disabled', true)
      }
      this.checkRecaptcha().then(result => {
        if (buttonEl) {
          buttonEl.removeAttribute('disabled')
        }
        if (result === true) {                    
          if (recaptchErrEl) {
            recaptchErrEl.classList.add('websy-hidden')
          }
          const formData = new FormData(formEl)
          const data = {}
          const temp = new FormData(formEl)
          temp.forEach((value, key) => {
            data[key] = value
          })
          if (this.options.url) {
            let params = [
              this.options.url
            ]
            if (this.options.mode === 'update') {
              params.push(this.options.id)
            }
            params.push(data)
            this.apiService[this.options.mode](...params).then(result => {
              if (this.options.clearAfterSave === true) {
                // this.render()
                formEl.reset()
              }
              buttonEl.removeAttribute('disabled')
              this.options.onSuccess.call(this, result)
            }, err => {
              console.log('Error submitting form data:', err)
              this.options.onError.call(this, err)
            }) 
          }
          else if (this.options.submitFn) {
            this.options.submitFn(data, () => {
              if (this.options.clearAfterSave === true) {
                // this.render()
                formEl.reset()
              }
            })            
          }          
        }
        else {
          if (buttonEl) {
            buttonEl.removeAttribute('disabled')
          }          
          if (recaptchErrEl) {
            recaptchErrEl.classList.remove('websy-hidden')
          }
        }        
      })         
    }    
  }
  validateRecaptcha (token) {
    this.recaptchaValue = token
  }
}

/* global include */ 
const WebsyIcons = {
  'search-icon': `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 500 500" xml:space="preserve">
<path d="M481.4,468.6c-17.2-17.2-34.4-34.4-51.6-51.6c-27.4-27.4-54.8-54.8-82.2-82.2c-4.8-4.8-9.5-9.5-14.3-14.3
	c29.4-32.5,47.4-75.5,47.4-122.7C380.7,97,298.7,15,197.9,15S15,97,15,197.9s82,182.9,182.9,182.9c47.2,0,90.3-18,122.7-47.4
	c15.7,15.7,31.4,31.4,47.1,47.1c27.4,27.4,54.8,54.8,82.2,82.2c6.3,6.3,12.5,12.5,18.8,18.8C476.8,489.6,489.6,476.8,481.4,468.6z
	 M35,197.9C35,108.1,108.1,35,197.9,35s162.9,73.1,162.9,162.9s-73.1,162.9-162.9,162.9S35,287.7,35,197.9z"/>
</svg>

  `,
  'bag-icon': `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 500 500">
<path d="M456.6,472.3H43.4c-5.3,0-10.2-2.1-13.7-6c-3.6-3.9-5.2-9.2-4.5-14.4l37-285.4c1.2-9,9-15.9,18.2-15.9h339.2
	c9.2,0,17,6.8,18.2,15.8l37,285.4c0.7,5.2-1,10.5-4.5,14.4l0,0C466.8,470.1,461.9,472.3,456.6,472.3z M46.5,451.2h407l-36.3-279.6
	H82.8L46.5,451.2z"/>
<g>
	<path d="M361.3,157.1C357.3,94.8,308.4,46,249.9,46c-28,0-54.8,11.1-75.4,31.4c-20.7,20.3-33.5,47.9-35.9,77.8l-21.5-1.6
		c2.8-34.8,17.7-67.1,42.1-91C183.9,38.3,216.1,25,249.9,25c34.2,0,66.6,13.6,91.5,38.3c24.5,24.3,39.2,57.2,41.5,92.5L361.3,157.1z
		"/>
</g>
</svg>

  `,
  'user-icon': `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve">
<g>
	<path d="M248,260.5c-62,0-112.5-52.8-112.5-117.7S186,25,248,25s112.5,52.8,112.5,117.7S310,260.5,248,260.5z M248,45.9
		c-51,0-92.5,43.4-92.5,96.8s41.5,96.8,92.5,96.8c51,0,92.5-43.4,92.5-96.8S299,45.9,248,45.9z"/>
</g>
<path d="M45,475C45,475,45,475,45,475c0-118.3,92-214.5,205-214.5c113,0,205,96.2,205,214.5c0,0,0,0,0,0h20c0,0,0,0,0,0
	c0-62.9-23.4-122-65.9-166.5c-42.5-44.5-99-69-159.1-69s-116.6,24.5-159.1,69C48.4,353,25,412.1,25,475c0,0,0,0,0,0H45z"/>
</svg>

  `,
  'Search': `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 500 500" xml:space="preserve">
<path d="M481.4,468.6c-17.2-17.2-34.4-34.4-51.6-51.6c-27.4-27.4-54.8-54.8-82.2-82.2c-4.8-4.8-9.5-9.5-14.3-14.3
	c29.4-32.5,47.4-75.5,47.4-122.7C380.7,97,298.7,15,197.9,15S15,97,15,197.9s82,182.9,182.9,182.9c47.2,0,90.3-18,122.7-47.4
	c15.7,15.7,31.4,31.4,47.1,47.1c27.4,27.4,54.8,54.8,82.2,82.2c6.3,6.3,12.5,12.5,18.8,18.8C476.8,489.6,489.6,476.8,481.4,468.6z
	 M35,197.9C35,108.1,108.1,35,197.9,35s162.9,73.1,162.9,162.9s-73.1,162.9-162.9,162.9S35,287.7,35,197.9z"/>
</svg>

  `,
  'Bag': `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 500 500">
<path d="M456.6,472.3H43.4c-5.3,0-10.2-2.1-13.7-6c-3.6-3.9-5.2-9.2-4.5-14.4l37-285.4c1.2-9,9-15.9,18.2-15.9h339.2
	c9.2,0,17,6.8,18.2,15.8l37,285.4c0.7,5.2-1,10.5-4.5,14.4l0,0C466.8,470.1,461.9,472.3,456.6,472.3z M46.5,451.2h407l-36.3-279.6
	H82.8L46.5,451.2z"/>
<g>
	<path d="M361.3,157.1C357.3,94.8,308.4,46,249.9,46c-28,0-54.8,11.1-75.4,31.4c-20.7,20.3-33.5,47.9-35.9,77.8l-21.5-1.6
		c2.8-34.8,17.7-67.1,42.1-91C183.9,38.3,216.1,25,249.9,25c34.2,0,66.6,13.6,91.5,38.3c24.5,24.3,39.2,57.2,41.5,92.5L361.3,157.1z
		"/>
</g>
</svg>

  `,
  'User': `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve">
<g>
	<path d="M248,260.5c-62,0-112.5-52.8-112.5-117.7S186,25,248,25s112.5,52.8,112.5,117.7S310,260.5,248,260.5z M248,45.9
		c-51,0-92.5,43.4-92.5,96.8s41.5,96.8,92.5,96.8c51,0,92.5-43.4,92.5-96.8S299,45.9,248,45.9z"/>
</g>
<path d="M45,475C45,475,45,475,45,475c0-118.3,92-214.5,205-214.5c113,0,205,96.2,205,214.5c0,0,0,0,0,0h20c0,0,0,0,0,0
	c0-62.9-23.4-122-65.9-166.5c-42.5-44.5-99-69-159.1-69s-116.6,24.5-159.1,69C48.4,353,25,412.1,25,475c0,0,0,0,0,0H45z"/>
</svg>

  `,
  'DockLeft': `
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve">
	<g>
		<path d="M419.7,425H80.3C49.8,425,25,400.2,25,369.7V130.3C25,99.8,49.8,75,80.3,75h339.4c30.5,0,55.3,24.8,55.3,55.3v239.4
			C475,400.2,450.2,425,419.7,425z M80.3,95C60.8,95,45,110.8,45,130.3v239.4c0,19.5,15.8,35.3,35.3,35.3h339.4
			c19.5,0,35.3-15.8,35.3-35.3V130.3c0-19.5-15.8-35.3-35.3-35.3H80.3z"/>
	</g>
	<path d="M92.8,90.1H92h-4.2c-24.8,0-45,20.2-45,45v229.8c0,24.8,20.2,45,45,45H92h0.8h105.4V90.1H92.8z"/>
</svg>

  `,
  'DockRight': `
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve">
	<g>
		<path d="M25,369.7V130.3C25,99.8,49.8,75,80.3,75h339.4c30.5,0,55.3,24.8,55.3,55.3v239.4c0,30.5-24.8,55.3-55.3,55.3H80.3
			C49.8,425,25,400.2,25,369.7z M80.3,95C60.8,95,45,110.8,45,130.3v239.4c0,19.5,15.8,35.3,35.3,35.3h339.4
			c19.5,0,35.3-15.8,35.3-35.3V130.3c0-19.5-15.8-35.3-35.3-35.3H80.3z"/>
	</g>
	<path d="M407.2,90.1h0.8h4.2c24.8,0,45,20.2,45,45v229.8c0,24.8-20.2,45-45,45H408h-0.8H301.8V90.1H407.2z"/>
</svg>

  `,
  'Pin': `
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve">
	<g>
		<path d="M368,312.1H132l-0.6-9.4c-0.1-2.4-0.2-4.8-0.2-7.1c0-40.3,20.7-78.1,54.4-99.9V73.2h-9c-13,0-23.6-10.6-23.6-23.6
			S163.5,26,176.6,26h146.9c13,0,23.6,10.6,23.6,23.6s-10.6,23.6-23.6,23.6h-9v122.5c33.7,21.8,54.4,59.5,54.4,99.9
			c0,2.3-0.1,4.7-0.2,7.1L368,312.1z M151.2,292.1h197.5c-1.2-33.8-19.9-65.1-49.4-82.1l-5-2.9V53.2h29c2,0,3.6-1.6,3.6-3.6
			c0-2-1.6-3.6-3.6-3.6H176.6c-2,0-3.6,1.6-3.6,3.6c0,2,1.6,3.6,3.6,3.6h29v153.9l-5,2.9C171.1,227,152.4,258.3,151.2,292.1z"/>
	</g>
	<path d="M260.9,403.8V299.9h-21.8v108.8h0c0.1,36.1,4.9,65.3,10.9,65.3c6,0,10.9-29.7,10.9-66.4
		C260.9,406.4,260.9,405.1,260.9,403.8z"/>
</svg>

  `,
  'WindowPopout': `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve">
<style type="text/css">
	.st0{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}
</style>
<path class="st0" d="M420.1,359.6h-285c-24.7,0-45-20.2-45-45V124.9c0-24.7,20.2-45,45-45h285c24.7,0,45,20.2,45,45v189.7
	C465.1,339.3,444.9,359.6,420.1,359.6z"/>
<path class="st0" d="M407.3,389.8c-6.3,17.3-22.9,29.7-42.3,29.7H80c-24.7,0-45-20.2-45-45V184.9c0-18.2,10.9-33.9,26.5-41"/>
</svg>

  `,
  'Plus': `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500">
<path d="M254.7,486h-10.3c-5.5,0-10-4.5-10-10V26c0-5.5,4.5-10,10-10h10.3c5.5,0,10,4.5,10,10v450C264.6,481.5,260.2,486,254.7,486z"/>
<path d="M15,255.1v-10.3c0-5.5,4.5-10,10-10h450c5.5,0,10,4.5,10,10v10.3c0,5.5-4.5,10-10,10H25C19.5,265.1,15,260.7,15,255.1z"/>
</svg>

  `,
  'Minus': `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500">
<path d="M15,255.1v-10.3c0-5.5,4.5-10,10-10h450c5.5,0,10,4.5,10,10v10.3c0,5.5-4.5,10-10,10H25C19.5,265.1,15,260.7,15,255.1z"/>
</svg>
  `,
  'PlusFilled': `
    <?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#FFFFFF;}
</style>
<circle cx="249.6" cy="251" r="235"/>
<path class="st0" d="M422.3,234.8H264.7V78.7c0-4.2-4.5-7.7-10-7.7h-10.3c-5.5,0-10,3.4-10,7.7v156.1H77.7c-4.2,0-7.7,4.5-7.7,10
	v10.3c0,5.6,3.4,10,7.7,10h156.7v158.2c0,4.2,4.5,7.7,10,7.7h10.3c5.5,0,9.9-3.4,10-7.7V265.1h157.6c4.2,0,7.7-4.5,7.7-10v-10.3
	C430,239.3,426.6,234.8,422.3,234.8z"/>
</svg>

  `,
  'MinusFilled': `
    <?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#FFFFFF;}
</style>
<circle cx="250.1" cy="255.4" r="235"/>
<path class="st0" d="M70,255.1v-10.3c0-5.5,3.4-10,7.7-10h344.7c4.2,0,7.7,4.5,7.7,10v10.3c0,5.5-3.4,10-7.7,10H77.7
	C73.4,265.1,70,260.7,70,255.1z"/>
</svg>

  `
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
    if (el) {
      el.classList.remove('loading')
      el.innerHTML = '' 
    }    
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

/* global WebsyDesigns */ 
class WebsyNavigationMenu {
  constructor (elementId, options) {
    this.options = Object.assign({}, {
      collapsible: false,
      orientation: 'horizontal',
      parentMap: {},
      childIndentation: 10,
      activeSymbol: 'none',
      enableSearch: false,
      searchProp: 'text',
      menuIcon: `<svg viewbox="0 0 40 40" width="30" height="40">              
        <rect x="0" y="0" width="30" height="4" rx="2"></rect>
        <rect x="0" y="12" width="30" height="4" rx="2"></rect>
        <rect x="0" y="24" width="30" height="4" rx="2"></rect>
      </svg>`,
      searchOptions: {}
    }, options)
    if (!elementId) {
      console.log('No element Id provided for Websy Menu')		
      return
    }    
    this.maxLevel = 0
    const el = document.getElementById(elementId)
    if (el) {
      this.elementId = elementId
      this.lowestLevel = 0
      this.flatItems = []
      this.itemMap = {}
      this.flattenItems(0, this.options.items)          
      el.classList.add(`websy-${this.options.orientation}-list-container`)
      el.classList.add('websy-menu')
      if (this.options.align) {
        el.classList.add(`${this.options.align}-align`)
      }
      if (Array.isArray(this.options.classes)) {
        this.options.classes = this.options.classes.join(' ')
      }
      if (this.options.classes) {
        this.options.classes.split(' ').forEach(c => el.classList.add(c))
      }
      el.addEventListener('click', this.handleClick.bind(this))
      this.render()      
    }    
  }
  activateItem (id) {
    const el = document.getElementById(id)
    if (el) {
      el.classList.add('active')
      let parent = el.parentElement
      while (parent) {
        if (parent.tagName === 'UL') {
          parent.classList.remove('websy-menu-collapsed')
          parent = parent.parentElement
        }
        else if (parent.tagName === 'LI') {
          parent = parent.parentElement
        }
        else {
          parent = null
        }
      }
    }
  }
  collapseAll () {
    const el = document.getElementById(this.elementId)
    const menuEls = el.querySelectorAll('.websy-child-list')
    const headerEls = el.querySelectorAll('.websy-menu-header')
    Array.from(menuEls).forEach(e => e.classList.add('websy-menu-collapsed')) 
    Array.from(headerEls).forEach(e => {
      e.classList.remove('active') 
      e.classList.remove('menu-open')
    }) 
  }
  flattenItems (index, items, level = 0, path = '') {
    if (items[index]) {
      this.lowestLevel = Math.max(level, this.lowestLevel)
      items[index].id = items[index].id || 	`${this.elementId}_${this.normaliseString(items[index].text)}`
      items[index].level = level
      items[index].hasChildren = items[index].items && items[index].items.length > 0
      items[index].path = path !== '' ? `${path}::${items[index].id}` : items[index].id
      this.itemMap[items[index].id] = Object.assign({}, items[index])      
      this.flatItems.push(items[index])
      if (items[index].items) {
        this.flattenItems(0, items[index].items, level + 1, items[index].path)  
      }
      this.flattenItems(++index, items, level, path)
    }    
  }
  handleClick (event) {
    if (event.target.classList.contains('websy-menu-icon')) {
      this.toggleMobileMenu()
    }
    if (event.target.classList.contains('websy-menu-header')) {
      let item = this.itemMap[event.target.id]
      if (event.target.classList.contains('trigger-item') && item.level === this.lowestLevel) {
        this.toggleMobileMenu('remove')
      } 
      if (item && item.hasChildren === true) {
        event.target.classList.toggle('menu-open')
        this.toggleMenu(item.id)
      }
      else {
        const el = document.getElementById(this.elementId)
        const allEls = el.querySelectorAll('.websy-menu-header')
        Array.from(allEls).forEach(e => e.classList.remove('active'))
        event.target.classList.add('active')
      }      
    }    
    if (event.target.classList.contains('websy-menu-mask')) {
      this.toggleMobileMenu()
    }
  }
  handleSearch (searchText) {
    const el = document.getElementById(this.elementId)
    // let lowestItems = this.flatItems.filter(d => d.level === this.maxLevel)
    let lowestItems = this.flatItems.filter(d => !d.hasChildren)
    let visibleItems = lowestItems
    let defaultMethod = 'remove'
    if (searchText && searchText.length > 1) {
      defaultMethod = 'add'
      visibleItems = lowestItems.filter(d => d[this.options.searchProp].toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
    }
    // hide everything
    const textEls = el.querySelectorAll(`div.websy-menu-header`)
    for (let t = 0; t < textEls.length; t++) {
      textEls[t].classList[defaultMethod]('websy-hidden')
    }
    const listEls = el.querySelectorAll(`ul.websy-child-list`)
    for (let l = 0; l < listEls.length; l++) {
      listEls[l].classList.add('websy-menu-collapsed')
    }
    if (searchText && searchText.length > 1) {
      visibleItems.forEach(d => {      
        // show the item and open the list
        let pathParts = d.path.split('::')
        pathParts.forEach(p => {
          const textEl = document.getElementById(p)    
          if (textEl) {
            textEl.classList.remove('websy-hidden')          
          }              
          const listEl = document.getElementById(`${p}_list`)          
          if (listEl) {
            listEl.classList.remove('websy-menu-collapsed')
          }        
        })        
      })
    }
  }
  normaliseString (text) {
    return text.replace(/-/g, '').replace(/\s/g, '_')
  }
  render () {
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = ``
      if (this.options.collapsible === true) {
        html += `
          <div id='${this.elementId}_menuIcon' class='websy-menu-icon'>
            ${this.options.menuIcon}
          </div>
        `
      }      
      if (this.options.logo) {
        if (Array.isArray(this.options.logo.classes)) {
          this.options.logo.classes = this.options.logo.classes.join(' ')
        }
        html += `          
          <div 
            class='logo ${this.options.logo.classes || ''}'
            ${this.options.logo.attributes && this.options.logo.attributes.join(' ')}
          >
          <img src='${this.options.logo.url}'></img>
          </div>
          <div id='${this.elementId}_mask' class='websy-menu-mask'></div>
          <div id="${this.elementId}_menuContainer" class="websy-menu-block-container">
        `
      }
      if (this.options.enableSearch === true) {
        html += `
          <div id='${this.elementId}_search' class='websy-menu-search'></div>
        `
      }
      html += this.renderBlock(this.elementId, this.elementId, this.options.items, 'main', 0)
      html += `</div>`
      if (this.options.secondaryItems) {
        html += `<div class='websy-menu-secondary' style='height: ${this.options.secondaryHeight || '100%'}; width: ${this.options.secondaryWidth || '100%'}'>`
        html += this.renderBlock(this.elementId, this.elementId, this.options.secondaryItems, 'main', 0)
        html += `</div>`
      }
      el.innerHTML = html
      // open the menu if an item is set as 'active'
      const activeEl = el.querySelector('.websy-menu-header.active')
      if (activeEl) {
        let parent = activeEl.parentElement
        while (parent) {
          if (parent.tagName === 'UL') {
            parent.classList.remove('websy-menu-collapsed')
            parent = parent.parentElement
          }
          else if (parent.tagName === 'LI') {
            parent = parent.parentElement
          }
          else {
            parent = null
          }
        }
      }
      if (this.options.enableSearch === true) {
        this.search = new WebsyDesigns.Search(`${this.elementId}_search`, Object.assign({}, {
          onSearch: this.handleSearch.bind(this),
          onClear: this.handleSearch.bind(this)
        }, this.options.searchOptions))
      }
    }
  }
  renderBlock (id, path, items, block, level = 0) {
    this.maxLevel = Math.max(this.maxLevel, level)
    let html = `
		  <ul class='websy-${this.options.orientation}-list ${level > 0 ? 'websy-child-list' : ''} ${(block !== 'main' ? 'websy-menu-collapsed' : '')}' id='${id}_list' data-path='${path}'
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
      let blockId = items[i].id //  || 	`${this.elementId}_${currentBlock}_label`
      if (Array.isArray(items[i].classes)) {
        items[i].classes = items[i].classes.join(' ')
      }
      html += `
			<li class='websy-${this.options.orientation}-list-item ${items[i].alwaysOpen === true ? 'always-open' : ''}'>
				<div class='websy-menu-header websy-menu-level-${level} ${items[i].classes || ''} ${selected} ${active}' 
          id='${blockId}' 
          data-id='${currentBlock}'
          data-path='${items[i].path}'
          data-menu-id='${this.elementId}_${currentBlock}_list'
          data-popout-id='${level > 1 ? block : currentBlock}'
          data-text='${items[i].isLink !== true ? items[i].text : ''}'
          style='padding-left: ${level * this.options.childIndentation}px'
          ${(items[i].attributes && items[i].attributes.join(' ')) || ''}
        >
      `         
      if (this.options.orientation === 'horizontal') {
        html += items[i].text
      }
      if (this.options.activeSymbol === 'line') {
        html += `
          <span class='selected-bar'></span>
        `
      }
      if (this.options.orientation === 'vertical') {
        // html += `
        //   &nbsp;
        // `
      }
      if (items[i].isLink === true && items[i].href) {
        html += `<a href='${items[i].href}' target='${items[i].openInNewTab ? 'blank' : '_self'}'>`
      }        
      if (items[i].icon) {
        html += `
          <div class='websy-menu-item-icon'>${items[i].icon}</div>
        `
      }
      html += `<span>${items[i].text}</span>`
      if (items[i].isLink === true && items[i].href) {
        html += `</a>`
      }
      if (items[i].items && items[i].items.length > 0) {
        html += `          
          <span class='menu-carat'></span>
        ` 
      }      
      if (this.options.activeSymbol === 'triangle') {
        html += `
          <span class='active-square'></span>
        `
      }      
      html += `    
				</div>
		  `
      if (items[i].items) {
        html += this.renderBlock(blockId, items[i].path, items[i].items, currentBlock, items[i].level + 1)			
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
  toggleMenu (id) {
    const el = document.getElementById(`${id}_list`)
    // const menuId = el.getAttribute('data-menu-id')
    // const menuEl = document.getElementById(menuId)
    if (el) {
      el.classList.toggle('websy-menu-collapsed')
    }
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

/* global WebsyDesigns */
class Pager {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      pageSizePrefix: 'Show',
      pageSizeSuffix: 'rows',
      pageSizeOptions: [
        { label: '10', value: 10 }, 
        { label: '20', value: 20 }, 
        { label: '50', value: 50 }, 
        { label: '100', value: 100 }
      ],
      selectedPageSize: 20,
      pageLabel: 'Page',
      showPageSize: true,
      activePage: 0,
      pages: []
    }    
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = `
        <div class="websy-pager-container">
      `
      if (this.options.showPageSize === true) {
        html += `
          ${this.options.pageSizePrefix} <div id="${this.elementId}_pageSizeSelector" class="websy-page-selector"></div> ${this.options.pageSizeSuffix}          
        `
      }          
      html += `
          <ul id="${this.elementId}_pageList" class="websy-page-list"></ul>        
        </div> 
      `
      el.innerHTML = html
      el.addEventListener('click', this.handleClick.bind(this))
      if (this.options.showPageSize === true) {
        this.pageSizeSelector = new WebsyDesigns.Dropdown(`${this.elementId}_pageSizeSelector`, {
          selectedItems: [this.options.pageSizeOptions.indexOf(this.options.selectedPageSize)],
          items: this.pageSizeOptions.map(p => ({ label: p.toString(), value: p })),
          allowClear: false,
          disableSearch: true,
          onItemSelected: (selectedItem) => {
            if (this.options.onChangePageSize) {
              this.options.onChangePageSize(selectedItem.value)
            }
          }
        })
      }      
      this.render() 
    }    
  }
  handleClick (event) {    
    if (event.target.classList.contains('websy-page-num')) {
      const pageNum = +event.target.getAttribute('data-index')
      if (this.options.onSetPage) {
        this.options.onSetPage(this.options.pages[pageNum])
      }
    }   
  }
  render () {
    const el = document.getElementById(`${this.elementId}_pageList`)
    if (el) {
      let pages = this.options.pages.map((item, index) => {
        return `<li data-index="${index}" class="websy-page-num ${(this.options.activePage === index) ? 'active' : ''}">${index + 1}</li>`
      })
      let startIndex = 0
      if (this.options.pages.length > 8) {
        startIndex = Math.max(0, this.options.activePage - 4)
        pages = pages.splice(startIndex, 10)
        if (startIndex > 0) {
          pages.splice(0, 0, `<li>${this.options.pageLabel}&nbsp;</li><li data-page="0" class="websy-page-num">First</li><li>...</li>`)
        }
        else {
          pages.splice(0, 0, `<li>${this.options.pageLabel}&nbsp;</li>`)
        }
        if (this.options.activePage < this.options.pages.length - 1) {
          pages.push('<li>...</li>')
          pages.push(`<li data-page="${this.options.pages.length - 1}" class="websy-page-num">Last</li>`)
        }
      }
      el.innerHTML = pages.join('')
    }
  }
}

/* global WebsyDesigns Blob */ 
class WebsyPDFButton {
  constructor (elementId, options) {
    const DEFAULTS = {
      classes: [],
      wait: 0,
      buttonText: 'Download',
      directDownload: false
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.service = new WebsyDesigns.APIService('/pdf')
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
              else if (this.options.header.html) {
                pdfData.header = this.options.header.html
                if (this.options.header.css) {
                  pdfData.options.headerCSS = this.options.header.css
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
              let msg = `
                <div class='text-center websy-pdf-download'>
                  <div>Your file is ready to download</div>
                  <a href='${URL.createObjectURL(blob)}' target='_blank'
              `
              if (this.options.directDownload === true) {
                let fileName
                if (typeof this.options.fileName === 'function') {
                  fileName = this.options.fileName() || 'Export'
                }
                else {
                  fileName = this.options.fileName || 'Export'
                }                
                msg += `download='${fileName}.pdf'`
              }
              msg += `
                  >
                    <button class='websy-btn download-pdf'>${this.options.buttonText}</button>
                  </a>
                </div>
              `
              this.popup.show({
                message: msg,
                mask: true
              })
            }, err => {
              console.error(err)
            })
          }
        } 
      }, this.options.wait)           
    }
    else if (event.target.classList.contains('download-pdf')) {
      this.popup.hide()
      if (this.options.onClose) {
        this.options.onClose()
      }
    }
  }
  render () {
    // 
  }
}

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
  show (options) {
    if (options) {
      this.options = Object.assign({}, this.DEFAULTS, options)
    }
    this.render()
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

class ResponsiveText {
  constructor (elementId, options) {
    const DEFAULTS = {
      textAlign: 'center',
      verticalAlign: 'flex-end',
      wrapText: false
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.elementId = elementId
    this.canvas = document.createElement('canvas')
    window.addEventListener('resize', () => this.render())
    const el = document.getElementById(this.elementId)
    if (el) {
      this.render() 
    }    
  }
  css (element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property)
  }
  render (text) {
    if (typeof text !== 'undefined') {
      this.options.text = text
    }
    if (this.options.text) {
      let wrappingRequired = false
      const el = document.getElementById(this.elementId)
      let cx = this.canvas.getContext('2d')
      let f = 0
      let fits = false
      // let el = document.getElementById(`${layout.qInfo.qId}_responsiveInner`)
      let height = el.clientHeight
      if (typeof this.options.maxHeight === 'string' && this.options.maxHeight.indexOf('%') !== -1) {
        let p = +this.options.maxHeight.replace('%', '')
        if (!isNaN(p)) {
          this.options.maxHeight = Math.floor(height * (p / 100))
        }
      } 
      else if (
        typeof this.options.maxHeight === 'string' &&
        this.options.maxHeight.indexOf('px') !== -1
      ) {
        this.options.maxHeight = +this.options.maxHeight.replace('px', '')
      }
      if (typeof this.options.minHeight === 'string' && this.options.minHeight.indexOf('%') !== -1) {
        let p = +this.options.minHeight.replace('%', '')
        if (!isNaN(p)) {
          this.options.minHeight = Math.floor(height * (p / 100))
        }
      } 
      else if (
        typeof this.options.minHeight === 'string' &&
        this.options.minHeight.indexOf('px') !== -1
      ) {
        this.options.minHeight = +this.options.minHeight.replace('px', '')
      }

      const fontFamily = this.css(el, 'font-family')
      const fontWeight = this.css(el, 'font-weight')
      let allowedWidth = el.clientWidth
      if (allowedWidth === 0) {
        // check for a max-width property
        if (
          el.style.maxWidth &&
          el.style.maxWidth !== 'auto'
        ) {
          if (el.parentElement.clientWidth > 0) {
            let calc = el.style.maxWidth
            if (calc.indexOf('calc') !== -1) {
              // this logic currently only handles calc statements using % and px
              // and only + or - formulas
              calc = calc.replace('calc(', '').replace(')', '')
              calc = calc.split(' ')
              if (calc[0].indexOf('px') !== -1) {
                allowedWidth = calc[0].replace('px', '')
              } 
              else if (calc[0].indexOf('%') !== -1) {
                allowedWidth = el.parentElement.clientWidth * (+calc[0].replace('%', '') / 100)
              }
              if (calc[2] && calc[4]) {
                // this means we have an operator and a second value
                // handle -
                if (calc[2] === '-') {
                  if (calc[4].indexOf('px') !== -1) {
                    allowedWidth -= +calc[4].replace('px', '')
                  }
                }
                if (calc[2] === '+') {
                  if (calc[4].indexOf('px') !== -1) {
                    allowedWidth += +calc[4].replace('px', '')
                  }
                }
              }
            } 
            else if (calc.indexOf('px') !== -1) {
              allowedWidth = +calc.replace('px', '')
            } 
            else if (calc.indexOf('%') !== -1) {
              allowedWidth =
                el.parentElement.clientWidth *
                (+calc.replace('%', '') / 100)
            }
          }
        }
      }
      // console.log('max height', this.options.maxHeight);
      let innerElHeight = el.clientHeight
      while (fits === false) {
        f++
        cx.font = `${fontWeight} ${f}px ${fontFamily}`
        let measurements = cx.measureText(this.options.text)
        // add support for safari where some elements end up with zero height
        if (navigator.userAgent.indexOf('Safari') !== -1) {
          // get the closest parent that has a height
          let heightFound = false
          let currEl = el
          while (heightFound === false) {
            if (currEl.clientHeight > 0) {
              innerElHeight = currEl.clientHeight
              heightFound = true
            } 
            else if (currEl.parentNode) {
              currEl = currEl.parentNode
            } 
            else {
              // prevent the loop from running indefinitely
              heightFound = true
            }
          }
        }
        if (typeof this.options.maxHeight !== 'undefined' && f === this.options.maxHeight) {
          f = this.options.maxHeight
          height = measurements.actualBoundingBoxAscent
          fits = true
        } 
        else if (
          measurements.width > allowedWidth ||
          measurements.actualBoundingBoxAscent >= innerElHeight
        ) {
          f--
          height = measurements.actualBoundingBoxAscent
          fits = true
        }
      }
      if (this.options.minHeight === '') {
        this.options.minHeight = undefined
      }
      if (typeof this.options.minHeight !== 'undefined') {
        if (this.options.minHeight > f && this.options.wrapText === true) {
          // we run the process again but this time separating the words onto separate lines
          // this currently only supports wrapping onto 2 lines          
          wrappingRequired = true
          fits = false
          f = this.options.minHeight
          let spaceCount = this.options.text.match(/ /g)
          if (spaceCount && spaceCount.length > 0) {
            spaceCount = spaceCount.length
            let words = this.options.text.split(' ')
            while (fits === false) {
              f++
              cx.font = `${fontWeight} ${f}px ${fontFamily}`
              for (let i = spaceCount; i > 0; i--) {
                let fitsCount = 0
                let lines = [
                  words.slice(0, i).join(' '),
                  words.slice(i, words.length).join(' ')
                ]
                let longestLine = lines.reduce(
                  (a, b) => (a.length > b.length ? a : b),
                  ''
                )
                // lines.forEach(l => {
                let measurements = cx.measureText(longestLine)
                // add support for safari where some elements end up with zero height
                if (navigator.userAgent.indexOf('Safari') !== -1) {
                  // get the closest parent that has a height
                  let heightFound = false
                  let currEl = el
                  while (heightFound === false) {
                    if (currEl.clientHeight > 0) {
                      innerElHeight = currEl.clientHeight
                      heightFound = true
                    } 
                    else if (currEl.parentNode) {
                      currEl = currEl.parentNode
                    } 
                    else {
                      // prevent the loop from running indefinitely
                      heightFound = true
                    }
                  }
                }
                if (typeof this.options.maxHeight !== 'undefined' && f === this.options.maxHeight) {
                  f = this.options.maxHeight
                  height = measurements.actualBoundingBoxAscent
                  fits = true
                  break
                } 
                else if (
                  measurements.width > allowedWidth ||
                  measurements.actualBoundingBoxAscent >=
                    (innerElHeight / 2) * 0.75
                ) {
                  f--
                  height = measurements.actualBoundingBoxAscent
                  fits = true
                  break
                }
                // })
              }
            }
          }
          if (typeof this.options.minHeight !== 'undefined' && this.options.minHeight > f) {
            f = this.options.minHeight
          }
        } 
        else if (this.options.minHeight > f) {
          f = this.options.minHeight
        }
      }      
      let spanHeight = Math.min(innerElHeight, height)
      el.innerHTML = `
        <div 
          class='websy-responsive-text' 
          style='
            justify-content: ${this.options.verticalAlign};
            font-size: ${f}px;
            font-weight: ${fontWeight || 'normal'};
          '
        >  
          <span
            style='
              white-space: ${this.options.wrapText === true ? 'normal' : 'nowrap'};
              height: ${Math.floor(wrappingRequired === true ? spanHeight * ((1 * 1) / 3) * 2 : spanHeight)}px;
              line-height: ${Math.ceil(wrappingRequired === true ? f * 1.2 : spanHeight)}px;
              justify-content: ${this.options.textAlign};
              text-align: ${this.options.textAlign};
            '
          >${this.options.text}</span>
        </div>
      `
    }
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
    this.activeTemplate = ''
    if (!elementId) {
      console.log('No element Id provided for Websy Search List')		
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('change', this.handleChange.bind(this))
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      el.addEventListener('keydown', this.handleKeyDown.bind(this))
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
    this.activeTemplate = this.options.template
    const html = this.buildHTML(d, startIndex)
    const el = document.getElementById(this.elementId)
    el.innerHTML += html.replace(/\n/g, '')
  }
  buildHTML (d, startIndex = 0, inputTemplate, locator = []) {
    let html = ``
    if (this.options.template) {      
      if (d.length > 0) {
        d.forEach((row, ix) => {
          let template = `${ix > 0 ? '-->' : ''}${inputTemplate || this.options.template}${ix < d.length - 1 ? '<!--' : ''}`
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
          let forMatches = [...template.matchAll(/<\s*for[^>]*>([\s\S]*?)<\s*\/\s*for>/g)]
          forMatches.forEach(m => {
            let itemsMatch = m[0].match(/(items=["|']\w.+)["|']/g)
            let forMarkup = m[0].match(/<\s*for[^>]*>/)
            let withoutFor = m[0].replace(forMarkup, '').replace('</for>', '').replace(/<\s*for[^>]*>/g, '')
            if (itemsMatch && itemsMatch[0]) {
              let c = itemsMatch[0].trim().replace('items=', '')
              if (c.split('')[0] === '"') {
                c = c.replace(/"/g, '')
              }
              else if (c.split('')[0] === '\'') {
                c = c.replace(/'/g, '')
              }              
              let items = row
              let parts = c.split('.')
              parts.forEach(p => {
                items = items[p]
              })
              template = template.replace(m[0], this.buildHTML(items, 0, withoutFor, [...locator, `${startIndex + ix}:${c}`]))              
            }
          })
          let tagMatches = [...template.matchAll(/(\sdata-event=["|']\w.+)["|']/g)]
          tagMatches.forEach(m => {
            if (m[0] && m.index > -1) {
              template = template.replace(m[0], `${m[0]} data-id=${startIndex + ix} data-locator='${locator.join(';')}'`)
            }
          })         
          let flatRow = this.flattenObject(row) 
          for (let key in flatRow) {
            let rg = new RegExp(`{${key}}`, 'gm')                            
            template = template.replace(rg, flatRow[key] || '')
          }
          template = template.replace(/\{(.*?)\}/g, '')
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
  flattenObject (obj) {
    const toReturn = {}
    for (const i in obj) {
      if (!obj.hasOwnProperty(i)) {
        continue
      }
      if (typeof obj[i] === 'object') {
        const flatObject = this.flattenObject(obj[i])
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) {
            continue
          }
          toReturn[i + '.' + x] = flatObject[x]
        }
      }
      else {
        toReturn[i] = obj[i]
      }
    }
    return JSON.parse(JSON.stringify(toReturn))
  }
  handleClick (event) {    
    if (event.target.classList.contains('clickable')) {
      this.handleEvent(event, 'clickable', 'click')
    }
  }
  handleChange (event) {
    this.handleEvent(event, 'keyable', 'change')
  }
  handleKeyUp (event) {
    this.handleEvent(event, 'keyable', 'keyup')
  }
  handleKeyDown (event) {
    this.handleEvent(event, 'keyable', 'keydown')
  }
  handleEvent (event, eventType, action) {
    let l = event.target.getAttribute('data-event')
    if (l) {
      l = l.split('(')
      let params = []
      const id = event.target.getAttribute('data-id')
      const locator = event.target.getAttribute('data-locator')
      if (l[1]) {
        l[1] = l[1].replace(')', '')
        params = l[1].split(',')      
      }
      l = l[0]
      let data = this.rows
      if (locator !== '') {
        let locatorItems = locator.split(';')
        locatorItems.forEach(loc => {
          let locatorParts = loc.split(':')
          if (data[locatorParts[0]]) {
            data = data[locatorParts[0]]
            let parts = locatorParts[1].split('.')
            parts.forEach(p => {
              data = data[p]
            })              
          }
        })
      }
      params = params.map(p => {
        if (typeof p !== 'string' && typeof p !== 'number') {
          if (data[+id]) {
            p = data[+id][p]
          }
        }
        else if (typeof p === 'string') {
          p = p.replace(/"/g, '').replace(/'/g, '')
        }
        return p
      })
      if (event.target.classList.contains(eventType) && this.options.listeners[action] && this.options.listeners[action][l]) {      
        event.stopPropagation()
        this.options.listeners[action][l].call(this, event, data[+id], ...params)
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

/* global history */
class WebsyRouter {
  constructor (options) {
    const defaults = {
      triggerClass: 'websy-trigger',
      triggerToggleClass: 'websy-trigger-toggle',
      viewClass: 'websy-view',
      activeClass: 'active',
      viewAttribute: 'data-view',
      groupAttribute: 'data-group',
      parentAttribute: 'data-parent',
      defaultView: '',
      defaultGroup: 'main',
      subscribers: { show: [], hide: [] },
      persistentParameters: false,
      fieldValueSeparator: ':'
    }  
    this.triggerIdList = []
    this.viewIdList = []    
    this.previousPath = ''
    this.previousView = ''
    this.currentView = ''
    this.currentViewMain = ''
    this.currentParams = {
      path: '',
      items: {}
    }
    this.previousParams = {
      path: '',
      items: {}
    }
    this.controlPressed = false
    this.usesHTMLSuffix = window.location.pathname.indexOf('.htm') !== -1
    window.addEventListener('popstate', this.onPopState.bind(this))
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
    window.addEventListener('focus', this.handleFocus.bind(this))
    window.addEventListener('click', this.handleClick.bind(this))
    this.options = Object.assign({}, defaults, options)  
    if (this.options.onShow) {
      this.on('show', this.options.onShow)
    }  
    if (this.options.onHide) {
      this.on('hide', this.options.onHide)
    }  
    // this.init()
  }
  addGroup (group) {
    if (!this.groups[group]) {
      const els = document.querySelectorAll(`.websy-view[data-group="${group}"]`)
      if (els) {        
        this.getClosestParent(els[0], parent => {
          this.groups[group] = {
            activeView: '',
            views: [],
            parent: parent.getAttribute('data-view')
          }          
        })  
      }           
    }
  }
  getClosestParent (el, callbackFn) {
    if (el && el.parentElement) {
      if (el.parentElement.attributes['data-view'] || el.tagName === 'BODY') {
        callbackFn(el.parentElement)
      }
      else {
        this.getClosestParent(el.parentElement, callbackFn)
      } 
    }    
  }
  addUrlParams (params, reloadView = false, noHistory = true) {    
    if (typeof params === 'undefined') {
      return
    }
    this.previousParams = Object.assign({}, this.currentParams)
    const output = {
      path: '',
      items: {}
    }
    let path = ''
    if (this.currentParams && this.currentParams.items) {
      output.items = Object.assign({}, this.currentParams.items, params)
      path = this.buildUrlPath(output.items)
    }
    else if (Object.keys(params).length > 0) {
      output.items = Object.assign({}, params)
      path = this.buildUrlPath(output.items)
    }
    this.currentParams = output
    let inputPath = this.currentView
    if (this.options.urlPrefix) {
      inputPath = `/${this.options.urlPrefix}/${inputPath}`
    }
    // history.pushState({
    //   inputPath
    // }, 'unused', `${inputPath}?${path}`) 
    if (reloadView === true) {
      // this.showView(this.currentView, this.currentParams, 'main')
      this.navigate(`${inputPath}?${path}`, 'main', null, noHistory)
    }
  }
  removeUrlParams (params = [], reloadView = false, noHistory = true) {        
    this.previousParams = Object.assign({}, this.currentParams)
    const output = {
      path: '',
      items: {}
    }
    let path = ''
    if (this.currentParams && this.currentParams.items) {
      params.forEach(p => {
        delete this.currentParams.items[p]
      })
      path = this.buildUrlPath(this.currentParams.items)
    }    
    let inputPath = this.currentView
    if (this.options.urlPrefix) {
      inputPath = `/${this.options.urlPrefix}/${inputPath}`
    }    
    if (reloadView === true) {
      // this.showView(this.currentView, this.currentParams, 'main')
      this.navigate(`${inputPath}?${path}`, 'main', null, noHistory)
    }
  }
  removeAllUrlParams (reloadView = false, noHistory = true) {
    // const output = {
    //   path: '',
    //   items: {}
    // }
    // this.currentParams = output
    let inputPath = this.currentView
    if (this.options.urlPrefix) {
      inputPath = `/${this.options.urlPrefix}/${inputPath}`
    }    
    if (reloadView === true) {
      this.navigate(`${inputPath}`, 'main', null, noHistory)
    }
    else {
      this.currentParams = {
        path: '',
        items: {}
      }
    }
  }
  buildUrlPath (params) {
    let path = []
    for (let key in params) {
      path.push(`${key}=${params[key]}`)
    }
    return path.join('&')
  }
  checkChildGroups (parent) {
    if (!this.groups) {
      this.groups = {}
    }
    const parentEl = document.querySelector(`.websy-view[data-view="${parent}"]`)
    if (parentEl) {
      const els = parentEl.querySelectorAll(`.websy-view[data-group]`)
      for (let i = 0; i < els.length; i++) {
        const g = els[i].getAttribute('data-group')
        const v = els[i].getAttribute('data-view')
        if (!this.groups[g]) {
          this.addGroup(g)
        }
        if (els[i].classList.contains(this.options.activeClass)) {
          this.groups[g].activeView = v
        }
        if (this.groups[g].views.indexOf(v) === -1) {
          this.groups[g].views.push(v)
        }
      }      
    }
  }
  formatParams (params) {
    this.previousParams = Object.assign({}, this.currentParams)
    const output = {
      path: params,
      items: {}
    }
    if (typeof params === 'undefined') {
      return
    }
    const parts = params.split('&')
    for (let i = 0; i < parts.length; i++) {
      const bits = parts[i].split('=')
      if (bits[0] && bits[0] !== '' && bits[1] && bits[1] !== '') {
        output.items[bits[0]] = bits[1]
      }      
    }
    this.currentParams = output
    return output
  }
  generateId (item) {
    const chars = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789'  
    const value = []
    const len = chars.length
    for (let i = 0; i < 6; i++) {
      let rnd = Math.floor(Math.random() * 62)
      value.push(chars[rnd])
    }
    return `${item}_${value.join('')}`
  }
  getActiveViewsFromParent (parent) {
    let views = []    
    this.checkChildGroups(parent)
    for (let g in this.groups) {
      if (this.groups[g].parent === parent) {
        if (this.groups[g].activeView) {
          views.push({view: this.groups[g].activeView, group: g})
        }
        // else {
        //   views.push({view: this.groups[g].views[0], group: g})
        // }        
      }
    }
    return views
  }
  getParamValues (param) {
    let output = []
    if (this.currentParams && this.currentParams.items && this.currentParams.items[param] && this.currentParams.items[param] !== '') {
      return this.currentParams.items[param].split('|').map(d => decodeURI(d))
    }
    return output
  }
  getAPIQuery (ignoredParams = []) {    
    if (this.currentParams && this.currentParams.items) {
      let query = []
      for (const key in this.currentParams.items) {          
        if (ignoredParams.indexOf(key) === -1) {
          query.push(`${key}${this.options.fieldValueSeparator}${this.currentParams.items[key]}`)
        }        
      }
      return query
    }
    return []
  }
  handleClick (event) {
    // const id = event.target.id        
    if (event.target.classList.contains(this.options.triggerClass)) {
      const view = event.target.getAttribute(this.options.viewAttribute)
      const group = event.target.getAttribute(this.options.groupAttribute)
      this.navigate(view, group || 'main', event)
    }
  }
  init () {
    // this.registerElements(document)
    let view = ''    
    let params = this.formatParams(this.queryParams)
    let url
    if (this.currentPath === '' && this.options.defaultView !== '') {
      view = this.options.defaultView      
    }
    else if (this.currentPath !== '') {
      view = this.currentPath      
    }
    url = view
    if (typeof params !== 'undefined') {
      url += `?${params.path}`
    }
    this.navigate(url)
    // this.currentView = view
    // this.currentViewMain = view
    // if (this.currentView === '/' || this.currentView === '') {
    //   this.currentView = this.options.defaultView
    // }
    // if (this.currentViewMain === '/' || this.currentViewMain === '') {
    //   this.currentViewMain = this.options.defaultView
    // }    
    // if (view !== '') {
    //   this.showView(view, params, 'main')      
    // }
  }
  handleFocus (event) {
    this.controlPressed = false
  }
  handleKeyDown (event) {    
    switch (event.key) {
    case 'Control':
    case 'Meta':
      this.controlPressed = true      
      break        
    }
  }
  handleKeyUp (event) {
    this.controlPressed = false  
  }
  hideChildren (view, group) {
    let children = this.getActiveViewsFromParent(view)
    for (let c = 0; c < children.length; c++) {      
      this.hideTriggerItems(children[c].view, group)
      this.hideViewItems(children[c].view, group)
      this.publish('hide', [children[c].view])
    }
  }
  hideView (view, group) {   
    if (view === '/' || view === '') {
      view = this.options.defaultView
    }         
    this.hideChildren(view, group)
    if (this.previousView !== this.currentView || group !== this.options.defaultGroup) {
      this.hideTriggerItems(view, group)
      this.hideViewItems(view, group)
      this.publish('hide', [view])
      if (this.options.views && this.options.views[view]) {
        this.options.views[view].components.forEach(c => {
          if (typeof c.instance !== 'undefined') {
            if (c.instance.close) {
              c.instance.close() 
            }          
          }
        })
      }      
    }
    // else if (group !== this.options.defaultGroup) {
    //   this.hideTriggerItems(view, group)
    //   this.hideViewItems(view, group)
    //   this.publish('hide', [view])
    // }    
  }
  // registerElements (root) {
  //   if (root.nodeName === '#document') {
  //     this.groups = {}  
  //   }    
  //   let triggerItems = root.getElementsByClassName(this.options.triggerClass)
  //   for (let i = 0; i < triggerItems.length; i++) {
  //     if (!triggerItems[i].id) {
  //       triggerItems[i].id = this.generateId('trigger')
  //     }
  //     if (this.triggerIdList.indexOf(triggerItems[i].id) !== -1) {
  //       continue
  //     }
  //     this.triggerIdList.push(triggerItems[i].id)
  //     // get the view for each item
  //     let viewAttr = triggerItems[i].attributes[this.options.viewAttribute]
  //     if (viewAttr && viewAttr.value !== '') {
  //       // check to see if the item belongs to a group
  //       // use the group to add an additional class to the item
  //       // this combines the triggerClass and groupAttr properties
  //       let groupAttr = triggerItems[i].attributes[this.options.groupAttribute]
  //       let group = this.options.defaultGroup
  //       if (groupAttr && groupAttr.value !== '') {
  //         // if no group is found, assign it to the default group
  //         group = groupAttr.value
  //       }
  //       let parentAttr = triggerItems[i].attributes[this.options.parentAttribute]
  //       if (parentAttr && parentAttr.value !== '') {
  //         triggerItems[i].classList.add(`parent-${parentAttr.value}`)
  //       }
  //       triggerItems[i].classList.add(`${this.options.triggerClass}-${group}`)        
  //     }
  //   }
  //   // Assign group class to views
  //   let viewItems = root.getElementsByClassName(this.options.viewClass)
  //   for (let i = 0; i < viewItems.length; i++) {
  //     let groupAttr = viewItems[i].attributes[this.options.groupAttribute]
  //     let viewAttr = viewItems[i].attributes[this.options.viewAttribute]
  //     if (!groupAttr || groupAttr.value === '') {
  //       // if no group is found, assign it to the default group
  //       viewItems[i].classList.add(`${this.options.viewClass}-${this.options.defaultGroup}`)
  //     }
  //     else {
  //       this.addGroup(groupAttr.value)
  //       if (viewItems[i].classList.contains(this.options.activeClass)) {
  //         this.groups[groupAttr.value].activeView = viewAttr.value
  //       }
  //       viewItems[i].classList.add(`${this.options.viewClass}-${groupAttr.value}`)
  //     }
  //     let parentAttr = viewItems[i].attributes[this.options.parentAttribute]
  //     if (parentAttr && parentAttr.value !== '') {
  //       viewItems[i].classList.add(`parent-${parentAttr.value}`)
  //       if (groupAttr && groupAttr.value !== '' && this.groups[groupAttr.value]) {
  //         this.groups[groupAttr.value].parent = parentAttr.value
  //       }
  //     }
  //   }
  // }
  prepComponent (elementId, options) {
    let el = document.getElementById(`${elementId}_content`)
    if (el) {
      return ''
    }
    let html = `
      <article id='${elementId}_content' class='websy-content-article'></article>
      <div id='${elementId}_loading' class='websy-loading-container'><div class='websy-ripple'><div></div><div></div></div></div>
    `
    if (options && options.help && options.help !== '') {
      html += `
        <Help not yet supported>
      `
    }
    if (options && options.tooltip && options.tooltip.value && options.tooltip.value !== '') {
      html += `
          <div class="websy-info ${this.options.tooltip.classes.join(' ') || ''}" data-info="${this.options.tooltip.value}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm48,226H216a16,16,0,0,1,0-32h28V244H228a16,16,0,0,1,0-32h32a16,16,0,0,1,16,16V332h28a16,16,0,0,1,0,32Z"/></svg>
          </div>   
        `
    }
    el = document.getElementById(elementId)
    if (el) {
      el.innerHTML = html 
    }    
  }
  showComponents (view) {
    if (this.options.views && this.options.views[view] && this.options.views[view].components) {
      this.options.views[view].components.forEach(c => {
        if (typeof c.instance === 'undefined') {
          this.prepComponent(c.elementId, c.options)
          c.instance = new (c.Component)(c.elementId, c.options)
        }
        else if (c.instance.render) {
          c.instance.render()
        }
      })      
    }
  }
  showView (view, params, group) {
    this.activateItem(view, this.options.triggerClass)
    this.activateItem(view, this.options.viewClass)
    let children = this.getActiveViewsFromParent(view)
    for (let c = 0; c < children.length; c++) {
      this.activateItem(children[c].view, this.options.triggerClass)
      this.activateItem(children[c].view, this.options.viewClass)
      this.showComponents(children[c].view)
      this.publish('show', [children[c].view, null, group])
    }
    if (this.previousView !== this.currentView || group !== 'main') {
      this.showComponents(view)
      this.publish('show', [view, params, group]) 
    }       
    else if (this.previousView === this.currentView && this.previousParams.path !== this.currentParams.path) { 
      this.showComponents(view)
      this.publish('show', [view, params, group]) 
    }    
  }
  reloadCurrentView () {
    this.showView(this.currentView, this.currentParams, 'main')
  }
  navigate (inputPath, group = 'main', event, popped) {
    if (typeof popped === 'undefined') {
      popped = false
    }    
    this.popped = popped
    let toggle = false
    let noInputParams = inputPath.indexOf('?') === -1
    let groupActiveView
    let params = {}       
    let newPath = inputPath    
    if (inputPath.split('?')[0] === this.options.defaultView && this.usesHTMLSuffix === false) {
      inputPath = inputPath.replace(this.options.defaultView, '/')
    }    
    if (this.options.persistentParameters === true) {
      if (inputPath.indexOf('?') === -1 && this.queryParams) {
        inputPath += `?${this.queryParams}`
      }
    }     
    if (this.usesHTMLSuffix === true) {
      if (inputPath.indexOf('?') === -1) {
        inputPath = `?view=${inputPath}`
      }
      else if (inputPath.indexOf('view=') === -1) {
        inputPath = `&view=${inputPath}`
      }      
    }    
    let previousParamsPath = this.currentParams.path
    if (this.controlPressed === true && group === this.options.defaultGroup) {      
      // Open the path in a new browser tab
      window.open(`${window.location.origin}/${inputPath}`, '_blank')
      return
    }
    if (inputPath.indexOf('?') !== -1 && group === this.options.defaultGroup) {
      let parts = inputPath.split('?')
      params = this.formatParams(parts[1])
      inputPath = parts[0]
    }
    else if (group === this.options.defaultGroup) {
      this.previousParams = Object.assign({}, this.currentParams)
      this.currentParams = {
        path: '',
        items: {}
      }
    }
    if (event) {
      if (event.target && event.target.classList.contains(this.options.triggerToggleClass)) {
        toggle = true
      }
      else if (typeof event === 'boolean') {
        toggle = event
      }
    }
    if (!this.groups) {
      this.groups = {}
    }
    if (!this.groups[group]) {
      this.addGroup(group)
    }
    if (toggle === true && this.groups[group].activeView !== '') {
      newPath = inputPath === this.groups[group].activeView ? '' : inputPath
    }        
    this.previousView = this.currentView    
    this.previousPath = this.currentPath    
    if (this.groups[group]) {
      if (toggle === false) {      
        groupActiveView = this.groups[group].activeView
      }      
      this.previousPath = this.groups[group].activeView
    }    
    if (group && this.groups[group] && group !== this.options.defaultGroup) {
      this.groups[group].activeView = newPath
    }
    if (toggle === false && group === 'main') {
      this.currentView = inputPath
    }
    if (group === 'main') {
      this.currentViewMain = inputPath
    }    
    if (this.currentView === '/') {
      this.currentView = this.options.defaultView
    }
    if (this.currentViewMain === '/') {
      this.currentViewMain = this.options.defaultView
    }
    if (toggle === true) {
      if (this.previousPath !== '') {
        this.hideView(this.previousPath, group)
      }
    }
    else if (group === this.options.defaultGroup) {      
      this.hideView(this.previousView, group)
    } 
    else {      
      this.hideView(this.previousPath, group)
    }    
    if (toggle === true && newPath === groupActiveView) {
      return
    }    
    if (this.usesHTMLSuffix === true) {
      inputPath = window.location.pathname.split('/').pop() + inputPath
    }
    if ((this.currentPath !== inputPath || previousParamsPath !== this.currentParams.path) && group === this.options.defaultGroup) {            
      let historyUrl = inputPath
      if (this.options.urlPrefix) {
        historyUrl = historyUrl === '/' ? '' : `/${historyUrl}`
        inputPath = inputPath === '/' ? '' : `/${inputPath}`
        historyUrl = (`/${this.options.urlPrefix}${historyUrl}`).replace(/\/\//g, '/')
        inputPath = (`/${this.options.urlPrefix}${inputPath}`).replace(/\/\//g, '/')
      }
      if (this.currentParams && this.currentParams.path) {
        historyUrl += `?${this.currentParams.path}`
      }
      else if (this.queryParams && this.options.persistentParameters === true) {
        historyUrl += `?${this.queryParams}`
      }
      if (popped === false) {                
        history.pushState({
          inputPath: historyUrl
        }, 'unused', historyUrl) 
      }
      else {
        history.replaceState({
          inputPath: historyUrl
        }, 'unused', historyUrl) 
      }
    }
    if (toggle === false) {
      this.showView(newPath.split('?')[0], this.currentParams, group)
    }
    else if (newPath && newPath !== '') {      
      this.showView(newPath, null, group)
    }
  }
  on (event, fn) {
    this.options.subscribers[event].push(fn)
  }
  onPopState (event) {
    if (event.state) {
      let url
      if (event.state.url) {
        url = event.state.url
      }
      else {
        url = event.state.inputPath
        if (url.indexOf(this.options.urlPrefix) !== -1) {
          url = url.replace(`/${this.options.urlPrefix}/`, '')
        }
      }
      this.navigate(url, 'main', null, true)
    }
    else {
      this.navigate(this.options.defaultView || '/', 'main', null, true)
    }
  }
  publish (event, params) {
    this.options.subscribers[event].forEach((item) => {
      item.apply(null, params)
    })
  }
  subscribe (event, fn) {
    this.options.subscribers[event].push(fn)
  }  
  get currentPath () {
    let path = window.location.pathname.split('/').pop()    
    if (path.indexOf('.htm') !== -1) {
      return ''
    }
    if (this.options.urlPrefix && path === this.options.urlPrefix) {
      return ''
    }
    return path
  }
  get queryParams () {
    if (window.location.search.length > 1) {
      return window.location.search.substring(1)
    }
    return ''
  }
  hideTriggerItems (view, group) {
    this.hideItems(this.options.triggerClass, group)
  }
  hideViewItems (view, group) {
    this.hideItems(view, group)
  }
  hideItems (view, group) {
    let els 
    if (group && group !== 'main') {
      els = [...document.querySelectorAll(`[${this.options.groupAttribute}='${group}']`)]
    }
    else {
      els = [...document.querySelectorAll(`[${this.options.viewAttribute}='${view}']`)]
    }    
    if (els) {
      for (let i = 0; i < els.length; i++) {
        els[i].classList.remove(this.options.activeClass)
      }
    }
  }
  activateItem (path, className) {
    let els = document.getElementsByClassName(className)
    if (els) {
      for (let i = 0; i < els.length; i++) {
        if (els[i].attributes[this.options.viewAttribute] && els[i].attributes[this.options.viewAttribute].value === path) {
          els[i].classList.add(this.options.activeClass)          
          break
        }
      }
    }
  }
}

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
    this.render()
  }
  enable () {
    this.options.enabled = true
    this.render()
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

/* global WebsyDesigns */ 
class WebsyTemplate {
  constructor (elementId, options) {
    const DEFAULTS = {
      listeners: {
        click: {}
      }
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.elementId = elementId
    this.templateService = new WebsyDesigns.APIService('')
    if (!elementId) {
      console.log('No element Id provided for Websy Template')		
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
  buildHTML () {
    let html = ``
    if (this.options.template) {            
      let template = this.options.template
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
                if (typeof this.options.data[parts[0]] !== 'undefined' && this.options.data[parts[0]] === parts[1]) {
                  // remove the <if> tags
                  removeAll = false
                }
                else if (parts[0] === parts[1]) {
                  removeAll = false
                }
              } 
              else if (polarity === false) {
                if (typeof this.options.data[parts[0]] !== 'undefined' && this.options.data[parts[0]] !== parts[1]) {
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
          template = template.replace(m[0], `${m[0]}`)
        }
      })
      for (let key in this.options.data) {
        let rg = new RegExp(`{${key}}`, 'gm')
        if (rg) {
          template = template.replace(rg, this.options.data[key])
        }                                    
      } 
      html = template     
    }
    return html
  }
  handleClick (event) {
    // 
  }
  render () {
    this.resize()
  }
  resize () {    
    const html = this.buildHTML()
    const el = document.getElementById(this.elementId)
    el.innerHTML = html.replace(/\n/g, '')
    if (this.options.readyCallbackFn) {
      this.options.readyCallbackFn()
    }
  }
}

const WebsyUtils = {
  createIdentity: (size = 6) => {	
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
    for (let i = 0; i < size; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  },
  getElementPos: el => {
    const rect = el.getBoundingClientRect()
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return { 
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      bottom: rect.top + scrollTop + el.clientHeight,
      right: rect.left + scrollLeft + el.clientWidth
    }
  },
  getLightDark: (backgroundColor, darkColor = '#000000', lightColor = '#ffffff') => {
    let colorParts
    let red = 0
    let green = 0
    let blue = 0
    let alpha = 1
    if (backgroundColor.indexOf('#') !== -1) {
      // hex color
      backgroundColor = backgroundColor.replace('#', '')
      colorParts = backgroundColor
      colorParts = colorParts.split('')
      red = parseInt(colorParts[0] + colorParts[1], 16)
      green = parseInt(colorParts[2] + colorParts[3], 16)
      blue = parseInt(colorParts[4] + colorParts[5], 16)
    }
    else if (backgroundColor.toLowerCase().indexOf('rgb') !== -1) {
      // rgb color
      colorParts = backgroundColor.replace(/rgba\(/gi, '').replace(/\)/gi, '')
      colorParts = colorParts.replace(/rgb\(/gi, '')
      colorParts = colorParts.split(',')
      red = colorParts[0]
      green = colorParts[1]
      blue = colorParts[2]
      alpha = colorParts[3] || 1
    }
    return ((red * 0.299 + green * 0.587 + blue * 0.114) / alpha) > 186 ? darkColor : lightColor
  },
  measureText (text, rotation = 0, fontSize = '12px') {
    if (!isNaN(fontSize)) {
      fontSize = `${fontSize}px`
    }
    let html = `<div style='display: inline-block; width: auto; font-size: ${fontSize}'>${text}</div>`
    const el = document.createElement('div')
    el.style.position = 'absolute'    
    el.style.visibility = 'hidden'
    el.style.transform = `rotate(${rotation}deg)`
    el.innerHTML = html
    document.body.appendChild(el)
    let w = el.getBoundingClientRect()
    el.remove()
    return w
  },
  parseUrlParams: () => {
    let queryString = window.location.search.replace('?', '')
    const params = {}
    let parts = queryString.split('&')
    for (let i = 0; i < parts.length; i++) {
      let keyValue = parts[i].split('=')
      params[keyValue[0]] = keyValue[1]
    }
    return params
  },
  buildUrlParams: (params) => {    
    let out = []
    for (const key in params) {
      out.push(`${key}=${params[key]}`)
    }
    return out.join('&')
  },
  fromQlikDate: d => {    
    let output = new Date(Math.round((d - 25569) * 86400000))    
    output.setTime(output.getTime() + output.getTimezoneOffset() * 60000)
    return output
  },
  toReduced: (v, decimals = 0, isPercentage = false, test = false, control) => {
    let ranges = [{
      divider: 1e18,
      suffix: 'E'
    }, {
      divider: 1e15,
      suffix: 'P'
    }, {
      divider: 1e12,
      suffix: 'T'
    }, {
      divider: 1e9,
      suffix: 'G'
    }, {
      divider: 1e6,
      suffix: 'M'
    }, {
      divider: 1e3,
      suffix: 'K'
    }]  
    let numOut
    let divider
    let suffix = ''  
    if (control) {    
      let settings = getDivider(control)
      divider = settings.divider
      suffix = settings.suffix    
    }  
    if (v === 0) {
      numOut = 0
    }
    else if (control) {
      numOut = (v / divider) // .toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$100,')
    }
    else if (v < 1000 && v % 1 === 0) {
      numOut = v
      // decimals = 0
    }
    else {
      numOut = v
      for (let i = 0; i < ranges.length; i++) {
        if (v >= ranges[i].divider) {
          numOut = (v / ranges[i].divider) // .toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$100,')
          suffix = ranges[i].suffix
          break
        } 
        // else if (isPercentage === true) {
        //   numOut = (this * 100).toFixed(decimals)
        // }
        // else {
        //   numOut = (this).toFixed(decimals)
        // }
      }
    }
    if (isPercentage === true) {
      numOut = numOut * 100    
    }
    if (numOut % 1 > 0) {
      decimals = 1
    }
    if (numOut < 1) {
      decimals = getZeroDecimals(numOut)    
    }  
    numOut = (+numOut).toFixed(decimals)
    if (test === true) {
      return numOut
    }
    if (numOut.replace) {
      numOut = numOut.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    function getDivider (n) {
      let s = ''
      let d = 1
      // let out
      for (let i = 0; i < ranges.length; i++) {      
        if (n >= ranges[i].divider) {
          d = ranges[i].divider
          s = ranges[i].suffix
          // out = (n / ranges[i].divider).toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$100,')                
          break
        }       
      }    
      return { divider: d, suffix: s }
    }
    function getZeroDecimals (n) {
      let d = 0
      n = Math.abs(n)
      if (n === 0) {
        return 0
      }
      while (n < 10) {
        d++
        n = n * 10
      }    
      return d    
    }
    return `${numOut}${suffix}${isPercentage === true ? '%' : ''}`
  },
  toQlikDateNum: d => {
    return Math.floor(d.getTime() / 86400000 + 25570)
  },
  toQlikDate: d => {
    return Math.floor(d.getTime() / 86400000 + 25570)
  }
}

/* global WebsyDesigns */ 
class WebsyTable {
  constructor (elementId, options) {
    const DEFAULTS = {
      pageSize: 20,
      paging: 'scroll'
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.rowCount = 0
    this.busy = false
    this.tooltipTimeoutFn = null
    this.data = []
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = `
        <div id='${this.elementId}_tableContainer' class='websy-vis-table ${this.options.paging === 'pages' ? 'with-paging' : ''}'>
          <!--<div class="download-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z"/></svg>
          </div>-->
          <table>
            <thead id="${this.elementId}_head">
            </thead>
            <tbody id="${this.elementId}_body">
            </tbody>
            <tfoot id="${this.elementId}_foot">
            </tfoot>
          </table>      
          <div id="${this.elementId}_errorContainer" class='websy-vis-error-container'>
            <div>
              <div id="${this.elementId}_errorTitle"></div>
              <div id="${this.elementId}_errorMessage"></div>
            </div>            
          </div>
          <div id="${this.elementId}_loadingContainer"></div>
        </div>
      `      
      if (this.options.paging === 'pages') {
        html += `
          <div class="websy-table-paging-container">
            Show <div id="${this.elementId}_pageSizeSelector" class="websy-vis-page-selector"></div> rows
            <ul id="${this.elementId}_pageList" class="websy-vis-page-list"></ul>
          </div>
        `
      }
      let pageOptions = [10, 20, 50, 100, 200]
      el.innerHTML = html      
      if (this.options.paging === 'pages') {
        this.pageSizeSelector = new WebsyDesigns.Dropdown(`${this.elementId}_pageSizeSelector`, {
          selectedItems: [pageOptions.indexOf(this.options.pageSize)],
          items: pageOptions.map(p => ({ label: p.toString(), value: p })),
          allowClear: false,
          disableSearch: true,
          onItemSelected: (selectedItem) => {
            if (this.options.onChangePageSize) {
              this.options.onChangePageSize(selectedItem.value)
            }
          }
        })
      }
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('mouseout', this.handleMouseOut.bind(this))
      el.addEventListener('mousemove', this.handleMouseMove.bind(this))
      const scrollEl = document.getElementById(`${this.elementId}_tableContainer`)
      scrollEl.addEventListener('scroll', this.handleScroll.bind(this))
      this.loadingDialog = new WebsyDesigns.LoadingDialog(`${this.elementId}_loadingContainer`)
      this.render()
    } 
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  appendRows (data) {
    this.hideError()
    let bodyHTML = ''
    if (data) {
      bodyHTML += data.map((r, rowIndex) => {
        return '<tr>' + r.map((c, i) => {
          if (this.options.columns[i].show !== false) {
            let style = ''
            if (c.style) {
              style += c.style
            }
            if (this.options.columns[i].width) {
              style += `width: ${this.options.columns[i].width}; `
            }
            if (c.backgroundColor) {
              style += `background-color: ${c.backgroundColor}; `
              if (!c.color) {
                style += `color: ${WebsyDesigns.Utils.getLightDark(c.backgroundColor)}; `  
              }
            }
            if (c.color) {
              style += `color: ${c.color}; `
            }
            if (this.options.columns[i].showAsLink === true && c.value.trim() !== '') {
              return `
                <td 
                  data-row-index='${this.rowCount + rowIndex}' 
                  data-col-index='${i}' 
                  class='${this.options.columns[i].classes || ''}' 
                  style='${style}'
                  colspan='${c.colspan || 1}'
                  rowspan='${c.rowspan || 1}'
                >
                  <a href='${c.value}' target='${this.options.columns[i].openInNewTab === true ? '_blank' : '_self'}'>${c.displayText || this.options.columns[i].linkText || c.value}</a>
                </td>
              `
            } 
            else if ((this.options.columns[i].showAsNavigatorLink === true || this.options.columns[i].showAsRouterLink === true) && c.value.trim() !== '') {
              return `
                <td 
                  data-view='${c.value}' 
                  data-row-index='${this.rowCount + rowIndex}' 
                  data-col-index='${i}' 
                  class='websy-trigger trigger-item ${this.options.columns[i].clickable === true ? 'clickable' : ''} ${this.options.columns[i].classes || ''}' 
                  style='${style}'
                  colspan='${c.colspan || 1}'
                  rowspan='${c.rowspan || 1}'
                >${c.displayText || this.options.columns[i].linkText || c.value}</td>
              `
            } 
            else {  
              let info = c.value
              if (this.options.columns[i].showAsImage === true) {
                c.value = `
                  <img src='${c.value}'>
                `
              }            
              return `
                <td 
                  data-info='${info}' 
                  data-row-index='${this.rowCount + rowIndex}' 
                  data-col-index='${i}' 
                  class='${this.options.columns[i].classes || ''}' 
                  style='${style}'
                  colspan='${c.colspan || 1}'
                  rowspan='${c.rowspan || 1}'
                >${c.value}</td>
              `
            }
          }
        }).join('') + '</tr>'
      }).join('')
      this.data = this.data.concat(data)
      this.rowCount = this.data.length
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
  handleClick (event) {
    if (event.target.classList.contains('download-button')) {
      window.viewManager.dataExportController.exportData(this.options.model)
    }
    if (event.target.classList.contains('sortable-column')) {
      const colIndex = +event.target.getAttribute('data-index')
      const column = this.options.columns[colIndex]
      if (this.options.onSort) {
        this.options.onSort(event, column, colIndex)
      }
      else {
        this.internalSort(column, colIndex)
      }
      // const colIndex = +event.target.getAttribute('data-index')
      // const dimIndex = +event.target.getAttribute('data-dim-index')
      // const expIndex = +event.target.getAttribute('data-exp-index')
      // const reverse = event.target.getAttribute('data-reverse') === 'true'
      // const patchDefs = [{
      //   qOp: 'replace',
      //   qPath: '/qHyperCubeDef/qInterColumnSortOrder',
      //   qValue: JSON.stringify([colIndex])
      // }]
      // patchDefs.push({
      //   qOp: 'replace',
      //   qPath: `/qHyperCubeDef/${dimIndex > -1 ? 'qDimensions' : 'qMeasures'}/${dimIndex > -1 ? dimIndex : expIndex}/qDef/qReverseSort`,
      //   qValue: JSON.stringify(reverse)
      // })
      // this.options.model.applyPatches(patchDefs) // .then(() => this.render())
    } 
    else if (event.target.classList.contains('tableSearchIcon')) {
      let field = event.target.getAttribute('data-field')
      window.viewManager.views.global.objects[1].instance.show(field, { x: event.pageX, y: event.pageY }, () => {
        event.target.classList.remove('active')
      })
    }
    // else if (event.target.classList.contains('clickable')) {
    //   const colIndex = +event.target.getAttribute('data-col-index')
    //   const rowIndex = +event.target.getAttribute('data-row-index')
    //   if (this.options.onClick) {
    //     this.options.onClick(event, this.data[rowIndex][colIndex], this.data[rowIndex], this.options.columns[colIndex])
    //   }      
    // }
    else if (event.target.classList.contains('websy-page-num')) {
      const pageNum = +event.target.getAttribute('data-page')
      if (this.options.onSetPage) {
        this.options.onSetPage(pageNum)
      }
    }
    else {
      const colIndex = +event.target.getAttribute('data-col-index')
      const rowIndex = +event.target.getAttribute('data-row-index')
      if (this.options.onClick) {
        this.options.onClick(event, { cell: this.data[rowIndex][colIndex], row: this.data[rowIndex], column: this.options.columns[colIndex], colIndex, rowIndex })
      } 
    }
  }
  handleMouseMove (event) {  
    if (this.tooltipTimeoutFn) {
      event.target.classList.remove('websy-delayed-info')
      clearTimeout(this.tooltipTimeoutFn)
    }  
    if (event.target.tagName === 'TD') {
      this.tooltipTimeoutFn = setTimeout(() => {
        event.target.classList.add('websy-delayed-info')
      }, 500)  
    }    
  }
  handleMouseOut (event) {
    if (this.tooltipTimeoutFn) {
      event.target.classList.remove('websy-delayed-info')
      clearTimeout(this.tooltipTimeoutFn)
    }
  }
  handleScroll (event) {
    if (this.options.onScroll && this.options.paging === 'scroll') {
      this.options.onScroll(event)
    }    
  } 
  hideError () {
    const containerEl = document.getElementById(`${this.elementId}_errorContainer`)
    if (containerEl) {
      containerEl.classList.remove('active')
    }
  }
  hideLoading () {
    this.loadingDialog.hide()
  }
  internalSort (column, colIndex) {
    this.options.columns.forEach((c, i) => {
      c.activeSort = i === colIndex      
    })
    if (column.sortFunction) {
      this.data = column.sortFunction(this.data, column)
    }
    else {
      let sortProp = 'value'
      let sortOrder = column.sort === 'asc' ? 'desc' : 'asc' 
      column.sort = sortOrder
      let sortType = column.sortType || 'alphanumeric'     
      if (column.sortProp) {
        sortProp = column.sortProp
      }
      this.data.sort((a, b) => {
        switch (sortType) {
        case 'numeric':
          if (sortOrder === 'asc') {
            return a[colIndex][sortProp] - b[colIndex][sortProp]
          }
          else {
            return b[colIndex][sortProp] - a[colIndex][sortProp]
          }          
        default:
          if (sortOrder === 'asc') {
            return a[colIndex][sortProp] > b[colIndex][sortProp] ? 1 : -1
          }
          else {
            return a[colIndex][sortProp] < b[colIndex][sortProp] ? 1 : -1
          }
        }
      })
    }
    this.render(this.data)
  } 
  render (data) {
    if (!this.options.columns) {
      return
    }
    this.hideError()
    this.data = []
    this.rowCount = 0
    const bodyEl = document.getElementById(`${this.elementId}_body`)
    bodyEl.innerHTML = ''
    if (this.options.allowDownload === true) {
      // doesn't do anything yet
      const el = document.getElementById(this.elementId)
      if (el) {
        el.classList.add('allow-download')
      } 
      else {
        el.classList.remove('allow-download')
      }
    }
    let headHTML = '<tr>' + this.options.columns.map((c, i) => {
      if (c.show !== false) {
        let style = ''             
        if (c.style) {
          style += c.style
        }        
        if (c.width) {
          style += `width: ${(c.width || 'auto')};`
        }   
        return `
        <th style="${style}">
          <div class ="tableHeader">
            <div class="leftSection">
              <div
                class="tableHeaderField ${['asc', 'desc'].indexOf(c.sort) !== -1 ? 'sortable-column' : ''}"
                data-index="${i}"                
                data-sort="${c.sort}"                
              >
                ${c.name}
              </div>
            </div>
            <div class="${c.activeSort ? c.sort + ' sortOrder' : ''}"></div>
            <!--${c.searchable === true ? this.buildSearchIcon(c.qGroupFieldDefs[0]) : ''}-->
          </div>
        </th>
        `
      }
    }).join('') + '</tr>'
    const headEl = document.getElementById(`${this.elementId}_head`)
    headEl.innerHTML = headHTML
    // let footHTML = '<tr>' + this.options.columns.map((c, i) => {
    //   if (c.show !== false) {
    //     return `
    //       <th></th>
    //     `
    //   }
    // }).join('') + '</tr>'
    // const footEl = document.getElementById(`${this.elementId}_foot`)
    // footEl.innerHTML = footHTML
    if (this.options.paging === 'pages') {
      const pagingEl = document.getElementById(`${this.elementId}_pageList`)
      if (pagingEl) {
        let pages = (new Array(this.options.pageCount)).fill('').map((item, index) => {
          return `<li data-page="${index}" class="websy-page-num ${(this.options.pageNum === index) ? 'active' : ''}">${index + 1}</li>`
        })
        let startIndex = 0
        if (this.options.pageCount > 8) {
          startIndex = Math.max(0, this.options.pageNum - 4)
          pages = pages.splice(startIndex, 10)
          if (startIndex > 0) {
            pages.splice(0, 0, `<li>Page&nbsp;</li><li data-page="0" class="websy-page-num">First</li><li>...</li>`)
          }
          else {
            pages.splice(0, 0, '<li>Page&nbsp;</li>')
          }
          if (this.options.pageNum < this.options.pageCount - 1) {
            pages.push('<li>...</li>')
            pages.push(`<li data-page="${this.options.pageCount - 1}" class="websy-page-num">Last</li>`)
          }
        }
        pagingEl.innerHTML = pages.join('')
      }
    }
    if (data) {
      // this.data = this.data.concat(data)
      this.appendRows(data) 
    }
  } 
  showError (options) {
    const containerEl = document.getElementById(`${this.elementId}_errorContainer`)
    if (containerEl) {
      containerEl.classList.add('active')
    }
    if (options.title) {
      const titleEl = document.getElementById(`${this.elementId}_errorTitle`)
      if (titleEl) {
        titleEl.innerHTML = options.title
      } 
    }
    if (options.message) {
      const messageEl = document.getElementById(`${this.elementId}_errorTitle`)
      if (messageEl) {
        messageEl.innerHTML = options.message
      } 
    }
  } 
  showLoading (options) {
    this.loadingDialog.show(options)
  }
}

/* global WebsyDesigns */ 
class WebsyTable2 {
  constructor (elementId, options) {
    const DEFAULTS = {
      pageSize: 20,
      paging: 'scroll',
      cellSize: 35,
      virtualScroll: false,
      leftColumns: 0
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.rowCount = 0
    this.busy = false
    this.tooltipTimeoutFn = null
    this.data = []
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = `
        <div id='${this.elementId}_tableContainer' class='websy-vis-table ${this.options.paging === 'pages' ? 'with-paging' : ''} ${this.options.virtualScroll === true ? 'with-virtual-scroll' : ''}'>
          <!--<div class="download-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z"/></svg>
          </div>-->
          <table id="${this.elementId}_table">            
            <thead id="${this.elementId}_head">
            </thead>
            <tbody id="${this.elementId}_body">
            </tbody>
            <tfoot id="${this.elementId}_foot">
            </tfoot>
          </table>      
          <div id="${this.elementId}_errorContainer" class='websy-vis-error-container'>
            <div>
              <div id="${this.elementId}_errorTitle"></div>
              <div id="${this.elementId}_errorMessage"></div>
            </div>            
          </div>
          <div id="${this.elementId}_vScrollContainer" class="websy-v-scroll-container">
            <div id="${this.elementId}_vScrollHandle" class="websy-scroll-handle websy-scroll-handle-y"></div>
          </div>
          <div id="${this.elementId}_hScrollContainer" class="websy-h-scroll-container">
            <div id="${this.elementId}_hScrollHandle" class="websy-scroll-handle websy-scroll-handle-x"></div>
          </div>
          <div id="${this.elementId}_dropdownContainer"></div>
          <div id="${this.elementId}_loadingContainer"></div>
        </div>
      `      
      if (this.options.paging === 'pages') {
        html += `
          <div class="websy-table-paging-container">
            Show <div id="${this.elementId}_pageSizeSelector" class="websy-vis-page-selector"></div> rows
            <ul id="${this.elementId}_pageList" class="websy-vis-page-list"></ul>
          </div>
        `
      }
      let pageOptions = [10, 20, 50, 100, 200]
      el.innerHTML = html      
      if (this.options.paging === 'pages') {
        this.pageSizeSelector = new WebsyDesigns.Dropdown(`${this.elementId}_pageSizeSelector`, {
          selectedItems: [pageOptions.indexOf(this.options.pageSize)],
          items: pageOptions.map(p => ({ label: p.toString(), value: p })),
          allowClear: false,
          disableSearch: true,          
          onItemSelected: (selectedItem) => {
            if (this.options.onChangePageSize) {
              this.options.onChangePageSize(selectedItem.value)
            }
          }
        })
      }
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('mouseout', this.handleMouseOut.bind(this))
      el.addEventListener('mousemove', this.handleMouseMove.bind(this))
      el.addEventListener('mousedown', this.handleMouseDown.bind(this))
      el.addEventListener('mouseup', this.handleMouseUp.bind(this))
      document.addEventListener('mouseup', this.handleGlobalMouseUp.bind(this))
      const scrollEl = document.getElementById(`${this.elementId}_tableContainer`)
      scrollEl.addEventListener('scroll', this.handleScroll.bind(this))
      this.loadingDialog = new WebsyDesigns.LoadingDialog(`${this.elementId}_loadingContainer`)
      this.render()
    } 
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  appendRows (data) {
    this.hideError()
    const bodyEl = document.getElementById(`${this.elementId}_body`)
    let bodyHTML = ''    
    if (data) {      
      bodyHTML += data.map((r, rowIndex) => {
        return '<tr>' + r.map((c, i) => {
          if (this.options.columns[i].show !== false) {
            let style = `height: ${this.options.cellSize}px; line-height: ${this.options.cellSize}px;`
            if (c.style) {
              style += c.style
            }
            if (this.options.columns[i].width) {
              style += `width: ${this.options.columns[i].width}; `
            }
            if (c.backgroundColor) {
              style += `background-color: ${c.backgroundColor}; `
              if (!c.color) {
                style += `color: ${WebsyDesigns.Utils.getLightDark(c.backgroundColor)}; `  
              }
            }
            if (c.color) {
              style += `color: ${c.color}; `
            }            
            if (this.options.columns[i].showAsLink === true && c.value.trim() !== '') {
              return `
                <td 
                  data-row-index='${this.rowCount + rowIndex}' 
                  data-col-index='${i}' 
                  class='${this.options.columns[i].classes || ''}' 
                  style='${style}'
                  colspan='${c.colspan || 1}'
                  rowspan='${c.rowspan || 1}'
                >
                  <a href='${c.value}' target='${this.options.columns[i].openInNewTab === true ? '_blank' : '_self'}'>${c.displayText || this.options.columns[i].linkText || c.value}</a>
                </td>
              `
            } 
            else if ((this.options.columns[i].showAsNavigatorLink === true || this.options.columns[i].showAsRouterLink === true) && c.value.trim() !== '') {
              return `
                <td 
                  data-view='${c.value}' 
                  data-row-index='${this.rowCount + rowIndex}' 
                  data-col-index='${i}' 
                  class='websy-trigger trigger-item ${this.options.columns[i].clickable === true ? 'clickable' : ''} ${this.options.columns[i].classes || ''}' 
                  style='${style}'
                  colspan='${c.colspan || 1}'
                  rowspan='${c.rowspan || 1}'
                >${c.displayText || this.options.columns[i].linkText || c.value}</td>
              `
            } 
            else {  
              let info = c.value
              if (this.options.columns[i].showAsImage === true) {
                c.value = `
                  <img src='${c.value}'>
                `
              }            
              return `
                <td 
                  data-info='${info}' 
                  data-row-index='${this.rowCount + rowIndex}' 
                  data-col-index='${i}' 
                  class='${this.options.columns[i].classes || ''}' 
                  style='${style}'
                  colspan='${c.colspan || 1}'
                  rowspan='${c.rowspan || 1}'
                >${c.value}</td>
              `
            }
          }
        }).join('') + '</tr>'
      }).join('')
      this.data = this.data.concat(data)
      this.rowCount = this.data.length      
    }    
    bodyEl.innerHTML += bodyHTML    
    if (this.options.virtualScroll === true) {
      // get height of the thead      
      if (this.options.paging !== 'pages') {
        const headEl = document.getElementById(`${this.elementId}_head`)              
        const vScrollContainerEl = document.getElementById(`${this.elementId}_vScrollContainer`)
        vScrollContainerEl.style.top = `${headEl.clientHeight}px`       
      }      
      const hScrollContainerEl = document.getElementById(`${this.elementId}_hScrollContainer`)
      let left = 0
      const cells = bodyEl.querySelectorAll(`tr:first-of-type td`)
      for (let i = 0; i < this.options.leftColumns; i++) {
        left += cells[i].offsetWidth || cells[i].clientWidth        
      }
      hScrollContainerEl.style.left = `${left}px`      
    }
  }
  buildSearchIcon (columnIndex) {
    return `
      <div class="websy-table-search-icon" data-col-index="${columnIndex}">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><title>ionicons-v5-f</title><path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><line x1="338.29" y1="338.29" x2="448" y2="448" style="fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg>
      </div>
    `
  }  
  handleClick (event) {
    if (event.target.classList.contains('download-button')) {
      window.viewManager.dataExportController.exportData(this.options.model)
    }
    if (event.target.classList.contains('sortable-column')) {
      const colIndex = +event.target.getAttribute('data-index')
      const sortIndex = +event.target.getAttribute('data-sort-index')
      const column = this.options.columns[colIndex]
      if (this.options.onSort) {
        this.options.onSort(event, column, colIndex, sortIndex)
      }
      else {
        this.internalSort(column, colIndex)
      }
      // const colIndex = +event.target.getAttribute('data-index')
      // const dimIndex = +event.target.getAttribute('data-dim-index')
      // const expIndex = +event.target.getAttribute('data-exp-index')
      // const reverse = event.target.getAttribute('data-reverse') === 'true'
      // const patchDefs = [{
      //   qOp: 'replace',
      //   qPath: '/qHyperCubeDef/qInterColumnSortOrder',
      //   qValue: JSON.stringify([colIndex])
      // }]
      // patchDefs.push({
      //   qOp: 'replace',
      //   qPath: `/qHyperCubeDef/${dimIndex > -1 ? 'qDimensions' : 'qMeasures'}/${dimIndex > -1 ? dimIndex : expIndex}/qDef/qReverseSort`,
      //   qValue: JSON.stringify(reverse)
      // })
      // this.options.model.applyPatches(patchDefs) // .then(() => this.render())
    } 
    else if (event.target.classList.contains('websy-table-search-icon')) {
      // let field = event.target.getAttribute('data-field')
      // window.viewManager.views.global.objects[1].instance.show(field, { x: event.pageX, y: event.pageY }, () => {
      //   event.target.classList.remove('active')
      // })
      const colIndex = +event.target.getAttribute('data-col-index')      
      if (this.options.columns[colIndex].onSearch) {
        this.options.columns[colIndex].onSearch(event, this.options.columns[colIndex])
      } 
    }
    else if (event.target.classList.contains('clickable')) {
      const colIndex = +event.target.getAttribute('data-col-index')
      const rowIndex = +event.target.getAttribute('data-row-index')
      if (this.options.onClick) {
        this.options.onClick(event, this.data[rowIndex][colIndex], this.data[rowIndex], this.options.columns[colIndex])
      }      
    }
    else if (event.target.classList.contains('websy-page-num')) {
      const pageNum = +event.target.getAttribute('data-page')
      if (this.options.onSetPage) {
        this.options.onSetPage(pageNum)
      }
    }
    else if (event.target.classList.contains('websy-h-scroll-container')) {
      console.log('scroll handle clicked', event)
      let clickX = event.clientX
      let elX = event.target.getBoundingClientRect().left
      const handleEl = document.getElementById(`${this.elementId}_hScrollHandle`)
      let startPoint = clickX - elX - (handleEl.clientWidth / 2)
      startPoint = Math.max(0, Math.min(startPoint, event.target.clientWidth - handleEl.clientWidth))
      handleEl.style.left = `${startPoint}px`
      if (this.options.onScrollX) {
        this.options.onScrollX(startPoint)
      } 
    }
  }
  handleMouseDown (event) {
    if (event.target.classList.contains('websy-scroll-handle')) {
      this.scrolling = true
      const el = document.getElementById(this.elementId)
      el.classList.add('scrolling')
    }
    if (event.target.classList.contains('websy-scroll-handle-x')) {
      const handleEl = document.getElementById(`${this.elementId}_hScrollHandle`)
      this.handleXStart = handleEl.offsetLeft
      this.scrollXStart = event.clientX
      this.scrollDirection = 'X'
    }
  }
  handleGlobalMouseUp (event) {
    this.scrolling = false
    const el = document.getElementById(this.elementId)
    if (el) {
      el.classList.remove('scrolling') 
    }    
  }
  handleMouseUp (event) {
    this.scrolling = false
    const el = document.getElementById(this.elementId)
    el.classList.remove('scrolling')
  }
  handleMouseMove (event) {  
    if (this.tooltipTimeoutFn) {
      event.target.classList.remove('websy-delayed-info')
      clearTimeout(this.tooltipTimeoutFn)
    }  
    if (event.target.tagName === 'TD') {
      this.tooltipTimeoutFn = setTimeout(() => {
        event.target.classList.add('websy-delayed-info')
      }, 500)  
    }    
    if (this.scrolling === true && this.options.virtualScroll === true) {
      const tableContainerEl = document.getElementById(`${this.elementId}_tableContainer`)
      if (this.scrollDirection === 'X') {
        const handleEl = document.getElementById(`${this.elementId}_hScrollHandle`)      
        // console.log(this.handleXStart + handleEl.offsetWidth + (event.clientX - this.scrollXStart), this.columnParameters.scrollableWidth)        
        let startPoint = 0
        if (this.handleXStart + (event.clientX - this.scrollXStart) < this.columnParameters.scrollableWidth - handleEl.offsetWidth) {
          handleEl.style.left = `${this.handleXStart + (event.clientX - this.scrollXStart)}px`
          startPoint = this.handleXStart + (event.clientX - this.scrollXStart)
        }
        else {
          startPoint = this.columnParameters.scrollableWidth - handleEl.offsetWidth
        }
        if (this.handleXStart + (event.clientX - this.scrollXStart) < 0) {
          handleEl.style.left = 0
          startPoint = 0
        }
        if (this.options.onScrollX) {
          this.options.onScrollX(startPoint)
        } 
      }      
    }
  }
  handleMouseOut (event) {
    if (this.tooltipTimeoutFn) {
      event.target.classList.remove('websy-delayed-info')
      clearTimeout(this.tooltipTimeoutFn)
    }
  }
  handleScroll (event) {
    if (this.options.onScroll && this.options.paging === 'scroll') {
      this.options.onScroll(event)
    }    
  } 
  hideError () {
    const el = document.getElementById(`${this.elementId}_tableContainer`)
    if (el) {
      el.classList.remove('has-error')
    }
    const tableEl = document.getElementById(`${this.elementId}_table`)
    tableEl.classList.remove('hidden')
    const containerEl = document.getElementById(`${this.elementId}_errorContainer`)
    if (containerEl) {
      containerEl.classList.remove('active')
    }
  }
  hideLoading () {
    if (this.options.onLoading) {
      this.options.onLoading(false)
    }
    else {
      this.loadingDialog.hide()
    }
  }
  internalSort (column, colIndex) {
    this.options.columns.forEach((c, i) => {
      c.activeSort = i === colIndex      
    })
    if (column.sortFunction) {
      this.data = column.sortFunction(this.data, column)
    }
    else {
      let sortProp = 'value'
      let sortOrder = column.sort === 'asc' ? 'desc' : 'asc' 
      column.sort = sortOrder
      let sortType = column.sortType || 'alphanumeric'     
      if (column.sortProp) {
        sortProp = column.sortProp
      }
      this.data.sort((a, b) => {
        switch (sortType) {
        case 'numeric':
          if (sortOrder === 'asc') {
            return a[colIndex][sortProp] - b[colIndex][sortProp]
          }
          else {
            return b[colIndex][sortProp] - a[colIndex][sortProp]
          }          
        default:
          if (sortOrder === 'asc') {
            return a[colIndex][sortProp] > b[colIndex][sortProp] ? 1 : -1
          }
          else {
            return a[colIndex][sortProp] < b[colIndex][sortProp] ? 1 : -1
          }
        }
      })
    }
    this.render(this.data)
  } 
  render (data) {
    if (!this.options.columns) {
      return
    }
    this.hideError()
    this.data = []
    this.rowCount = 0
    const bodyEl = document.getElementById(`${this.elementId}_body`)
    bodyEl.innerHTML = ''
    if (this.options.allowDownload === true) {
      // doesn't do anything yet
      const el = document.getElementById(this.elementId)
      if (el) {
        el.classList.add('allow-download')
      } 
      else {
        el.classList.remove('allow-download')
      }
    }
    // let colGroupHTML = this.options.columns.map(c => `<col style="${c.width ? 'width: ' + c.width : ''}"></col>`)
    let headHTML = '<tr>' + this.options.columns.map((c, i) => {
      if (c.show !== false) {
        let style = ''
        if (c.style) {
          style += c.style
        }
        if (c.width) {
          style += `width: ${c.width || 'auto'}; `
        }
        return `
        <th style="${style}">
          <div class ="tableHeader">
            <div class="leftSection">
              <div
                class="tableHeaderField ${['asc', 'desc'].indexOf(c.sort) !== -1 ? 'sortable-column' : ''}"
                data-sort-index="${c.sortIndex || i}"
                data-index="${i}"
                data-sort="${c.sort}"
                style="${c.style || ''}"                
              >
                ${c.name}
              </div>
            </div>
            <div class="${c.activeSort ? c.sort + ' sortOrder' : ''}"></div>
            ${c.searchable === true ? this.buildSearchIcon(i) : ''}
          </div>
        </th>
        `
      }
    }).join('') + '</tr>'
    const headEl = document.getElementById(`${this.elementId}_head`)
    headEl.innerHTML = headHTML
    const dropdownEl = document.getElementById(`${this.elementId}_dropdownContainer`)
    if (dropdownEl.innerHTML === '') {
      let dropdownHTML = ``
      this.options.columns.forEach((c, i) => {
        if (c.searchable && c.searchField) {      
          dropdownHTML += `
            <div id="${this.elementId}_columnSearch_${i}" class="websy-modal-dropdown"></div>
          `
        }
      })    
      dropdownEl.innerHTML = dropdownHTML 
    }    
    // const colGroupEl = document.getElementById(`${this.elementId}_cols`)
    // colGroupEl.innerHTML = colGroupHTML
    // let footHTML = '<tr>' + this.options.columns.map((c, i) => {
    //   if (c.show !== false) {
    //     return `
    //       <th></th>
    //     `
    //   }
    // }).join('') + '</tr>'
    // const footEl = document.getElementById(`${this.elementId}_foot`)
    // footEl.innerHTML = footHTML
    if (this.options.paging === 'pages') {
      const pagingEl = document.getElementById(`${this.elementId}_pageList`)
      if (pagingEl) {
        let pages = (new Array(this.options.pageCount)).fill('').map((item, index) => {
          return `<li data-page="${index}" class="websy-page-num ${(this.options.pageNum === index) ? 'active' : ''}">${index + 1}</li>`
        })
        let startIndex = 0
        if (this.options.pageCount > 8) {
          startIndex = Math.max(0, this.options.pageNum - 4)
          pages = pages.splice(startIndex, 10)
          if (startIndex > 0) {
            pages.splice(0, 0, `<li>Page&nbsp;</li><li data-page="0" class="websy-page-num">First</li><li>...</li>`)
          }
          else {
            pages.splice(0, 0, '<li>Page&nbsp;</li>')
          }
          if (this.options.pageNum < this.options.pageCount - 1) {
            pages.push('<li>...</li>')
            pages.push(`<li data-page="${this.options.pageCount - 1}" class="websy-page-num">Last</li>`)
          }
        }
        pagingEl.innerHTML = pages.join('')
      }
    }
    if (data) {      
      this.appendRows(data)
    }
  } 
  showError (options) {
    const el = document.getElementById(`${this.elementId}_tableContainer`)
    if (el) {
      el.classList.add('has-error')
    }
    const tableEl = document.getElementById(`${this.elementId}_table`)
    tableEl.classList.add('hidden')
    const containerEl = document.getElementById(`${this.elementId}_errorContainer`)
    if (containerEl) {
      containerEl.classList.add('active')
    }
    if (options.title) {
      const titleEl = document.getElementById(`${this.elementId}_errorTitle`)
      if (titleEl) {
        titleEl.innerHTML = options.title
      } 
    }
    if (options.message) {
      const messageEl = document.getElementById(`${this.elementId}_errorMessage`)
      if (messageEl) {
        messageEl.innerHTML = options.message
      } 
    }
  } 
  setHorizontalScroll (options) {
    const el = document.getElementById(`${this.elementId}_hScrollHandle`)
    if (options.width) {
      el.style.width = `${options.width}px`
    }
  }
  setWidth (width) {
    const el = document.getElementById(`${this.elementId}_table`)
    if (el) {
      el.style.width = `${width}px`
    }
  }
  showLoading (options) {
    if (this.options.onLoading) {
      this.options.onLoading(true)
    }
    else {
      this.loadingDialog.show(options)
    }
  }
  getColumnParameters (values) {
    const tableEl = document.getElementById(`${this.elementId}_table`)
    tableEl.style.tableLayout = 'auto'
    tableEl.style.width = 'auto'
    const headEl = document.getElementById(`${this.elementId}_head`)
    const bodyEl = document.getElementById(`${this.elementId}_body`)
    headEl.innerHTML = '<tr style="visibility: hidden;">' + values.map((c, i) => `
      <th>
        <div class ="tableHeader">
          <div class="leftSection">
            <div
              class="tableHeaderField"              
            >
              ${c.value || 'nbsp;'}
            </div>
          </div>          
          ${c.searchable === true ? this.buildSearchIcon(i) : ''}
        </div>
      </th>
    `).join('') + '</tr>'
    bodyEl.innerHTML = '<tr style="visibility: hidden;">' + values.map(c => `
      <td                 
        style='height: ${this.options.cellSize}px; line-height: ${this.options.cellSize}px; padding: 10px 5px;'
      >${c.value || '&nbsp;'}</td>
    `).join('') + '</tr>'    
    // get height of the first data cell
    const cells = bodyEl.querySelectorAll(`tr:first-of-type td`)
    const tableContainerEl = document.getElementById(`${this.elementId}_tableContainer`)
    const cellHeight = cells[0].offsetHeight || cells[0].clientHeight
    const cellWidths = []
    let accWidth = 0
    let nonScrollableWidth = 0
    for (let i = 0; i < cells.length; i++) {
      if (i < this.options.leftColumns) {
        nonScrollableWidth += values[i].width || cells[i].offsetWidth || cells[i].clientWidth
      }
      cellWidths.push(values[i].width || cells[i].offsetWidth || cells[i].clientWidth)      
      accWidth += values[i].width || cells[i].offsetWidth || cells[i].clientWidth
    }
    // if the table doesn't fill the available space we adjust the space so that the columns grow
    if (accWidth < (tableContainerEl.offsetWidth || tableContainerEl.clientWidth) - nonScrollableWidth) {
      for (let i = this.options.leftColumns; i < cellWidths.length; i++) {
        cellWidths[i] = ((tableContainerEl.offsetWidth || tableContainerEl.clientWidth) - nonScrollableWidth) / (cellWidths.length - this.options.leftColumns)
      }
    }
    // const cellWidth = firstDataCell.offsetWidth || firstDataCell.clientWidth        
    // tableEl.style.width = ''
    this.columnParameters = { 
      cellHeight, 
      cellWidths, 
      availableHeight: tableContainerEl.offsetHeight || tableContainerEl.clientHeight, 
      availableWidth: tableContainerEl.offsetWidth || tableContainerEl.clientWidth,
      nonScrollableWidth,
      scrollableWidth: (tableContainerEl.offsetWidth || tableContainerEl.clientWidth) - nonScrollableWidth
    }
    bodyEl.innerHTML = ''
    tableEl.style.tableLayout = ''
    tableEl.style.width = ''
    return this.columnParameters
  }
}

/* global WebsyDesigns */ 
class WebsyTable3 {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      virtualScroll: false,
      showTotalsAbove: true,
      minHandleSize: 20,
      maxColWidth: '50%',
      allowPivoting: false,
      searchIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><title>ionicons-v5-f</title><path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><line x1="338.29" y1="338.29" x2="448" y2="448" style="fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg>`,
      plusIcon: WebsyDesigns.Icons.PlusFilled,
      minusIcon: WebsyDesigns.Icons.MinusFilled
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.sizes = {}
    this.scrollDragging = false
    this.cellDragging = false
    this.vScrollRequired = false
    this.hScrollRequired = false
    this.pinnedColumns = 0
    this.startRow = 0
    this.endRow = 0
    this.startCol = 0
    this.endCol = 0    
    this.mouseYStart = 0    
    this.mouseYStart = 0
    if (!elementId) {
      console.log('No element Id provided for Websy Table')		
      return
    }
    const el = document.getElementById(this.elementId)    
    if (el) {
      let html = `
        <div id='${this.elementId}_tableContainer' class='websy-vis-table-3 ${this.options.paging === 'pages' ? 'with-paging' : ''} ${this.options.virtualScroll === true ? 'with-virtual-scroll' : ''}'>
          <!--<div class="download-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z"/></svg>
          </div>-->
          <div id="${this.elementId}_tableInner" class="websy-table-inner-container">
            <table id="${this.elementId}_tableHeader" class="websy-table-header"></table>
            <table id="${this.elementId}_tableBody" class="websy-table-body"></table>
            <table id="${this.elementId}_tableFooter" class="websy-table-footer"></table>
            <div id="${this.elementId}_vScrollContainer" class="websy-v-scroll-container">
              <div id="${this.elementId}_vScrollHandle" class="websy-scroll-handle websy-scroll-handle-y"></div>
            </div>
            <div id="${this.elementId}_hScrollContainer" class="websy-h-scroll-container">
              <div id="${this.elementId}_hScrollHandle" class="websy-scroll-handle websy-scroll-handle-x"></div>
            </div>
          </div>     
          <div id="${this.elementId}_errorContainer" class='websy-vis-error-container'>
            <div>
              <div id="${this.elementId}_errorTitle"></div>
              <div id="${this.elementId}_errorMessage"></div>
            </div>            
          </div>
          <div id="${this.elementId}_dropdownContainer"></div>
          <div id="${this.elementId}_loadingContainer"></div>
        </div>
      `      
      if (this.options.paging === 'pages') {
        html += `
          <div class="websy-table-paging-container">
            Show <div id="${this.elementId}_pageSizeSelector" class="websy-vis-page-selector"></div> rows
            <ul id="${this.elementId}_pageList" class="websy-vis-page-list"></ul>
          </div>
        `
      }
      el.innerHTML = html
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('mousedown', this.handleMouseDown.bind(this))
      window.addEventListener('mousemove', this.handleMouseMove.bind(this))
      window.addEventListener('mouseup', this.handleMouseUp.bind(this))
      let scrollEl = document.getElementById(`${this.elementId}_tableBody`)
      if (scrollEl) {
        scrollEl.addEventListener('wheel', this.handleScrollWheel.bind(this))
      }
      this.loadingDialog = new WebsyDesigns.LoadingDialog(`${this.elementId}_loadingContainer`)
      this.render(this.options.data)
    }
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  set columns (columns) {
    this.options.columns = columns
    this.renderColumnHeaders()
  }
  set totals (totals) {
    this.options.totals = totals
    this.renderTotals()
  }
  appendRows (data) {
    this.hideError()
    let bodyEl = document.getElementById(`${this.elementId}_tableBody`)    
    if (bodyEl) {
      if (this.options.virtualScroll === true) {
        bodyEl.innerHTML = this.buildBodyHtml(data, true)
      }      
      else {
        bodyEl.innerHTML += this.buildBodyHtml(data, true)
      }
    }
    // this.data = this.data.concat(data)
    // this.rowCount = this.data.length   
  }
  buildBodyHtml (data = [], useWidths = false) {
    if (!this.options.columns) {
      return ''
    }
    if (data.length === 0) {
      return ''
    }
    let bodyHtml = ``
    let sizingColumns = this.options.columns[this.options.columns.length - 1]
    if (useWidths === true) {
      bodyHtml += '<colgroup>'
      bodyHtml += sizingColumns.map(c => `
        <col
          style='width: ${c.width || c.actualWidth}px!important'
        ></col>
      `).join('')
      bodyHtml += '</colgroup>'
    }
    data.forEach((row, rowIndex) => {
      bodyHtml += `<tr class="websy-table-row">`
      row.forEach((cell, cellIndex) => {
        let sizeIndex = cell.level || cellIndex        
        if (typeof sizingColumns[sizeIndex] === 'undefined') {
          return // need to revisit this logic
        }
        let style = ''
        let divStyle = ''
        if (useWidths === true && (+cell.colspan === 1 || !cell.colspan)) {
          style = `width: ${sizingColumns[sizeIndex].width || sizingColumns[sizeIndex].actualWidth}px!important; `        
          divStyle = style
        }
        if (cell.style) {
          style += cell.style
        }
        if (useWidths === true && (+cell.colspan === 1 || !cell.colspan)) {
          style += `max-width: ${sizingColumns[sizeIndex].width || sizingColumns[sizeIndex].actualWidth}px!important;`
          divStyle += `max-width: ${sizingColumns[sizeIndex].width || sizingColumns[sizeIndex].actualWidth}px!important;`
        }        
        if (cell.backgroundColor) {
          style += `background-color: ${cell.backgroundColor}; `
          if (!cell.color) {
            style += `color: ${WebsyDesigns.Utils.getLightDark(cell.backgroundColor)}; `  
          }
        }
        if (cell.color) {
          style += `color: ${cell.color}; `
        }
        // console.log('rowspan', cell.rowspan)
        bodyHtml += `<td 
          class='websy-table-cell ${sizeIndex < this.pinnedColumns ? 'pinned' : 'unpinned'} ${(cell.classes || []).join(' ')}'
          style='${style}'
          data-info='${cell.value}'
          colspan='${cell.colspan || 1}'
          rowspan='${cell.rowspan || 1}'
          data-row-index='${rowIndex}'
          data-col-index='${cellIndex}'
        `
        // if (useWidths === true) {
        //   bodyHtml += `
        //     style='width: ${sizingColumns[cellIndex].width || sizingColumns[cellIndex].actualWidth}px!important'
        //     width='${sizingColumns[cellIndex].width || sizingColumns[cellIndex].actualWidth}'
        //   `
        // }
        bodyHtml += `
        ><div style='${divStyle}'>`
        if (cell.expandable === true) {
          bodyHtml += `<i 
            data-row-index='${rowIndex}'
            data-col-index='${cell.level || cellIndex}'
            class='websy-table-cell-expand'
          >${this.options.plusIcon}</i>`
        }
        if (cell.collapsable === true) {
          bodyHtml += `<i 
            data-row-index='${rowIndex}'
            data-col-index='${cell.level || cellIndex}'
            class='websy-table-cell-collapse'
          >${this.options.minusIcon}</i>`
        }
        if (sizingColumns[sizeIndex].showAsLink === true && cell.value.trim() !== '') {
          cell.value = `
            <a href='${cell.value}' target='${sizingColumns[sizeIndex].openInNewTab === true ? '_blank' : '_self'}'>${cell.displayText || sizingColumns[sizeIndex].linkText || cell.value}</a>
          `
        }
        if (sizingColumns[sizeIndex].showAsRouterLink === true && cell.value.trim() !== '') {
          cell.value = `
            <a data-view='${(cell.link || cell.value).replace(/'/g, '\'')}' class='websy-trigger'>${cell.value}</a>
          `
        }
        if (sizingColumns[sizeIndex].showAsImage === true) {
          cell.value = `
            <img               
              style="width: ${sizingColumns[sizeIndex].imgWidth ? sizingColumns[sizeIndex].imgWidth : 'auto'}; height: ${sizingColumns[sizeIndex].imgHeight ? sizingColumns[sizeIndex].imgHeight : 'auto'};" 
              src='${cell.value}'
              ${sizingColumns[sizeIndex].errorImage ? 'onerror="this.src=\'' + sizingColumns[sizeIndex].errorImage + '\'"' : ''}
            />
          `
        }
        bodyHtml += `
          ${cell.value}
        </div></td>`
      })
      bodyHtml += `</tr>`
    })    
    // bodyHtml += `</div>`    
    return bodyHtml
  }
  buildHeaderHtml (useWidths = false) {
    if (!this.options.columns) {
      return ''
    }
    let headerHtml = ''
    let sizingColumns = this.options.columns[this.options.columns.length - 1]
    if (useWidths === true) {
      headerHtml += '<colgroup>'
      headerHtml += sizingColumns.map(c => `
        <col
          style='width: ${c.width || c.actualWidth}px!important'
        ></col>
      `).join('')
      headerHtml += '</colgroup>'
    }
    this.options.columns.forEach((row, rowIndex) => {
      if (useWidths === false && rowIndex !== this.options.columns.length - 1) {
        // if we're calculating the size we only want to render the last row of column headers
        return
      }
      headerHtml += `<tr class="websy-table-row  websy-table-header-row">`
      row.forEach((col, colIndex) => {
        let style = `width: ${sizingColumns[colIndex].width || sizingColumns[colIndex].actualWidth}px!important; `        
        let divStyle = style
        if (useWidths === true) {
          style += `max-width: ${sizingColumns[colIndex].width || sizingColumns[colIndex].actualWidth}px!important;`        
          divStyle += `max-width: ${sizingColumns[colIndex].width || sizingColumns[colIndex].actualWidth}px!important;`        
        }
        if (col.style) {
          style += col.style
        }
        headerHtml += `<td 
          class='websy-table-cell ${colIndex < this.pinnedColumns ? 'pinned' : 'unpinned'}'  
          style='${style}'       
          colspan='${col.colspan || 1}'
          rowspan='${col.rowspan || 1}'
        `
        // if (useWidths === true && rowIndex === this.options.columns.length - 1) {
        //   headerHtml += `
        //     style='width: ${col.width || col.actualWidth}px'
        //     width='${col.width || col.actualWidth}'
        //   `
        // }
        headerHtml += `><div style='${divStyle}'>${col.name}${col.searchable === true ? this.buildSearchIcon(col, colIndex) : ''}</div></td>`
      })
      headerHtml += `</tr>`
    })
    const dropdownEl = document.getElementById(`${this.elementId}_dropdownContainer`)          
    this.options.columns[this.options.columns.length - 1].forEach((c, i) => {
      if (c.searchable && c.isExternalSearch === true) {      
        const testEl = document.getElementById(`${this.elementId}_columnSearch_${c.dimId || i}`)
        if (!testEl) {
          const newE = document.createElement('div')
          newE.id = `${this.elementId}_columnSearch_${c.dimId || i}`
          newE.className = 'websy-modal-dropdown'
          dropdownEl.appendChild(newE)
        }
      }
    })      
    return headerHtml
  }
  buildSearchIcon (col, index) {
    // return `<div class="websy-table-search-icon" data-col-id="${col.dimId}" data-col-index="${index}">
    return `<div class="websy-table-search-icon" data-col-index="${index}">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><title>ionicons-v5-f</title><path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><line x1="338.29" y1="338.29" x2="448" y2="448" style="fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg>
      </div>`
  } 
  buildTotalHtml (useWidths = false) {
    if (!this.options.totals) {
      return ''
    }
    let totalHtml = `<tr class="websy-table-row  websy-table-total-row">`
    this.options.totals.forEach((col, colIndex) => {
      totalHtml += `<td 
        class='websy-table-cell'
        colspan='${col.colspan || 1}'
        rowspan='${col.rowspan || 1}'
      `
      if (useWidths === true) {
        totalHtml += `
          style='width: ${this.options.columns[this.options.columns.length - 1][colIndex].width || this.options.columns[this.options.columns.length - 1][colIndex].actualWidth}px'
          width='${col.width || col.actualWidth}'
        `
      }
      totalHtml += `        
        >
        ${col.value}
      </td>`
    })
    totalHtml += `</tr>`
    return totalHtml
  }
  calculateSizes (sample = [], totalRowCount, totalColumnCount, pinnedColumns) {
    this.totalRowCount = totalRowCount // probably need some error handling here if no value is passed in
    this.totalColumnCount = totalColumnCount // probably need some error handling here if no value is passed in
    this.pinnedColumns = pinnedColumns // probably need some error handling here if no value is passed in    
    let outerEl = document.getElementById(this.elementId)
    let tableEl = document.getElementById(`${this.elementId}_tableContainer`)
    let headEl = document.getElementById(`${this.elementId}_tableHeader`)
    headEl.style.width = 'auto'
    headEl.innerHTML = this.buildHeaderHtml()        
    this.sizes.outer = outerEl.getBoundingClientRect()
    this.sizes.table = tableEl.getBoundingClientRect()
    this.sizes.header = headEl.getBoundingClientRect()
    let maxWidth
    if (typeof this.options.maxColWidth === 'number') {
      maxWidth = this.options.maxColWidth
    }
    else if (this.options.maxColWidth.indexOf('%') !== -1) {
      maxWidth = this.sizes.outer.width * (+(this.options.maxColWidth.replace('%', '')) / 100)
    }
    else if (this.options.maxColWidth.indexOf('px') !== -1) {
      maxWidth = +this.options.maxColWidth.replace('px', '')
    }
    let bodyEl = document.getElementById(`${this.elementId}_tableBody`)
    bodyEl.style.width = 'auto'
    bodyEl.innerHTML = this.buildBodyHtml([sample])
    let footerEl = document.getElementById(`${this.elementId}_tableFooter`)
    footerEl.innerHTML = this.buildTotalHtml()
    this.sizes.total = footerEl.getBoundingClientRect()
    const rows = Array.from(tableEl.querySelectorAll('.websy-table-row'))    
    let totalWidth = 0
    this.sizes.scrollableWidth = this.sizes.outer.width
    let firstNonPinnedColumnWidth = 0
    rows.forEach((row, rowIndex) => {
      Array.from(row.children).forEach((col, colIndex) => {
        let colSize = col.getBoundingClientRect()
        this.sizes.cellHeight = colSize.height        
        if (this.options.columns[this.options.columns.length - 1][colIndex]) {
          if (!this.options.columns[this.options.columns.length - 1][colIndex].actualWidth) {
            this.options.columns[this.options.columns.length - 1][colIndex].actualWidth = 0
          }
          this.options.columns[this.options.columns.length - 1][colIndex].actualWidth = Math.min(Math.max(this.options.columns[this.options.columns.length - 1][colIndex].actualWidth, colSize.width), maxWidth)          
          this.options.columns[this.options.columns.length - 1][colIndex].cellHeight = colSize.height   
          if (colIndex >= this.pinnedColumns) {
            firstNonPinnedColumnWidth = this.options.columns[this.options.columns.length - 1][colIndex].actualWidth
          }      
        }        
      })      
    })
    this.options.columns[this.options.columns.length - 1].forEach((col, colIndex) => {
      if (colIndex < this.pinnedColumns) {
        this.sizes.scrollableWidth -= col.actualWidth
      }
    })
    this.sizes.totalWidth = this.options.columns[this.options.columns.length - 1].reduce((a, b) => a + (b.width || b.actualWidth), 0)    
    this.sizes.totalNonPinnedWidth = this.options.columns[this.options.columns.length - 1].filter((c, i) => i >= this.pinnedColumns).reduce((a, b) => a + (b.width || b.actualWidth), 0)
    this.sizes.pinnedWidth = this.sizes.totalWidth - this.sizes.totalNonPinnedWidth
    // const outerSize = outerEl.getBoundingClientRect()
    if (this.sizes.totalWidth < this.sizes.outer.width) {
      let equalWidth = (this.sizes.outer.width - this.sizes.totalWidth) / this.options.columns[this.options.columns.length - 1].length
      this.sizes.totalWidth = 0
      this.sizes.totalNonPinnedWidth = 0      
      this.options.columns[this.options.columns.length - 1].forEach((c, i) => {        
        // if (!c.width) {
        // if (c.actualWidth < equalWidth) {
        // adjust the width
        if (c.width) {
          c.width += equalWidth
        }
        c.actualWidth += equalWidth
        //   }
        // }
        this.sizes.totalWidth += c.width || c.actualWidth
        if (i < this.pinnedColumns) {
          this.sizes.totalNonPinnedWidth += c.width || c.actualWidth
        }
        // equalWidth = (outerSize.width - this.sizes.totalWidth) / (this.options.columns[this.options.columns.length - 1].length - (i + 1))
      })
    }
    // check that we have enough from for all of the pinned columns plus 1 non pinned column    
    if (this.sizes.pinnedWidth > (this.sizes.outer.width - firstNonPinnedColumnWidth)) {
      this.sizes.totalWidth = 0
      let diff = this.sizes.pinnedWidth - (this.sizes.outer.width - firstNonPinnedColumnWidth)
      // let colDiff = diff / this.pinnedColumns
      for (let i = 0; i < this.options.columns[this.options.columns.length - 1].length; i++) {        
        if (i < this.pinnedColumns) {          
          let colDiff = (this.options.columns[this.options.columns.length - 1][i].actualWidth / this.sizes.pinnedWidth) * diff
          this.options.columns[this.options.columns.length - 1][i].actualWidth -= colDiff
        }
        this.sizes.totalWidth += this.options.columns[this.options.columns.length - 1][i].width || this.options.columns[this.options.columns.length - 1][i].actualWidth
      }
    }
    // take the height of the last cell as the official height for data cells
    // this.sizes.dataCellHeight = this.options.columns[this.options.columns.length - 1].cellHeight
    headEl.innerHTML = ''
    bodyEl.innerHTML = ''
    footerEl.innerHTML = ''
    headEl.style.width = 'initial'
    bodyEl.style.width = 'initial'
    this.sizes.bodyHeight = this.sizes.table.height - (this.sizes.header.height + this.sizes.total.height)
    this.sizes.rowsToRender = Math.ceil(this.sizes.bodyHeight / this.sizes.cellHeight)
    this.sizes.rowsToRenderPrecise = this.sizes.bodyHeight / this.sizes.cellHeight
    this.startRow = 0
    this.endRow = this.sizes.rowsToRender
    this.startCol = 0
    this.endCol = this.options.columns[this.options.columns.length - 1].length
    if (this.sizes.rowsToRender < this.totalRowCount) {
      this.vScrollRequired = true      
    }
    else {
      this.vScrollRequired = false 
    }
    if (this.sizes.totalWidth > this.sizes.outer.width) {
      this.hScrollRequired = true
    }
    else {
      this.hScrollRequired = false
    }
    this.options.allColumns = this.options.columns.map(c => c)
    // console.log('sizes', this.sizes)
    return this.sizes    
  }
  createSample (data) {
    let output = []
    this.options.columns[this.options.columns.length - 1].forEach((col, colIndex) => {
      if (col.maxLength) {
        output.push({value: new Array(col.maxLength).fill('W').join('')})
      }
      else if (data) {
        let longest = ''
        for (let i = 0; i < Math.min(data.length, 1000); i++) { 
          if (data[i].length === this.options.columns[this.options.columns.length - 1].length) {
            if (longest.length < data[i][colIndex].value.length) {
              longest = data[i][colIndex].value
            }
          }
        }
        output.push({value: longest})
      }
      else {
        output.push({value: ''})
      }
    })
    return output
  }
  handleClick (event) {
    const colIndex = +event.target.getAttribute('data-col-index')
    const rowIndex = +event.target.getAttribute('data-row-index')
    if (event.target.classList.contains('websy-table-search-icon')) {     
      // console.log('clicked on search icon')            
      if (this.options.columns[this.options.columns.length - 1][colIndex].onSearch) {
        this.options.columns[this.options.columns.length - 1][colIndex].onSearch(event, this.options.columns[this.options.columns.length - 1][colIndex])
      } 
    }
    if (event.target.classList.contains('websy-table-cell-collapse')) {
      if (this.options.onCollapseCell) {
        this.options.onCollapseCell(event, +rowIndex, +colIndex)
      }
      else {
        // out of box function
      }
    }
    if (event.target.classList.contains('websy-table-cell-expand')) {
      if (this.options.onExpandCell) {
        this.options.onExpandCell(event, +rowIndex, +colIndex)
      }
      else {
        // out of box function
      }
    }
  }
  handleMouseDown (event) {
    if (event.target.classList.contains('websy-scroll-handle-y')) {
      // set up the scroll start values
      this.scrollDragging = true
      this.scrollDirection = 'y'
      const scrollHandleEl = document.getElementById(`${this.elementId}_vScrollHandle`)
      this.handleYStart = scrollHandleEl.offsetTop
      this.mouseYStart = event.pageY
      // console.log('mouse down', this.handleYStart, this.mouseYStart)
      // console.log(scrollHandleEl.offsetTop)
    }
    else if (event.target.classList.contains('websy-scroll-handle-x')) {
      this.scrollDragging = true
      this.scrollDirection = 'x'
      const scrollHandleEl = document.getElementById(`${this.elementId}_hScrollHandle`)
      this.handleXStart = scrollHandleEl.offsetLeft
      this.mouseXStart = event.pageX
    }
  }
  handleMouseMove (event) {
    // event.preventDefault()
    if (this.scrollDragging === true) {
      if (this.scrollDirection === 'y') {        
        const diff = event.pageY - this.mouseYStart
        this.scrollY(diff)
      }
      else if (this.scrollDirection === 'x') {
        const diff = event.pageX - this.mouseXStart
        this.scrollX(diff)
      }
    }
  }
  handleMouseUp (event) {
    this.scrollDragging = false
    this.cellDragging = false
    this.handleYStart = null
    this.mouseYStart = null
    this.handleXStart = null
    this.mouseXStart = null
  }
  handleScrollWheel (event) {
    if (this.options.virtualScroll === true) {
      event.preventDefault()
      // console.log('scrollwheel', event)
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        this.scrollX(Math.max(-5, Math.min(5, event.deltaX)))
      }
      else {
        this.scrollY(Math.max(-5, Math.min(5, event.deltaY)))
      }
    }    
  }
  hideError () {
    const el = document.getElementById(`${this.elementId}_tableContainer`)
    if (el) {
      el.classList.remove('has-error')
    }
    const tableEl = document.getElementById(`${this.elementId}_tableInner`)
    tableEl.classList.remove('hidden')
    const containerEl = document.getElementById(`${this.elementId}_errorContainer`)
    if (containerEl) {
      containerEl.classList.remove('active')
    }
  }
  hideLoading () {
    this.loadingDialog.hide()
  }
  render (data, calcSizes = true) {
    if (!this.options.columns) {
      console.log(`No columns provided for table with ID ${this.elementId}`)
      return
    }
    if (this.options.columns.length === 0) {
      console.log(`No columns provided for table with ID ${this.elementId}`)
      return
    }
    // this.data = []
    // Adjust the sizing of the header/body/footer
    if (calcSizes === true) {
      const sample = this.createSample(data)
      this.calculateSizes(sample, data.length, (data[0] || []).length, 0)   
    }    
    // console.log(this.options.columns)
    const tableInnerEl = document.getElementById(`${this.elementId}_tableInner`)
    if (tableInnerEl) {
      tableInnerEl.style.width = `${this.sizes.totalWidth}px`
    }
    this.renderColumnHeaders()
    this.renderTotals()
    if (data) {      
      this.appendRows(data)
    }
    let bodyEl = document.getElementById(`${this.elementId}_tableBody`)
    // bodyEl.innerHTML = this.buildBodyHtml(data, true)
    bodyEl.style.height = `calc(100% - ${this.sizes.header.height}px - ${this.sizes.total.height}px)`
    if (this.options.virtualScroll === true) {
      // set the scroll element positions
      let vScrollEl = document.getElementById(`${this.elementId}_vScrollContainer`)
      let vHandleEl = document.getElementById(`${this.elementId}_vScrollHandle`)
      if (this.vScrollRequired === true) {        
        vScrollEl.style.top = `${this.sizes.header.height + this.sizes.total.height}px`
        vScrollEl.style.height = `${this.sizes.bodyHeight}px` 
        vHandleEl.style.height = Math.max(this.options.minHandleSize, this.sizes.bodyHeight * (this.sizes.rowsToRenderPrecise / this.totalRowCount)) + 'px'
      }
      else {
        vHandleEl.style.height = '0px'
      } 
      let hScrollEl = document.getElementById(`${this.elementId}_hScrollContainer`)
      let hHandleEl = document.getElementById(`${this.elementId}_hScrollHandle`)
      if (this.hScrollRequired === true) {        
        hScrollEl.style.left = `${this.sizes.table.width - this.sizes.scrollableWidth}px`
        hScrollEl.style.width = `${this.sizes.scrollableWidth - 20}px` 
        hHandleEl.style.width = Math.max(this.options.minHandleSize, this.sizes.scrollableWidth * (this.sizes.scrollableWidth / this.sizes.totalNonPinnedWidth)) + 'px'
      }  
      else {
        hHandleEl.style.width = '0px'
      } 
    }    
  }
  renderColumnHeaders () {
    let headEl = document.getElementById(`${this.elementId}_tableHeader`)    
    if (headEl) {
      headEl.innerHTML = this.buildHeaderHtml(true)
    }
  }
  renderTotals () {
    let headEl = document.getElementById(`${this.elementId}_tableHeader`)    
    let totalHtml = this.buildTotalHtml(true)
    if (this.options.showTotalsAbove === true && headEl) {
      headEl.innerHTML += totalHtml
    }
    else {
      const footerEl = document.getElementById(`${this.elementId}_tableFooter`)
      if (footerEl) {
        footerEl.innerHTML = totalHtml
      }
    }
  }
  resize () {

  }
  showError (options) {
    const el = document.getElementById(`${this.elementId}_tableContainer`)
    if (el) {
      el.classList.add('has-error')
    }    
    const containerEl = document.getElementById(`${this.elementId}_errorContainer`)
    if (containerEl) {
      containerEl.classList.add('active')
    }
    if (options.title) {
      const titleEl = document.getElementById(`${this.elementId}_errorTitle`)
      if (titleEl) {
        titleEl.innerHTML = options.title
      } 
    }
    if (options.message) {
      const messageEl = document.getElementById(`${this.elementId}_errorMessage`)
      if (messageEl) {
        messageEl.innerHTML = options.message
      } 
    }
  }
  scrollX (diff) {
    const el = document.getElementById(`${this.elementId}_tableContainer`)
    if (!el.classList.contains('scrolling')) {
      el.classList.add('scrolling')
    }    
    if (this.scrollTimeoutFn) {
      clearTimeout(this.scrollTimeoutFn)
    }
    this.scrollTimeoutFn = setTimeout(() => {      
      el.classList.remove('scrolling')
    }, 200)    
    if (this.hScrollRequired === false) {
      return
    }
    const scrollContainerEl = document.getElementById(`${this.elementId}_hScrollContainer`)
    const scrollHandleEl = document.getElementById(`${this.elementId}_hScrollHandle`)    
    let handlePos
    if (typeof this.handleXStart !== 'undefined' && this.handleXStart !== null) {
      handlePos = this.handleXStart + diff 
    }
    else {
      handlePos = scrollHandleEl.offsetLeft + diff
    }   
    const scrollableSpace = scrollContainerEl.getBoundingClientRect().width - scrollHandleEl.getBoundingClientRect().width
    // console.log('dragging x', diff, scrollContainerEl.getBoundingClientRect().width - scrollHandleEl.getBoundingClientRect().width)
    scrollHandleEl.style.left = Math.min(scrollableSpace, Math.max(0, handlePos)) + 'px'
    if (this.options.onScroll) {
      let actualLeft = (this.sizes.totalNonPinnedWidth - this.sizes.scrollableWidth) * (Math.min(scrollableSpace, Math.max(0, handlePos)) / scrollableSpace)
      let cumulativeWidth = 0
      this.startCol = 0
      this.endCol = 0
      for (let i = this.pinnedColumns; i < this.options.allColumns[this.options.allColumns.length - 1].length; i++) {            
        cumulativeWidth += this.options.allColumns[this.options.allColumns.length - 1][i].actualWidth      
        // console.log('actualLeft', actualLeft, this.sizes.totalWidth, cumulativeWidth, cumulativeWidth + this.options.allColumns[this.options.allColumns.length - 1][i].actualWidth)
        if (actualLeft < cumulativeWidth) {
          this.startCol = i  
          break            
        }             
      } 
      cumulativeWidth = 0                
      for (let i = this.startCol; i < this.options.allColumns[this.options.allColumns.length - 1].length; i++) {
        cumulativeWidth += this.options.allColumns[this.options.allColumns.length - 1][i].actualWidth
        if (cumulativeWidth < this.sizes.scrollableWidth) {              
          this.endCol = i
        }            
      }
      if (this.endCol < this.options.allColumns[this.options.allColumns.length - 1].length - 1) {
        this.endCol += 1 
      }          
      if (this.endCol === this.options.allColumns[this.options.allColumns.length - 1].length - 1 && cumulativeWidth > this.sizes.scrollableWidth && actualLeft > 0) {
        this.startCol += 1
      } 
      this.endCol = Math.max(this.startCol, this.endCol)         
      this.options.onScroll('y', this.startRow, this.endRow, this.startCol - this.pinnedColumns, this.endCol - this.pinnedColumns)
    } 
  }
  scrollY (diff) {
    const el = document.getElementById(`${this.elementId}_tableContainer`)
    if (!el.classList.contains('scrolling')) {
      el.classList.add('scrolling')
    }    
    if (this.scrollTimeoutFn) {
      clearTimeout(this.scrollTimeoutFn)
    }
    this.scrollTimeoutFn = setTimeout(() => {      
      el.classList.remove('scrolling')
    }, 200)
    if (this.vScrollRequired === false) {
      return
    }
    const scrollContainerEl = document.getElementById(`${this.elementId}_vScrollContainer`)
    const scrollHandleEl = document.getElementById(`${this.elementId}_vScrollHandle`)    
    let handlePos
    if (typeof this.handleYStart !== 'undefined' && this.handleYStart !== null) {
      handlePos = this.handleYStart + diff 
    }
    else {
      // console.log('appending not resetting')
      handlePos = scrollHandleEl.offsetTop + diff
    }    
    const scrollableSpace = scrollContainerEl.getBoundingClientRect().height - scrollHandleEl.getBoundingClientRect().height
    // console.log('dragging y', (diff), scrollContainerEl.getBoundingClientRect().height - scrollHandleEl.getBoundingClientRect().height)
    scrollHandleEl.style.top = Math.min(scrollableSpace, Math.max(0, handlePos)) + 'px'
    if (this.options.onScroll) {
      this.startRow = Math.min(this.totalRowCount - this.sizes.rowsToRender, Math.max(0, Math.round((this.totalRowCount - this.sizes.rowsToRender) * (handlePos / scrollableSpace))))
      this.endRow = this.startRow + this.sizes.rowsToRender
      if (this.endRow === this.totalRowCount) {
        this.startRow += 1
      }
      this.options.onScroll('y', this.startRow, this.endRow, this.startCol - this.pinnedColumns, this.endCol - this.pinnedColumns)
    }
  }
  showLoading (options) {
    this.loadingDialog.show(options)
  }
}

/* global d3 include WebsyDesigns */ 
class WebsyChart {
  constructor (elementId, options) {
    const DEFAULTS = {
      margin: { 
        top: 20, 
        left: 3, 
        bottom: 3, 
        right: 3, 
        axisBottom: 0, 
        axisLeft: 0, 
        axisRight: 0, 
        axisTop: 0,
        legendBottom: 0, 
        legendLeft: 0, 
        legendRight: 0, 
        legendTop: 0 
      },
      axis: {},
      orientation: 'vertical',
      colors: ['#5e4fa2', '#3288bd', '#66c2a5', '#abdda4', '#e6f598', '#fee08b', '#fdae61', '#f46d43', '#d53e4f', '#9e0142'],
      transitionDuration: 650,
      curveStyle: 'curveLinear',
      lineWidth: 2,
      forceZero: true,
      grouping: 'grouped',
      fontSize: 14,
      symbolSize: 20,            
      showTrackingLine: true,      
      showTooltip: true,
      showLegend: false,
      legendPosition: 'bottom',
      tooltipWidth: 200
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.leftAxis = null
    this.rightAxis = null
    this.topAxis = null
    this.bottomAxis = null    
    this.renderedKeys = {}
    if (!elementId) {
      console.log('No element Id provided for Websy Chart')		
      return
    }
    this.invertOverride = (input, input2) => {
      let xAxis = 'bottomAxis'      
      if (this.options.orientation === 'horizontal') {
        xAxis = 'leftAxis'        
      }
      let width = this[xAxis].step()      
      let output
      let domain = [...this[xAxis].domain()]
      if (this.options.orientation === 'horizontal') {
        domain = domain.reverse()
      }      
      for (let j = 0; j < domain.length; j++) {                
        let breakA = this[xAxis](domain[j]) - (width / 2)
        let breakB = breakA + width
        if (input > breakA && input <= breakB) {       
          output = j
          break
        }
      }      
      return output
    }
    const el = document.getElementById(this.elementId)    
    if (el) {
      el.classList.add('websy-chart')
      if (typeof d3 === 'undefined') {
        console.error('d3 library has not been loaded')
      }
      else {
        el.innerHTML = ''        
        this.svg = d3.select(el).append('svg')
        this.legendArea = d3.select(el).append('div')
          .attr('id', `${this.elementId}_legend`)
          .attr('class', 'websy-chart-legend')
        this.legend = new WebsyDesigns.Legend(`${this.elementId}_legend`, {})
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
  close () {
    this.leftAxisLayer.selectAll('*').remove()
    this.rightAxisLayer.selectAll('*').remove()
    this.bottomAxisLayer.selectAll('*').remove()
    this.leftAxisLabel.selectAll('*').remove()
    this.rightAxisLabel.selectAll('*').remove()
    this.bottomAxisLabel.selectAll('*').remove()
    this.plotArea.selectAll('*').remove()
    this.areaLayer.selectAll('*').remove()
    this.lineLayer.selectAll('*').remove()
    this.barLayer.selectAll('*').remove()
    this.labelLayer.selectAll('*').remove()
    this.symbolLayer.selectAll('*').remove()
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
    this.trackingLineLayer
      .select('.tracking-line')
      .attr('stroke-opacity', 0)
    this.tooltip.hide()
  }
  handleEventMouseMove (event, d) {        
    let bisectDate = d3.bisector(d => {
      return this.parseX(d.x.value)
    }).left
    if (this.options.showTrackingLine === true && d3.pointer(event)) {
      let xAxis = 'bottomAxis'
      let xData = 'bottom'    
      let x0 = d3.pointer(event)[0]
      if (this.options.orientation === 'horizontal') {
        xAxis = 'leftAxis'
        xData = 'left'      
        x0 = d3.pointer(event)[1]
      }      
      let xPoint
      let data
      let tooltipHTML = ''
      let tooltipTitle = ''
      let tooltipData = []      
      if (!this[xAxis].invert) {
        this[xAxis].invert = this.invertOverride
      }
      x0 = this[xAxis].invert(x0)
      let xDiff
      if (typeof x0 === 'undefined') {
        this.tooltip.hide()
        return
      }
      let xLabel = this[xAxis].domain()[x0]
      if (this.options.orientation === 'horizontal') {
        xLabel = [...this[xAxis].domain().reverse()][x0]
      }
      this.options.data.series.forEach(s => {     
        if (this.options.data[xData].scale !== 'Time') {
          xPoint = this[xAxis](this.parseX(xLabel))
          s.data.forEach(d => {            
            if (d.x.value === xLabel) {
              if (!tooltipTitle) {
                tooltipTitle = d.x.value
              }
              if (!d.y.color) {
                d.y.color = s.color 
              }
              tooltipData.push(d.y)
            }
          })
        }
        else {     
          let index = bisectDate(s.data, x0, 1)                   
          let pointA = s.data[index - 1]
          let pointB = s.data[index]
          if (this.options.orientation === 'horizontal') {
            pointA = [...s.data].reverse()[index - 1]
            pointB = [...s.data].reverse()[index]
          }                    
          if (pointA && !pointB) {            
            xPoint = this[xAxis](this.parseX(pointA.x.value))        
            tooltipTitle = pointA.x.value
            if (!pointA.y.color) {
              pointA.y.color = s.color 
            }          
            tooltipData.push(pointA.y)
            if (typeof pointA.x.value.getTime !== 'undefined') {
              tooltipTitle = d3.timeFormat(this.options.dateFormat || this.options.calculatedTimeFormatPattern)(pointA.x.value)
            }
          }
          if (pointB && !pointA) {            
            xPoint = this[xAxis](this.parseX(pointB.x.value))
            tooltipTitle = pointB.x.value
            if (!pointB.y.color) {
              pointB.y.color = s.color 
            }          
            tooltipData.push(pointB.y)
            if (typeof pointB.x.value.getTime !== 'undefined') {
              tooltipTitle = d3.timeFormat(this.options.dateFormat || this.options.calculatedTimeFormatPattern)(pointB.x.value)
            }          
          }
          if (pointA && pointB) {
            let d0 = this[xAxis](this.parseX(pointA.x.value))
            let d1 = this[xAxis](this.parseX(pointB.x.value))
            let mid = Math.abs(d0 - d1) / 2
            if (d3.pointer(event)[0] - d0 >= mid) {              
              xPoint = d1
              tooltipTitle = pointB.x.value
              if (typeof pointB.x.value.getTime !== 'undefined') {
                tooltipTitle = d3.timeFormat(this.options.dateFormat || this.options.calculatedTimeFormatPattern)(pointB.x.value)
              }
              if (!pointB.y.color) {
                pointB.y.color = s.color 
              }          
              tooltipData.push(pointB.y)
            }
            else {
              xPoint = d0 
              tooltipTitle = pointA.x.value              
              if (typeof pointB.x.value.getTime !== 'undefined') {
                tooltipTitle = d3.timeFormat(this.options.dateFormat || this.options.calculatedTimeFormatPattern)(pointB.x.value)
              }                
              if (!pointA.y.color) {
                pointA.y.color = s.color 
              }                 
              tooltipData.push(pointA.y)
            }            
          }
        }
      })
      tooltipHTML = `          
        <ul>
      `
      tooltipHTML += tooltipData.map(d => `
        <li>
          <i style='background-color: ${d.color};'></i>
          ${d.tooltipLabel || ''}<span> - ${d.tooltipValue || d.value}</span>
        </li>
      `).join('')
      tooltipHTML += `</ul>`
      let posOptions = {
        width: this.options.tooltipWidth,
        left: 0,
        top: 0,          
        onLeft: xPoint > this.plotWidth / 2
      }      
      if (xPoint > this.plotWidth / 2) {
        posOptions.left = xPoint - this.options.tooltipWidth + this.options.margin.left + this.options.margin.axisLeft + 15
        if (this.options.data[xData].scale !== 'Time') {
          // posOptions.left -= (this[xAxis].bandwidth())
          posOptions.left += 10
        }
      } 
      else {
        posOptions.left = xPoint + this.options.margin.left + this.options.margin.axisLeft + 15
        if (this.options.data[xData].scale !== 'Time') {
          posOptions.left += (this[xAxis].bandwidth() / 2)
        }
      }      
      posOptions.top = this.options.margin.top + this.options.margin.axisTop
      if (this.options.orientation === 'horizontal') {
        delete posOptions.onLeft
        let adjuster = 0
        if (this.options.data[xData].scale !== 'Time') {
          adjuster = (this[xAxis].bandwidth() / 2) // - this.options.margin.top
        }
        posOptions = {
          width: this.options.tooltipWidth,
          left: this.options.margin.left + this.options.margin.axisLeft + this.plotWidth - this.options.tooltipWidth,
          onTop: xPoint > this.plotHeight / 2,
          positioning: 'vertical'
        }
        if (xPoint > this.plotHeight / 2) {
          posOptions.bottom = xPoint + this.options.margin.top + this.options.margin.axisTop
        } 
        else {
          posOptions.top = xPoint + this.options.margin.top + this.options.margin.axisTop + 15 + adjuster
        }
      }      
      this.tooltip.setHeight(this.plotHeight)
      this.options.showTooltip && this.tooltip.show(tooltipTitle, tooltipHTML, posOptions)        
      // }
      // else {
      //   xPoint = x0
      // }      
      if (this.options.data[xData].scale !== 'Time') {
        xPoint += (this[xAxis].bandwidth() / 2) // - this.options.margin.top
      }
      let trackingXStart = xPoint
      let trackingXEnd = xPoint
      let trackingYStart = 0
      let trackingYEnd = this.plotHeight
      if (this.options.orientation === 'horizontal') {
        trackingXStart = 0
        trackingXEnd = this.plotWidth
        trackingYStart = xPoint
        trackingYEnd = xPoint
      }
      this.trackingLineLayer
        .select('.tracking-line')
        .attr('x1', trackingXStart)
        .attr('x2', trackingXEnd)
        .attr('y1', trackingYStart)
        .attr('y2', trackingYEnd)
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4 2')
        .attr('stroke', '#cccccc')
        .attr('stroke-opacity', 1)
    }        
  }
  prep () {
    /* global d3 WebsyDesigns */ 
this.leftAxisLayer = this.svg.append('g').attr('class', 'left-axis-layer')
this.rightAxisLayer = this.svg.append('g').attr('class', 'right-axis-layer')
this.bottomAxisLayer = this.svg.append('g').attr('class', 'bottom-axis-layer')
this.leftAxisLabel = this.svg.append('g').attr('class', 'left-axis-label-layer')
this.rightAxisLabel = this.svg.append('g').attr('class', 'right-axis-label-layer')
this.bottomAxisLabel = this.svg.append('g').attr('class', 'bottom-axis-label-layer')
this.plotArea = this.svg.append('g').attr('class', 'plot-layer')
this.areaLayer = this.svg.append('g').attr('class', 'area-layer')
this.lineLayer = this.svg.append('g').attr('class', 'line-layer')
this.barLayer = this.svg.append('g').attr('class', 'bar-layer')
this.labelLayer = this.svg.append('g').attr('class', 'label-layer')
this.symbolLayer = this.svg.append('g').attr('class', 'symbol-layer')
this.refLineLayer = this.svg.append('g').attr('class', 'refline-layer')
this.trackingLineLayer = this.svg.append('g').attr('class', 'tracking-line-layer')
this.trackingLineLayer.append('line').attr('class', 'tracking-line')
this.tooltip = new WebsyDesigns.WebsyChartTooltip(this.svg)
this.eventLayer = this.svg.append('g').attr('class', 'event-line').append('rect')
this.eventLayer
  .on('mouseout', this.handleEventMouseOut.bind(this))
  .on('mousemove', this.handleEventMouseMove.bind(this))
this.render()

  }
  render (options) {
    /* global d3 options WebsyUtils */ 
if (typeof options !== 'undefined') {
  this.options = Object.assign({}, this.options, options)
}
if (!this.options.data) {
  // tell the user no data has been provided
}
else {
  this.transition = d3.transition().duration(this.options.transitionDuration)
  if (this.options.data.bottom.scale && this.options.data.bottom.scale === 'Time') {
    this.parseX = function (input) {
      if (typeof input.getTime !== 'undefined') {
        return input
      }      
      else {
        d3.timeParse(this.options.timeParseFormat)(input)
      }
    }
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
    // establish the space and size for the legend
    // the legend gets rendered so that we can get its actual size
    if (this.options.showLegend === true) {
      let legendData = this.options.data.series.map((s, i) => ({value: s.label || s.key, color: s.color || this.options.colors[i % this.options.colors.length]})) 
      if (this.options.legendPosition === 'top' || this.options.legendPosition === 'bottom') {
        this.legendArea.style('width', '100%')
        this.legend.options.align = 'center'
      }
      if (this.options.legendPosition === 'left' || this.options.legendPosition === 'right') {
        this.legend.options.align = 'left'
        this.legendArea.style('height', '100%')
        this.legendArea.style('width', this.legend.testWidth(d3.max(legendData.map(d => d.value))) + 'px')
      }
      this.legend.data = legendData
      let legendSize = this.legend.getSize()
      this.options.margin.legendTop = 0
      this.options.margin.legendBottom = 0
      this.options.margin.legendLeft = 0
      this.options.margin.legendRight = 0
      if (this.options.legendPosition === 'top') {
        this.options.margin.legendTop = legendSize.height
        this.legendArea.style('top', '0').style('bottom', 'unset')
      }
      if (this.options.legendPosition === 'bottom') {
        this.options.margin.legendBottom = legendSize.height
        this.legendArea.style('top', 'unset').style('bottom', '0')
      }
      if (this.options.legendPosition === 'left') {
        this.options.margin.legendLeft = legendSize.width
        this.legendArea.style('left', '0').style('right', 'unset').style('top', '0')
      }
      if (this.options.legendPosition === 'right') {
        this.options.margin.legendRight = legendSize.width
        this.legendArea.style('left', 'unset').style('right', '0').style('top', '0')
      }
    } 
    this.svg
      .attr('width', this.width - this.options.margin.legendLeft - this.options.margin.legendRight)
      .attr('height', this.height - this.options.margin.legendTop - this.options.margin.legendBottom)
      .attr('transform', `translate(${this.options.margin.legendLeft}, ${this.options.margin.legendTop})`)
    this.longestLeft = 0
    this.longestRight = 0
    this.longestBottom = 0
    let firstBottom = ''
    if (this.options.data.bottom && this.options.data.bottom.data && typeof this.options.data.bottom.max === 'undefined') {
      // this.options.data.bottom.max = this.options.data.bottom.data.reduce((a, b) => a.length > b.value.length ? a : b.value, '')
      // this.options.data.bottom.min = this.options.data.bottom.data.reduce((a, b) => a.length < b.value.length ? a : b.value, this.options.data.bottom.max)      
      this.options.data.bottom.max = this.options.data.bottom.data[this.options.data.bottom.data.length - 1].value
      this.options.data.bottom.min = this.options.data.bottom.data[0].value
    }
    if (this.options.data.bottom && typeof this.options.data.bottom.max !== 'undefined') {
      this.longestBottom = this.options.data.bottom.max.toString()
      if (this.options.data.bottom.formatter) {
        this.longestBottom = this.options.data.bottom.formatter(this.options.data.bottom.max).toString()
        firstBottom = this.longestBottom
      }
      else {
        if (this.options.data.bottom.scale === 'Time') {
          this.longestBottom = '01/01/2000'
          firstBottom = '01/01/2000'
        }        
        else {
          this.longestBottom = this.options.data.bottom.data.reduce((a, b) => a.length > b.value.length ? a : b.value, '')
          firstBottom = this.options.data.bottom.data[0].value
        }
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
      this.longestLeft = this.options.data.left.max.toString()
      if (this.options.data.left.formatter) {
        this.longestLeft = this.options.data.left.formatter(this.options.data.left.max).toString()
      } 
    } 
    if (this.options.data.right && this.options.data.right.data && this.options.data.right.max === 'undefined') {
      this.options.data.right.min = d3.min(this.options.data.right.data)
      this.options.data.right.max = d3.max(this.options.data.right.data)
    }   
    if (this.options.data.right && typeof this.options.data.right.max !== 'undefined') {
      this.longestRight = this.options.data.right.max.toString()
      if (this.options.data.right.formatter) {
        this.longestRight = this.options.data.right.formatter(this.options.data.right.max).toString()
      }
    }    
    // establish the space needed for the various axes    
    // this.options.margin.axisLeft = this.longestLeft * ((this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize) * 0.7
    // this.options.margin.axisRight = this.longestRight * ((this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize) * 0.7
    // this.options.margin.axisBottom = ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) + 10
    let longestLeftBounds = WebsyUtils.measureText(this.longestLeft, 0, ((this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize))
    let longestRightBounds = WebsyUtils.measureText(this.longestRight, 0, ((this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize))
    let longestBottomBounds = WebsyUtils.measureText(this.longestBottom, ((this.options.data.bottom && this.options.data.bottom.rotate) || 0), ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize))
    let firstBottomWidth = 0    
    if (this.options.orientation === 'vertical') {
      firstBottomWidth = WebsyUtils.measureText(firstBottom, ((this.options.data.bottom && this.options.data.bottom.rotate) || 0), ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)).width
      if (Math.abs((this.options.data.bottom && this.options.data.bottom.rotate) || 0) !== 90) {
        firstBottomWidth = firstBottomWidth / 2
      }
      else if (Math.abs((this.options.data.bottom && this.options.data.bottom.rotate) || 0) === 90) {
        firstBottomWidth = 0
      }      
      if (this.options.data.bottom.scale !== 'Time') {
        firstBottom = Math.max(0, firstBottomWidth)
      }      
    }
    this.options.margin.axisLeft = Math.max(longestLeftBounds.width, firstBottomWidth) + 5 // + 5 to accommodate for space between text and axis line
    this.options.margin.axisRight = longestRightBounds.width
    this.options.margin.axisBottom = longestBottomBounds.height + 10
    this.options.margin.axisTop = 0       
    // adjust axis margins based on title options
    if (this.options.data.left && this.options.data.left.showTitle === true) {
      if (this.options.data.left.titlePosition === 1) {
        this.options.margin.axisLeft += (this.options.data.left.titleFontSize || 10) + 10
      }
      else {
        this.options.margin.axisTop += (this.options.data.left.titleFontSize || 10) + 10
      }
    }
    if (this.options.data.right && this.options.data.right.showTitle === true) {
      if (this.options.data.right.titlePosition === 1) {
        this.options.margin.axisRight += (this.options.data.right.titleFontSize || 10) + 10
      }
      else if (this.options.margin.axisTop === 0) {
        this.options.margin.axisTop += (this.options.data.right.titleFontSize || 10) + 10
      }
    }
    if (((this.options.data.bottom && this.options.data.bottom.rotate) || 0) === 0 && this.options.axis.hideBottom !== true) {
      this.options.margin.axisLeft = Math.max(this.options.margin.axisLeft, longestBottomBounds.width / 2)
    }
    else if (((this.options.data.bottom && this.options.data.bottom.rotate) || 0) < 0 && this.options.axis.hideBottom !== true) {
      this.options.margin.axisLeft = Math.max(this.options.margin.axisLeft, longestBottomBounds.width)
    }
    else if (((this.options.data.bottom && this.options.data.bottom.rotate) || 0) > 0 && this.options.axis.hideBottom !== true) {
      this.options.margin.axisRight = Math.max(this.options.margin.axisRight, longestBottomBounds.width)
    }        
    // if (this.options.data.bottom.rotate) {
    //   // this.options.margin.bottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)   
    //   this.options.margin.axisBottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) * 0.4
    //   // this.options.margin.bottom = this.options.margin.bottom * (1 + this.options.data.bottom.rotate / 100)
    // }  
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
    this.plotWidth = this.width - this.options.margin.legendLeft - this.options.margin.legendRight - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight
    this.plotHeight = this.height - this.options.margin.legendTop - this.options.margin.legendBottom - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom - this.options.margin.axisTop
    // Translate the layers
    this.leftAxisLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
      .style('font-size', (this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize)
    this.rightAxisLayer
      .attr('transform', `translate(${this.options.margin.left + this.plotWidth + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
      .style('font-size', (this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize)
    this.bottomAxisLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop + this.plotHeight})`)
      .style('font-size', (this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)
    this.leftAxisLabel
      .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.rightAxisLabel
      .attr('transform', `translate(${this.options.margin.left + this.plotWidth + this.options.margin.axisLeft + this.options.margin.axisRight}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.bottomAxisLabel
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop + this.plotHeight})`)
    this.plotArea
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.areaLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.lineLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.barLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.labelLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.symbolLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.refLineLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.trackingLineLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)         
    this.eventLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)         
    let that = this
    this.eventLayer      
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.plotWidth)
      .attr('height', this.plotHeight)
      .attr('fill-opacity', '0')
    // this.tooltip.transform(this.options.margin.left + this.options.margin.axisLeft, this.options.margin.top + this.options.margin.axisTop)
    // Configure the bottom axis
    let bottomDomain = this.createDomain('bottom')    
    this.bottomAxis = d3[`scale${this.options.data.bottom.scale || 'Band'}`]()
      .domain(bottomDomain)
      .range([0, this.plotWidth])      
    if (this.bottomAxis.nice) {
      // this.bottomAxis.nice()
    }    
    if (this.bottomAxis.padding && this.options.data.bottom.padding) {
      this.bottomAxis.padding(this.options.data.bottom.padding || 0)   
    }
    if (this.options.margin.axisBottom > 0) {
      let timeFormatPattern = ''
      let tickDefinition         
      if (this.options.data.bottom.data) {
        if (this.options.data.bottom.scale === 'Time') {
          let diff = this.options.data.bottom.max.getTime() - this.options.data.bottom.min.getTime()          
          let oneDay = 1000 * 60 * 60 * 24
          if (diff < (oneDay / 24 / 6)) {
            tickDefinition = d3.timeSecond.every(15) 
            timeFormatPattern = '%H:%M:%S'
          }
          else if (diff < (oneDay / 24)) {
            tickDefinition = d3.timeMinute.every(1) 
            timeFormatPattern = '%H:%M'
          }
          else if (diff < (oneDay / 6)) {
            tickDefinition = d3.timeMinute.every(10) 
            timeFormatPattern = '%H:%M'
          }
          else if (diff < (oneDay / 2)) {
            tickDefinition = d3.timeMinute.every(30)
            timeFormatPattern = '%H:%M' 
          }
          else if (diff < oneDay) {
            tickDefinition = d3.timeHour.every(1) 
            timeFormatPattern = '%H:%M'
          }
          else if (diff < 7 * oneDay) {
            tickDefinition = d3.timeDay.every(1) 
            timeFormatPattern = '%d %b @ %H:%M'
          }
          else if (diff < 14 * oneDay) {
            tickDefinition = d3.timeDay.every(2) 
            timeFormatPattern = '%d %b %Y'
          }
          else if (diff < 21 * oneDay) {
            tickDefinition = d3.timeDay.every(3) 
            timeFormatPattern = '%d %b %Y'
          }
          else if (diff < 28 * oneDay) {
            tickDefinition = d3.timeDay.every(4) 
            timeFormatPattern = '%d %b %Y'
          }
          else if (diff < 60 * oneDay) {
            tickDefinition = d3.timeDay.every(7) 
            timeFormatPattern = '%d %b %Y'
          }
          else {
            tickDefinition = d3.timeMonth.every(1) 
            timeFormatPattern = '%b %Y'
          }
        }
        else {
          tickDefinition = this.options.data.bottom.ticks || Math.min(this.options.data.bottom.data.length, 5)
        }
      }
      else {
        tickDefinition = this.options.data.bottom.ticks || 5
      }  
      this.options.calculatedTimeFormatPattern = timeFormatPattern
      let bAxisFunc = d3.axisBottom(this.bottomAxis)
        // .ticks(this.options.data.bottom.ticks || Math.min(this.options.data.bottom.data.length, 5))
        .ticks(tickDefinition)
      // console.log('tickDefinition', tickDefinition)
      // console.log(bAxisFunc)
      if (this.options.data.bottom.formatter) {
        bAxisFunc.tickFormat(d => this.options.data.bottom.formatter(d))        
      }
      this.bottomAxisLayer.call(bAxisFunc)
      // console.log(this.bottomAxisLayer.ticks)
      if (this.options.data.bottom.rotate) {
        this.bottomAxisLayer.selectAll('text')
          .attr('transform', `rotate(${((this.options.data.bottom && this.options.data.bottom.rotate) || 0)})`)
          .style('text-anchor', `${((this.options.data.bottom && this.options.data.bottom.rotate) || 0) === 0 ? 'middle' : 'end'}`)
          .style('transform-origin', ((this.options.data.bottom && this.options.data.bottom.rotate) || 0) === 0 ? '0 0' : `0 ${((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)}px`)
      } 
    }  
    // Configure the left axis
    let leftDomain = this.createDomain('left') 
    let rightDomain = this.createDomain('right')       
    this.leftAxis = d3[`scale${this.options.data.left.scale || 'Linear'}`]()
      .domain(leftDomain)
      .range([this.plotHeight, 0])
    if (this.leftAxis.padding && this.options.data.left.padding) {
      this.leftAxis.padding(this.options.data.left.padding || 0)   
    }
    if (this.leftAxis.nice) {
      this.leftAxis.nice()
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
    if (this.options.data.left && this.options.data.left.showTitle === true) {
      this.leftAxisLabel.selectAll('.title').remove()
      this.leftAxisLabel.selectAll('.dot').remove()
      if (this.options.data.left.titlePosition === 1) {
        // put the title vertically on the left
        let t = this.leftAxisLabel
          .append('text')
          .attr('class', 'title')
          .attr('x', (1 - this.plotHeight / 2))
          .attr('y', (this.options.data.left.titleFontSize || 10) / 2 + 2)
          .attr('font-size', this.options.data.left.titleFontSize || 10)
          .attr('fill', this.options.data.left.titleColor || '#888888')
          .attr('text-anchor', 'middle')
          .style('transform', 'rotate(-90deg)')
          .text(this.options.data.left.title || '')
        if (rightDomain.length > 0) {
          // we have 2 axis so we can treat the title like a legend
          this.leftAxisLabel
            .append('circle')
            .attr('class', 'dot')         
            .style('fill', this.options.data.left.color || 'transparent')
            .attr('r', (this.options.data.left.titleFontSize && this.options.data.left.titleFontSize / 2) || 5)
            .attr('cx', 3)
            .attr('cy', (this.plotHeight / 2) - (t.node().getBBox().width / 2) - 15)
        }
      }
      else {
        // put the title horizontally on the top
        this.leftAxisLabel
          .append('text')
          .attr('class', 'title')
          .attr('x', 0)
          .attr('y', 5)
          .attr('font-size', this.options.data.left.titleFontSize || 10)
          .attr('fill', this.options.data.left.titleColor || '#888888')
          .attr('text-anchor', 'left')          
          .text(this.options.data.left.title || '')
      }
    }
    // Configure the right axis    
    if (rightDomain.length > 0) {
      this.rightAxis = d3[`scale${this.options.data.right.scale || 'Linear'}`]()
        .domain(rightDomain)
        .range([this.plotHeight, 0])
      if (this.rightAxis.nice) {
        this.rightAxis.nice()
      }
      if (this.options.margin.axisRight > 0 && (this.options.data.right.min !== 0 || this.options.data.right.max !== 0)) {
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
    if (this.options.data.right && this.options.data.right.showTitle === true) {
      this.rightAxisLabel.selectAll('.title').remove()
      if (this.options.data.right.titlePosition === 1) {
        // put the title vertically on the left
        let t = this.rightAxisLabel
          .append('text')
          .attr('class', 'title')
          .attr('x', this.plotHeight / 2)
          .attr('y', 5)
          .attr('font-size', this.options.data.right.titleFontSize || 10)
          .attr('fill', this.options.data.right.titleColor || '#888888')
          .attr('text-anchor', 'middle')
          .style('transform', 'rotate(90deg)')
          .text(this.options.data.right.title || '')
        if (rightDomain.length > 0) {
          // we have 2 axis so we can treat the title like a legend
          this.rightAxisLabel
            .append('circle')
            .attr('class', 'dot')         
            .style('fill', this.options.data.right.color || 'transparent')
            .attr('r', (this.options.data.right.titleFontSize && this.options.data.right.titleFontSize / 2) || 5)
            .attr('cx', -2)
            .attr('cy', (this.plotHeight / 2) - (t.node().getBBox().width / 2) - 15)
        }
      }
      else {
        // put the title horizontally on the top
      }
    } 
    // Remove the unnecessary series
    let newKeys = this.options.data.series.map(s => s.key)
    for (const key in this.renderedKeys) {
      if (newKeys.indexOf(key) === -1) {
        // remove the components
        this[`remove${this.renderedKeys[key]}`](key)
      }
    }
    // Draw the series data
    this.renderedKeys = {}
    this.options.data.series.forEach((series, index) => {
      if (!series.key) {
        series.key = this.createIdentity()
      }
      if (!series.color) {
        series.color = this.options.colors[index % this.options.colors.length]
      }
      this[`render${series.type || 'bar'}`](series, index)
      this.renderLabels(series, index)
      this.renderedKeys[series.key] = series.type
    })
    if (this.options.refLines && this.options.refLines.length > 0) {
      this.options.refLines.forEach(l => this.renderRefLine(l))
    }
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
  // .style('fill-opacity', 0)
  .attr('stroke', 'transparent')
  // .transition(this.transition)
  .style('fill-opacity', series.opacity || 0.5)

  }
  renderbar (series, index) {
    /* global series index d3 */
let xAxis = 'bottom'
let yAxis = 'left'
let bars = this.barLayer.selectAll(`.bar_${series.key}`).data(series.data)
let acummulativeY = new Array(this.options.data.series.length).fill(0)
if (this.options.orientation === 'horizontal') {
  xAxis = 'left'
  yAxis = 'bottom'
}
let barWidth = this[`${xAxis}Axis`].bandwidth()
let groupedBarWidth = (barWidth - 10) / this.options.data.series.length
// if (this.options.data.series.length > 1 && this.options.grouping === 'grouped') {
//   barWidth = barWidth / this.options.data.series.length - 4
// }
function getBarHeight (d, i) {
  if (this.options.orientation === 'horizontal') {
    return barWidth
  }
  else {
    return this[`${yAxis}Axis`](d.y.value)
  }
}
function getBarWidth (d, i) {
  if (this.options.orientation === 'horizontal') {
    let width = this[`${yAxis}Axis`](d.y.value)
    acummulativeY[d.y.index] += width
    return width
  }
  else {
    if (this.options.grouping === 'grouped') {
      return groupedBarWidth
    }
    return barWidth
  }
}
function getBarX (d, i) {
  if (this.options.orientation === 'horizontal') {
    if (this.options.grouping === 'stacked') {      
      return this[`${yAxis}Axis`](d.y.accumulative)
    }
    else {
      return 0
    }
  }
  else {
    let adjustment = this.options.data[xAxis].scale === 'Time' ? 0 : this[`${xAxis}Axis`].bandwidth() / 2
    if (this.options.grouping === 'grouped') {      
      let barAdjustment = groupedBarWidth * index + 5 // + (index > 0 ? 4 : 0)
      return this[`${xAxis}Axis`](this.parseX(d.x.value)) + barAdjustment
    }
    else {
      return this[`${xAxis}Axis`](this.parseX(d.x.value)) + (i * barWidth) + adjustment
    }    
  }
}
function getBarY (d, i) {
  if (this.options.orientation === 'horizontal') {
    if (this.options.grouping !== 'grouped') {
      return this[`${xAxis}Axis`](this.parseX(d.x.value))
    }
    else {
      return this[`${xAxis}Axis`](this.parseX(d.x.value)) + ((d.y.index || i) * barWidth)
    }    
  }
  else {
    if (this.options.grouping === 'stacked') {      
      return this[`${yAxis}Axis`](d.y.accumulative)
    }
    else {
      return this.plotHeight - getBarHeight.call(this, d, i)
    }
  }
}
bars
  .exit()
  .transition(this.transition)
  .style('fill-opacity', 1e-6)
  .remove()

bars
  .attr('width', getBarWidth.bind(this))
  .attr('height', getBarHeight.bind(this))
  .attr('x', getBarX.bind(this))  
  .attr('y', getBarY.bind(this))
  .transition(this.transition)  
  .attr('fill', d => d.y.color || d.color || series.color)

bars
  .enter()
  .append('rect')
  .attr('width', getBarWidth.bind(this))
  .attr('height', getBarHeight.bind(this))
  .attr('x', getBarX.bind(this))  
  .attr('y', getBarY.bind(this))
  // .transition(this.transition)
  .attr('fill', d => d.y.color || d.color || series.color)
  .attr('class', d => {
    return `bar bar_${series.key}`
  })

  }
  removebar (key) {
    /* global key d3 */
let bars = this.barLayer.selectAll(`.bar_${key}`)
  .transition(this.transition)
  .style('fill-opacity', 1e-6)
  .remove()

  }
  renderLabels (series, index) {
    /* global series index d3 WebsyDesigns */
let xAxis = 'bottomAxis'
let yAxis = 'leftAxis'  
let that = this
if (this.options.orientation === 'horizontal') {
  xAxis = 'leftAxis'
  yAxis = 'bottomAxis'
}
if (this.options.showLabels === true || series.showLabels === true) {
  // need to add logic to handle positioning options
  // e.g. Inside, Outide, Auto (this will also affect the available plot space)
  // We currently only support 'Auto'  
  let labels = this.labelLayer.selectAll(`.label_${series.key}`).data(series.data)
  labels
    .exit()
    .transition(this.transition)
    .style('stroke-opacity', 1e-6)
    .remove()
  labels      
    .attr('x', d => getLabelX.call(this, d, series.labelPosition))  
    .attr('y', d => getLabelY.call(this, d, series.labelPosition))   
    .attr('class', `label_${series.key}`)
    .attr('fill', d => {
      if (this.options.grouping === 'stacked' && d.y.value === 0) {
        return 'transparent'
      }
      return this.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color)
    })
    .style('font-size', `${this.options.labelSize || this.options.fontSize}px`)    
    .transition(this.transition)
    .text(d => d.y.label || d.y.value)
    .each(function (d, i) {      
      if (that.options.orientation === 'horizontal') {
        if (that.options.grouping === 'stacked' && series.labelPosition !== 'outside') {
          this.setAttribute('text-anchor', 'middle')
        }
        else if (that.plotWidth - getLabelX.call(that, d) < this.getComputedTextLength()) {
          this.setAttribute('text-anchor', 'end')
          this.setAttribute('x', +(this.getAttribute('x')) - 8)                  
          this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color))
        }    
        else if (series.labelPosition === 'outside') {
          this.setAttribute('text-anchor', 'start')
          this.setAttribute('x', +(this.getAttribute('x')) + 8)                  
          this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'))
        }
        else {                  
          this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'))
        }
      }
      else {
        if (that.plotheight - getLabelX.call(that, d) < (that.options.labelSize || that.options.fontSize)) {          
          this.setAttribute('y', +(this.getAttribute('y')) + 8)
        }
      }
    })
  
  labels
    .enter()
    .append('text')
    .attr('class', `label_${series.key}`)
    .attr('x', d => getLabelX.call(this, d, series.labelPosition))  
    .attr('y', d => getLabelY.call(this, d, series.labelPosition))    
    .attr('alignment-baseline', 'central')
    .attr('text-anchor', this.options.orientation === 'horizontal' ? 'left' : 'middle')
    .attr('fill', d => {
      if (this.options.grouping === 'stacked' && d.y.value === 0) {
        return 'transparent'
      }
      return this.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color)
    })
    .style('font-size', `${this.options.labelSize || this.options.fontSize}px`)    
    .text(d => d.y.label || d.y.value)
    .each(function (d, i) {      
      if (that.options.orientation === 'horizontal') {
        if (that.options.grouping === 'stacked' && series.labelPosition !== 'outside') {
          this.setAttribute('text-anchor', 'middle')
        }
        else if (that.plotWidth - getLabelX.call(that, d) < this.getComputedTextLength()) {
          this.setAttribute('text-anchor', 'end')
          this.setAttribute('x', +(this.getAttribute('x')) - 8)                  
          this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color))
        }    
        else if (series.labelPosition === 'outside') {
          this.setAttribute('text-anchor', 'start')
          this.setAttribute('x', +(this.getAttribute('x')) + 8)                  
          this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'))
        }
        else {                  
          this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'))
        }
      }
      else {
        if (that.plotheight - getLabelX.call(that, d) < (that.options.labelSize || that.options.fontSize)) {          
          this.setAttribute('y', +(this.getAttribute('y')) + 8)
        }
      }
    })
}

function getLabelX (d, labelPosition = 'inside') {
  if (this.options.orientation === 'horizontal') {
    if (this.options.grouping === 'stacked') {
      return this[yAxis](d.y.accumulative) + (this[yAxis](d.y.value) / (labelPosition === 'inside' ? 2 : 1))
    }
    else {
      return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value) + 4
    }
  }
  else {    
    return this[xAxis](this.parseX(d.x.value)) + (this[xAxis].bandwidth() / 2)
  }
}
function getLabelY (d, labelPosition = 'inside') {
  if (this.options.orientation === 'horizontal') {    
    return this[xAxis](this.parseX(d.x.value)) + (this[xAxis].bandwidth() / 2)
  }
  else {
    if (this.options.grouping === 'stacked') {
      return this[yAxis](d.y.accumulative) + (this[yAxis](d.y.value) / (labelPosition === 'inside' ? 2 : 1))
    }
    else {
      return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value) - (this.options.labelSize || this.options.fontSize)
    }
  }
}

  }
  renderline (series, index) {
    /* global series index d3 */
const drawLine = (xAxis, yAxis, curveStyle) => {
  return d3
    .line()
    .x(d => {
      let adjustment = this.options.data[xAxis].scale === 'Time' ? 0 : this[`${xAxis}Axis`].bandwidth() / 2
      return this[`${xAxis}Axis`](this.parseX(d.x.value)) + adjustment
    })
    .y(d => {
      return this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)
    })
    .curve(d3[curveStyle || this.options.curveStyle])
}
let xAxis = 'bottom'
let yAxis = series.axis === 'secondary' ? 'right' : 'left'
if (this.options.orienation === 'horizontal') {  
  xAxis = series.axis === 'secondary' ? 'right' : 'left'
  yAxis = 'bottom'
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
  // .transition(this.transition)
  .style('stroke-opacity', 1)

if (series.showArea === true) {
  this.renderarea(series, index)
}
if (series.showSymbols === true) {
  this.rendersymbol(series, index)
}

  }
  renderRefLine (data) {
    /* global d3 data */
let xAxis = 'bottom'
let yAxis = 'left'  
let yAttr = 'y'
let xAttr = 'x'
let that = this
let length = this.plotWidth
if (this.options.orientation === 'horizontal') {
  xAxis = 'left'
  yAxis = 'bottom'
  yAttr = 'x'
  xAttr = 'y'
  length = this.plotHeight
}
this.refLineLayer.selectAll('.reference-line').remove()
this.refLineLayer.selectAll('.reference-line-label').remove()
this.refLineLayer
  .append('line')
  .attr(`${yAttr}1`, this[`${yAxis}Axis`](data.value))
  .attr(`${yAttr}2`, this[`${yAxis}Axis`](data.value))
  .attr(`${xAttr}2`, length)
  .attr('class', `reference-line`)
  .style('stroke', data.color)
  .style('stroke-width', `${data.lineWidth}px`)
  .style('stroke-dasharray', data.lineStyle)
if (data.label && data.label !== '') {
  // show the text on the line
  this.refLineLayer
    .append('text')
    .attr('class', `reference-line-label`)
    .attr('x', length)
    .attr('y', this[`${yAxis}Axis`](data.value))
    .attr('font-size', this.options.fontSize)
    .attr('fill', data.color)
    .text(data.label)
    .attr(
      'text-anchor', 'end'
    )
    .attr(
      'alignment-baseline', 'text-after-edge'        
    )
}

  }
  removeline (key) {
    /* global key d3 */
let lines = this.lineLayer.selectAll(`.line_${key}`)
  .transition(this.transition)
  .style('stroke-opacity', 1e-6)
  .remove()

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
let xAxis = 'bottom'
let yAxis = series.axis === 'secondary' ? 'right' : 'left'
if (this.options.orienation === 'horizontal') {  
  xAxis = series.axis === 'secondary' ? 'right' : 'left'
  yAxis = 'bottom'
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
  .attr('fill', series.fillSymbols ? series.color : 'white')
  .attr('stroke', series.color)
  .attr('transform', d => { 
    let adjustment = this.options.data[xAxis].scale === 'Time' ? 0 : this[`${xAxis}Axis`].bandwidth() / 2
    return `translate(${this[`${xAxis}Axis`](this.parseX(d.x.value)) + adjustment}, ${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)})` 
  })   
// Enter
symbols.enter()
  .append('path')
  .attr('d', d => drawSymbol(d.y.size || series.symbolSize)(d))
  // .transition(this.transition)
  .attr('fill', series.fillSymbols ? series.color : 'white')
  .attr('stroke', series.color)
  .attr('class', d => { return `symbol symbol_${series.key}` })
  .attr('transform', d => {
    let adjustment = this.options.data[xAxis].scale === 'Time' ? 0 : this[`${xAxis}Axis`].bandwidth() / 2
    return `translate(${this[`${xAxis}Axis`](this.parseX(d.x.value)) + adjustment}, ${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)})` 
  })

  }
  resize () {
    /* global d3 */ 
const el = document.getElementById(this.elementId)
if (el) {
  this.width = el.clientWidth
  this.height = el.clientHeight
  this.svg
    .attr('width', this.width - this.options.margin.legendLeft - this.options.margin.legendRight)
    .attr('height', this.height - this.options.margin.legendTop - this.options.margin.legendBottom)
    .attr('transform', `translate(${this.options.margin.legendLeft}, ${this.options.margin.legendTop})`)
    // Define the plot height  
  // this.plotWidth = this.width - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight
  // this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom
  this.plotWidth = this.width - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight
  this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom - this.options.margin.axisTop
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
  // this.leftAxisLayer
  //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  // this.rightAxisLayer
  //   .attr('transform', `translate(${this.options.margin.left + this.plotWidth + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  // this.bottomAxisLayer
  //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.plotHeight})`)
  // this.plotArea
  //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  // this.areaLayer
  //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  // this.lineLayer
  //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  // this.barLayer
  //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  // this.labelLayer
  //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  // this.symbolLayer
  //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  // this.trackingLineLayer
  //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.leftAxisLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
  this.rightAxisLayer
    .attr('transform', `translate(${this.options.margin.left + this.plotWidth + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
  this.bottomAxisLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop + this.plotHeight})`)
  this.leftAxisLabel
    .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top + this.options.margin.axisTop})`)
  this.rightAxisLabel
    .attr('transform', `translate(${this.options.margin.left + this.plotWidth + this.options.margin.axisLeft + this.options.margin.axisRight}, ${this.options.margin.top + this.options.margin.axisTop})`)
  this.bottomAxisLabel
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop + this.plotHeight})`)
  this.plotArea
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
  this.areaLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
  this.lineLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
  this.barLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
  this.labelLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
  this.symbolLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
  this.trackingLineLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)         
  this.eventLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)         
}

  }
}

class WebsyLegend {
  constructor (elementId, options) {
    const DEFAULTS = {
      align: 'center',
      direction: 'horizontal',
      style: 'circle',
      symbolSize: 16,
      hPadding: 20,
      vPadding: 10
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this._data = []
    if (!elementId) {
      console.log('No element Id provided for Websy Chart')		
      return
    }
    const el = document.getElementById(this.elementId)    
    if (el) {
      el.classList.add('websy-legend')
      this.render()
    }
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  getLegendItemHTML (d) {
    return `
      <div 
        class='websy-legend-item ${this.options.direction}' 
        style='margin: ${this.options.vPadding / 2}px ${this.options.hPadding / 2}px;'
      >
        <span 
          class='symbol ${d.style || this.options.style}' 
          style='
            background-color: ${d.color};
            width: ${this.options.symbolSize}px;
            height: ${this.options.style === 'line' ? 3 : this.options.symbolSize}px;
          '
        ></span>
        ${d.value}
      </div>
    `
  }
  getSize () {
    const el = document.getElementById(this.elementId)
    if (el) {
      return {
        width: el.clientWidth,
        height: el.clientHeight
      }
    }
  }
  set data (d) {
    this._data = d
    this.render()
  }
  render () {
    this.resize()
  }
  resize () {
    const el = document.getElementById(this.elementId)
    if (el) {
      // if (this.options.width) {
      //   el.width = this.options.width
      // }
      // if (this.options.height) {
      //   el.height = this.options.height
      // }
      let html = `
        <div class='text-${this.options.align}'>
      `
      html += this._data.map((d, i) => this.getLegendItemHTML(d)).join('')
      html += `
        <div>
      `
      el.innerHTML = html
    }
  }
  testWidth (v) {
    let html = this.getLegendItemHTML({value: v})
    const el = document.createElement('div')
    el.style.position = 'absolute'
    // el.style.width = '100vw'
    el.style.visibility = 'hidden'
    el.innerHTML = html
    document.body.appendChild(el)
    let w = el.clientWidth + 30 // for padding
    el.remove()
    return w
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

/* global d3 L WebsyDesigns */ 
class WebsyMap {
  constructor (elementId, options) {
    const DEFAULTS = {
      tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      disablePan: false,
      disableZoom: false,
      markerSize: 10,
      useClustering: false,
      maxMarkerSize: 50,
      minMarkerSize: 20,
      data: {},
      legendPosition: 'bottom',
      colors: ['#5e4fa2', '#3288bd', '#66c2a5', '#abdda4', '#e6f598', '#fee08b', '#fdae61', '#f46d43', '#d53e4f', '#9e0142']
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    if (!elementId) {
      console.log('No element Id provided for Websy Map')		
      return
    }
    const mapOptions = Object.assign({}, options.mapOptions)
    mapOptions.click = this.handleMapClick.bind(this)    
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
        // console.error('d3 library has not been loaded')
      }
      if (typeof L === 'undefined') {
        console.error('Leaflet library has not been loaded')
      }
      el.innerHTML = `
        <div id="${this.elementId}_map"></div>
        <div id="${this.elementId}_legend" class="websy-map-legend"></div>
      `
      el.addEventListener('click', this.handleClick.bind(this))
      this.legend = new WebsyDesigns.Legend(`${this.elementId}_legend`, {})
      this.map = L.map(`${this.elementId}_map`, mapOptions)
      this.render()
    }
  }
  handleClick (event) {

  }
  handleMapClick (event) {

  }
  render () {
    const mapEl = document.getElementById(`${this.elementId}_map`)
    const legendEl = document.getElementById(`${this.elementId}_map`)
    if (this.options.showLegend === true && this.options.data.polygons) {            
      let legendData = this.options.data.polygons.map((s, i) => ({value: s.label || s.key, color: s.color || this.options.colors[i % this.options.colors.length]})) 
      let longestValue = legendData.map(s => s.value).reduce((a, b) => a.length > b.length ? a : b)
      if (this.options.legendPosition === 'top' || this.options.legendPosition === 'bottom') {
        legendEl.style.width = '100%'
      }
      if (this.options.legendPosition === 'left' || this.options.legendPosition === 'right') {
        legendEl.style.height = '100%'
        legendEl.style.width = this.legend.testWidth(longestValue) + 'px'
      }
      this.legend.data = legendData
      let legendSize = this.legend.getSize()
      mapEl.style.position = 'relative'
      if (this.options.legendPosition === 'top') {      
        legendEl.style.top = 0
        legendEl.style.bottom = 'unset'
        mapEl.style.top = legendSize.height
        mapEl.style.height = `calc(100% - ${legendSize.height}px)`
      }
      if (this.options.legendPosition === 'bottom') {      
        legendEl.style.top = 'unset'
        legendEl.style.bottom = 0      
        mapEl.style.height = `calc(100% - ${legendSize.height}px)`
      }
      if (this.options.legendPosition === 'left') {      
        legendEl.style.left = 0
        legendEl.style.right = 'unset'
        legendEl.style.top = 0
        mapEl.style.left = `${legendSize.width}px`
        mapEl.style.width = `calc(100% - ${legendSize.width}px)`
      }
      if (this.options.legendPosition === 'right') {      
        legendEl.style.left = 'unset'
        legendEl.style.right = 0
        legendEl.style.top = 0
        mapEl.style.width = `calc(100% - ${legendSize.width}px)`
      } 
    }
    else {
      mapEl.style.width = '100%'
      mapEl.style.height = '100%'
    }
    const t = L.tileLayer(this.options.tileUrl, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)
    if (this.geo) {
      this.map.removeLayer(this.geo)
    }
    if (this.polygons) {
      this.polygons.forEach(p => this.map.removeLayer(p))
    }
    this.polygons = []
    if (this.options.geoJSON) {
      this.geo = L.geoJSON(this.options.geoJSON, {
        style: feature => {
          return {
            color: feature.color || '#ffffff',
            colorOpacity: feature.colorOpacity || 1,
            fillColor: feature.fillColor || '#e6463c',
            fillOpacity: feature.fillOpacity || 0,
            weight: feature.weight || 1
          }
        },
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(feature.tooltip,
            {
              permanent: true, 
              direction: 'center',
              className: feature.tooltipClass || 'websy-polygon-tooltip'
            }
          )
        }
      }).addTo(this.map)
    }
    // this.markers = []        
    // this.data = [] // this.data.filter(d => d.Latitude.qNum !== 0 && d.Longitude.qNum !== 0)    
    // this.data.forEach(r => {
    //   // console.log(r)
    //   if (r.Latitude.qNum !== 0 && r.Longitude.qNum !== 0) {
    //     const markerOptions = {}
    //     if (this.options.simpleMarker === true) {
    //       markerOptions.icon = L.divIcon({className: 'simple-marker'})
    //     }
    //     if (this.options.markerUrl) {
    //       markerOptions.icon = L.icon({iconUrl: this.options.markerUrl})
    //     }
    //     markerOptions.data = r
    //     let m = L.marker([r.Latitude.qText, r.Longitude.qText], markerOptions)
    //     m.on('click', this.handleMapClick.bind(this))
    //     if (this.options.useClustering === false) {
    //       m.addTo(this.map)
    //     }
    //     this.markers.push(m)
    //     if (this.options.useClustering === true) {
    //       this.cluster.addLayer(m)
    //     }
    //   }
    // })
    if (this.options.data.polygons) {
      this.options.data.polygons.forEach((p, i) => {
        if (!p.options) {
          p.options = {}
        }
        if (!p.options.color) {
          p.options.color = this.options.colors[i % this.options.colors.length]
        }
        const pol = L.polygon(p.data.map(c => c.map(d => [d.Latitude, d.Longitude])), p.options).addTo(this.map)
        this.polygons.push(pol)
        this.map.fitBounds(pol.getBounds())
      })
    }
    // if (this.data.markers.length > 0) {            
    //   el.classList.remove('hidden')
    //   if (this.options.useClustering === true) {
    //     this.map.addLayer(this.cluster)
    //   }
    //   const g = L.featureGroup(this.markers)
    //   this.map.fitBounds(g.getBounds())
    //   this.map.invalidateSize()
    // }
    if (this.geo) {
      this.map.fitBounds(this.geo.getBounds())
    }
    else if (this.polygons) {
      // this.map.fitBounds(this.geo.getBounds())
    }
    else if (this.options.center) {
      this.map.setView(this.options.center, this.options.zoom || null)
    }
  }
}

class WebsyChartTooltip {
  constructor (el) {
    // el should be the element Id of an SVG element
    // or a reference to an SVG element
    if (typeof el === 'string') {
      this.svg = document.getElementById(el)
    }
    else {
      this.svg = el
    }
    this.tooltipLayer = this.svg.append('g').attr('class', 'tooltip-layer')
    this.tooltipContent = this.tooltipLayer
      .append('foreignObject')
      .attr('class', 'websy-chart-tooltip')
      .append('xhtml:div')
      .attr('class', 'websy-chart-tooltip-content')
  }
  hide () {
    this.tooltipContent.classed('active', false)
  }
  setHeight (h) {
    this.tooltipLayer.select('foreignObject').style('height', h)
  }
  show (
    title,
    html,
    position = {
      top: 'unset',
      bottom: 'unset',
      left: 0,      
      width: 0,
      height: 0,
      onLeft: false
    }
  ) {    
    let classes = ['active']
    if (position.positioning === 'vertical') {
      classes.push('vertical')
    }
    if (position.onLeft === true) {
      classes.push('left')
    }
    if (position.onTop === true) {
      classes.push('top')
    }    
    let fO = this.tooltipLayer
      .selectAll('foreignObject')
      .attr('width', `${position.width}px`)
      // .attr('height', `${position.height}px`)
      // .attr('y', `0px`)      
      .attr('class', `websy-chart-tooltip ${classes.join(' ')}`)
    this.tooltipContent
      .attr('class', `websy-chart-tooltip-content ${classes.join(' ')}`)
      .style('width', `${position.width}px`)
      // .style('left', '0px')
      // .style('top', `0px`)
      .html(`<div class='title'>${title}</div>${html}`)
    if (
      navigator.userAgent.indexOf('Chrome') === -1 &&
      navigator.userAgent.indexOf('Safari') !== -1
    ) {
      fO.attr('x', '0px')
      this.tooltipContent
        .style('left', position.positioning !== 'vertical' ? `${position.left}px` : 'unset')
        .style('top', position.onTop !== true ? `${position.top}px` : 'unset')
        .style('bottom', position.onTop === true ? `${position.bottom}px` : 'unset')
      // that.tooltipLayer.selectAll('foreignObject').transform(that.margin.left, that.margin.top)
    }
    else {
      if (position.positioning === 'vertical') {
        fO.attr('x', `${position.left}px`)
        fO.attr('y', `${position.onTop === true ? position.bottom - this.tooltipContent._groups[0][0].clientHeight : position.top}px`)                
      }
      else {
        fO.attr('x', `${position.left}px`)
        fO.attr('y', `${position.top}px`)        
      }            
      this.tooltipContent.style('left', 'unset')
      this.tooltipContent.style('top', 'unset')
    }
  }
  transform (x, y) {
    this.tooltipLayer.attr('transform', `translate(${x}, ${y})`)
  }
}


const WebsyDesigns = {
  WebsyPopupDialog,
  PopupDialog: WebsyPopupDialog,
  WebsyLoadingDialog,
  LoadingDialog: WebsyLoadingDialog,
  WebsyNavigationMenu,
  NavigationMenu: WebsyNavigationMenu,
  WebsyForm,
  Form: WebsyForm,
  WebsyDatePicker,
  DatePicker: WebsyDatePicker,
  WebsyDragDrop,
  DragDrop: WebsyDragDrop,
  WebsyDropdown,
  Dropdown: WebsyDropdown,
  WebsyResultList,
  ResultList: WebsyResultList,
  WebsyTemplate,
  Template: WebsyTemplate,
  WebsyPubSub,
  PubSub: WebsyPubSub,
  WebsyRouter,
  Router: WebsyRouter,
  WebsyTable,
  WebsyTable2,
  WebsyTable3,
  Table: WebsyTable,
  Table2: WebsyTable2,
  Table3: WebsyTable3,
  WebsyChart,
  Chart: WebsyChart,
  WebsyChartTooltip,
  ChartTooltip: WebsyChartTooltip,
  Legend: WebsyLegend,
  WebsyMap,
  Map: WebsyMap,
  WebsyKPI,
  KPI: WebsyKPI,
  WebsyPDFButton,  
  PDFButton: WebsyPDFButton,
  APIService,
  WebsyUtils,
  Utils: WebsyUtils,
  ButtonGroup,
  WebsySwitch: Switch,
  Pager,
  Switch,
  ResponsiveText,
  WebsyResponsiveText: ResponsiveText,
  QlikPlugin: WebsyDesignsQlikPlugins,
  Icons: WebsyIcons,
  WebsyIcons
}

WebsyDesigns.service = new WebsyDesigns.APIService('')
window.GlobalPubSub = new WebsyPubSub('empty', {})

export default WebsyDesigns
