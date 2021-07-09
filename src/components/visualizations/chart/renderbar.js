/* global series index d3 */
let xAxis = 'bottomAxis'
let yAxis = 'leftAxis'
let barWidth = this[xAxis].bandwidth()
let bars = this.barLayer.selectAll(`.bar_${series.key}`).data(series.data)
bars
  .exit()
  .transition(this.transition)
  .style('stroke-opacity', 1e-6)
  .remove()

bars
  .attr('width', barWidth)
  .attr(
    'height', d => this.plotHeight - this[yAxis](isNaN(d.y.value) ? 0 : d.y.value)
  )
  .attr('x', d => {    
    return this[xAxis](this.parseX(d.x.value))
  })  
  .attr('y', d => this[yAxis](isNaN(d.y.value) ? 0 : d.y.value))
  .transition(this.transition)  
  .attr('fill', series.color)

bars
  .enter()
  .append('rect')
  .attr('width', barWidth)
  .attr(
    'height', d => this.plotHeight - this[yAxis](isNaN(d.y.value) ? 0 : d.y.value)
  )
  .attr('x', d => {
    return this[xAxis](this.parseX(d.x.value))
  })  
  .attr('y', d => this[yAxis](isNaN(d.y.value) ? 0 : d.y.value))
  .transition(this.transition)
  .attr('fill', series.color)
  .attr('class', d => {
    return `bar bar_${series.key}`
  })
