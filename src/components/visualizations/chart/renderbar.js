/* global series index d3 */
let xAxis = 'bottomAxis'
let yAxis = 'leftAxis'
let bars = this.barLayer.selectAll(`.bar_${series.key}`).data(series.data)
if (this.options.orientation === 'horizontal') {
  xAxis = 'leftAxis'
  yAxis = 'bottomAxis'
}
let barWidth = this[xAxis].bandwidth()
function getBarHeight (d) {
  if (this.options.orientation === 'horizontal') {
    return barWidth
  }
  else {
    return this[yAxis](d.y.value)
  }
}
function getBarWidth (d) {
  if (this.options.orientation === 'horizontal') {
    return this[yAxis](d.y.value)
  }
  else {
    return barWidth
  }
}
function getBarX (d) {
  if (this.options.orientation === 'horizontal') {
    return 0
  }
  else {
    return this[xAxis](this.parseX(d.x.value))
  }
}
function getBarY (d) {
  if (this.options.orientation === 'horizontal') {
    return this[xAxis](this.parseX(d.x.value))
  }
  else {
    return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value)
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
  .attr('fill', series.color)

bars
  .enter()
  .append('rect')
  .attr('width', getBarWidth.bind(this))
  .attr('height', getBarHeight.bind(this))
  .attr('x', getBarX.bind(this))  
  .attr('y', getBarY.bind(this))
  // .transition(this.transition)
  .attr('fill', series.color)
  .attr('class', d => {
    return `bar bar_${series.key}`
  })
