/* global */

class WebsyCarousel {
  constructor (elementId, options) {
    const DEFAULTS = {
      currentFrame: 0,
      frameDuration: 4000
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
  play () {
    setInterval(() => {
      const l = document.getElementById(
        `${this.elementId}_frame_${this.options.currentFrame}`)
      l.style.transform = 'translateX(-100%)'
      if (this.options.currentFrame === this.options.frames.length - 1) {
        this.options.currentFrame = 0
      } 
      else {
        this.options.currentFrame++
      }
      const k = document.getElementById(
        `${this.elementId}_frame_${this.options.currentFrame}`)
      k.style.transform = 'translateX(0)'
    }, this.options.frameDuration)
  }
  render (options) {
    this.options = Object.assign({}, this.options, options)
    this.resize()
  }
  resize () {
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = `
      <div class="websy-carousel">
        ` 
      this.options.frames.forEach((frame, frameIndex) => {
        html += `
        <div id="${this.elementId}_frame_${frameIndex}" class="websy-frame-container">
        `
        frame.images.forEach(image => {
          html += `
          <div class="item active" style="background-image: url(${image.url})">
        
        </div>
        `
        })
        html += `</div>`
      })
      html += `
      </div>
      `
      el.innerHTML = html
    }
    this.play()
  }
}
