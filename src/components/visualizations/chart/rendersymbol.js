/* global d3 series index series.key */
const drawSymbol = (size) => {
  return d3
    .symbol()
    // .type(d => {
    //   return d3.symbols[0]
    // })
    .size(size || this.options.symbolSize)
}
let xAxis = 'bottom'
let yAxis = series.axis === 'secondary' ? 'right' : 'left'
if (this.options.orientation === 'horizontal') {  
  xAxis = series.axis === 'secondary' ? 'right' : 'left'
  yAxis = 'bottom'
}
let symbols = this.symbolLayer.selectAll(`.symbol_${series.key}`)
  .data(series.data)
// Exit
symbols.exit()
  .transition(this.transition)
  .style('fill-opacity', 1e-6)
  .remove()
// Update
symbols
  .attr('d', d => drawSymbol(d.y.size || series.symbolSize)(d))
  .transition(this.transition)
  .attr('fill', series.fillSymbols ? series.color : 'white')
  .attr('stroke', series.color)
  .attr('transform', d => { 
    // let adjustment = (this.options.data[xAxis].scale === 'Time' || this.options.data[xAxis].scale === 'Linear') ? 0 : this.options.data[xAxis].bandWidth / 2
    // if (this.options.orientation === 'horizontal') {  
    //   return `translate(${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)}, ${this[`${xAxis}Axis`](this.parseX(d.x.value)) + adjustment})` 
    // }
    // else {
    //   return `translate(${this[`${xAxis}Axis`](this.parseX(d.x.value)) + adjustment}, ${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)})` 
    // }
    let xIndex = this[xAxis + 'Axis'].domain().indexOf(d.x.value)
    let xPos = this[`custom${xAxis.toInitialCaps()}Range`][xIndex]
    if (this[`custom${xAxis.toInitialCaps()}Range`][xIndex + 1]) {
      xPos = xPos + ((this[`custom${xAxis.toInitialCaps()}Range`][xIndex + 1] - xPos) / 2)
    }
    let adjustment = (this.options.data[xAxis].scale === 'Time' || this.options.data[xAxis].scale === 'Linear') ? 0 : this.options.data[xAxis].bandWidth / 2
    if (this.options.orientation === 'horizontal') {  
      return `translate(${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)}, ${xPos})` 
    }
    else {
      // return `translate(${this[`${xAxis}Axis`](this.parseX(d.x.value)) + adjustment}, ${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)})` 
      return `translate(${xPos}, ${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)})`       
    }
  })   
// Enter
symbols.enter()
  .append('path')
  .attr('d', d => drawSymbol(d.y.size || series.symbolSize)(d))
  // .transition(this.transition)
  .attr('fill', series.fillSymbols ? series.color : 'white')
  .attr('stroke', series.color)
  .attr('class', d => { return `symbol symbol_${series.key}` })
  .attr('transform', d => {
    let xIndex = this[xAxis + 'Axis'].domain().indexOf(d.x.value)
    let xPos = this[`custom${xAxis.toInitialCaps()}Range`][xIndex]
    if (this[`custom${xAxis.toInitialCaps()}Range`][xIndex + 1]) {
      xPos = xPos + ((this[`custom${xAxis.toInitialCaps()}Range`][xIndex + 1] - xPos) / 2)
    }
    let adjustment = (this.options.data[xAxis].scale === 'Time' || this.options.data[xAxis].scale === 'Linear') ? 0 : this.options.data[xAxis].bandWidth / 2
    if (this.options.orientation === 'horizontal') {  
      return `translate(${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)}, ${xPos})` 
    }
    else {
      // return `translate(${this[`${xAxis}Axis`](this.parseX(d.x.value)) + adjustment}, ${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)})` 
      return `translate(${xPos}, ${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)})`       
    }
  })
