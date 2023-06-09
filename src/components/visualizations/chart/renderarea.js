/* global d3 series index */
const drawArea = (xAxis, yAxis, curveStyle) => {
  return d3
    .area()
    .x(d => {
      if (this.options.data[xAxis].scale === 'Time') {          
        return this[`${xAxis}Axis`](this.parseX(d.x.value))          
      }
      else {
        let xIndex = this[xAxis + 'Axis'].domain().indexOf(d.x.value)
        let xPos = this[`custom${xAxis.toInitialCaps()}Range`][xIndex]
        if (this[`custom${xAxis.toInitialCaps()}Range`][xIndex + 1]) {
          xPos = xPos + ((this[`custom${xAxis.toInitialCaps()}Range`][xIndex + 1] - xPos) / 2)
        }
        return xPos
      }
    })
    .y0(d => {
      return this[`${yAxis}Axis`](0)
    })
    .y1(d => {
      return this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)
    })
    .curve(d3[curveStyle || this.options.curveStyle])
}
let xAxis = 'bottom'
let yAxis = series.axis === 'secondary' ? 'right' : 'left'
if (this.options.orientation === 'horizontal') {  
  xAxis = series.axis === 'secondary' ? 'right' : 'left'
  yAxis = 'bottom'
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
  .attr('fill', d => d[0].y.color || series.color)
  // .attr('stroke', 'transparent')
  .transition(this.transition)
  .attr('d', d => drawArea(xAxis, yAxis, series.curveStyle)(d))
// Enter
areas.enter().append('path')
  .attr('d', d => drawArea(xAxis, yAxis, series.curveStyle)(d))
  .attr('class', `area_${series.key}`)
  .attr('id', `area_${series.key}`)
  // .attr('transform', 'translate(' + (this.options.data[xAxis].scale === 'Time' ? 0 : this.options.data[xAxis].bandWidth / 2) + ',0)')
  // .style('stroke-width', series.lineWidth || this.options.lineWidth)
  .attr('fill', d => d[0].y.color || series.color)
  // .style('fill-opacity', 0)
  .attr('stroke', 'transparent')
  // .transition(this.transition)
  .style('fill-opacity', series.opacity || 0.3)
