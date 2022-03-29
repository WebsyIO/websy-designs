/* global d3 include WebsyDesigns */ 
class WebsyChart {
  constructor (elementId, options) {
    const DEFAULTS = {
      margin: { 
        top: 10, 
        left: 3, 
        bottom: 3, 
        right: 3, 
        axisBottom: 0, 
        axisLeft: 0, 
        axisRight: 0, 
        axisTop: 0,
        legendBottom: 0, 
        legendLeft: 0, 
        legendRight: 0, 
        legendTop: 0 
      },
      orientation: 'vertical',
      colors: ['#5e4fa2', '#3288bd', '#66c2a5', '#abdda4', '#e6f598', '#fee08b', '#fdae61', '#f46d43', '#d53e4f', '#9e0142'],
      transitionDuration: 650,
      curveStyle: 'curveLinear',
      lineWidth: 2,
      forceZero: true,
      fontSize: 14,
      symbolSize: 20,      
      showTrackingLine: true,      
      showTooltip: true,
      showLegend: false,
      legendPosition: 'bottom',
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
    this.invertOverride = (input, input2) => {
      let xAxis = 'bottomAxis'      
      if (this.options.orientation === 'horizontal') {
        xAxis = 'leftAxis'        
      }
      let width = this[xAxis].step()      
      let output
      let domain = [...this[xAxis].domain()]
      if (this.options.orientation === 'horizontal') {
        domain = domain.reverse()
      }      
      for (let j = 0; j < domain.length; j++) {                
        let breakA = this[xAxis](domain[j]) - (width / 2)
        let breakB = breakA + width
        if (input > breakA && input <= breakB) {       
          output = j
          break
        }
      }      
      return output
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
        this.legendArea = d3.select(el).append('div')
          .attr('id', `${this.elementId}_legend`)
          .attr('class', 'websy-chart-legend')
        this.legend = new WebsyDesigns.Legend(`${this.elementId}_legend`, {})
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
  close () {
    this.leftAxisLayer.selectAll('*').remove()
    this.rightAxisLayer.selectAll('*').remove()
    this.bottomAxisLayer.selectAll('*').remove()
    this.leftAxisLabel.selectAll('*').remove()
    this.rightAxisLabel.selectAll('*').remove()
    this.bottomAxisLabel.selectAll('*').remove()
    this.plotArea.selectAll('*').remove()
    this.areaLayer.selectAll('*').remove()
    this.lineLayer.selectAll('*').remove()
    this.barLayer.selectAll('*').remove()
    this.labelLayer.selectAll('*').remove()
    this.symbolLayer.selectAll('*').remove()
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
    let bisectDate = d3.bisector(d => {
      return this.parseX(d.x.value)
    }).left
    if (this.options.showTrackingLine === true && d3.pointer(event)) {
      let xAxis = 'bottomAxis'
      let xData = 'bottom'    
      let x0 = d3.pointer(event)[0]
      if (this.options.orientation === 'horizontal') {
        xAxis = 'leftAxis'
        xData = 'left'      
        x0 = d3.pointer(event)[1]
      }      
      let xPoint
      let data
      let tooltipHTML = ''
      let tooltipTitle = ''
      let tooltipData = []      
      if (!this[xAxis].invert) {
        this[xAxis].invert = this.invertOverride
      }
      x0 = this[xAxis].invert(x0)
      let xDiff
      if (typeof x0 === 'undefined') {
        this.tooltip.hide()
        return
      }
      let xLabel = this[xAxis].domain()[x0]
      if (this.options.orientation === 'horizontal') {
        xLabel = [...this[xAxis].domain().reverse()][x0]
      }
      this.options.data.series.forEach(s => {     
        if (this.options.data[xData].scale !== 'Time') {
          xPoint = this[xAxis](this.parseX(xLabel))
          s.data.forEach(d => {
            if (d.x.value === xLabel) {
              if (!d.y.color) {
                d.y.color = s.color 
              }
              tooltipData.push(d.y)
            }
          })
        }
        else {     
          let index = bisectDate(s.data, x0, 1)                   
          let pointA = s.data[index - 1]
          let pointB = s.data[index]
          if (this.options.orientation === 'horizontal') {
            pointA = [...s.data].reverse()[index - 1]
            pointB = [...s.data].reverse()[index]
          }                    
          if (pointA && !pointB) {            
            xPoint = this[xAxis](this.parseX(pointA.x.value))        
            tooltipTitle = pointA.x.value
            if (!pointA.y.color) {
              pointA.y.color = s.color 
            }          
            tooltipData.push(pointA.y)
            if (typeof pointA.x.value.getTime !== 'undefined') {
              tooltipTitle = d3.timeFormat(this.options.dateFormat || this.options.calculatedTimeFormatPattern)(pointA.x.value)
            }
          }
          if (pointB && !pointA) {            
            xPoint = this[xAxis](this.parseX(pointB.x.value))
            tooltipTitle = pointB.x.value
            if (!pointB.y.color) {
              pointB.y.color = s.color 
            }          
            tooltipData.push(pointB.y)
            if (typeof pointB.x.value.getTime !== 'undefined') {
              tooltipTitle = d3.timeFormat(this.options.dateFormat || this.options.calculatedTimeFormatPattern)(pointB.x.value)
            }          
          }
          if (pointA && pointB) {
            let d0 = this[xAxis](this.parseX(pointA.x.value))
            let d1 = this[xAxis](this.parseX(pointB.x.value))
            let mid = Math.abs(d0 - d1) / 2
            if (d3.pointer(event)[0] - d0 >= mid) {              
              xPoint = d1
              tooltipTitle = pointB.x.value
              if (typeof pointB.x.value.getTime !== 'undefined') {
                tooltipTitle = d3.timeFormat(this.options.dateFormat || this.options.calculatedTimeFormatPattern)(pointB.x.value)
              }
              if (!pointB.y.color) {
                pointB.y.color = s.color 
              }          
              tooltipData.push(pointB.y)
            }
            else {
              xPoint = d0 
              tooltipTitle = pointA.x.value              
              if (typeof pointB.x.value.getTime !== 'undefined') {
                tooltipTitle = d3.timeFormat(this.options.dateFormat || this.options.calculatedTimeFormatPattern)(pointB.x.value)
              }                
              if (!pointA.y.color) {
                pointA.y.color = s.color 
              }                 
              tooltipData.push(pointA.y)
            }            
          }
        }
      })
      tooltipHTML = `          
        <ul>
      `
      tooltipHTML += tooltipData.map(d => `
        <li>
          <i style='background-color: ${d.color};'></i>
          ${d.tooltipLabel || ''}<span> - ${d.tooltipValue || d.value}</span>
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
      if (this.options.orientation === 'horizontal') {
        delete posOptions.onLeft
        let adjuster = 0
        if (this.options.data[xData].scale !== 'Time') {
          adjuster = (this[xAxis].bandwidth() / 2) // - this.options.margin.top
        }
        posOptions = {
          width: this.options.tooltipWidth,
          left: this.options.margin.left + this.options.margin.axisLeft + this.plotWidth - this.options.tooltipWidth,
          onTop: xPoint > this.plotHeight / 2,
          positioning: 'vertical'
        }
        if (xPoint > this.plotHeight / 2) {
          posOptions.bottom = xPoint + this.options.margin.top + this.options.margin.axisTop
        } 
        else {
          posOptions.top = xPoint + this.options.margin.top + this.options.margin.axisTop + 15 + adjuster
        }
      }      
      this.tooltip.setHeight(this.plotHeight)
      this.tooltip.show(tooltipTitle, tooltipHTML, posOptions)        
      // }
      // else {
      //   xPoint = x0
      // }      
      if (this.options.data[xData].scale !== 'Time') {
        xPoint += (this[xAxis].bandwidth() / 2) // - this.options.margin.top
      }
      let trackingXStart = xPoint
      let trackingXEnd = xPoint
      let trackingYStart = 0
      let trackingYEnd = this.plotHeight
      if (this.options.orientation === 'horizontal') {
        trackingXStart = 0
        trackingXEnd = this.plotWidth
        trackingYStart = xPoint
        trackingYEnd = xPoint
      }
      this.trackingLineLayer
        .select('.tracking-line')
        .attr('x1', trackingXStart)
        .attr('x2', trackingXEnd)
        .attr('y1', trackingYStart)
        .attr('y2', trackingYEnd)
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
  renderLabels (series, index) {
    include('./renderlabels.js')
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
