/* global series index d3 */
const drawLine = (xAxis, yAxis, curveStyle) => {
  return d3
    .line()
    .x(d => {
      return this[xAxis](d.x.value)
    })
    .y(d => {
      return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value)
    })
    .curve(d3[curveStyle || this.options.curveStyle])
}
if (!series.key) {
  series.key = this.createIdentity()
}
if (!series.color) {
  series.color = this.options.colors[index % this.options.colors.length]
}
let xAxis = 'bottomAxis'
let yAxis = series.pos === 'right' ? 'rightAxis' : 'leftAxis'
if (this.options.orienation === 'horizontal') {  
  xAxis = series.pos === 'right' ? 'rightAxis' : 'leftAxis'
  yAxis = 'bottomAxis'
}
let lines = this.lineLayer.selectAll(`.line_${series.key}`)
  .data([series.data])
// Exit
lines.exit()
  .transition(this.transition)
  .style('stroke-opacity', 1e-6)
  .remove()
// Update
lines
  .style('stroke-width', 1)
  .attr('id', `line_${series.key}`)
  // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
  .attr('stroke', series.colour)
  .attr('fill', 'transparent')
  .transition(this.transition)
  .attr('d', d => drawLine(xAxis, yAxis)(d))
// Enter
lines.enter().append('path')
  .attr('d', d => drawLine(xAxis, yAxis)(d))
  .attr('class', `line_${series.key}`)
  .attr('id', `line_${series.key}`)
  // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
  // .style('stroke-width', that.options.lineSettings.width)
  .attr('stroke', series.color)
  .attr('fill', 'transparent')
  .transition(this.transition)
  .style('stroke-opacity', 1)
