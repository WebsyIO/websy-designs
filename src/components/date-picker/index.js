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
