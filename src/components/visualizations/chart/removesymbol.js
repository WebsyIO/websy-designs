/* global key d3 */
let symbols = this.symbolLayer.selectAll(`.symbol_${key}`)
  .transition(this.transition)
  .style('stroke-opacity', 1e-6)
  .remove()
