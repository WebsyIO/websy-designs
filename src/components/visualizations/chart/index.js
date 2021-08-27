/* global d3 include */ 
class WebsyChart {
  constructor (elementId, options) {
    const DEFAULTS = {
      margin: { top: 3, left: 3, bottom: 3, right: 3, axisBottom: 0, axisLeft: 0, axisRight: 0, axisTop: 0 },
      orientation: 'vertical',
      colors: d3.schemeCategory10,
      transitionDuration: 650,
      curveStyle: 'curveLinear',
      lineWidth: 2,
      forceZero: true,
      fontSize: 14,
      symbolSize: 20,
      dateFormat: '%b/%m/%Y',
      showTrackingLine: true,
      showTooltip: true,
      tooltipWidth: 200
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.leftAxis = null
    this.rightAxis = null
    this.topAxis = null
    this.bottomAxis = null    
    if (!elementId) {
      console.log('No element Id provided for Websy Chart')		
      return
    }
    const el = document.getElementById(this.elementId)    
    if (el) {
      el.classList.add('websy-chart')
      if (typeof d3 === 'undefined') {
        console.error('d3 library has not been loaded')
      }
      else {
        el.innerHTML = ''        
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
  createDomain (side) {
    let domain = []
    include('./createdomain.js')
    return domain
  }
  createIdentity (size = 10) {	
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
    for (let i = 0; i < size; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }
  handleEventMouseOut (event, d) {
    this.trackingLineLayer
      .select('.tracking-line')
      .attr('stroke-opacity', 0)
    this.tooltip.hide()
  }
  handleEventMouseMove (event, d) {
    // console.log('mouse move', event, d, d3.pointer(event))
    let bisectDate = d3.bisector(d => {
      return this.parseX(d.x.value)
    }).left
    if (this.options.showTrackingLine === true && d3.pointer(event)) {
      let x0 = d3.pointer(event)[0]
      let xPoint
      let data
      let tooltipHTML = ''
      let tooltipTitle = ''
      let tooltipData = []
      if (this.bottomAxis.invert) {
        x0 = this.bottomAxis.invert(x0)
        this.options.data.series.forEach(s => {          
          let index = bisectDate(s.data, x0, 1)          
          let pointA = s.data[index - 1]
          let pointB = s.data[index]
          if (pointA) {
            xPoint = this.bottomAxis(this.parseX(pointA.x.value))
            tooltipTitle = pointA.x.value
            if (typeof pointA.x.value.getTime !== 'undefined') {
              tooltipTitle = d3.timeFormat(this.options.dateFormat)(pointA.x.value)
            }
          }
          if (pointA && pointB) {
            let d0 = this.bottomAxis(this.parseX(pointA.x.value))
            let d1 = this.bottomAxis(this.parseX(pointB.x.value))
            let mid = Math.abs(d0 - d1) / 2
            if (d3.pointer(event)[0] - d0 >= mid) {
              xPoint = d1
              tooltipTitle = pointB.x.value
              if (typeof pointB.x.value.getTime !== 'undefined') {
                tooltipTitle = d3.timeFormat(this.options.dateFormat)(pointB.x.value)
              }
              tooltipData.push(pointB.y)
            }
            else {
              xPoint = d0              
              tooltipData.push(pointA.y)
            }            
          }
        })
        tooltipHTML = `          
          <ul>
        `
        tooltipHTML += tooltipData.map(d => `
          <li>
            <i style='background-color: ${d.color};'></i>
            ${d.tooltipLabel || ''}<span>${d.tooltipValue || d.value}</span>
          </li>
        `).join('')
        tooltipHTML += `</ul>`
        let posOptions = {
          width: this.options.tooltipWidth,
          left: 0,
          top: 0,          
          onLeft: xPoint > this.plotWidth / 2
        }
        if (xPoint > this.plotWidth / 2) {
          posOptions.left = xPoint - this.options.tooltipWidth - 15
        } 
        else {
          posOptions.left = xPoint + this.options.margin.left + this.options.margin.axisLeft + 15
        }
        posOptions.top = this.options.margin.top + this.options.margin.axisTop                
        this.tooltip.show(tooltipTitle, tooltipHTML, posOptions)
        // data = this.bottomAxis(data)
      }
      else {
        xPoint = x0
      }      
      this.trackingLineLayer
        .select('.tracking-line')
        .attr('x1', xPoint)
        .attr('x2', xPoint)
        .attr('y1', 0)
        .attr('y2', this.plotHeight)
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4 2')
        .attr('stroke', '#cccccc')
        .attr('stroke-opacity', 1)
    }        
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
