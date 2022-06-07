/* global */

class Carousel {
  constructor (elementId, options) {
    const DEFAULTS = {
      images: {},
      currentSlide: 0
    }
    this.options = Object.assign({}, DEFAULTS, options)
    if (!elementId) {
      console.log('No element Id provided')
    }
    const el = document.getElementById(elementId)
    if (el) {
      this.elementId = elementId
      this.render()
    }
  }
  render(options) {
    this.options = Object.assign({}, this.options, options)
    let carouselData = ['']
    this.resize()
  }
  resize () {
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = `
      <div class="websy-carousel">
        <ul>
          <li><img src="${images}" alt="${this.elementId}"></li>
        </ul>
      </div>
      `
      el.innerHTML = html
    }
  }
}