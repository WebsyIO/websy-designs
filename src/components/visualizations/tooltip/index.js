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
      top: 'unset',
      bottom: 'unset',
      left: 0,      
      width: 0,
      height: 0,
      onLeft: false
    }
  ) {    
    let classes = ['active']
    if (position.positioning === 'vertical') {
      classes.push('vertical')
    }
    if (position.onLeft === true) {
      classes.push('left')
    }
    if (position.onTop === true) {
      classes.push('top')
    }
    console.log(classes.join(' '))
    let fO = this.tooltipLayer
      .selectAll('foreignObject')
      .attr('width', `${position.width}px`)
      // .attr('height', `${position.height}px`)
      // .attr('y', `0px`)      
      .attr('class', `websy-chart-tooltip ${classes.join(' ')}`)
    this.tooltipContent
      .attr('class', `websy-chart-tooltip-content ${classes.join(' ')}`)
      .style('width', `${position.width}px`)
      // .style('left', '0px')
      // .style('top', `0px`)
      .html(`<div class='title'>${title}</div>${html}`)
    if (
      navigator.userAgent.indexOf('Chrome') === -1 &&
      navigator.userAgent.indexOf('Safari') !== -1
    ) {
      fO.attr('x', '0px')
      this.tooltipContent
        .style('left', position.positioning !== 'vertical' ? `${position.left}px` : 'unset')
        .style('top', position.onTop !== true ? `${position.top}px` : 'unset')
        .style('bottom', position.onTop === true ? `${position.bottom}px` : 'unset')
      // that.tooltipLayer.selectAll('foreignObject').transform(that.margin.left, that.margin.top)
    }
    else {
      if (position.positioning === 'vertical') {
        fO.attr('x', `${position.left}px`)
        fO.attr('y', `${position.onTop === true ? position.bottom - this.tooltipContent._groups[0][0].clientHeight : position.top}px`)                
      }
      else {
        fO.attr('x', `${position.left}px`)
        fO.attr('y', `${position.top}px`)        
      }            
      this.tooltipContent.style('left', 'unset')
      this.tooltipContent.style('top', 'unset')
    }
  }
  transform (x, y) {
    this.tooltipLayer.attr('transform', `translate(${x}, ${y})`)
  }
}
