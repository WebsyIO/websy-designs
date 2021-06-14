/* global d3 */ 
if (!this.options.data) {
  // tell the user no data has been provided
}
else {
  this.transition = d3.transition().duration(this.options.transitionDuration)
  if (this.options.disableTransitions === true) {
    this.transition = d3.transition().duration(0)
  }
  // Add placeholders for the data entries that don't exist
  if (!this.options.data.left) {
    this.options.data.left = { data: [] }
  }
  if (!this.options.data.right) {
    this.options.data.right = { data: [] }
  }
  if (!this.options.data.bottom) {
    this.options.data.bottom = { data: [] }
  }
  this.resize()
  if (this.options.orientation === 'vertical') {
    this.leftAxisLayer.attr('class', 'y-axis')
    this.rightAxisLayer.attr('class', 'y-axis')
    this.bottomAxisLayer.attr('class', 'x-axis')
  }
  else {
    this.leftAxisLayer.attr('class', 'x-axis')
    this.rightAxisLayer.attr('class', 'x-axis')
    this.bottomAxisLayer.attr('class', 'y-axis')
  }
  // Configure the bottom axis
  const bottomDomain = this.options.data.bottom.data.map(d => d.value)  
  this.bottomAxis = d3[`scale${this.options.data.bottom.scale || 'Band'}`]()
    .domain(bottomDomain)
    .padding(0)
    .range([0, this.plotWidth])
  this.bottomAxisLayer.call(d3.axisBottom(this.bottomAxis))
  // Configure the left axis
  let leftDomain = this.options.data.left.data.map(d => d.value)  
  if (this.options.data.left.min && this.options.data.left.max) {
    leftDomain = [this.options.data.left.min, this.options.data.left.max]
  }
  this.leftAxis = d3[`scale${this.options.data.left.scale || 'Linear'}`]()
    .domain(leftDomain)
    .range([this.plotHeight, 0])
  this.leftAxisLayer.call(d3.axisLeft(this.leftAxis))
  // Draw the series data
  this.options.data.series.forEach((s, i) => {
    this[`render${s.type || 'bar'}`](s, i)
  })
}
