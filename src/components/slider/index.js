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

  handleClick (event) {

  }
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
      let html = 
      `
      <div id="websy-slider" class="websy-slider">
        <div class="slidecontainer">
          <input type="range" min="1" max="100" value="10" class="slider" id="myRange">
        </div> 
      </div>  
    `
      el.innerHTML = html 
    }
    let slider = document.getElementById('myRange')
    let output = document.getElementById('demo')
    output.innerHTML = slider.value
    slider.oninput = function () {
      output.innerHTML = this.value
    }
  }
}
