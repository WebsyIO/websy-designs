/* global include */ 
class WebsyPie {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      labelMode: 'auto',
      labelLocs: [],  
      showLabels: false,    
      segments: [
        '#9dbca6',
        '#e3c080',
        '#fd7336',
        '#b12737',
        '#50424b'
      ],
      label: {
        value: {
          size: '12px',
          colour: '#BBB',
          family: 'arial',
          weight: 'normal'
        },
        label: {
          size: '10px',
          colour: '#888',
          family: 'arial',
          weight: 'normal'
        }
      },
      kpi: {
        background: '#555',
        value: {
          size: '60px',
          colour: '#CCC',
          family: 'arial',
          weight: 'bold'
        },
        label: {
          size: '20px',
          colour: '#FFF',
          family: 'arial',
          weight: 'normal'
        }
      }      
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.listening = true
    if (!elementId) {
      console.log('No element Id provided for Websy Chart')		
      return
    }
    const el = document.getElementById(this.elementId)    
    if (el) {
      el.classList.add('websy-pie')
    }
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  calculateArcAngle (arcLength, radius) {
    return this.convertRadiansToDegrees(arcLength / (Math.PI * (2 * radius)))
  }
  calculateCircumference (perc) {
    return (Math.PI * 2) * (perc)
  }  
  close () {

  }
  convertDegreesToRadians (degrees) {
    return degrees * (Math.PI / 180)
  }  
  convertRadiansToDegrees (radians) {
    return radians * (180 / Math.PI)
  }
  createCanvases (element) {
    include('./createCanvases.js')
  }  
  drawKPI () {
    include('./drawKPI.js')
  }
  drawLabels () {
    include('./drawLabels.js')
  }    
  drawSegments () {
    include('./drawSegments.js')
  }
  hexToRGBA (hex, opacity) {
    if (!opacity) {
      opacity = 1
    }
    let c
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('')
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]]
      }
      c = '0x' + c.join('')
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255, opacity].join(',') + ')'
    }
    console.error(`Unable to convert hex (${hex}) to RGBA`)
    return 'rgba(0, 0, 0, 1)'
  }
  render (data) {
    include('./render.js')
  }
  resize () {

  }
  processData (data) {
    include('./processData.js')
  }
}
