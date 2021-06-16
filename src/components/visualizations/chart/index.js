/* global d3 include */ 
class WebsyChart {
  constructor (elementId, options) {
    const DEFAULTS = {
      margin: { top: 3, left: 3, bottom: 3, right: 3, axisBottom: 0, axisLeft: 0, axisRight: 0 },
      orientation: 'vertical',
      colors: d3.schemeCategory10,
      transitionDuration: 650,
      curveStyle: 'curveLinear',
      lineWidth: 2,
      forceZero: true,
      fontSize: 14
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.leftAxis = null
    this.rightAxis = null
    this.topAxis = null
    this.bottomAxis = null
    if (!elementId) {
      console.log('No element Id provided for Websy Menu')		
      return
    }
    const el = document.getElementById(this.elementId)    
    if (el) {
      el.classList.add('websy-chart')
      if (typeof d3 === 'undefined') {
        console.error('d3 library has not been loaded')
      }
      else {        
        this.svg = d3.select(el).append('svg')
        this.prep()
      }      
    }
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  set data (d) {
    this.options.data = d
    this.render()
  }
  createIdentity (size = 10) {	
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
    for (let i = 0; i < size; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }  
  prep () {
    include('./prep.js')
  }
  render (options) {
    include('./render.js')
  }
  renderarea (series, index) {
    include('./renderarea.js')
  }
  renderbar (series, index) {
    include('./renderbar.js')
  }
  renderline (series, index) {
    include('./renderline.js')
  }
  rendersymbol (series, index) {
    include('./rendersymbol.js')
  }
  resize () {
    include('./resize.js')
  }
}
