/* global key d3 */
this.barLayer.selectAll(`.bar_${key}`)
  // .transition()
  // .duration(this.options.transitionDuration)
  .style('fill-opacity', 1e-6)
  .remove()
// remove from the brush as well
this.brushArea.selectAll(`.bar_${key}`)
  // .transition()
  // .duration(this.options.transitionDuration)
  .style('fill-opacity', 1e-6)
  .remove()
