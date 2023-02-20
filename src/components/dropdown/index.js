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
