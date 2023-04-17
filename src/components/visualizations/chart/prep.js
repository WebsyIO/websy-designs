/* global d3 WebsyDesigns */ 
this.defs = this.svg.append('defs')
this.clip = this.defs.append('clipPath').attr('id', `${this.elementId}_clip`).append('rect')
this.brushClip = this.defs.append('clipPath').attr('id', `${this.elementId}_brushclip`).append('rect')
this.leftAxisLayer = this.svg.append('g').attr('class', 'left-axis-layer')
this.rightAxisLayer = this.svg.append('g').attr('class', 'right-axis-layer')
this.bottomAxisLayer = this.svg.append('g').attr('class', 'bottom-axis-layer')
this.leftAxisLabel = this.svg.append('g').attr('class', 'left-axis-label-layer')
this.rightAxisLabel = this.svg.append('g').attr('class', 'right-axis-label-layer')
this.bottomAxisLabel = this.svg.append('g').attr('class', 'bottom-axis-label-layer')
this.plotArea = this.svg.append('g').attr('class', 'plot-layer')
this.areaLayer = this.svg.append('g').attr('class', 'area-layer')
this.lineLayer = this.svg.append('g').attr('class', 'line-layer')
this.barLayer = this.svg.append('g').attr('class', 'bar-layer')
this.labelLayer = this.svg.append('g').attr('class', 'label-layer')
this.symbolLayer = this.svg.append('g').attr('class', 'symbol-layer')
this.refLineLayer = this.svg.append('g').attr('class', 'refline-layer')
this.trackingLineLayer = this.svg.append('g').attr('class', 'tracking-line-layer')
this.trackingLineLayer.append('line').attr('class', 'tracking-line')
this.tooltip = new WebsyDesigns.WebsyChartTooltip(this.svg)
this.brushLayer = this.svg
  .append('g')
  // .attr(
  //   'clip-path',
  //   `url(#${this.elementId.replace(/\s/g, '_')}_brushclip)`
  // )
this.brushArea = this.brushLayer.append('g').attr('class', 'brush-area') 
this.brushLayer.append('g').attr('class', 'brush')
this.eventLayer = this.svg.append('g').attr('class', 'event-line').append('rect')
this.eventLayer
  .on('mouseout', this.handleEventMouseOut.bind(this))
  .on('mousemove', this.handleEventMouseMove.bind(this))
this.render()
