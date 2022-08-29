/* global */
class Slider {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      singleValue: false,
      rangeValue: true,
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
    <div><span class="value">0</span></div>
    <div class="progress-bar"></div>
    <div class="progress-handle"></div>
   
     `
      el.innerHTML = html
    }
    // let sliderValue = document.getElementById('slider-value')
    // sliderValue.innerHTML = sliderValue.value
    // sliderValue.oninput = function () {
    //   sliderValue = this.value
    // }
  }
}
