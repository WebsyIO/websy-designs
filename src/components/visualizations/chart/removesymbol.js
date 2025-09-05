/* global key d3 */
let symbols = this.symbolLayer.selectAll(`.symbol_${key}`)
  // .transition()
  // .duration(this.options.transitionDuration)
  .style('stroke-opacity', 1e-6)
  .remove()
