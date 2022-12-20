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
