class WebsyDragDrop {
  constructor (elementId, options) {
    const DEFAULTS = {
      items: []
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.elementId = elementId
    if (!elementId) {
      console.log('No element Id provided for Websy DragDrop')		
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      el.innerHTML = `
        <div id='${this.elementId}_container' class='websy-drag-drop-container'></div>
        <div id='${this.elementId}_end_item' data-id='end' class='websy-dragdrop-item websy-end-drop-zone droppable'>
          <div id='${this.elementId}_end_dropZonePlaceholder' class='websy-drop-zone-placeholder'></div>
          <div id='${this.elementId}_end_dropZoneEnd' class='websy-drop-zone left droppable' data-index='-1' data-side='end' data-id='end'></div>
        </div>
      `
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('dragstart', this.handleDragStart.bind(this))      
      el.addEventListener('dragover', this.handleDragOver.bind(this))
      el.addEventListener('dragleave', this.handleDragLeave.bind(this))
      el.addEventListener('drop', this.handleDrop.bind(this))
      el.addEventListener('dragend', this.handleDragEnd.bind(this))
    }
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
    this.render()
  }
  createItemHtml (elementId, index, item) {
    let html = `
      <div id='${elementId}_${index}_item' class='websy-dragdrop-item'>
        <!--<div id='${elementId}_${index}_dropZoneLeft' class='websy-drop-zone left droppable' data-index='${index}' data-side='left' data-id='${index}'></div>-->
        <div id='${elementId}_${index}_itemInner' class='websy-dragdrop-item-inner' draggable='true' data-id='${index}'>${item.html || ''}</div>
        <!--<div id='${elementId}_${index}_dropZonePlaceholder' class='websy-drop-zone-placeholder'></div>-->
    `
    if (index < this.options.items.length - 1) {
      html += `
        <div id='${elementId}_${index}_dropZone' class='websy-drop-zone droppable' data-index='${index}' data-side='right' data-id='${index}'></div>
      `
    }        
    html += `
      </div>
    `
    return html
  }
  handleClick (event) {

  }
  handleDragStart (event) {
    console.log('drag start')
    this.draggedId = event.target.getAttribute('data-id')    
    // const dropLeftEl = document.getElementById(`${this.elementId}_${this.draggedId}_dropZoneLeft`)    
    // dropLeftEl.style.display = 'none'    
    // const dropRightEl = document.getElementById(`${this.elementId}_${this.draggedId}_dropZoneRight`)    
    // dropRightEl.style.display = 'none'   
    // const containerEl = document.getElementById(`${this.elementId}_container`)    
    // containerEl.classList.add('dragging')        
    event.dataTransfer.effectAllowed = 'move'
    event.target.style.opacity = 0.5
    this.dragging = true
  }
  handleDragOver (event) {
    console.log('drag over')
    if (event.preventDefault) {
      event.preventDefault()
    }
    if (!event.target.classList.contains('droppable')) {
      return
    }
    // let side = event.target.getAttribute('data-side')
    // let index = event.target.getAttribute('data-id')
    // const droppedItem = this.options.items[index]
    // const draggedItem = this.options.items[this.draggedId]
    event.target.classList.add('drag-over')
    // const draggedEl = document.getElementById(`${this.elementId}_${this.draggedId}_item`)
    // const draggedElSize = draggedEl.getBoundingClientRect()
    // const placeholderEl = document.getElementById(`${this.elementId}_${this.draggedId}_dropZonePlaceholder`)
    // placeholderEl.classList.add('active')  
    // placeholderEl.style.width = `${draggedElSize.width}px`
    // placeholderEl.style.height = `${draggedElSize.height}px`
    // if (side === 'left') {
    //   const dropEl = document.getElementById(`${this.elementId}_${index}_dropZoneLeft`)
    //   dropEl.style.width = `${(draggedElSize.width / 2 + draggedElSize.width)}px`
    //   const dropImageEl = document.getElementById(`${this.elementId}_${index}_itemInner`)
    //   dropImageEl.style.left = `${draggedElSize.width}px`
    //   placeholderEl.style.left = '0px'      
    // }
    // else if (side === 'right') {
    //   const dropEl = document.getElementById(`${this.elementId}_${index}_dropZoneRight`)      
    //   dropEl.style.width = `${(draggedElSize.width / 2 + draggedElSize.width)}px`      
    //   placeholderEl.style.right = '0px'      
    // }
    // else {
    //   const dropEl = document.getElementById(`${this.elementId}_${index}_dropZoneEnd`)      
    //   dropEl.style.width = `${draggedElSize.width}px` 
    // }
  }
  handleDragLeave (event) {
    console.log('drag leave')
    if (!event.target.classList.contains('droppable')) {
      return
    }
    event.target.classList.add('drag-over')
    // let side = event.target.getAttribute('data-side')
    // let id = event.target.getAttribute('data-id')    
    // let droppedItem = this.options.items[id]
    // this.removeExpandedDrop(side, id, droppedItem)  
  }
  handleDrop (event) {
    console.log('drag drop')
    if (event.preventDefault) {
      event.preventDefault()
    }
    if (!event.target.classList.contains('droppable')) {
      return
    }
    let side = event.target.getAttribute('data-side')
    let id = event.target.getAttribute('data-id')
    let index = id   
    let droppedItem = this.options.items[id]
    let draggedArr
    let droppedArr      
    if (side === 'right') {
      index += 1
    }    
    if (index > this.draggedId) {
      // insert and then remove      
      this.options.items.splice(index, 0, droppedItem)
      this.options.items.splice(this.draggedId, 1)
    }
    else {
      // remove and then insert
      this.options.items.splice(this.draggedId, 1)
      this.options.items.splice(index, 0, droppedItem)      
    }
    this.removeExpandedDrop(side, id, droppedItem)
    const draggedEl = document.getElementById(`${this.elementId}_${this.draggedId}_item`)
    const droppedEl = document.getElementById(`${this.elementId}_${id}_item`)
    if (side === 'left') {
      droppedEl.insertAdjacentElement('beforebegin', draggedEl)      
    }
    else if (side === 'right') {
      droppedEl.insertAdjacentElement('afterend', draggedEl)
    } 
    else {
      droppedEl.insertAdjacentElement('beforebegin', draggedEl)
    }
  }
  handleDragEnd (event) {    
    console.log('drag end')
    // const containerEl = document.getElementById(`${this.elementId}_container`)
    // containerEl.classList.remove('dragging')
    // const dropLeftEl = document.getElementById(`${this.elementId}_${this.draggedId}_dropZoneLeft`)
    // dropLeftEl.style.display = null
    // const dropRightEl = document.getElementById(`${this.elementId}_${this.draggedId}_dropZoneRight`)
    // dropRightEl.style.display = null
    event.target.style.opacity = 1
    this.draggedId = null
    this.dragging = false
  }
  measureItems () {
    const el = document.getElementById(`${this.elementId}_container`)
    this.options.items.forEach(d => {

    })
  }
  removeExpandedDrop (side, id, droppedItem) {
    let dropEl
    const dropImageEl = document.getElementById(`${this.elementId}_${id}_itemInner`)
    const placeholderEl = document.getElementById(`${this.elementId}_${id}_dropZonePlaceholder`)
    if (side === 'left') {
      dropEl = document.getElementById(`${this.elementId}_${id}_dropZoneLeft`) 
      dropImageEl.style.left = `0px`
    }
    else if (side === 'right') {
      dropEl = document.getElementById(`${this.elementId}_${id}_dropZoneRight`)      
    }
    else {
      dropEl = document.getElementById(`${this.elementId}_${id}_dropZoneEnd`)  
    }
    if (dropEl) {
      const dropElSize = dropEl.getBoundingClientRect()      
      dropEl.style.width = `${(dropElSize.width / 2)}px`
      dropEl.style.marginLeft = null
      dropEl.style.border = null
    }
    if (placeholderEl) {
      placeholderEl.classList.remove('active')
      placeholderEl.style.left = null
      placeholderEl.style.right = null
      placeholderEl.style.width = null
      placeholderEl.style.height = null
    }
  }
  render () {
    const el = document.getElementById(`${this.elementId}_container`)
    if (el && this.options.items.length > 0) {
      this.measureItems()
      el.innerHTML = this.options.items.map((d, i) => this.createItemHtml(this.elementId, i, d)).join('')
    }
  }
}
