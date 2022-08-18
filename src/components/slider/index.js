/* global */
class Slider {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {}
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
      <input type="range" min="0" max="100" value="30" id="slider-1">
      <input type="range"min="0" max="100" value="70" id="slider-2">
        `
      el.innerHTML = html 
    }
  }
}
