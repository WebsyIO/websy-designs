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
function getBarHeight (d, i, heightBounds, yAxis, xAxis) {  
  let output
  if (this.options.orientation === 'horizontal') {
    output = this.options.data[xAxis].bandWidth
  }
  else {
    let x = getBarX.call(this, d, i, xAxis)
    if (typeof x === 'undefined' || x === null) {
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
  let output
  if (this.options.orientation === 'horizontal') {    
    let width = (this[`${yAxis}Axis`](0)) - this[`${yAxis}Axis`](Math.abs(d.y.value))
    acummulativeY[d.y.index] += width
    output = width
  }
  else {
    let x = getBarX.call(this, d, i, xAxis)
    if (typeof x === 'undefined' || x === null) {
      return null
    }    
    output = Math.max(1, this.options.data[xAxis].bandWidth - (xAxis.indexOf('Brush') !== -1 ? 2 : this.options.groupPadding * 2))    
  }
  if (isNaN(output)) {
    return 0
  }
  return output
}
function getBarX (d, i, xAxis) {  
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
    // let adjustment = this.options.data[xAxis.replace('Brush', '')].scale === 'Time' ? 0 : this.options.data[xAxis.replace('Brush', '')].bandWidth / 2
    // let adjustment = this[`custom${xAxis.toInitialCaps()}Range`][i] + (i * this.options.data[xAxis].bandWidth)
    if (this.options.grouping === 'grouped') { 
      let xIndex = 0
      if (this.processedX[d.x.value]) {
        xIndex = Math.max(0, this.processedX[d.x.value].indexOf(d.y.tooltipLabel))
      }      
      // let barAdjustment = 
      //   (this.options.data[xAxis].bandWidth * xIndex) +
      //   (xIndex * this.options.groupPadding * 2) + this.options.groupPadding +
      //   (xAxis.indexOf('Brush') === -1 ? this.bandPadding : 1)
      // let barAdjustment = 
      //   (this.options.data[xAxis.replace('Brush', '')].step * xIndex) +
      //   this.options.groupPadding
      //   // (xAxis.indexOf('Brush') === -1 ? this.bandPadding : 1)
      let barAdjustment = (this.options.data[xAxis].bandWidth * xIndex) + ((xAxis.indexOf('Brush') !== -1 ? this.brushBandPadding : this.bandPadding) / 2) + (xAxis.indexOf('Brush') !== -1 ? 1 : this.options.groupPadding)
      if (this[`custom${xAxis.toInitialCaps()}Range`].length > 0) {
        output = this[`custom${xAxis.toInitialCaps()}Range`][this[xAxis + 'Axis'].domain().indexOf(d.x.value)] + barAdjustment
        // output = this[`custom${xAxis.toInitialCaps().replace('Brush', '')}DetailRange`][this[xAxis + 'Axis'].domain().indexOf(d.x.value)]
      }
      else {
        output = this[`${xAxis}Axis`](this.parseX(d.x.value)) + barAdjustment
      }    
      if (!this.processedX[d.x.value]) {
        this.processedX[d.x.value] = []
      }
      if (this.processedX[d.x.value].indexOf(d.y.tooltipLabel) === -1) {
        this.processedX[d.x.value].push(d.y.tooltipLabel)
      }
      // console.log(d.x.value, d.y.tooltipLabel, xIndex, i, barAdjustment, output)  
    }
    else {      
      output = this[`custom${xAxis.toInitialCaps()}Range`][this[xAxis + 'Axis'].domain().indexOf(d.x.value)]
    }    
  }
  if (isNaN(output)) {
    return null
  }
  return output
}
function getBarY (d, i, heightBounds, yAxis, xAxis) {  
  let output
  if (this.options.orientation === 'horizontal') {
    if (this.options.grouping !== 'grouped') {
      output = this[`${xAxis}Axis`](this.parseX(d.x.value))
    }
    else {
      output = this[`${xAxis}Axis`](this.parseX(d.x.value)) + ((d.y.index || i) * this.options.data[xAxis.replace('Brush', '')].barWidth)
    }    
  }
  else {
    if (this.options.grouping === 'stacked') {      
      let accH = getBarHeight.call(this, {x: d.x, y: { value: d.y.accumulative }}, i, heightBounds, yAxis, xAxis)
      let h = getBarHeight.call(this, d, i, heightBounds, yAxis, xAxis)
      // output = heightBounds - this[`${yAxis}Axis`](d.y.accumulative)
      output = (this[`${yAxis}Axis`](0)) - ((accH + h) * (d.y.accumulative < 0 ? 0 : 1))
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
