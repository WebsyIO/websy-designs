/* global */
class Slider {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      secondHandle: true,
      min: 0,
      max: 100,
      stepValue: 1,
      value: 0,
      rangeValue: 100,
      vertical: false,
      currentValueDisplay: true,
      valueDisplayLeft: 'above',
      valueDisplayRight: 'above',
      presets: [''],
      presetsDisplay: 'above',
      orientation: 'horizontal'
    }
    this.dragging = false
    this.startX = null
    this.startY = null
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('mousedown', this.handleMouseDown.bind(this))
      document.addEventListener('mouseup', this.handleMouseUp.bind(this))
      document.addEventListener('mousemove', this.handleMouseMove.bind(this))
      this.render()
    }
  }
  fromPx (px) {
    const progressContainerEl = document.getElementById(`${this.elementId}_progressContainer`)
    let p = this.options.orientation === 'horizontal' ? 'clientWidth' : 'clientHeight'
    return this.options.value * (px / progressContainerEl[p])
  }
  toPx (v) {
    const progressContainerEl = document.getElementById(`${this.elementId}_progressContainer`)
    let p = this.options.orientation === 'horizontal' ? 'clientWidth' : 'clientHeight'
    return progressContainerEl[p] * (this.options.value / this.options.max) - 12
  }
  handleClick () {
    
  }
  handleMouseMove (event) {
    if (this.dragging === true) {      
      let newX = event.clientX
      let newY = event.clientY
      let diffX = newX - this.startX
      let diffY = newY - this.startY      
      const progressContainerEl = document.getElementById(`${this.elementId}_progressContainer`)
      const el = document.getElementById(`${this.elementId}_singleHandle`)
      let newElX = this.elementX + diffX
      newElX = Math.max(-12, Math.min(newElX, progressContainerEl.clientWidth - 12))      
      el.style.left = `${newElX}px`
      console.log(this.fromPx(newElX))
    }
  }

  handleMouseDown (event) {
    if (event.target.classList.contains('handle')) {
      this.dragging = true      
      this.startX = event.clientX
      this.startY = event.clientY
      this.elementX = +event.target.style.left.replace('px', '')
      this.elementy = +event.target.style.top.replace('px', '')
    }
  }
  handleMouseUp (event) { 
    this.dragging = false
  }
  render (options) {
    this.options = Object.assign({}, this.options, options)
    this.resize()
    const min = document.getElementById('singleHandle')
    const max = document.getElementById('secondHandle')
  }
  resize () {
    const el = document.getElementById(this.elementId)    
    if (el.clientHeight > el.clientWidth) {
      this.options.orientation = 'vertical'
    }
    if (el) {
      let html = `
        <div class="slider-container ${this.options.orientation}">
            <span>0</span>
            <div id="currentValue">0</div>
            <div class="progress-container" id="${this.elementId}_progressContainer">              
              <div class="progress-background" id="progressBackground"></div>
              <div class="progress-bar" id="progressBar"></div>
              <div class="singleHandle handle" id="${this.elementId}_singleHandle"></div>
              <div class="secondHandle handle" id="secondHandle"></div>
            </div>            
            <span>100</span>
        </div> 
     `
      el.innerHTML = html
      const singleHandleEl = document.getElementById(`${this.elementId}_singleHandle`)
      if (singleHandleEl) {
        singleHandleEl.style.left = `${this.toPx(this.options.value)}px`
      }
    }
    const secondHandle = document.getElementById('secondHandle')
    const currentValueDisplay = document.getElementById('currentValue')
    const progressBar = document.getElementById('progress-bar')
    const min = document.getElementById('singleHandle')
    const max = document.getElementById('secondHandle')
    if (this.options.secondHandle === false) {
      secondHandle.style.display = 'none'
    } 
    if (this.options.currentValueDisplay === false) {
      currentValueDisplay.style.display = 'none'
    }
    if (this.options.vertical === true) {
      progressBar.style.width = '.5vw'
      progressBar.style.height = '50vh'
      min.style.top = '7.4%'
      min.style.right = '98.74%'
      max.style.top = '20%'
      max.style.right = '98.74%'
    }
  }
}

function closeDragElement () {
  // stop moving when mouse button is released:
  document.onmouseup = null
  document.onmousemove = null
}
function showCoords (event) {
  const x = event.clientX
  console.log(x)
}
