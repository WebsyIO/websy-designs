/* global key d3 */
let lines = this.lineLayer.selectAll(`.line_${key}`)
  .transition(this.transition)
  .style('stroke-opacity', 1e-6)
  .remove()
