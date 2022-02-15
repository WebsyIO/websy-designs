/* global */ 
class WebsyNavigationMenu {
  constructor (elementId, options) {
    this.options = Object.assign({}, {
      collapsible: false,
      orientation: 'horizontal',
      parentMap: {},
      childIndentation: 10,
      activeSymbol: 'none'
    }, options)
    if (!elementId) {
      console.log('No element Id provided for Websy Menu')		
      return
    }    
    const el = document.getElementById(elementId)
    if (el) {
      this.elementId = elementId
      this.lowestLevel = 0
      this.flatItems = []
      this.itemMap = {}
      this.flattenItems(0, this.options.items)    
      console.log(this.flatItems)
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
  flattenItems (index, items, level = 0) {
    if (items[index]) {
      this.lowestLevel = Math.max(level, this.lowestLevel)
      items[index].id = items[index].id || 	`${this.elementId}_${this.normaliseString(items[index].text)}`
      this.itemMap[items[index].id] = items[index]
      items[index].level = level
      this.flatItems.push(items[index])
      if (items[index].items) {
        this.flattenItems(0, items[index].items, level + 1)  
      }
      this.flattenItems(++index, items, level)
    }    
  }
  handleClick (event) {
    if (event.target.classList.contains('websy-menu-icon') || 
      event.target.nodeName === 'svg' ||
      event.target.nodeName === 'rect') {
      this.toggleMobileMenu()
    }
    if (event.target.classList.contains('websy-menu-header')) {
      let item = this.itemMap[event.target.id]
      if (event.target.classList.contains('trigger-item') && item.level === this.lowestLevel) {
        this.toggleMobileMenu('remove')
      } 
      if (item.items) {
        event.target.classList.toggle('menu-open')
        this.toggleMenu(item.id)
      }
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
      if (this.options.collapsible === true) {
        html += `
          <div id='${this.elementId}_menuIcon' class='websy-menu-icon'>
            <svg viewbox="0 0 40 40" width="30" height="40">              
              <rect x="0" y="0" width="30" height="4" rx="2"></rect>
              <rect x="0" y="12" width="30" height="4" rx="2"></rect>
              <rect x="0" y="24" width="30" height="4" rx="2"></rect>
            </svg>
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
      html += this.renderBlock(this.options.items, 'main', 0)
      html += `</div>`
      el.innerHTML = html
      if (this.options.navigator) {
        this.options.navigator.registerElements(el)
      }
    }
  }
  renderBlock (items, block, level = 0) {
    let html = `
		  <ul class='websy-${this.options.orientation}-list ${level > 0 ? 'websy-child-list' : ''} ${(block !== 'main' ? 'websy-menu-collapsed' : '')}' id='${this.elementId}_${block}_list'
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
			<li class='websy-${this.options.orientation}-list-item'>
				<div class='websy-menu-header ${items[i].classes || ''} ${selected} ${active}' 
						 id='${blockId}' 
						 data-id='${currentBlock}'
             data-menu-id='${this.elementId}_${currentBlock}_list'
						 data-popout-id='${level > 1 ? block : currentBlock}'
						 data-text='${items[i].text}'
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
      if (this.options.activeSymbol === 'triangle') {
        html += `
          <span class='active-square'></span>
        `
      }
      html += `          
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
        html += this.renderBlock(items[i].items, currentBlock, items[i].level + 1)			
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
