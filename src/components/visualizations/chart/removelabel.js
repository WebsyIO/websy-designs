/* global key d3 */
let labels = this.labelLayer.selectAll(`.label_${key}`)
  .transition(this.transition)
  .style('stroke-opacity', 1e-6)
  .remove()
