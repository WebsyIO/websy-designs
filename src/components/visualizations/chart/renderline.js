/* global series index d3 */
const drawLine = (xAxis, yAxis, curveStyle) => {
  return d3
    .line()
    .x(d => {
      let adjustment = this.options.data[xAxis.replace('Brush', '')].scale === 'Time' ? 0 : this[`${xAxis}Axis`].bandwidth() / 2
      return this[`${xAxis}Axis`](this.parseX(d.x.value)) + adjustment
    })
    .y(d => {
      return this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)
    })
    .curve(d3[curveStyle || this.options.curveStyle])
}
let xAxis = 'bottom'
let yAxis = series.axis === 'secondary' ? 'right' : 'left'
if (this.options.orienation === 'horizontal') {  
  xAxis = series.axis === 'secondary' ? 'right' : 'left'
  yAxis = 'bottom'
}
let xBrushAxis = 'bottomBrush'
let yBrushAxis = 'leftBrush'
if (this.options.orienation === 'horizontal') {  
  xBrushAxis = 'leftBrush'
  yBrushAxis = 'bottomBrush'
}
let lines = this.lineLayer.selectAll(`.line_${series.key}`)
  .data([series.data])
let brushLines = this.brushArea.selectAll(`.line_${series.key}`)
  .data([series.data])
// Exit
lines.exit()
  .transition(this.transition)
  .style('stroke-opacity', 1e-6)
  .remove()
// Update
lines
  .style('stroke-width', series.lineWidth || this.options.lineWidth)
  // .attr('id', `line_${series.key}`)
  // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
  .attr('stroke', series.color)
  .attr('fill', 'transparent')
  .transition(this.transition)
  .attr('d', d => drawLine(xAxis, yAxis, series.curveStyle)(d))
// Enter
lines.enter().append('path')
  .attr('d', d => drawLine(xAxis, yAxis, series.curveStyle)(d))
  .attr('class', `line_${series.key}`)
  .attr('id', `line_${series.key}`)
  // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
  .style('stroke-width', series.lineWidth || this.options.lineWidth)
  .attr('stroke', series.color)
  .attr('fill', 'transparent')
  // .transition(this.transition)
  .style('stroke-opacity', 1)

if (!this.brushLinesInitialized[series.key]) {
  this.brushLinesInitialized[series.key] = true
  // Exit
  brushLines.exit()
    .transition(this.transition)
    .style('stroke-opacity', 1e-6)
    .remove()
  // Update
  brushLines
    .style('stroke-width', 1)
    // .attr('id', `line_${series.key}`)
    // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
    .attr('stroke', series.color)
    .attr('fill', 'transparent')
    .transition(this.transition)
    .attr('d', d => drawLine(xBrushAxis, yBrushAxis, series.curveStyle)(d))
  // Enter
  brushLines.enter().append('path')
    .attr('d', d => drawLine(xBrushAxis, yBrushAxis, series.curveStyle)(d))
    .attr('class', `line_${series.key}`)
    .attr('id', `line_${series.key}`)
    // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
    .style('stroke-width', 1)
    .attr('stroke', series.color)
    .attr('fill', 'transparent')
    // .transition(this.transition)
    .style('stroke-opacity', 1)
}

if (series.showArea === true) {
  this.renderarea(series, index)
}
if (series.showSymbols === true) {
  this.rendersymbol(series, index)
}
