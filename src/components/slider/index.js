/* global */
class Slider {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      singleValue: false,
      rangeValue: true,
      min: Number,
      max: Number,
      horizontal: true,
      vertical: false,
      currentValueDisplay: true,
      valueDisplayLeft: 'above',
      valueDisplayRight: 'above',
      presets: []
    }
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      this.render()
    }
  }

  handleClick (event) {

  }

  handleMouseMove (event) {

  }

  handleMouseUp (event) {

  }
  render (options) {
    this.options = Object.assign({}, this.options, options)
    this.resize()
  }
  resize () {
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = 
      `
      <div class="websy-slider">
      <input type="range" min="0" max="100" value="30" id="slider-left">
      <input type="range" min="0" max="100" value="70" id="slider-right">
      </div>
        `
      el.innerHTML = html 
    }
  }
}
