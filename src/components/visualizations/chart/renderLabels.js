/* global series index d3 WebsyDesigns */
let xAxis = 'bottomAxis'
let yAxis = 'leftAxis'  
let that = this
if (this.options.orientation === 'horizontal') {
  xAxis = 'leftAxis'
  yAxis = 'bottomAxis'
}
if (this.options.showLabels === true || series.showLabels === true) {
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
    .attr('x', d => getLabelX.call(this, d, series.labelPosition))  
    .attr('y', d => getLabelY.call(this, d, series.labelPosition))   
    .attr('class', `label_${series.key}`)
    .attr('fill', d => {
      if (this.options.grouping === 'stacked' && d.y.value === 0) {
        return 'transparent'
      }
      return this.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color)
    })
    .style('font-size', `${this.options.labelSize || this.options.fontSize}px`)    
    .transition(this.transition)
    .text(d => d.y.label || d.y.value)
    .each(function (d, i) {      
      if (that.options.orientation === 'horizontal') {
        if (that.options.grouping === 'stacked' && series.labelPosition !== 'outside') {
          this.setAttribute('text-anchor', 'middle')
        }
        else if (that.plotWidth - getLabelX.call(that, d) < this.getComputedTextLength()) {
          this.setAttribute('text-anchor', 'end')
          this.setAttribute('x', +(this.getAttribute('x')) - 8)                  
          this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color))
        }    
        else if (series.labelPosition === 'outside') {
          this.setAttribute('text-anchor', 'start')
          this.setAttribute('x', +(this.getAttribute('x')) + 8)                  
          this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'))
        }
        else {                  
          this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'))
        }
      }
      else {
        if (that.plotheight - getLabelX.call(that, d) < (that.options.labelSize || that.options.fontSize)) {          
          this.setAttribute('y', +(this.getAttribute('y')) + 8)
        }
      }
    })
  
  labels
    .enter()
    .append('text')
    .attr('class', `label_${series.key}`)
    .attr('x', d => getLabelX.call(this, d, series.labelPosition))  
    .attr('y', d => getLabelY.call(this, d, series.labelPosition))    
    .attr('alignment-baseline', 'central')
    .attr('text-anchor', this.options.orientation === 'horizontal' ? 'left' : 'middle')
    .attr('fill', d => {
      if (this.options.grouping === 'stacked' && d.y.value === 0) {
        return 'transparent'
      }
      return this.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color)
    })
    .style('font-size', `${this.options.labelSize || this.options.fontSize}px`)    
    .text(d => d.y.label || d.y.value)
    .each(function (d, i) {      
      if (that.options.orientation === 'horizontal') {
        if (that.options.grouping === 'stacked' && series.labelPosition !== 'outside') {
          this.setAttribute('text-anchor', 'middle')
        }
        else if (that.plotWidth - getLabelX.call(that, d) < this.getComputedTextLength()) {
          this.setAttribute('text-anchor', 'end')
          this.setAttribute('x', +(this.getAttribute('x')) - 8)                  
          this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color))
        }    
        else if (series.labelPosition === 'outside') {
          this.setAttribute('text-anchor', 'start')
          this.setAttribute('x', +(this.getAttribute('x')) + 8)                  
          this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'))
        }
        else {                  
          this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'))
        }
      }
      else {
        if (that.plotheight - getLabelX.call(that, d) < (that.options.labelSize || that.options.fontSize)) {          
          this.setAttribute('y', +(this.getAttribute('y')) + 8)
        }
      }
    })
}

function getLabelX (d, labelPosition = 'inside') {
  if (this.options.orientation === 'horizontal') {
    if (this.options.grouping === 'stacked') {
      return this[yAxis](d.y.accumulative) + (this[yAxis](d.y.value) / (labelPosition === 'inside' ? 2 : 1))
    }
    else {
      return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value) + 4
    }
  }
  else {    
    return this[xAxis](this.parseX(d.x.value)) + (this.options.data[xAxis.replace('Axis', '')].bandWidth / 2)
  }
}
function getLabelY (d, labelPosition = 'inside') {
  if (this.options.orientation === 'horizontal') {    
    return this[xAxis](this.parseX(d.x.value)) + (this.options.data[xAxis.replace('Axis', '')].bandWidth / 2)
  }
  else {
    if (this.options.grouping === 'stacked') {
      return this[yAxis](d.y.accumulative) + (this[yAxis](d.y.value) / (labelPosition === 'inside' ? 2 : 1))
    }
    else {
      return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value) - (this.options.labelSize || this.options.fontSize)
    }
  }
}
