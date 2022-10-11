/* global */
class Slider {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      orientation: 'horizontal',
      min: 0,
      max: 100,
      stepValue: 10,
      value: 50,
      secondHandle: true,
      secondHandleValue: 75,
      currentValue: true,
      secondCurrentValue: true,
      valueDisplayPos: 'below',
      presets: [],
      presetsDisplay: true,
      presetsDisplayPos: 'above',
      onValueChange: ''
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
      el.addEventListener('onchange', this.handleOnChange.bind(this))
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
    return progressContainerEl[p] * (v / this.options.max) - 12
  }
  handleMouseMove (event) {
    if (this.dragging === true) {      
      let newX = event.clientX
      let newY = event.clientY
      let diffX = newX - this.startX
      let diffY = newY - this.startY  
      // let diffZ = get position of first handle, second handle, distance inbetween them calculated is diffZ
      const progressContainerEl = document.getElementById(`${this.elementId}_progressContainer`)
      const el = document.getElementById(`${this.elementId}_singleHandle`)
      const secondEl = document.getElementById(`${this.elementId}_secondHandle`)
      let newElX = this.elementX + diffX
      let secondElX = this.elementX + diffX
      let currentValue = document.getElementById(`${this.elementId}_currentValue`)
      let secondCurrentValue = document.getElementById(`${this.elementId}_secondCurrentValue`)
      newElX = Math.max(-12, Math.min(newElX, progressContainerEl.clientWidth - 12))
      console.log('here', progressContainerEl.clientWidth)
      secondElX = Math.max(-12, Math.min(secondElX, progressContainerEl.clientWidth - 12))
      if (this.fromPx(newElX) % this.options.stepValue === 0) {
        currentValue.innerHTML = this.fromPx(newElX)
        el.style.left = `${newElX}px`
        // secondEl.style.left = 
        // console.log(this.fromPx(newElX) % this.options.stepValue)
        const progressBar = document.getElementById(`${this.elementId}_progressBar`)
        progressBar.style.width = `${newElX + 12}px`
      }
      secondCurrentValue.innerHTML = ''
      secondEl.style.left = `${newX}px`
    }
  }
  handleClick (event) {
    const progressContainerEl = document.getElementById(`${this.elementId}_progressContainer`)
    const bounds = progressContainerEl.getBoundingClientRect()
    const firstHandle = document.getElementById(`${this.elementId}_singleHandle`)
    const secondHandle = document.getElementById(`${this.elementId}_secondHandle`)
    const progressBar = document.getElementById(`${this.elementId}_progressBar`)
    const currentValue = document.getElementById(`${this.elementId}_currentValue`)
    const secondCurrentValue = document.getElementById(`${this.elementId}_secondCurrentValue`)
    const valueId = event.target.getAttribute('data-value')
    let p = this.options.orientation === 'horizontal' ? 'width' : 'height'
    let o = this.options.orientation === 'horizontal' ? 'left' : 'top'
    let position = event.clientX - bounds.x - 12
    let v = this.fromPx(position)
    let r = v % this.options.stepValue
    if (event.target.classList.contains('progress-background') || (event.target.classList.contains('progress-bar'))) {
      v = v - r + (this.options.stepValue * Math.round(r / this.options.stepValue))
      firstHandle.style.left = this.toPx(v) + 'px'
      secondHandle.style.left = `${this.toPx(v) + 50}px`
      progressBar.style[p] = `${this.toPx(v) + 12}px`
      currentValue.innerHTML = v
      secondCurrentValue.innerHTML = ''
    }
    if (event.target.classList.contains('array-option')) {
      firstHandle.style[o] = this.toPx(valueId) + 'px'
      progressBar.style[p] = `${this.toPx(valueId) + 12}px`
      currentValue.innerHTML = valueId
    }
    if (event.target.classList.contains('second-handle')) {
      console.log('second handle click')
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
    const leftValuePopup = document.getElementById(`${this.elementId}_currentValue`)
    leftValuePopup.classList.remove('active')
    if (this.options.onValueChange) {
      this.options.onValueChange(this.options.value)
    } 
  }
  handleOnChange (event) { 
    this.options.value.onChange(this.options.onValueChange(event))
    // onValueChange
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
        <div class="slider-container ${this.options.orientation}" id="sliderContainer-${this.options.orientation}">
          <div class="values-group">
            <div class="min-value" id="${this.elementId}_minValue"">${this.options.min}</div>
            <div class="max-value" id="${this.elementId}_maxValue">${this.options.max}</div>
          </div>
          <div class="progress-container" id="${this.elementId}_progressContainer">              
            <div class="progress-background" id="progressBackground"></div>
            <div class="progress-bar" id="${this.elementId}_progressBar"></div>
            <div class="singleHandle handle" id="${this.elementId}_singleHandle">
              <div class="current-value" id="${this.elementId}_currentValue">${this.options.value}</div>
            </div>
            <div class="secondHandle handle" id="${this.elementId}_secondHandle">
              <div class="current-value" id="${this.elementId}_secondCurrentValue">${this.options.secondHandleValue}</div>
            </div>
          
            `
      if (this.options.presets.length > 0) {
        html += `
          <ul class="preset-array" id="${this.elementId}_presetArray">
                `
        this.options.presets.forEach((p) => {
          html += `
            <li class="array-option" data-value="${p.value}">${p.label}</li>   
            `
        })
        html += `
          </ul>
          </div>   
        </div>  
           `
      }
      if (this.options.secondHandle === true) {
        const progressBar = document.getElementById(`${this.elementId}_progressBar`)  
        // set width to 100% but the boundaries of this element are now inside the two handle values
      }
      el.innerHTML = html
      const singleHandleEl = document.getElementById(`${this.elementId}_singleHandle`)
      const secondHandleEl = document.getElementById(`${this.elementId}_secondHandle`)
      let p = this.options.orientation === 'horizontal' ? 'width' : 'height'
      let o = this.options.orientation === 'horizontal' ? 'left' : 'top'
      if (singleHandleEl) {
        singleHandleEl.style[o] = `${this.toPx(this.options.value)}px`
      }
      if (secondHandleEl) {
        secondHandleEl.style[o] = `${this.toPx(this.options.secondHandleValue)}px`
      }
      const progressBar = document.getElementById(`${this.elementId}_progressBar`)
      progressBar.style[p] = `${this.toPx(this.options.value) + 12}px`
    }
    const secondHandle = document.getElementById(`${this.elementId}_secondHandle`)
    const currentValueDisplay = document.getElementById(`${this.elementId}_currentValue`)
    const secondCurrentValueDisplay = document.getElementById(`${this.elementId}_secondCurrentValue`)
    const progressBar = document.getElementById('progress-bar')
    const min = document.getElementById('singleHandle')
    const max = document.getElementById(`${this.elementId}_secondHandle`)
    let o = this.options.orientation === 'horizontal' ? 'left' : 'top'
    if (this.options.secondHandle === false) {
      secondHandle.style.display = 'none'
    } 
    if (this.options.currentValue === false) {
      currentValueDisplay.style.display = 'none'
    }
    if (this.options.secondCurrentValue === false) {
      currentValueDisplay.style.display = 'none'
    }
    if (this.options.valueDisplayPos === 'left') {
      const currentValueDisplay = document.getElementById(`${this.elementId}_currentValue`)
      currentValueDisplay.style.left = '-30px'
      currentValueDisplay.style.top = '-20px'
    }
    if (this.options.valueDisplayPos === 'right') {
      const currentValueDisplay = document.getElementById(`${this.elementId}_currentValue`)
      currentValueDisplay.style.left = '30px'
      currentValueDisplay.style.top = '-20px'
    }
    if (this.options.valueDisplayPos === 'above') {
      const currentValueDisplay = document.getElementById(`${this.elementId}_currentValue`)
      currentValueDisplay.style.top = '-24px'
      currentValueDisplay.style.left = '-5px'
    }
    if (this.options.valueDisplayPos === 'below') {
      const currentValueDisplay = document.getElementById(`${this.elementId}_currentValue`)
      const secondCurrentValueDisplay = document.getElementById(`${this.elementId}_secondCurrentValue`)
      currentValueDisplay.style.top = '30px'
      currentValueDisplay.style.left = '-5px'
      secondCurrentValueDisplay.style.top = '30px'
      secondCurrentValueDisplay.style.left = '-3px'
    }
    if (this.options.presetsDisplay === true) {
      const presets = document.getElementById(`${this.elementId}_presetArray`)
      presets.classList.add('active')
    }
    if (this.options.presetsDisplay === false && this.options.orientation === 'horizontal') {
      const container = document.getElementById(`sliderContainer-${this.options.orientation}`)
      container.style.height = '70px'
    }
    if (this.options.presetsDisplayPos === 'above') {
      const presets = document.getElementById(`${this.elementId}_presetArray`)
      presets.style.bottom = '110px'
    }
    if (this.options.presetsDisplay === 'below') {
      const presets = document.getElementById('presetArray')
    }
    if (this.options.orientation === 'vertical') {
      console.log('hi')
    }
  }
}
