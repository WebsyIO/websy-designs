/* global d3 data */
let xAxis = 'bottom'
let yAxis = 'left'  
let yAttr = 'y'
let xAttr = 'x'
let that = this
let length = this.plotWidth
if (this.options.orientation === 'horizontal') {
  xAxis = 'left'
  yAxis = 'bottom'
  yAttr = 'x'
  xAttr = 'y'
  length = this.plotHeight
}
this.refLineLayer
  .append('line')
  .attr(`${yAttr}1`, this[`${yAxis}Axis`](data.value))
  .attr(`${yAttr}2`, this[`${yAxis}Axis`](data.value))
  .attr(`${xAttr}2`, length)
  .attr('class', `reference-line`)
  .style('stroke', data.color)
  .style('stroke-width', `${data.lineWidth}px`)
  .style('stroke-dasharray', data.lineStyle)
if (data.label && data.label !== '') {
  // show the text on the line
  this.refLineLayer
    .append('text')
    .attr('class', `reference-line-label`)
    .attr('x', length)
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
