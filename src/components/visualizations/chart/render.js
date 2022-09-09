/* global d3 options WebsyUtils */ 
if (typeof options !== 'undefined') {
  this.options = Object.assign({}, this.options, options)
}
if (!this.options.data) {
  // tell the user no data has been provided
}
else {
  this.transition = d3.transition().duration(this.options.transitionDuration)
  if (this.options.data.bottom.scale && this.options.data.bottom.scale === 'Time') {
    this.parseX = function (input) {
      if (typeof input.getTime !== 'undefined') {
        return input
      }      
      else {
        d3.timeParse(this.options.timeParseFormat)(input)
      }
    }
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
    // establish the space and size for the legend
    // the legend gets rendered so that we can get its actual size
    if (this.options.showLegend === true) {
      let legendData = this.options.data.series.map((s, i) => ({value: s.label || s.key, color: s.color || this.options.colors[i % this.options.colors.length]})) 
      if (this.options.legendPosition === 'top' || this.options.legendPosition === 'bottom') {
        this.legendArea.style('width', '100%')
      }
      if (this.options.legendPosition === 'left' || this.options.legendPosition === 'right') {
        this.legendArea.style('height', '100%')
        this.legendArea.style('width', this.legend.testWidth(d3.max(legendData.map(d => d.value))) + 'px')
      }
      this.legend.data = legendData
      let legendSize = this.legend.getSize()
      this.options.margin.legendTop = 0
      this.options.margin.legendBottom = 0
      this.options.margin.legendLeft = 0
      this.options.margin.legendRight = 0
      if (this.options.legendPosition === 'top') {
        this.options.margin.legendTop = legendSize.height
        this.legendArea.style('top', '0').style('bottom', 'unset')
      }
      if (this.options.legendPosition === 'bottom') {
        this.options.margin.legendBottom = legendSize.height
        this.legendArea.style('top', 'unset').style('bottom', '0')
      }
      if (this.options.legendPosition === 'left') {
        this.options.margin.legendLeft = legendSize.width
        this.legendArea.style('left', '0').style('right', 'unset').style('top', '0')
      }
      if (this.options.legendPosition === 'right') {
        this.options.margin.legendRight = legendSize.width
        this.legendArea.style('left', 'unset').style('right', '0').style('top', '0')
      }
    } 
    this.svg
      .attr('width', this.width - this.options.margin.legendLeft - this.options.margin.legendRight)
      .attr('height', this.height - this.options.margin.legendTop - this.options.margin.legendBottom)
      .attr('transform', `translate(${this.options.margin.legendLeft}, ${this.options.margin.legendTop})`)
    this.longestLeft = 0
    this.longestRight = 0
    this.longestBottom = 0
    if (this.options.data.bottom && this.options.data.bottom.data && typeof this.options.data.bottom.max === 'undefined') {
      // this.options.data.bottom.max = this.options.data.bottom.data.reduce((a, b) => a.length > b.value.length ? a : b.value, '')
      // this.options.data.bottom.min = this.options.data.bottom.data.reduce((a, b) => a.length < b.value.length ? a : b.value, this.options.data.bottom.max)      
      this.options.data.bottom.max = this.options.data.bottom.data[this.options.data.bottom.data.length - 1].value
      this.options.data.bottom.min = this.options.data.bottom.data[0].value
    }
    if (this.options.data.bottom && typeof this.options.data.bottom.max !== 'undefined') {
      this.longestBottom = this.options.data.bottom.max.toString()
      if (this.options.data.bottom.formatter) {
        this.longestBottom = this.options.data.bottom.formatter(this.options.data.bottom.max).toString()
      } 
    }
    if (this.options.data.left && this.options.data.left.data && this.options.data.left.max === 'undefined') {
      this.options.data.left.min = d3.min(this.options.data.left.data)
      this.options.data.left.max = d3.max(this.options.data.left.data)
    }    
    if (!this.options.data.left.max && this.options.data.left.data) {
      this.options.data.left.max = this.options.data.left.data.reduce((a, b) => a.length > b.value.length ? a : b.value, '')
    }
    if (!this.options.data.left.min && this.options.data.left.data) {
      this.options.data.left.min = this.options.data.left.data.reduce((a, b) => a.length < b.value.length ? a : b.value, this.options.data.left.max)
    }
    if (this.options.data.left && typeof this.options.data.left.max !== 'undefined') {
      this.longestLeft = this.options.data.left.max.toString()
      if (this.options.data.left.formatter) {
        this.longestLeft = this.options.data.left.formatter(this.options.data.left.max).toString()
      } 
    } 
    if (this.options.data.right && this.options.data.right.data && this.options.data.right.max === 'undefined') {
      this.options.data.right.min = d3.min(this.options.data.right.data)
      this.options.data.right.max = d3.max(this.options.data.right.data)
    }   
    if (this.options.data.right && typeof this.options.data.right.max !== 'undefined') {
      this.longestRight = this.options.data.right.max.toString()
      if (this.options.data.right.formatter) {
        this.longestRight = this.options.data.right.formatter(this.options.data.right.max).toString()
      }
    }    
    // establish the space needed for the various axes    
    // this.options.margin.axisLeft = this.longestLeft * ((this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize) * 0.7
    // this.options.margin.axisRight = this.longestRight * ((this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize) * 0.7
    // this.options.margin.axisBottom = ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) + 10
    let longestLeftBounds = WebsyUtils.measureText(this.longestLeft, 0, ((this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize))
    let longestRightBounds = WebsyUtils.measureText(this.longestRight, 0, ((this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize))
    let longestBottomBounds = WebsyUtils.measureText(this.longestBottom, ((this.options.data.bottom && this.options.data.bottom.rotate) || 0), ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize))
    this.options.margin.axisLeft = longestLeftBounds.width
    this.options.margin.axisRight = longestRightBounds.width
    this.options.margin.axisBottom = longestBottomBounds.height + 10
    this.options.margin.axisTop = 0       
    // adjust axis margins based on title options
    if (this.options.data.left && this.options.data.left.showTitle === true) {
      if (this.options.data.left.titlePosition === 1) {
        this.options.margin.axisLeft += (this.options.data.left.titleFontSize || 10) + 10
      }
      else {
        this.options.margin.axisTop += (this.options.data.left.titleFontSize || 10) + 10
      }
    }
    if (this.options.data.right && this.options.data.right.showTitle === true) {
      if (this.options.data.right.titlePosition === 1) {
        this.options.margin.axisRight += (this.options.data.right.titleFontSize || 10) + 10
      }
      else if (this.options.margin.axisTop === 0) {
        this.options.margin.axisTop += (this.options.data.right.titleFontSize || 10) + 10
      }
    }
    if (((this.options.data.bottom && this.options.data.bottom.rotate) || 0) === 0 && this.options.axis.hideBottom !== true) {
      this.options.margin.axisLeft = Math.max(this.options.margin.axisLeft, longestBottomBounds.width / 2)
    }
    else if (((this.options.data.bottom && this.options.data.bottom.rotate) || 0) < 0 && this.options.axis.hideBottom !== true) {
      this.options.margin.axisLeft = Math.max(this.options.margin.axisLeft, longestBottomBounds.width)
    }
    else if (((this.options.data.bottom && this.options.data.bottom.rotate) || 0) > 0 && this.options.axis.hideBottom !== true) {
      this.options.margin.axisRight = Math.max(this.options.margin.axisRight, longestBottomBounds.width)
    }        
    // if (this.options.data.bottom.rotate) {
    //   // this.options.margin.bottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)   
    //   this.options.margin.axisBottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) * 0.4
    //   // this.options.margin.bottom = this.options.margin.bottom * (1 + this.options.data.bottom.rotate / 100)
    // }  
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
    // Define the plot size
    this.plotWidth = this.width - this.options.margin.legendLeft - this.options.margin.legendRight - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight
    this.plotHeight = this.height - this.options.margin.legendTop - this.options.margin.legendBottom - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom - this.options.margin.axisTop
    // Translate the layers
    this.leftAxisLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
      .style('font-size', (this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize)
    this.rightAxisLayer
      .attr('transform', `translate(${this.options.margin.left + this.plotWidth + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
      .style('font-size', (this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize)
    this.bottomAxisLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop + this.plotHeight})`)
      .style('font-size', (this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)
    this.leftAxisLabel
      .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.rightAxisLabel
      .attr('transform', `translate(${this.options.margin.left + this.plotWidth + this.options.margin.axisLeft + this.options.margin.axisRight}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.bottomAxisLabel
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop + this.plotHeight})`)
    this.plotArea
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.areaLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.lineLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.barLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.labelLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.symbolLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.trackingLineLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)         
    this.eventLayer
      .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)         
    let that = this
    this.eventLayer      
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.plotWidth)
      .attr('height', this.plotHeight)
      .attr('fill-opacity', '0')
    // this.tooltip.transform(this.options.margin.left + this.options.margin.axisLeft, this.options.margin.top + this.options.margin.axisTop)
    // Configure the bottom axis
    let bottomDomain = this.createDomain('bottom')    
    this.bottomAxis = d3[`scale${this.options.data.bottom.scale || 'Band'}`]()
      .domain(bottomDomain)
      .range([0, this.plotWidth])      
    if (this.bottomAxis.nice) {
      // this.bottomAxis.nice()
    }    
    if (this.bottomAxis.padding && this.options.data.bottom.padding) {
      this.bottomAxis.padding(this.options.data.bottom.padding || 0)   
    }
    if (this.options.margin.axisBottom > 0) {
      let timeFormatPattern = ''
      let tickDefinition         
      if (this.options.data.bottom.data) {
        if (this.options.data.bottom.scale === 'Time') {
          let diff = this.options.data.bottom.max.getTime() - this.options.data.bottom.min.getTime()          
          let oneDay = 1000 * 60 * 60 * 24
          if (diff < (oneDay / 24 / 6)) {
            tickDefinition = d3.timeSecond.every(15) 
            timeFormatPattern = '%H:%M:%S'
          }
          else if (diff < (oneDay / 24)) {
            tickDefinition = d3.timeMinute.every(1) 
            timeFormatPattern = '%H:%M'
          }
          else if (diff < (oneDay / 6)) {
            tickDefinition = d3.timeMinute.every(10) 
            timeFormatPattern = '%H:%M'
          }
          else if (diff < (oneDay / 2)) {
            tickDefinition = d3.timeMinute.every(30)
            timeFormatPattern = '%H:%M' 
          }
          else if (diff < oneDay) {
            tickDefinition = d3.timeHour.every(1) 
            timeFormatPattern = '%H:%M'
          }
          else if (diff < 7 * oneDay) {
            tickDefinition = d3.timeDay.every(1) 
            timeFormatPattern = '%d %b @ %H:%M'
          }
          else if (diff < 14 * oneDay) {
            tickDefinition = d3.timeDay.every(2) 
            timeFormatPattern = '%d %b %Y'
          }
          else if (diff < 21 * oneDay) {
            tickDefinition = d3.timeDay.every(3) 
            timeFormatPattern = '%d %b %Y'
          }
          else if (diff < 28 * oneDay) {
            tickDefinition = d3.timeDay.every(4) 
            timeFormatPattern = '%d %b %Y'
          }
          else if (diff < 60 * oneDay) {
            tickDefinition = d3.timeDay.every(7) 
            timeFormatPattern = '%d %b %Y'
          }
          else {
            tickDefinition = d3.timeMonth.every(1) 
            timeFormatPattern = '%b %Y'
          }
        }
        else {
          tickDefinition = this.options.data.bottom.ticks || Math.min(this.options.data.bottom.data.length, 5)
        }
      }
      else {
        tickDefinition = this.options.data.bottom.ticks || 5
      }  
      this.options.calculatedTimeFormatPattern = timeFormatPattern
      let bAxisFunc = d3.axisBottom(this.bottomAxis)
        // .ticks(this.options.data.bottom.ticks || Math.min(this.options.data.bottom.data.length, 5))
        .ticks(tickDefinition)
      // console.log('tickDefinition', tickDefinition)
      // console.log(bAxisFunc)
      if (this.options.data.bottom.formatter) {
        bAxisFunc.tickFormat(d => this.options.data.bottom.formatter(d))        
      }
      this.bottomAxisLayer.call(bAxisFunc)
      // console.log(this.bottomAxisLayer.ticks)
      if (this.options.data.bottom.rotate) {
        this.bottomAxisLayer.selectAll('text')
          .attr('transform', `rotate(${((this.options.data.bottom && this.options.data.bottom.rotate) || 0)})`)
          .style('text-anchor', `${((this.options.data.bottom && this.options.data.bottom.rotate) || 0) === 0 ? 'middle' : 'end'}`)
          .style('transform-origin', ((this.options.data.bottom && this.options.data.bottom.rotate) || 0) === 0 ? '0 0' : `0 ${((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)}px`)
      } 
    }  
    // Configure the left axis
    let leftDomain = this.createDomain('left') 
    let rightDomain = this.createDomain('right')       
    this.leftAxis = d3[`scale${this.options.data.left.scale || 'Linear'}`]()
      .domain(leftDomain)
      .range([this.plotHeight, 0])
    if (this.leftAxis.padding && this.options.data.left.padding) {
      this.leftAxis.padding(this.options.data.left.padding || 0)   
    }
    if (this.leftAxis.nice) {
      this.leftAxis.nice()
    }    
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
    if (this.options.data.left && this.options.data.left.showTitle === true) {
      this.leftAxisLabel.selectAll('.title').remove()
      this.leftAxisLabel.selectAll('.dot').remove()
      if (this.options.data.left.titlePosition === 1) {
        // put the title vertically on the left
        let t = this.leftAxisLabel
          .append('text')
          .attr('class', 'title')
          .attr('x', (1 - this.plotHeight / 2))
          .attr('y', 5)
          .attr('font-size', this.options.data.left.titleFontSize || 10)
          .attr('fill', this.options.data.left.titleColor || '#888888')
          .attr('text-anchor', 'middle')
          .style('transform', 'rotate(-90deg)')
          .text(this.options.data.left.title || '')
        if (rightDomain.length > 0) {
          // we have 2 axis so we can treat the title like a legend
          this.leftAxisLabel
            .append('circle')
            .attr('class', 'dot')         
            .style('fill', this.options.data.left.color || 'transparent')
            .attr('r', (this.options.data.left.titleFontSize && this.options.data.left.titleFontSize / 2) || 5)
            .attr('cx', 3)
            .attr('cy', (this.plotHeight / 2) - (t.node().getBBox().width / 2) - 15)
        }
      }
      else {
        // put the title horizontally on the top
        this.leftAxisLabel
          .append('text')
          .attr('class', 'title')
          .attr('x', 0)
          .attr('y', 5)
          .attr('font-size', this.options.data.left.titleFontSize || 10)
          .attr('fill', this.options.data.left.titleColor || '#888888')
          .attr('text-anchor', 'left')          
          .text(this.options.data.left.title || '')
      }
    }
    // Configure the right axis    
    if (rightDomain.length > 0) {
      this.rightAxis = d3[`scale${this.options.data.right.scale || 'Linear'}`]()
        .domain(rightDomain)
        .range([this.plotHeight, 0])
      if (this.rightAxis.nice) {
        this.rightAxis.nice()
      }
      console.log('axis right', this.options.margin.axisRight)
      if (this.options.margin.axisRight > 0 && (this.options.data.right.min !== 0 || this.options.data.right.max !== 0)) {
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
    if (this.options.data.right && this.options.data.right.showTitle === true) {
      this.rightAxisLabel.selectAll('.title').remove()
      if (this.options.data.right.titlePosition === 1) {
        // put the title vertically on the left
        let t = this.rightAxisLabel
          .append('text')
          .attr('class', 'title')
          .attr('x', this.plotHeight / 2)
          .attr('y', 5)
          .attr('font-size', this.options.data.right.titleFontSize || 10)
          .attr('fill', this.options.data.right.titleColor || '#888888')
          .attr('text-anchor', 'middle')
          .style('transform', 'rotate(90deg)')
          .text(this.options.data.right.title || '')
        if (rightDomain.length > 0) {
          // we have 2 axis so we can treat the title like a legend
          this.rightAxisLabel
            .append('circle')
            .attr('class', 'dot')         
            .style('fill', this.options.data.right.color || 'transparent')
            .attr('r', (this.options.data.right.titleFontSize && this.options.data.right.titleFontSize / 2) || 5)
            .attr('cx', -2)
            .attr('cy', (this.plotHeight / 2) - (t.node().getBBox().width / 2) - 15)
        }
      }
      else {
        // put the title horizontally on the top
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
      this.renderLabels(series, index)
    })
  }  
}
