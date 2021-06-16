/* global d3 options */ 
if (typeof options !== 'undefined') {
  this.options = Object.assign({}, this.options, options)
}
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
  if (this.options.margin.axisBottom > 0) {
    this.bottomAxisLayer.call(d3.axisBottom(this.bottomAxis))
    if (this.options.data.bottom.rotate) {
      this.bottomAxisLayer.selectAll('text')
        .attr('transform', `rotate(${this.options.data.bottom.rotate})`)
        .style('text-anchor', 'end')
    } 
  }  
  // Configure the left axis
  let leftDomain = []
  if (typeof this.options.data.left.min !== 'undefined' && typeof this.options.data.left.max !== 'undefined') {
    leftDomain = [this.options.data.left.min - (this.options.data.left.min * 0.1), this.options.data.left.max * 1.1]
    if (this.options.forceZero === true) {
      leftDomain = [Math.min(0, this.options.data.left.min), this.options.data.left.max]
    }
  }  
  this.leftAxis = d3[`scale${this.options.data.left.scale || 'Linear'}`]()
    .domain(leftDomain)
    .range([this.plotHeight, 0])
  if (this.options.margin.axisLeft > 0) {
    this.leftAxisLayer.call(d3.axisLeft(this.leftAxis))
  }  
  // Configure the right axis
  let rightDomain = []
  if (typeof this.options.data.right.min !== 'undefined' && typeof this.options.data.right.max !== 'undefined') {
    rightDomain = [this.options.data.right.min - (this.options.data.right.min * 0.15), this.options.data.right.max * 1.15]
    if (this.options.forceZero === true) {
      rightDomain = [Math.min(0, this.options.data.right.min - (this.options.data.right.min * 0.15)), this.options.data.right.max * 1.15]
    }
  } 
  if (rightDomain.length > 0) {
    this.rightAxis = d3[`scale${this.options.data.right.scale || 'Linear'}`]()
      .domain(rightDomain)
      .range([this.plotHeight, 0])
    if (this.options.margin.axisRight > 0) {
      this.rightAxisLayer.call(d3.axisRight(this.rightAxis))
    }
  }   
  // Draw the series data
  this.options.data.series.forEach((series, index) => {
    if (!series.key) {
      series.key = this.createIdentity()
    }
    if (!series.color) {
      series.color = this.options.colors[index % this.options.colors.length]
    }
    this[`render${series.type || 'bar'}`](series, index)
  })
}
