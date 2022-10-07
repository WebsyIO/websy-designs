/* global */
class Slider {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      orientation: 'horizontal',
      secondHandle: true,
      min: 0,
      max: 100,
      stepValue: 1,
      value: 0,
      currentValue: true,
      valueDisplayPos: 'above',
      presets: [''],
      presetsDisplay: true,
      presetsDisplayPos: 'below'
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
    px = px + 12
    const progressContainerEl = document.getElementById(`${this.elementId}_progressContainer`)
    const progressBarEl = document.getElementById(`${this.elementId}_progressBar`)
    let p = this.options.orientation === 'horizontal' ? 'clientWidth' : 'clientHeight'
    return Math.round(this.options.max * (px / progressContainerEl[p]))
  }
  toPx (v) {
    const progressContainerEl = document.getElementById(`${this.elementId}_progressContainer`)
    let p = this.options.orientation === 'horizontal' ? 'clientWidth' : 'clientHeight'
    return progressContainerEl[p] * (this.options.value / this.options.max) - 12
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
      if (this.fromPx(newElX) % this.options.stepValue === 0) {
        let currentValue = document.getElementById(`${this.elementId}_currentValue`).innerHTML = this.fromPx(newElX)
        el.style.left = `${newElX}px`
        console.log(this.fromPx(newElX) % this.options.stepValue)
        const progressBar = document.getElementById(`${this.elementId}_progressBar`)
        progressBar.style.width = `${newElX + 12}px`
      }
    }
  }
  handleClick (event) {
    const leftValue = document.getElementById(`${this.elementId}_currentValue`)
    if (event.target.classList.contains('progress-background')) {
      let position = event.clientX
      const handle = document.getElementById(`${this.elementId}_singleHandle`)
      handle.style.left = position + 'px'
    }
  }
  handleMouseDown (event) {
    if (event.target.classList.contains('handle')) {
      this.dragging = true      
      this.startX = event.clientX
      this.startY = event.clientY
      this.elementX = +event.target.style.left.replace('px', '')
      this.elementy = +event.target.style.top.replace('px', '')
      const leftValuePopup = document.getElementById(`${this.elementId}_currentValue`)
      leftValuePopup.classList.toggle('active')
    }
  }
  handleMouseUp (event) { 
    this.dragging = false
    const leftValuePopup = document.getElementById(`${this.elementId}_currentValue`)
    leftValuePopup.classList.remove('active')
  }
  render (options) {
    this.options = Object.assign({}, this.options, options)
    this.resize()
  }
  resize () {
    const el = document.getElementById(this.elementId)    
    if (el.clientHeight > el.clientWidth) {
      this.options.orientation = 'vertical'
    }
    if (el) {
      let html = `
        <div class="slider-container ${this.options.orientation}">
        <div class="values-group">
          <div class="min-value" id="${this.elementId}_minValue"">${this.options.min}</div>
            <div class="max-value" id="${this.elementId}_maxValue">${this.options.max}</div>
            </div>
          <div class="current-value" id="${this.elementId}_currentValue">${this.options.value}</div>
            <div class="progress-container" id="${this.elementId}_progressContainer">              
              <div class="progress-background" id="progressBackground"></div>
              <div class="progress-bar" id="${this.elementId}_progressBar"></div>
              <div class="singleHandle handle" id="${this.elementId}_singleHandle"></div>
              <div class="secondHandle handle" id="secondHandle"></div>
                <ul class="preset-array" id="${this.elementId}_presetArray">
                  <li>${this.options.presets}0%</li>
                  <li>${this.options.presets}25%</li>
                  <li>${this.options.presets}50%</li>
                  <li>${this.options.presets}75%</li>
                  <li>${this.options.presets}100%</li>
                </ul>
              </div>
            </div>            
        </div> 
     `
      el.innerHTML = html
      const singleHandleEl = document.getElementById(`${this.elementId}_singleHandle`)
      const leftValuePopup = document.getElementById(`${this.elementId}_currentValue`)
      if (singleHandleEl) {
        singleHandleEl.style.left = `${this.toPx(this.options.value)}px`
      }
    }
    const secondHandle = document.getElementById('secondHandle')
    const currentValueDisplay = document.getElementById(`${this.elementId}_currentValue`)
    const progressBar = document.getElementById('progress-bar')
    const min = document.getElementById('singleHandle')
    const max = document.getElementById('secondHandle')
    if (this.options.secondHandle === false) {
      secondHandle.style.display = 'none'
    } 
    if (this.options.currentValue === false) {
      currentValueDisplay.style.display = 'none'
    }
    if (this.options.valueDisplayPos === 'left') {
      const currentValueDisplay = document.getElementById(`${this.elementId}_currentValue`)
      currentValueDisplay.style.color = 'green'
    }
    if (this.options.valueDisplayPos === 'right') {
      const currentValueDisplay = document.getElementById(`${this.elementId}_currentValue`)
      currentValueDisplay.style.color = 'black'
    }
    if (this.options.valueDisplayPos === 'above') {
      const currentValueDisplay = document.getElementById(`${this.elementId}_currentValue`)
      currentValueDisplay.style.color = 'red'
    }
    if (this.options.presets === ['']) {
      const presets = document.getElementById('presetArray')
    }
    if (this.options.presetsDisplay === true) {
      const presets = document.getElementById(`${this.elementId}_presetArray`)
      presets.classList.add('active')
    }
    if (this.options.presetsDisplayPos === 'above') {
      const presets = document.getElementById(`${this.elementId}_presetArray`)
      presets.style.bottom = '110px'
    }
    if (this.options.presetsDisplay === 'below') {
      const presets = document.getElementById('presetArray')
      presets.style.top = '-10px'
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
