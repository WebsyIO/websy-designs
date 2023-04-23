/* global series index d3 */
let xAxis = 'bottom'
let yAxis = 'left'
let bars = this.barLayer.selectAll(`.bar_${series.key}`).data(series.data)
let brushBars = this.brushArea.selectAll(`.bar_${series.key}`).data(series.data)
let acummulativeY = new Array(this.options.data.series.length).fill(0)
if (this.options.orientation === 'horizontal') {
  xAxis = 'left'
  yAxis = 'bottom'
}
// if (this.options.data.series.length > 1 && this.options.grouping === 'grouped') {
//   barWidth = barWidth / this.options.data.series.length - 4
// }
function getBarHeight (d, i, heightBounds, yAxis, xAxis) {
  let barWidth = this[`${xAxis}Axis`].bandwidth()
  let groupedBarWidth = (barWidth - 10) / this.options.data.series.length
  let output
  if (this.options.orientation === 'horizontal') {
    output = barWidth
  }
  else {
    if (!getBarX.call(this, d, i, xAxis)) {
      return null
    }
    output = (this[`${yAxis}Axis`](0)) - this[`${yAxis}Axis`](Math.abs(d.y.value))
  }
  if (isNaN(output)) {
    return null
  }
  return output
}
function getBarWidth (d, i, xAxis) {
  let barWidth = this[`${xAxis}Axis`].bandwidth()
  let groupedBarWidth = (barWidth - (xAxis.indexOf('Brush') === -1 ? 10 : 2)) / this.options.data.series.length
  let output
  if (this.options.orientation === 'horizontal') {
    // let width = this[`${yAxis}Axis`](d.y.value)
    let width = (this[`${yAxis}Axis`](0)) - this[`${yAxis}Axis`](Math.abs(d.y.value))
    acummulativeY[d.y.index] += width
    output = width
  }
  else {
    if (!getBarX.call(this, d, i, xAxis)) {
      return null
    }
    if (this.options.grouping === 'grouped') {
      output = Math.max(1, groupedBarWidth)
    }
    else {
      output = Math.max(1, barWidth)
    }
  }
  if (isNaN(output)) {
    return 0
  }
  return output
}
function getBarX (d, i, xAxis) {
  let barWidth = this[`${xAxis}Axis`].bandwidth()
  let groupedBarWidth = (barWidth - (xAxis.indexOf('Brush') === -1 ? 10 : 2)) / this.options.data.series.length
  let output
  if (this.options.orientation === 'horizontal') {
    if (this.options.grouping === 'stacked') {      
      let h = getBarWidth.call(this, d, i, xAxis)
      let adjustment = 0
      if (d.y.accumulative && d.y.accumulative !== 0) {
        adjustment = this[`${yAxis}Axis`](d.y.accumulative || 0)
      }
      output = this[`${yAxis}Axis`](0) + (adjustment * (d.y.value < 0 ? 1 : 0)) + (h * (d.y.value < 0 ? 1 : 0))
    }
    else {
      let h = getBarWidth.call(this, d, i, xAxis)
      output = (this[`${yAxis}Axis`](0)) + (h * (d.y.value < 0 ? 1 : 0))
    }
  }
  else {
    let adjustment = this.options.data[xAxis.replace('Brush', '')].scale === 'Time' ? 0 : this[`${xAxis}Axis`].bandwidth() / 2
    if (this.options.grouping === 'grouped') {      
      let barAdjustment = groupedBarWidth * index + (xAxis.indexOf('Brush') === -1 ? 5 : 1) // + (index > 0 ? 4 : 0)
      output = this[`${xAxis}Axis`](this.parseX(d.x.value)) + barAdjustment
    }
    else {
      // output = this[`${xAxis}Axis`](this.parseX(d.x.value)) + (i * barWidth) + adjustment
      output = this[`${xAxis}Axis`](this.parseX(d.x.value)) //  + (i * barWidth)
    }    
  }
  if (isNaN(output)) {
    return null
  }
  return output
}
function getBarY (d, i, heightBounds, yAxis, xAxis) {
  let barWidth = this[`${xAxis}Axis`].bandwidth()
  let groupedBarWidth = (barWidth - 10) / this.options.data.series.length
  let output
  if (this.options.orientation === 'horizontal') {
    if (this.options.grouping !== 'grouped') {
      output = this[`${xAxis}Axis`](this.parseX(d.x.value))
    }
    else {
      output = this[`${xAxis}Axis`](this.parseX(d.x.value)) + ((d.y.index || i) * barWidth)
    }    
  }
  else {
    if (this.options.grouping === 'stacked') {      
      output = heightBounds - this[`${yAxis}Axis`](d.y.accumulative)
    }
    else {
      let h = getBarHeight.call(this, d, i, heightBounds, yAxis, xAxis)
      output = (this[`${yAxis}Axis`](0)) - (h * (d.y.value < 0 ? 0 : 1))
    }
  }
  if (isNaN(output)) {
    return null
  }
  return output
}
bars
  .exit()
  .transition(this.transition)
  .style('fill-opacity', 1e-6)
  .remove()

bars
  .attr('width', (d, i) => Math.abs(getBarWidth.call(this, d, i, xAxis)))
  .attr('height', (d, i) => getBarHeight.call(this, d, i, this.plotHeight, yAxis, xAxis))
  .attr('x', (d, i) => getBarX.call(this, d, i, xAxis))  
  .attr('y', (d, i) => getBarY.call(this, d, i, this.plotHeight, yAxis, xAxis))
  // .transition(this.transition)  
  .attr('fill', d => d.y.color || d.color || series.color)

bars
  .enter()
  .append('rect')
  .attr('width', (d, i) => Math.abs(getBarWidth.call(this, d, i, xAxis)))
  .attr('height', (d, i) => getBarHeight.call(this, d, i, this.plotHeight, yAxis, xAxis))
  .attr('x', (d, i) => getBarX.call(this, d, i, xAxis))  
  .attr('y', (d, i) => getBarY.call(this, d, i, this.plotHeight, yAxis, xAxis))
  // .transition(this.transition)
  .attr('fill', d => d.y.color || d.color || series.color)
  .attr('class', d => {
    return `bar bar_${series.key}`
  })

if (!this.brushBarsInitialized[series.key]) {
  this.brushBarsInitialized[series.key] = true
  brushBars
    .exit()
    .transition(this.transition)
    .style('fill-opacity', 1e-6)
    .remove()

  brushBars
    .attr('width', (d, i) => Math.abs(getBarWidth.call(this, d, i, `${xAxis}Brush`)))
    .attr('height', (d, i) => getBarHeight.call(this, d, i, this.options.brushHeight, `${yAxis}Brush`, `${xAxis}Brush`))
    .attr('x', (d, i) => getBarX.call(this, d, i, `${xAxis}Brush`))  
    .attr('y', (d, i) => getBarY.call(this, d, i, this.options.brushHeight, `${yAxis}Brush`, `${xAxis}Brush`))
    // .transition(this.transition)  
    .attr('fill', d => d.y.color || d.color || series.color)

  brushBars
    .enter()
    .append('rect')
    .attr('width', (d, i) => Math.abs(getBarWidth.call(this, d, i, `${xAxis}Brush`)))
    .attr('height', (d, i) => getBarHeight.call(this, d, i, this.options.brushHeight, `${yAxis}Brush`, `${xAxis}Brush`))
    .attr('x', (d, i) => getBarX.call(this, d, i, `${xAxis}Brush`))  
    .attr('y', (d, i) => getBarY.call(this, d, i, this.options.brushHeight, `${yAxis}Brush`, `${xAxis}Brush`))
    // .transition(this.transition)
    .attr('fill', d => d.y.color || d.color || series.color)
    .attr('class', d => {
      return `bar bar_${series.key}`
    })
}
