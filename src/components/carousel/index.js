/* global */

function handleClick () {
  console.log('clicked')
}
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
    if (el) {
      this.elementId = elementId
      this.render()
    }
  }

  next () {
    document.getElementById(`${this.elementId}`)
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
          <div style="background-image: url(${image.url})">
          </div>
        `
        })
        html += `</div>`
        html += `<div class="dash-parent">`
        this.options.frames.forEach(frame => {
          html += `<span class="websy-progress-dash">&#8213;</span>`
        })
        html += `</div>`
      })
      html += `
      <span class="websy-prev-arrow" id="websy-prev-arrow">&#8678;</span>
      <span class="websy-next-arrow" id="websy-next-arrow">&#8680;</span>`
      html += `
      </div>
      `

      el.innerHTML = html
    }
    this.play()
    this.next()
  }
}

const nextBtn = document.getElementById('websy-next-arrow')
window.addEventListener('click', (event) => {
  if (event.target.id === 'websy-next-arrow') {
    console.log('clicked next!')
  }
})

const prevBtn = document.getElementById('websy-prev-arrow')
window.addEventListener('click', (event) => {
  if (event.target.id === 'websy-prev-arrow') {
    console.log('clicked previous!')
  }
})
