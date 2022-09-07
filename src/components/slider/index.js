/* global */
class Slider {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      secondHandle: true,
      min: 0,
      max: 100,
      stepValue: '',
      leftStartValue: 0,
      rightStartValue: 100,
      horizontal: true,
      vertical: false,
      currentValueDisplay: true,
      valueDisplayLeft: 'above',
      valueDisplayRight: 'above',
      presets: [''],
      presetsDisplay: 'above'
    }
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('mousedown', this.handleMouseDown(this))
      el.addEventListener('mousemove', this.handleMouseMove(this))
      this.render()
    }
  }
  handleClick () {
    console.log('testing')
  }
  handleMouseMove (event) {
    const singleHandleDrag = document.getElementById('singleHandle')
    const secondHandleDrag = document.getElementById('secondHandle')
  }

  handleMouseDown (event) {
    const singleHandleDrag = document.getElementById('singleHandle')
    const secondHandleDrag = document.getElementById('secondHandle')
  }
  render (options) {
    this.options = Object.assign({}, this.options, options)
    this.resize()
    const min = document.getElementById('singleHandle')
    const max = document.getElementById('secondHandle')
  }
  resize () {
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = `
    <div class="websy-slider">
      <div class="currentValue" id="currentValue">
        <span>0</span>
      </div>
        <div class="progress-bar"></div>
        <div class="singleHandle" id="singleHandle"></div>
        <div class="secondHandle" id="secondHandle"></div>
    </div> 
     `
      el.innerHTML = html
    }
    const secondHandle = document.getElementById('secondHandle')
    const currentValueDisplay = document.getElementById('currentValue')
    if (this.options.secondHandle === false) {
      secondHandle.style.display = 'none'
    } 
    if (this.options.currentValueDisplay === false) {
      currentValueDisplay.style.display = 'none'
    }
  }
}

function closeDragElement () {
  // stop moving when mouse button is released:
  document.onmouseup = null
  document.onmousemove = null
}
