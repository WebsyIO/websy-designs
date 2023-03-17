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
