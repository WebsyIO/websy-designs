/* global */

class WebsyCarousel {
  constructor (elementId, options) {
    const DEFAULTS = {
      currentFrame: 0,
      frameDuration: 4000,
      showFrameSelector: true,
      showPrevNext: true,
      autoPlay: true,
      frames: [],
      frameSelectorIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 512 512">
          <circle cx="256" cy="256" r="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
        </svg>
      `   
    }
    this.playTimeoutFn = null
    this.options = Object.assign({}, DEFAULTS, options)
    if (!elementId) {
      console.log('No element Id provided')
    }
    const el = document.getElementById(elementId)
    if (el) {
      this.elementId = elementId
      el.addEventListener('click', this.handleClick.bind(this))
      this.render()
    }
  }
  close () {
    this.pause()
  }
  handleClick (event) {
    if (event.target.classList.contains('websy-next-arrow')) {
      this.next()
    } 
    if (event.target.classList.contains('websy-prev-arrow')) {
      this.prev()
    }
    if (event.target.classList.contains('websy-progress-btn' || 'websy-progress-btn-active')) {
      const index = +event.target.getAttribute('data-index')
      let prevFrameIndex = this.options.currentFrame 
      this.options.currentFrame = index
      this.showFrame(prevFrameIndex, index)
    }
  }
  next () {
    this.pause()
    let prevFrameIndex = this.options.currentFrame 
    if (this.options.currentFrame === this.options.frames.length - 1) {
      this.options.currentFrame = 0
    } 
    else {
      this.options.currentFrame++
    }
    this.showFrame(prevFrameIndex, this.options.currentFrame)
    this.play()    
  }
  pause () {
    if (this.playTimeoutFn) {
      clearTimeout(this.playTimeoutFn)
    }
  }
  play () {
    if (this.options.autoPlay !== true || this.options.frames.length < 2) {
      return
    }
    this.playTimeoutFn = setTimeout(() => {
      let prevFrameIndex = this.options.currentFrame 
      if (this.options.currentFrame === this.options.frames.length - 1) {
        this.options.currentFrame = 0
      } 
      else {
        this.options.currentFrame++
      }
      this.showFrame(prevFrameIndex, this.options.currentFrame)
      this.play()
    }, this.options.frameDuration)
  }
  prev () {
    this.pause()
    let prevFrameIndex = this.options.currentFrame 
    if (this.options.currentFrame === 0) {
      this.options.currentFrame = this.options.frames.length - 1
    } 
    else {
      this.options.currentFrame--
    }
    this.showFrame(prevFrameIndex, this.options.currentFrame)
    this.play()    
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
        <div id="${this.elementId}_frame_${frameIndex}" class="websy-frame-container animate" style="transform: translateX(${frameIndex === 0 ? '0' : '101%'})">
        `
        frame.images.forEach(image => {
          html += `
          <div style="${image.style || 'position: absolute; width: 100%; height: 100%; top: 0; left: 0;'} background-image: url('${image.url}')" class="${image.classes || ''} websy-carousel-image">
          </div>
        `
        })
        frame.text && frame.text.forEach(text => {
          html += `
          <div style="${text.style || 'position: absolute; width: 100%; height: 100%; top: 0; left: 0;'}" class="${text.classes || ''} websy-carousel-image">
          ${text.html}
          </div>
        `
        })
        html += `</div>`
      })
      if (this.options.showFrameSelector === true && this.options.frames.length > 1) {
        html += `<div class="websy-btn-parent">`
        this.options.frames.forEach((frame, frameIndex) => {
          html += `
            <div data-index="${frameIndex}" id="${this.elementId}_selector_${frameIndex}" 
              class="websy-progress-btn ${this.options.currentFrame === frameIndex ? 'websy-progress-btn-active' : ''}">
              ${this.options.frameSelectorIcon}
            </div>
          `
        })
        html += `</div>`
      } 
      if (this.options.showPrevNext === true && this.options.frames.length > 1) {
        html += `
          <svg xmlns="http://www.w3.org/2000/svg" class="websy-prev-arrow"
          viewBox="0 0 512 512">
          <title>Caret Back</title>
          <path d="M321.94 98L158.82 237.78a24 24 0 000 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z"/>
          </svg>
        
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="websy-next-arrow">
          <title>Caret Forward</title>
          <path d="M190.06 414l163.12-139.78a24 24 0 000-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z"/>
          </svg>
        `
      }
      html += `
      </div>
      `
      el.innerHTML = html
    }
    this.play()
    // this.showFrameSelector()
  }

  showFrame (prevFrameIndex, currFrameIndex) {  
    let prevTranslateX = prevFrameIndex > currFrameIndex ? '101%' : '-101%'
    let nextTranslateX = prevFrameIndex < currFrameIndex ? '101%' : '-101%'
    if (currFrameIndex === 0 && prevFrameIndex === this.options.frames.length - 1) {
      prevTranslateX = '-101%'
      nextTranslateX = '101%'
    }
    else if (prevFrameIndex === 0 && currFrameIndex === this.options.frames.length - 1) {
      prevTranslateX = '101%'
      nextTranslateX = '-101%'
    }      
    const prevF = document.getElementById(
      `${this.elementId}_frame_${prevFrameIndex}`)
    if (prevF) {
      setTimeout(() => {
        prevF.style.transform = `translateX(${prevTranslateX})`
      }, 100)
    }            
    const btnInactive = document.getElementById(`${this.elementId}_selector_${prevFrameIndex}`)
    if (btnInactive) {
      btnInactive.classList.remove('websy-progress-btn-active')    
    }    
    const newF = document.getElementById(`${this.elementId}_frame_${currFrameIndex}`)    
    if (newF) {
      newF.classList.remove('animate')
      newF.style.transform = `translateX(${nextTranslateX})`      
      setTimeout(() => {
        newF.classList.add('animate')
        newF.style.transform = 'translateX(0%)'
      }, 100)
    }    

    const btnActive = document.getElementById(`${this.elementId}_selector_${currFrameIndex}`)
    if (btnActive) {
      btnActive.classList.add('websy-progress-btn-active')    
    }    
  }

  // showFrameSelector () {
  // }
}
