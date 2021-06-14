/* global d3 */ 
const el = document.getElementById(this.elementId)
if (el) {
  this.width = el.clientWidth
  this.height = el.clientHeight
  this.svg
    .attr('width', this.width)
    .attr('height', this.height)
  // establish the space needed for the various axes
  this.longestLeft = ([0]).concat(this.options.data.left.data.map(d => d.value.length)).sort().pop()
  this.longestRight = ([0]).concat(this.options.data.right.data.map(d => d.value.length)).sort().pop()
  this.longestBottom = ([0]).concat(this.options.data.bottom.data.map(d => d.value.length)).sort().pop()
  this.options.margin.left = this.longestLeft * ((this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize)
  this.options.margin.right = this.longestRight * ((this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize)
  this.options.margin.bottom = ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) + 10
  if (this.options.data.bottom.rotate) {
    this.options.margin.bottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)   
    this.options.margin.bottom = this.options.margin.bottom * (this.options.data.bottom.rotate / 100)
  }  
  // hide the margin if necessary
  if (this.options.axis) {
    if (this.options.axis.hideAll === true) {
      this.options.margin = { top: 3, left: 3, bottom: 3, right: 3 }
    }
    if (this.options.axis.hideLeft === true) {
      this.options.margin.left = 3
    }
    if (this.options.axis.hideRight === true) {
      this.options.margin.right = 3
    }
    if (this.options.axis.hideBottom === true) {
      this.options.margin.bottom = 3
    }
  }
  // Define the plot height  
  this.plotWidth = this.width - this.options.margin.left - this.options.margin.right
  this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom
  // Translate the layers
  this.leftAxisLayer
    .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top})`)
  this.rightAxisLayer
    .attr('transform', `translate(${this.options.margin.left + this.plotWidth}, ${this.options.margin.top})`)
  this.bottomAxisLayer
    .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top + this.plotHeight})`)
  this.plotArea
    .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top})`)
  this.areaLayer
    .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top})`)
  this.lineLayer
    .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top})`)
  this.barLayer
    .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top})`)
  this.symbolLayer
    .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top})`)
  this.trackingLineLayer
    .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top})`)
}
