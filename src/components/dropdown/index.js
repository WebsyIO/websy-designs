class WebsyDropdown {
  constructor (elementId, options) {
    const DEFAULTS = {
      multiSelect: false,
      allowClear: true,
      style: 'plain',
      items: [],
      label: ''
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
    this.render()
  }
  get data () {
    return this.options.items
  }
  close () {
    const maskEl = document.getElementById(`${this.elementId}_mask`)
    const contentEl = document.getElementById(`${this.elementId}_content`)
    maskEl.classList.remove('active')
    contentEl.classList.remove('active')
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
    console.log('rendering dropdown', this.selectedItems)
    console.log(this.selectedItems.length === 1 ? 'one-selected' : '')
    let html = `
      <div class='websy-dropdown-container'>
        <div id='${this.elementId}_header' class='websy-dropdown-header ${this.selectedItems.length === 1 ? 'one-selected' : ''}'>
          <span class='websy-dropdown-header-label'>${this.options.label}</span>
          <span class='websy-dropdown-header-value' id='${this.elementId}_selectedItems'>${this.selectedItems.map(s => this.options.items[s].label).join(',')}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z"/></svg>
        </div>
        <div id='${this.elementId}_mask' class='websy-dropdown-mask'></div>
        <div id='${this.elementId}_content' class='websy-dropdown-content'>
          <div class='websy-dropdown-items'>
            <ul>
              ${this.options.items.map((r, i) => `
                <li data-index='${i}' class='websy-dropdown-item ${this.selectedItems.indexOf(i) !== -1 ? 'active' : ''}'>${r.label}</li>
              `).join('')}
            </ul>
          </div><!--
          --><div class='websy-dropdown-custom'></div>
        </div>
      </div>
    `
    el.innerHTML = html
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
    const el = document.getElementById(this.elementId)
    const headerEl = document.getElementById(`${this.elementId}_header`)
    const labelEl = document.getElementById(`${this.elementId}_selectedItems`)
    const itemEls = el.querySelectorAll(`.websy-dropdown-item`)
    for (let i = 0; i < itemEls.length; i++) {
      itemEls[i].classList.remove('active')
      if (this.selectedItems.indexOf(i) !== -1) {
        itemEls[i].classList.add('active')
      }
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
        console.log('we got here for some reason')
        labelEl.innerHTML = ''
      }
      if (this.options.onItemSelected) {
        this.options.onItemSelected(item, this.selectedItems, this.options.items)
      }
      this.close()
    }
  }
}
