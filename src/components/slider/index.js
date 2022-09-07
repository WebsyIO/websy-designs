/* global */
class Slider {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      singleHandle: false,
      secondHandle: true,
      min: Number,
      max: Number,
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
      this.render()
    }
  }

  handleClick (event) {}
  // handleMouseMove (event) {

  // }

  // handleMouseUp (event) {

  // }
  render (options) {
    this.options = Object.assign({}, this.options, options)
    this.resize()
  }
  resize () {
    const el = document.getElementById(this.elementId)

    if (el) {
      let html = `
    <div class="websy-slider">
      <div class="value">
        <span>0</span>
      </div>
      <div class="slider">
        <div class="progress-bar"></div>
        <div class="progress-handle"></div>
        <div class="secondHandle" id="secondHandle"></div>
      </div>
    </div> 
     `
      el.innerHTML = html
    }
    const secondHandle = document.getElementById('secondHandle')

    if (this.options.secondHandle === true) {
      secondHandle.style.display = 'block'
    }
    // let sliderValue = document.getElementById('slider-value')
    // sliderValue.innerHTML = sliderValue.value
    // sliderValue.oninput = function () {
    //   sliderValue = this.value
    // }
  }
}
