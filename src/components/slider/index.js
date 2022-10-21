/* global */
class Slider {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      orientation: 'horizontal',
      min: 0,
      max: 100,
      stepValue: 5,
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
      // let newY = event.clientY
      let diffX = newX - this.startX
      // let diffY = newY - this.startY  
      const progressContainerEl = document.getElementById(`${this.elementId}_progressContainer`)
      const el = document.getElementById(`${this.elementId}_singleHandle`)
      const secondEl = document.getElementById(`${this.elementId}_secondHandle`)
      let newElX = this.elementX + diffX
      let currentValueEl = document.getElementById(`${this.elementId}_currentValue`)
      let secondCurrentValueEl = document.getElementById(`${this.elementId}_secondCurrentValue`)
      newElX = Math.max(-12, Math.min(newElX, progressContainerEl.clientWidth - 12))
      const progressBar = document.getElementById(`${this.elementId}_progressBar`)
      let progressBarWidth
      let progressBarLeft 
      let currentValue = this.fromPx(el.offsetLeft)
      let secondCurrentValue = this.options.max + this.options.stepValue
      if (this.options.secondHandle) {
        secondCurrentValue = this.fromPx(secondEl.offsetLeft)
      }
      if (this.selectedHandle === 0) {
        if (this.fromPx(newElX) % this.options.stepValue === 0 && currentValue < secondCurrentValue) {
          currentValueEl.innerHTML = this.fromPx(newElX)
          let maxPx = this.toPx(secondCurrentValue - this.options.stepValue)
          if (this.options.secondHandle) {
            progressBarWidth = secondEl.offsetLeft - newElX
            progressBarLeft = Math.min(newElX, maxPx) + 12
          }
          else {
            progressBarWidth = newElX + 12
            progressBarLeft = 0
          }
          el.style.left = progressBarLeft - 12 + 'px'
          progressBar.style.width = progressBarWidth + 'px'
          progressBar.style.left = progressBarLeft + 'px'
        }
        else if (currentValue >= secondCurrentValue) {
          progressBar.style.width = this.toPx(this.options.stepValue) + 'px'
          progressBar.style.left = this.toPx(currentValue) + 'px'
        }
        else {
          console.log('testing', currentValue, secondCurrentValue)
        }
      } 
      else {
        if (this.fromPx(newElX) % this.options.stepValue === 0 && secondCurrentValue > currentValue) {
          secondCurrentValueEl.innerHTML = this.fromPx(newElX) // secondCurrentValue gives correct number? 
          let maxPx = this.toPx(currentValue + this.options.stepValue)
          secondEl.style.left = `${Math.max(newElX, maxPx)}px`
          progressBarWidth = `${newElX - el.offsetLeft}px`
          progressBarLeft = `${el.offsetLeft + 12}px`
          progressBar.style.width = progressBarWidth
          progressBar.style.left = progressBarLeft
          console.log('width', progressBarWidth)
        }
      }
      if (event.target.classList.contains('progress-bar')) {
        console.log('dragging the bar')
        const bar = document.getElementById(`${this.elementId}_progressBar`)
        this.dragging = true
        let lastX = event.pageX
        let dist = event.pageX - lastX 
        let newWidth = Math.max(bar.offsetWidth + dist)
        bar.style.width = newWidth + 'px'
      }
    }
  }
 
  handleClick (event) {
    if (event === 'b') {
      return 
    }
    const progressContainerEl = document.getElementById(`${this.elementId}_progressContainer`)
    const bounds = progressContainerEl.getBoundingClientRect()
    const singleHandle = document.getElementById(`${this.elementId}_singleHandle`)
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
    const el = document.getElementById(`${this.elementId}_singleHandle`)
    let currentValueHere = this.fromPx(el.offsetLeft)
    let secondCurrentValueHere = this.options.max + this.options.stepValue
    let diffX = secondCurrentValueHere - currentValueHere    
    let progressBarWidth
    let progressBarLeft
    let xLocation = event.pageX
    let page = el.getBoundingClientRect().right
    let onetwo = event.target.getBoundingClientRect()
    let mouseLeft = xLocation - onetwo.left
    const secondEl = document.getElementById(`${this.elementId}_secondHandle`)
    if (this.options.secondHandle && event.target.classList.contains('progress-background')) {
      v = v - r + (this.options.stepValue * Math.round(r / this.options.stepValue))
      progressBar.style[p] = secondCurrentValue - currentValue + 'px'
      progressBar.style[o] = `${this.toPx(v) + 12}`
    }
    if (event.target.classList.contains('progress-background')) {
      v = v - r + (this.options.stepValue * Math.round(r / this.options.stepValue))
      // console.log('testing', xLocation - onetwo.left, el.offsetLeft, secondEl.offsetLeft)
      console.log('v', v)
      if (mouseLeft > secondEl.offsetLeft) {
        secondHandle.style.left = this.toPx(v) + 'px'
        secondCurrentValue.innerHTML = v
      } 
      else if (mouseLeft < el.offsetLeft) {
        singleHandle.style.left = this.toPx(v) + 'px'
        progressBar.style.left = this.toPx(v) + 12 + 'px'
        currentValue.innerHTML = v
      }
      if (this.options.secondHandle) {
        progressBar.style[p] = secondEl.offsetLeft - el.offsetLeft + 'px'
      }
      else {
        progressBar.style[p] = `${this.toPx(v) + 12}px`
      }
    }
    if (event.target.classList.contains('array-option')) {
      singleHandle.style[o] = this.toPx(valueId) + 'px'
      progressBar.style[p] = `${this.toPx(valueId) + 12}px`
      currentValue.innerHTML = valueId
    }
  }
  handleMouseDown (event) {
    if (event.target.classList.contains('singleHandle')) {
      this.selectedHandle = 0
    } 
    else if (event.target.classList.contains('secondHandle')) {
      this.selectedHandle = 1 
    }
    if (event.target.classList.contains('handle')) {
      this.dragging = true      
      this.startX = event.clientX
      this.startY = event.clientY
      this.elementX = +event.target.style.left.replace('px', '')
      this.elementy = +event.target.style.top.replace('px', '')
    }
    if (event.target.classList.contains('progress-bar')) {
      this.dragging = true
    }
    if (this.options.secondHandle) {
      const progressBar = document.getElementById(`${this.elementId}_progressBar`)
      progressBar.style.cursor = 'grab'
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
      el.innerHTML = html
      const singleHandleEl = document.getElementById(`${this.elementId}_singleHandle`)
      const secondHandleEl = document.getElementById(`${this.elementId}_secondHandle`)
      let p = this.options.orientation === 'horizontal' ? 'width' : 'height'
      let o = this.options.orientation === 'horizontal' ? 'left' : 'top'
      const progressBar = document.getElementById(`${this.elementId}_progressBar`)
      if (singleHandleEl) {
        singleHandleEl.style[o] = `${this.toPx(this.options.value)}px`
        progressBar.style[p] = `${this.toPx(this.options.value) + 12}px`
      }
      if (secondHandleEl) {
        secondHandleEl.style[o] = `${this.toPx(this.options.secondHandleValue)}px`
        progressBar.style[p] = `${this.toPx(this.options.secondHandleValue - this.options.value) + 12}px`
        progressBar.style[o] = `${this.toPx(this.options.value) + 12}px`
      }
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
    if (this.options.secondHandle) {
      const presets = document.getElementById(`${this.elementId}_presetArray`)
      const ii = document.getElementById('sliderContainer-horizontal')
      presets.style.display = 'none'
      ii.style.height = '65px'
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
      console.log('vertical orientation')
    }
  }
}
