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
  close (confirm) {
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
            this.options.onChange(hoursOut, true)        
          }     
          else {
            this.options.onChange(this.selectedRangeDates, true)        
          }          
        }
        else {
          if (this.options.mode === 'hour') {
            let hoursOut = this.currentselection.map(h => this.options.hours[h])
            this.options.onChange(hoursOut, true)        
          }     
          else {
            this.options.onChange(this.currentselection, false)
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
    return new Date(d.setHours(0, 0, 0, 0))
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
      // if (event.target.classList.contains('websy-disabled-date')) {
      //   return
      // }
      // const timestamp = event.target.id.split('_')[0]
      // this.selectDate(+timestamp)
    }
    else if (event.target.classList.contains('websy-dp-confirm')) {
      this.close(true)
    }
    else if (event.target.classList.contains('websy-dp-cancel')) {
      this.close()
    }
    else if (event.target.classList.contains('clear-selection')) {
      this.selectRange(0, false)
      if (this.options.onClear) {
        this.options.onClear()
      }
      this.updateRange(0)
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
      this.selectDate(+event.target.id.split('_')[1])
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
        this.mouseDownId = +event.target.id.split('_')[1]       
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
        if (event.target.id.split('_')[1] !== this.mouseDownId) {
          this.dragging = true
          this.selectDate(+event.target.id.split('_')[1])
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
    const dateEls = el.querySelectorAll('.websy-dp-date')
    for (let i = 0; i < dateEls.length; i++) {      
      dateEls[i].classList.remove('selected')
      dateEls[i].classList.remove('first')
      dateEls[i].classList.remove('last')
    }
    if (this.selectedRange === 0) {
      return
    }
    if (this.customRangeSelected === true) {         
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
          d = d.getTime()
          rangeStart = this.selectedRangeDates[0].getTime()
          rangeEnd = this.selectedRangeDates[this.selectedRangeDates.length - 1].getTime()
        }      
        else if (this.options.mode === 'year') {
          d = this.selectedRangeDates[0] + i
          rangeStart = this.selectedRangeDates[0]
          rangeEnd = this.selectedRangeDates[this.selectedRangeDates.length - 1]
        }
        else if (this.options.mode === 'monthyear') {
          d = new Date(this.selectedRangeDates[0].getTime()).setMonth(this.selectedRangeDates[0].getMonth() + i)          
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
        dateEl.classList.add('selected')
        dateEl.classList.add('first')
        dateEl.classList.add('last')
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
        html += months[key].map(d => `<li id='${this.elementId}_${d.id}_date' class='websy-dp-date ${d.disabled === true ? 'websy-disabled-date' : ''}'>${d.dayOfMonth}</li>`).join('')
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
      html += yearList.map(d => `<li id='${this.elementId}_${d.id}_year' class='websy-dp-date websy-dp-year ${d.disabled === true ? 'websy-disabled-date' : ''}'>${d.year}</li>`).join('')
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
        html += this.monthYears[year].map(d => `<li id='${this.elementId}_${d.id}_monthyear' data-year='${d.year}' class='websy-dp-date websy-dp-monthyear'>${d.month}</li>`).join('')        
        html += `</ul>`
      }
      html += `</div>`
    }
    else if (this.options.mode === 'hour') {
      html += `<div id='${this.elementId}_dateList' class='websy-dp-date-list'><ul>`
      html += this.options.hours.map(h => `<li id='${this.elementId}_${+h.text.split(':')[0]}_hour' data-hour='${h.text}' class='websy-dp-date websy-dp-hour'>${h.text}</li>`).join('')
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
      this.currentselection = [...this.options.ranges[this.options.mode][index].range]
      this.selectedRange = +index
      const el = document.getElementById(`${this.elementId}_header`)
      if (el) {
        if (this.selectedRange === 0) {
          el.classList.remove('range-selected')
        }
        else {
          el.classList.add('range-selected')
        }
      }
      this.highlightRange()
      this.updateRange()      
      this.close(confirm)
    }
  }
  selectCustomRange (rangeInput) {
    this.selectedRange = -1
    let isContinuousRange = true
    if (rangeInput.length === 1) {
      this.selectedRangeDates = [...rangeInput]
      this.customRangeSelected = true
    }
    else if (rangeInput.length === 2) {      
      this.selectedRangeDates = [...rangeInput]
      this.customRangeSelected = true
    }
    rangeInput.forEach((r, i) => {
      if (i > 0) {
        if (this.options.mode === 'date' || this.options.mode === 'monthyear') {          
          if ((r.getTime() / this.oneDay) - (rangeInput[i - 1] / this.oneDay) > 1) {
            isContinuousRange = false
          }          
        }
        else if (this.options.mode === 'hour' || this.options.mode === 'year') {
          if (r - rangeInput[i - 1] > 1) {
            isContinuousRange = false
          }
        } 
      }      
    })   
    if (rangeInput.length > 2 && isContinuousRange === true) {
      this.selectedRangeDates = [rangeInput[0], rangeInput[rangeInput.length - 1]]
      this.customRangeSelected = true
    } 
    if (isContinuousRange === false) {
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
      if (this.customRangeSelected === true) {        
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
