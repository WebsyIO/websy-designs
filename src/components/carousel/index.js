/* global */

class WebsyCarousel {
  constructor (elementId, options) {
    const DEFAULTS = {
      currentFrame: 0,
      frameDuration: 4000,
      showFrameSelector: true,
      showPrevNext: true
    }
    this.options = Object.assign({}, DEFAULTS, options)
    if (!elementId) {
      console.log('No element Id provided')
    }
    const el = document.getElementById(elementId)
    el.addEventListener('click', this.handleClick.bind(this))
    if (el) {
      this.elementId = elementId
      this.render()
    }
  }

  handleClick (event) {
    if (event.target.classList.contains('websy-next-arrow')) {
      this.next()
    } 
    if (event.target.classList.contains('websy-prev-arrow')) {
      this.prev()
    }
  }

  next () {
    document.getElementById(`${this.elementId}_frame_${this.options.currentFrame}`)
      .style.transform = `translateX(-100%)`
  }

  play () {
    setInterval(() => {
      const l = document.getElementById(
        `${this.elementId}_frame_${this.options.currentFrame}`)
      l.style.transform = 'translateX(100%)'
      const btnInactive = document.getElementById(`${this.elementId}_selector_${this.currentFrame}`)
      btnInactive.classList.remove('websy-progress-btn-active')
      if (this.options.currentFrame === this.options.frames.length - 1) {
        this.options.currentFrame = 0
      } 
      else {
        this.options.currentFrame++
      }
      const k = document.getElementById(
        `${this.elementId}_frame_${this.options.currentFrame}`)
      k.style.transform = 'translateX(0)'
      const btnActive = document.getElementById(`${this.elementId}_selector_${this.currentFrame}`)
      btnActive.classList.add('websy-progress-btn-active')
    }, this.options.frameDuration)
  }

  prev () {
    document.getElementById(`${this.elementId}_frame_${this.options.currentFrame}`)
      .style.transform = `translateX(100%)`
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
        <div id="${this.elementId}_frame_${frameIndex}" class="websy-frame-container" style="transform: translateX(${frameIndex === 0 ? '0' : '-100%'})">
        `
        frame.images.forEach(image => {
          html += `
          <div style="${image.style || ''} background-image: url(${image.url})" class="${image.classes || ''} websy-carousel-image">
          </div>
        `
        })
        frame.text && frame.text.forEach(text => {
          html += `
          <div style="${text.style || ''}" class="${text.classes || ''} websy-carousel-image">
          ${text.html}
          </div>
        `
        })
        
        html += `</div>`
        html += `<div class="websy-btn-parent">`
       
        this.options.frames.forEach(frame, frameIndex => {
          html += 
          `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id=${this.elementId}_selector_${frameIndex}
          <title>Ellipse</title><circle cx="256" cy="256" r="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
          </svg>
          `
        })
        html += `</div>`
      })
      html += `
      <svg xmlns="http://www.w3.org/2000/svg" class="websy-prev-arrow"
      viewBox="0 0 512 512">
      <title>Caret Back</title>
      <path id="websy-prev-arrow" d="M321.94 98L158.82 237.78a24 24 0 000 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z"/>
      </svg>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="websy-next-arrow">
      <title>Caret Forward</title>
      <path id="websy-next-arrow" d="M190.06 414l163.12-139.78a24 24 0 000-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z"/>
      </svg>
      `
      html += `
      </div>
      `

      el.innerHTML = html
    }
    this.play()
  }
  // showFrame () {
  //     if () {

  //       document.getElementById(`${this.elementId}_frame_${this.options.currentFrame}`)
  //       .style.transform = `translateX(100%)`
  //     }
  // }
}
