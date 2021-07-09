/* global d3 options */ 
if (typeof options !== 'undefined') {
  this.options = Object.assign({}, this.options, options)
}
if (!this.options.data) {
  // tell the user no data has been provided
}
else {
  this.transition = d3.transition().duration(this.options.transitionDuration)
  if (this.options.data.bottom.scale && this.options.data.bottom.scale === 'Time') {
    this.parseX = d3.timeParse(this.options.timeParseFormat)
  } 
  else {
    this.parseX = function (input) {
      return input
    }
  }
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
  const el = document.getElementById(this.elementId)
  if (el) {
    this.width = el.clientWidth
    this.height = el.clientHeight
    this.svg
      .attr('width', this.width)
      .attr('height', this.height)
    this.longestLeft = 0
    this.longestRight = 0
    this.longestBottom = 0
    if (this.options.data.bottom && this.options.data.bottom.data && typeof this.options.data.bottom.max === 'undefined') {
      this.options.data.bottom.max = this.options.data.bottom.data.reduce((a, b) => a.length > b.value.length ? a : b.value, '')
      this.options.data.bottom.min = this.options.data.bottom.data.reduce((a, b) => a.length < b.value.length ? a : b.value, this.options.data.bottom.max)      
    }
    if (this.options.data.bottom && typeof this.options.data.bottom.max !== 'undefined') {
      this.longestBottom = this.options.data.bottom.max.toString().length
      if (this.options.data.bottom.formatter) {
        this.longestBottom = this.options.data.bottom.formatter(this.options.data.bottom.max).toString().length
      } 
    }
    if (this.options.data.left && this.options.data.left.data && this.options.data.left.max === 'undefined') {
      this.options.data.left.min = d3.min(this.options.data.left.data)
      this.options.data.left.max = d3.max(this.options.data.left.data)
    }
    if (this.options.data.left && typeof this.options.data.left.max !== 'undefined') {
      this.longestLeft = this.options.data.left.max.toString().length
      if (this.options.data.left.formatter) {
        this.longestLeft = this.options.data.left.formatter(this.options.data.left.max).toString().length
      } 
    } 
    if (this.options.data.right && this.options.data.right.data && this.options.data.right.max === 'undefined') {
      this.options.data.right.min = d3.min(this.options.data.right.data)
      this.options.data.right.max = d3.max(this.options.data.right.data)
    }   
    if (this.options.data.right && typeof this.options.data.right.max !== 'undefined') {
      this.longestRight = this.options.data.right.max.toString().length
      if (this.options.data.right.formatter) {
        this.longestRight = this.options.data.right.formatter(this.options.data.right.max).toString().length
      }
    }
    console.log('longest left', this.longestLeft)
    console.log('longest right', this.longestRight)    
    // establish the space needed for the various axes    
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
    console.log('margins', this.options.margin)
    // Define the plot size
    this.plotWidth = this.width - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight
    this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom
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
    // Configure the bottom axis
    let bottomDomain = []
    // if (typeof this.options.data.bottom.min !== 'undefined' && typeof this.options.data.bottom.max !== 'undefined') {
    //   bottomDomain = [this.options.data.bottom.min - (this.options.data.bottom.min * 0.1), this.options.data.bottom.max * 1.1]
    //   if (this.options.forceZero === true) {
    //     bottomDomain = [Math.min(0, this.options.data.bottom.min), this.options.data.bottom.max]
    //   }
    // }
    if (this.options.data.bottom.data) {
      bottomDomain = this.options.data.bottom.data.map(d => d.value)  
    }
    if (this.options.data.bottom.scale === 'Time') {
      let min = this.options.data.bottom.data[0].value
      let max = this.options.data.bottom.data[this.options.data.bottom.data.length - 1].value
      min = this.parseX(min)
      max = this.parseX(max)
      bottomDomain = [min, max]
    }
    this.bottomAxis = d3[`scale${this.options.data.bottom.scale || 'Band'}`]()
      .domain(bottomDomain)      
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
    // else if (this.options.data.left.data) {
    //   leftDomain = this.options.data.left.data.map(d => d.value)  
    // }
    this.leftAxis = d3[`scale${this.options.data.left.scale || 'Linear'}`]()
      .domain(leftDomain)
      .range([this.plotHeight, 0])
    if (this.options.margin.axisLeft > 0) {
      this.leftAxisLayer.call(
        d3.axisLeft(this.leftAxis)
          .ticks(this.options.data.left.ticks || 5)
          .tickFormat(d => {
            if (this.options.data.left.formatter) {
              d = this.options.data.left.formatter(d)
            }            
            return d
          })
      )
    }  
    // Configure the right axis
    let rightDomain = []
    if (typeof this.options.data.right.min !== 'undefined' && typeof this.options.data.right.max !== 'undefined') {
      rightDomain = [this.options.data.right.min - (this.options.data.right.min * 0.15), this.options.data.right.max * 1.15]
      if (this.options.forceZero === true) {
        rightDomain = [Math.min(0, this.options.data.right.min - (this.options.data.right.min * 0.15)), this.options.data.right.max * 1.15]
      }
    }
    // else if (this.options.data.right.data) {
    //   rightDomain = this.options.data.right.data.map(d => d.value)  
    // }
    if (rightDomain.length > 0) {
      this.rightAxis = d3[`scale${this.options.data.right.scale || 'Linear'}`]()
        .domain(rightDomain)
        .range([this.plotHeight, 0])
      if (this.options.margin.axisRight > 0) {
        this.rightAxisLayer.call(
          d3.axisRight(this.rightAxis)
            .ticks(this.options.data.left.ticks || 5)
            .tickFormat(d => {
              if (this.options.data.right.formatter) {
                d = this.options.data.right.formatter(d)
              }            
              return d
            })
        )
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
}
