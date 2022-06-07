/* global */

class WebsyCarousel {
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
      <div class="carousel-inner">
        <div class="item active">
          <img src="${carouselData[this.elementId]}" alt="${this.elementId}">
        </div>
        <div class="item">
          <img src="${carouselData}" alt="${this.elementId}">
        </div>
        <div class="item">
          <img src="${carouselData}" alt="${this.elementId}">
        </div>
      </div>
      `
      el.innerHTML = html
    }
  }
}