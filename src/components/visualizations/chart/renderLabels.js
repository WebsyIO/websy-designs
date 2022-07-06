/* global series index d3 WebsyDesigns */
let xAxis = 'bottomAxis'
let yAxis = 'leftAxis'  
let that = this
if (this.options.orientation === 'horizontal') {
  xAxis = 'leftAxis'
  yAxis = 'bottomAxis'
}
if (this.options.showLabels) {
  // need to add logic to handle positioning options
  // e.g. Inside, Outide, Auto (this will also affect the available plot space)
  // We currently only support 'Auto'  
  let labels = this.labelLayer.selectAll(`.label_${series.key}`).data(series.data)
  labels
    .exit()
    .transition(this.transition)
    .style('stroke-opacity', 1e-6)
    .remove()
  labels      
    .attr('x', getLabelX.bind(this))  
    .attr('y', getLabelY.bind(this))    
    .attr('class', `label_${series.key}`)
    .style('font-size', `${this.options.labelSize || this.options.fontSize}px`)
    .style('fill', this.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(series.color))
    .transition(this.transition)
    .text(d => d.y.label || d.y.value)
  
  labels
    .enter()
    .append('text')
    .attr('class', `label_${series.key}`)
    .attr('x', getLabelX.bind(this))  
    .attr('y', getLabelY.bind(this))    
    .attr('alignment-baseline', 'central')
    .attr('text-anchor', this.options.orientation === 'horizontal' ? 'left' : 'middle')
    .style('font-size', `${this.options.labelSize || this.options.fontSize}px`)
    .style('fill', this.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(series.color))
    .text(d => d.y.label || d.y.value)
    .each(function (d, i) {      
      if (that.options.orientation === 'horizontal') {
        if (that.options.grouping === 'stacked') {
          this.setAttribute('text-anchor', 'middle')
        }
        else if (that.plotWidth - getLabelX.call(that, d) < this.getComputedTextLength()) {
          this.setAttribute('text-anchor', 'end')
          this.setAttribute('x', +(this.getAttribute('x')) - 8)
        }    
      }
      else {
        if (that.plotheight - getLabelX.call(that, d) < (that.options.labelSize || that.options.fontSize)) {          
          this.setAttribute('y', +(this.getAttribute('y')) + 8)
        }
      }
    })
}

function getLabelX (d) {
  if (this.options.orientation === 'horizontal') {
    if (this.options.grouping === 'stacked') {
      return this[yAxis](d.y.accumulative) + (this[yAxis](d.y.value) / 2)
    }
    else {
      return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value) + 4
    }
  }
  else {    
    return this[xAxis](this.parseX(d.x.value)) + (this[xAxis].bandwidth() / 2)
  }
}
function getLabelY (d) {
  if (this.options.orientation === 'horizontal') {    
    return this[xAxis](this.parseX(d.x.value)) + (this[xAxis].bandwidth() / 2)
  }
  else {
    if (this.options.grouping === 'stacked') {
      // 
    }
    else {
      return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value) - 4
    }
  }
}
