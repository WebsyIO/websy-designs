/* global d3 series index */
const drawArea = (xAxis, yAxis, curveStyle) => {
  return d3
    .area()
    .x(d => {
      return this[xAxis](d.x.value)
    })
    .y0(d => {
      return this[yAxis](0)
    })
    .y1(d => {
      return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value)
    })
    .curve(d3[curveStyle || this.options.curveStyle])
}
let xAxis = 'bottomAxis'
let yAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis'
if (this.options.orienation === 'horizontal') {  
  xAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis'
  yAxis = 'bottomAxis'
}
let areas = this.areaLayer.selectAll(`.area_${series.key}`)
  .data([series.data])
// Exit
areas.exit()
  .transition(this.transition)
  .style('fill-opacity', 1e-6)
  .remove()
// Update
areas
  // .style('stroke-width', series.lineWidth || this.options.lineWidth)
  // .attr('id', `line_${series.key}`)
  // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
  // .attr('fill', series.colour)
  // .attr('stroke', 'transparent')
  .transition(this.transition)
  .attr('d', d => drawArea(xAxis, yAxis, series.curveStyle)(d))
// Enter
areas.enter().append('path')
  .attr('d', d => drawArea(xAxis, yAxis, series.curveStyle)(d))
  .attr('class', `area_${series.key}`)
  .attr('id', `area_${series.key}`)
  // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
  // .style('stroke-width', series.lineWidth || this.options.lineWidth)
  .attr('fill', series.color)
  .style('fill-opacity', 0)
  .attr('stroke', 'transparent')
  .transition(this.transition)
  .style('fill-opacity', series.opacity || 1)
