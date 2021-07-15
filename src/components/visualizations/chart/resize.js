/* global d3 */ 
const el = document.getElementById(this.elementId)
if (el) {
  this.width = el.clientWidth
  this.height = el.clientHeight
  this.svg
    .attr('width', this.width)
    .attr('height', this.height)
    // Define the plot height  
  this.plotWidth = this.width - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight
  this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom
  // establish the space needed for the various axes
  this.longestRight = 5
  this.longestBottom = 5
  this.options.margin.axisLeft = this.longestLeft * ((this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize) * 0.7
  this.options.margin.axisRight = this.longestRight * ((this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize) * 0.7
  this.options.margin.axisBottom = ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) + 10
  if (this.options.data.bottom.rotate) {
    // this.options.margin.bottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)   
    this.options.margin.axisBottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) * 0.4
    // this.options.margin.bottom = this.options.margin.bottom * (1 + this.options.data.bottom.rotate / 100)
  }  
  // hide the margin if necessary
  if (this.options.axis) {
    if (this.options.axis.hideAll === true) {
      this.options.margin.axisLeft = 0
      this.options.margin.axisRight = 0
      this.options.margin.axisBottom = 0
    }
    if (this.options.axis.hideLeft === true) {
      this.options.margin.axisLeft = 0
    }
    if (this.options.axis.hideRight === true) {
      this.options.margin.axisRight = 0
    }
    if (this.options.axis.hideBottom === true) {
      this.options.margin.axisBottom = 0
    }
  }
  // Translate the layers
  this.leftAxisLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.rightAxisLayer
    .attr('transform', `translate(${this.options.margin.left + this.plotWidth + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.bottomAxisLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.plotHeight})`)
  this.plotArea
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.areaLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.lineLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.barLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.symbolLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
  this.trackingLineLayer
    .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
}
