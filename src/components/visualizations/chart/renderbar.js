/* global series index d3 */
let xAxis = 'bottomAxis'
let yAxis = 'leftAxis'
let bars = this.barLayer.selectAll(`.bar_${series.key}`).data(series.data)
let acummulativeY = new Array(this.options.data.series.length).fill(0)
if (this.options.orientation === 'horizontal') {
  xAxis = 'leftAxis'
  yAxis = 'bottomAxis'
}
let barWidth = this[xAxis].bandwidth()
if (this.options.data.series.length > 1 && this.options.grouping === 'grouped') {
  barWidth = barWidth / this.options.data.series.length - 4
}
function getBarHeight (d, i) {
  if (this.options.orientation === 'horizontal') {
    return barWidth
  }
  else {
    return this[yAxis](d.y.value)
  }
}
function getBarWidth (d, i) {
  if (this.options.orientation === 'horizontal') {
    let width = this[yAxis](d.y.value)
    acummulativeY[d.y.index] += width
    return width
  }
  else {
    return barWidth
  }
}
function getBarX (d, i) {
  if (this.options.orientation === 'horizontal') {
    if (this.options.grouping === 'stacked') {      
      return this[yAxis](d.y.accumulative)
    }
    else {
      return 0
    }
  }
  else {
    if (this.options.grouping !== 'grouped') {
      return this[xAxis](this.parseX(d.x.value))
    }
    else {
      return this[xAxis](this.parseX(d.x.value)) + (i * barWidth)
    }    
  }
}
function getBarY (d, i) {
  if (this.options.orientation === 'horizontal') {
    if (this.options.grouping !== 'grouped') {
      return this[xAxis](this.parseX(d.x.value))
    }
    else {
      return this[xAxis](this.parseX(d.x.value)) + ((d.y.index || i) * barWidth)
    }    
  }
  else {
    if (this.options.grouping === 'stacked') {      
      return this[yAxis](d.y.accumulative)
    }
    else {
      return 0
    }
  }
}
bars
  .exit()
  .transition(this.transition)
  .style('stroke-opacity', 1e-6)
  .remove()

bars
  .attr('width', getBarWidth.bind(this))
  .attr('height', getBarHeight.bind(this))
  .attr('x', getBarX.bind(this))  
  .attr('y', getBarY.bind(this))
  .transition(this.transition)  
  .attr('fill', d => d.y.color || d.color || series.color)

bars
  .enter()
  .append('rect')
  .attr('width', getBarWidth.bind(this))
  .attr('height', getBarHeight.bind(this))
  .attr('x', getBarX.bind(this))  
  .attr('y', getBarY.bind(this))
  // .transition(this.transition)
  .attr('fill', d => d.y.color || d.color || series.color)
  .attr('class', d => {
    return `bar bar_${series.key}`
  })
