/* global key d3 */
let labels = this.labelLayer.selectAll(`.label_${key}`)
  // .transition()
  // .duration(this.options.transitionDuration)
  .style('stroke-opacity', 1e-6)
  .remove()
