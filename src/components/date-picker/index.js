class WebsyDatePicker {
  constructor (elementId, options) {
    const DEFAULTS = {
      defaultRange: 2,
      ranges: [
        {
          label: 'Today',
          range: [new Date()]
        },
        {
          label: 'Yesterday',
          range: [new Date()]
        },
        {
          label: 'Last 7 Days',
          range: [new Date()]
        },
        {
          label: 'This Month',
          range: [new Date()]
        },
        {
          label: 'This Year',
          range: [new Date()]
        }
      ]
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.selectedRange = this.options.defaultRange || 0
    if (!elementId) {
      console.log('No element Id provided')
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      this.elementId = elementId
      el.addEventListener('click', this.handleClick.bind(this))
      this.render()
    }
    else {
      console.log('No element found with Id', elementId)
    }    
  }
  close () {
    const maskEl = document.getElementById(`${this.elementId}_mask`)
    const contentEl = document.getElementById(`${this.elementId}_content`)
    maskEl.classList.remove('active')
    contentEl.classList.remove('active')
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
      this.updateRange(index)
    }
  }
  open (options, override = false) {
    const maskEl = document.getElementById(`${this.elementId}_mask`)
    const contentEl = document.getElementById(`${this.elementId}_content`)
    maskEl.classList.add('active')
    contentEl.classList.add('active')
  }
  render () {
    if (!this.elementId) {
      console.log('No element Id provided for Websy Loading Dialog')	
      return
    }
    const el = document.getElementById(this.elementId)
    let html = `
			<div class='websy-date-picker-container'>
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
          --><div class='websy-date-picker-custom'></div>
        </div>
      </div>
    `
    el.innerHTML = html
  }
  updateRange (index) {
    if (index === this.selectedRange) {
      return
    }
    this.selectedRange = index
    const range = this.options.ranges[index]
    const el = document.getElementById(this.elementId)
    const labelEl = document.getElementById(`${this.elementId}_selectedRange`)
    const rangeEls = el.querySelectorAll(`.websy-date-picker-range`)
    for (let i = 0; i < rangeEls.length; i++) {
      rangeEls[i].classList.remove('active')
      if (i === index) {
        rangeEls[i].classList.add('active')
      }
    }
    if (labelEl) {
      labelEl.innerHTML = range.label
      if (this.options.onRangeChanged) {
        this.options.onRangeChanged(range)
      }
      this.close()
    }
  }
}
