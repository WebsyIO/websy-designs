class WebsyChartTooltip {
  constructor (el) {
    // el should be the element Id of an SVG element
    // or a reference to an SVG element
    if (typeof el === 'string') {
      this.svg = document.getElementById(el)
    }
    else {
      this.svg = el
    }
    this.tooltipLayer = this.svg.append('g').attr('class', 'tooltip-layer')
    this.tooltipContent = this.tooltipLayer
      .append('foreignObject')
      .attr('class', 'websy-chart-tooltip')
      .append('xhtml:div')
      .attr('class', 'websy-chart-tooltip-content')
  }
  hide () {
    this.tooltipContent.classed('active', false)
  }
  setHeight (h) {
    this.tooltipLayer.select('foreignObject').style('height', h)
  }
  show (
    title,
    html,
    position = {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      onLeft: false
    }
  ) {    
    let fO = this.tooltipLayer
      .selectAll('foreignObject')
      .attr('width', `${position.width}px`)
      // .attr('height', `${position.height}px`)
      .attr('y', `0px`)
      .classed('left', position.onLeft)
    this.tooltipContent
      .classed('active', true)
      .style('width', `${position.width}px`)
      // .style('left', '0px')
      .style('top', `0px`)
      .html(`<div class='title'>${title}</div>${html}`)
    if (
      navigator.userAgent.indexOf('Chrome') === -1 &&
      navigator.userAgent.indexOf('Safari') !== -1
    ) {
      fO.attr('x', '0px')
      this.tooltipContent
        .style('left', `${position.top}px`)
        .style('top', `${position.top}px`)
      // that.tooltipLayer.selectAll('foreignObject').transform(that.margin.left, that.margin.top)
    }
    else {
      fO.attr('x', `${position.left}px`)
      this.tooltipContent.style('left', '0px')
    }
  }
  transform (x, y) {
    this.tooltipLayer.attr('transform', `translate(${x}, ${y})`)
  }
}
