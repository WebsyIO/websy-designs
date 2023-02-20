/* global key d3 */
let bars = this.barLayer.selectAll(`.bar_${key}`)
  .transition(this.transition)
  .style('fill-opacity', 1e-6)
  .remove()
