/* global d3 data */
let xAxis = 'bottom'
let yAxis = 'left'  
let that = this
if (this.options.orientation === 'horizontal') {
  xAxis = 'left'
  yAxis = 'bottom'
}
this.refLineLayer.selectAll('.reference-line').remove()
this.refLineLayer.selectAll('.reference-line-label').remove()
this.refLineLayer
  .append('line')
  .attr('y1', this[`${yAxis}Axis`](data.value))
  .attr('y2', this[`${yAxis}Axis`](data.value))
  .attr('x2', this.plotWidth)
  .attr('class', `reference-line`)
  .style('stroke', data.color)
  .style('stroke-width', `${data.lineWidth}px`)
  .style('stroke-dasharray', data.lineStyle)
if (data.label && data.label !== '') {
  // show the text on the line
  this.refLineLayer
    .append('text')
    .attr('class', `reference-line-label`)
    .attr('x', this.plotWidth)
    .attr('y', this[`${yAxis}Axis`](data.value))
    .attr('font-size', this.options.fontSize)
    .attr('fill', data.color)
    .text(data.label)
    .attr(
      'text-anchor', 'end'
    )
    .attr(
      'alignment-baseline', 'text-after-edge'        
    )
}
