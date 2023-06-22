/* global d3 options WebsyUtils */ 
if (typeof options !== 'undefined') {
  this.options = Object.assign({}, this.options, options)
  if (this.options.legendOptions) {
    this.legend.setOptions(this.options.legendOptions)
  }
}
if (!this.options.data) {
  // tell the user no data has been provided
}
else {
  this.processedX = {}
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
    this.leftAxisLayer && this.leftAxisLayer.attr('class', 'y-axis')
    this.rightAxisLayer && this.rightAxisLayer.attr('class', 'y-axis')
    this.bottomAxisLayer && this.bottomAxisLayer.attr('class', 'x-axis')
  }
  else {
    this.leftAxisLayer && this.leftAxisLayer.attr('class', 'x-axis')
    this.rightAxisLayer && this.rightAxisLayer.attr('class', 'x-axis')
    this.bottomAxisLayer && this.bottomAxisLayer.attr('class', 'y-axis')
  }
  const el = document.getElementById(this.elementId)
  if (el) {
    this.width = el.clientWidth
    this.height = el.clientHeight
    // establish the space and size for the legend
    // the legend gets rendered so that we can get its actual size
    if (this.options.showLegend === true) {
      let legendData = []
      if (this.options.legendData && this.options.legendData.length > 0) {
        legendData = this.options.legendData
      }
      else {
        this.options.data.series.map((s, i) => ({value: s.label || s.key, color: s.color || this.options.colors[i % this.options.colors.length]})) 
      }      
      if (this.options.legendPosition === 'top' || this.options.legendPosition === 'bottom') {
        this.legendArea.style('width', '100%')
        if (this.legend.options.maxSize) {
          this.legendArea.style('height', `${this.legend.options.maxSize}px`)
        }
        this.legend.options.align = 'center'
      }
      if (this.options.legendPosition === 'left' || this.options.legendPosition === 'right') {
        let longestLegendValue = legendData.reduce((a, b) => a.length > (b.value || '').length ? a : b.value, '')
        this.legend.options.align = 'left'
        this.legendArea.style('height', '100%')
        this.legendArea.style('width', this.legend.testWidth(longestLegendValue) + 'px')
        if (this.legend.options.maxSize) {
          this.legendArea.style('width', `${this.legend.options.maxSize}px`)
        }
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
    let firstBottom = ''
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
        if (this.options.data.bottom.data && this.options.data.bottom.data[0] && this.options.data.bottom.data[0].value) {
          firstBottom = this.options.data.bottom.formatter(this.options.data.bottom.data[0].value).toString()
        }        
      }
      else {
        if (this.options.data.bottom.scale === 'Time') {
          this.longestBottom = '01/01/2000'
          firstBottom = '01/01/2000'
        }        
        else {
          this.longestBottom = this.options.data.bottom.data.reduce((a, b) => a.length > b.value.length ? a : b.value, '')
          // firstBottom = (this.options.data.bottom.data[0] || [{value: ''}]).value
          if (this.options.data.bottom.data && this.options.data.bottom.data[0] && this.options.data.bottom.data[0].value) {
            firstBottom = this.options.data.bottom.data[0].value
          }
        }
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
    // Check to see if we need to balance the min and max values
    if (this.options.balancedMinMax) {
      if (this.options.orientation === 'horizontal') {
        let biggestBottom = Math.max(Math.abs(this.options.data.bottom.min, this.options.data.bottom.max))
        this.options.data.bottom.min = 1 - biggestBottom
        this.options.data.bottom.max = biggestBottom
      }
      else {
        let biggestLeft = Math.max(Math.abs(this.options.data.left.min, this.options.data.left.max))
        this.options.data.left.min = 1 - biggestLeft
        this.options.data.left.max = biggestLeft
        let biggestRight = Math.max(Math.abs(this.options.data.right.min, this.options.data.right.max))
        this.options.data.right.min = 1 - biggestRight
        this.options.data.right.max = biggestRight
      }
    }    
    // establish the space needed for the various axes    
    // this.options.margin.axisLeft = this.longestLeft * ((this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize) * 0.7
    // this.options.margin.axisRight = this.longestRight * ((this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize) * 0.7
    // this.options.margin.axisBottom = ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) + 10
    let longestLeftBounds = WebsyUtils.measureText(this.longestLeft, 0, ((this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize))
    let longestRightBounds = WebsyUtils.measureText(this.longestRight, 0, ((this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize))
    let longestBottomBounds = WebsyUtils.measureText(this.longestBottom, ((this.options.data.bottom && this.options.data.bottom.rotate) || 0), ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize))
    let firstBottomWidth = 0    
    if (this.options.orientation === 'vertical') {
      firstBottomWidth = WebsyUtils.measureText(firstBottom, ((this.options.data.bottom && this.options.data.bottom.rotate) || 0), ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)).width
      if (Math.abs((this.options.data.bottom && this.options.data.bottom.rotate) || 0) !== 90) {
        firstBottomWidth = firstBottomWidth / 2
      }
      else if (Math.abs((this.options.data.bottom && this.options.data.bottom.rotate) || 0) === 90) {
        firstBottomWidth = 0
      }      
      if (this.options.data.bottom.scale !== 'Time') {
        firstBottom = Math.max(0, firstBottomWidth)
      }      
    }
    this.options.margin.axisLeft = Math.max(longestLeftBounds.width, firstBottomWidth) + 5 // + 5 to accommodate for space between text and axis line
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
      this.options.margin.axisLeft = Math.max(this.options.margin.axisLeft, firstBottomWidth / 2)
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
    // At some point before this we need to add in logic to make space for any data point labels
    // Define the plot size
    this.plotWidth = this.width - this.options.margin.legendLeft - this.options.margin.legendRight - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight
    this.plotHeight = this.height - this.options.margin.legendTop - this.options.margin.legendBottom - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom - this.options.margin.axisTop
    this.brushNeeded = false
    let proposedBandWidth // distance between x axis data points.    
    let maxBandWidthFits = false
    // Check to see if all bars at the max allowed width will fit
    this.bandPadding = 0
    this.totalBandPadding = 0
    this.brushBandPadding = 0
    this.totalBrushBandPadding = 0
    let noOfPoints = 0
    let noOfGroups = 0
    let plotable = 0
    if (this.options.maxBandWidth) {                  
      if (this.options.orientation === 'horizontal') {
        this.options.data.left.totalValueCount = this.options.data.left.data.reduce((a, b) => {
          if (typeof b.valueCount === 'undefined') {
            return a + 1
          }
          return a + b.valueCount
        }, 0)
        if (this.options.data.left.padding) {
          this.totalBandPadding = (this.plotHeight * this.options.data.left.padding)
          this.bandPadding = this.totalBandPadding / this.options.data.left.data.length
          this.totalBrushBandPadding = (this.plotHeight * this.options.data.left.padding)
          this.brushBandPadding = this.totalBandPadding / this.options.data.left.data.length
        }
        plotable = this.plotHeight - this.totalBandPadding   
        noOfPoints = this.options.grouping === 'grouped' && this.options.allowUnevenBands === true ? this.options.data.left.totalValueCount : this.options.data.left.data.length
        noOfGroups = this.options.data.left.data.length
      }
      else {
        this.options.data.bottom.totalValueCount = this.options.data.bottom.data.reduce((a, b) => {
          if (typeof b.valueCount === 'undefined') {
            return a + 1
          }
          return a + b.valueCount
        }, 0)
        if (this.options.data.bottom.padding) {
          this.totalBandPadding = (this.plotWidth * this.options.data.bottom.padding)
          this.bandPadding = this.totalBandPadding / this.options.data.bottom.data.length
          this.totalBrushBandPadding = (this.plotWidth * this.options.data.bottom.padding)
          this.brushBandPadding = this.totalBandPadding / this.options.data.bottom.data.length
        }
        plotable = this.plotWidth - this.totalBandPadding   
        noOfPoints = this.options.grouping === 'grouped' && this.options.allowUnevenBands === true ? this.options.data.bottom.totalValueCount : this.options.data.bottom.data.length
        noOfGroups = this.options.data.bottom.data.length
      }      
      if (plotable / noOfPoints > this.options.maxBandWidth) {
        maxBandWidthFits = true
        proposedBandWidth = this.options.maxBandWidth
      }
      if (!maxBandWidthFits) {
        // Check to see if all bars at the min allowed width will fit
        if (plotable / noOfPoints < this.options.minBandWidth) {
          this.brushNeeded = true
          proposedBandWidth = this.options.minBandWidth
          if (this.options.orientation === 'horizontal') {
            this.plotWidth -= this.options.brushHeight
          }
          else {
            this.plotHeight -= this.options.brushHeight
          }
        }
        else {
          proposedBandWidth = plotable / noOfPoints
        }
      } 
    }       
    // if (this.options.minBandWidth) {
    //   this.widthForCalc = this.options.data.bottom.totalValueCount * this.options.minBandWidth
    //   if (this.options.data.bottom.padding) {
    //     this.widthForCalc += (this.options.minBandWidth * this.options.data.bottom.padding) * this.options.data.bottom.totalValueCount
    //     this.widthForCalc += (this.options.data.bottom.data.length * this.options.groupPadding * 2)
    //   }
    // }
    // if (this.options.orientation === 'vertical') {
    //   this.options.data.bottom.totalValueCount = this.options.data.bottom.data.reduce((a, b) => {
    //     if (typeof b.valueCount === 'undefined') {
    //       return a + 1
    //     }
    //     return a + b.valueCount
    //   }, 0)
    //   if (this.options.maxBandWidth) {                  
    //     this.plotWidth = Math.min(this.plotWidth, (this.options.data.bottom.totalValueCount) * this.options.maxBandWidth)
    //   }      
    //   // some if to check if brushing is needed
    //   if (this.plotWidth / this.options.data.bottom.totalValueCount < this.options.minBandWidth) {
    //     this.brushNeeded = true
    //     this.plotHeight -= this.options.brushHeight
    //   }
    // }
    // else {
    //   // some if to check if brushing is needed
    //   this.options.data.left.totalValueCount = this.options.data.left.data.reduce((a, b) => {
    //     if (typeof b.valueCount === 'undefined') {
    //       return a + 1
    //     }
    //     return a + b.valueCount
    //   }, 0)
    //   if (this.plotHeight / this.options.data.left.totalValueCount < this.options.minBandWidth) {
    //     this.brushNeeded = true
    //     this.plotWidth -= this.options.brushHeight
    //   }
    // }    
    // Translate the layers
    const leftBrushAdjustment = this.brushNeeded === true ? this.options.brushHeight : 0
    this.leftAxisLayer
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
      .style('font-size', (this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize)
    this.rightAxisLayer
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left + this.plotWidth + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
      .style('font-size', (this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize)
    this.bottomAxisLayer
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop + this.plotHeight})`)
      .style('font-size', (this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)
    this.leftAxisLabel
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.rightAxisLabel
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left + this.plotWidth + this.options.margin.axisLeft + this.options.margin.axisRight}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.bottomAxisLabel
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop + this.plotHeight})`)
    this.plotArea
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.areaLayer
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.lineLayer
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.barLayer
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.labelLayer
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.symbolLayer
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.refLineLayer
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)
    this.trackingLineLayer
      .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop})`)         
    this.clip
      .attr('transform', `translate(${(leftBrushAdjustment) + this.options.margin.left + this.options.margin.axisLeft}, 0)`)
      .attr('width', this.plotWidth)
      .attr('height', this.plotHeight + this.options.margin.top + this.options.margin.axisTop)   
    if (this.options.orientation === 'horizontal') {
      this.brushLayer
        .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top + this.options.margin.axisTop})`)
      this.yAxisClip
        .attr('transform', `translate(${leftBrushAdjustment + this.options.margin.left}, ${this.options.margin.top + this.options.margin.axisTop})`)
        .attr('width', this.options.margin.axisLeft + 10)
        .attr('height', this.plotHeight)     
      this.xAxisClip
        .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top + this.options.margin.axisTop + this.plotHeight})`)
        .attr('width', this.plotWidth + this.options.margin.axisLeft + this.options.margin.axisRight)
        .attr('height', longestBottomBounds.height + 10)    
      this.brushClip
        .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top + this.options.margin.axisTop})`)               
        .attr('height', this.plotHeight)
        .attr('width', this.options.brushHeight)      
    }
    else {
      this.brushLayer
        .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop + this.plotHeight + longestBottomBounds.height})`)         
      this.yAxisClip
        .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top + this.options.margin.axisTop - 10})`)
        .attr('width', this.options.margin.axisLeft + 10)
        .attr('height', this.plotHeight + 20)
      this.xAxisClip
        .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top + this.options.margin.axisTop + this.plotHeight})`)
        .attr('width', this.plotWidth + this.options.margin.axisLeft + this.options.margin.axisRight)
        .attr('height', longestBottomBounds.height + 10)      
      this.brushClip
        .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.options.margin.axisTop + this.plotHeight + longestBottomBounds.height})`)               
        .attr('width', this.plotWidth)
        .attr('height', this.options.brushHeight)      
    }
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
    // let bottomBrushDomain = this.createDomain('bottom', true)
    let bottomBrushDomain = this.createDomain('bottom')
    let bottomRange = [0, this.plotWidth]
    let bottomBrushRange = [0, this.plotWidth] 
    let leftRange = [this.plotHeight, 0]
    let leftBrushRange = [this.options.brushHeight, 0]
    if (this.options.orientation === 'horizontal') {
      leftBrushRange = [this.plotHeight, 0]   
      bottomBrushRange = [0, this.options.brushHeight]
    } 
    this.widthForCalc = (proposedBandWidth * noOfPoints) // + totalPadding
    this.customBottomRange = []
    this.customBottomDetailRange = []
    this.customBottomBrushRange = []
    this.customLeftRange = []
    this.customLeftDetailRange = []
    this.customLeftBrushRange = []
    // if (this.options.allowUnevenBands === true) {
    // always allow uneven bands
    let customRangeSide = 'Bottom'
    let customRangeSideLC = 'bottom'
    if (this.options.orientation === 'horizontal') {
      customRangeSide = 'Left'
      customRangeSideLC = 'left'
    }
    if (this.options.data[customRangeSideLC].data && this.options.data[customRangeSideLC].data[0] && (this.options.data[customRangeSideLC].data[0].valueCount || 1) && this.options.data[customRangeSideLC].scale === 'Ordinal') {        
      let acc = 0
      this[`custom${customRangeSide}Range`] = [0, ...this.options.data[customRangeSideLC].data.map((d, index, arr) => {
        let adjustment = (this.bandPadding * index) + this.bandPadding
        // if (this.options.data.bottom.padding) {
        // adjustment = (this.widthForCalc * this.options.data.bottom.padding) / (arr.length * 2)
        // }
        let start = (this.widthForCalc / noOfPoints) * acc         
        for (let i = 0; i < (d.valueCount || 1); i++) {                    
          let pos = i * proposedBandWidth
          this[`custom${customRangeSide}DetailRange`].push(start + adjustment + pos)     
        }
        acc += (this.options.grouping !== 'stacked' && this.options.allowUnevenBands === true ? (d.valueCount || 1) : 1)
        let end = (this.widthForCalc / noOfPoints) * acc
        // this.customBottomBrushRange.push((end + adjustment) * (this.plotWidth / this.widthForCalc))
        return end + adjustment
      })]
      acc = 0
      this[`custom${customRangeSide}BrushRange`] = [0, ...this.options.data[customRangeSideLC].data.map((d, index, arr) => {
        let adjustment = (this.brushBandPadding * index) + this.brushBandPadding
        acc += (this.options.grouping !== 'stacked' && this.options.allowUnevenBands === true ? (d.valueCount || 1) : 1)
        return ((this.options.orientation === 'vertical' ? this.plotWidth : this.plotHeight) / noOfPoints) * acc
      })]
    }
    // }
    let rangeLength = bottomDomain.length
    this.options.data.bottomBrush = {}    
    this.options.data.leftBrush = {}  
    if (this.options.orientation === 'vertical') {
      this.options.data.bottom.bandWidth = proposedBandWidth    
      this.options.data.bottomBrush.bandWidth = (this.plotWidth - this.totalBandPadding) / noOfPoints
    } 
    else {
      this.options.data.left.bandWidth = proposedBandWidth    
      this.options.data.leftBrush.bandWidth = (this.plotHeight - this.totalBandPadding) / noOfPoints
    }   
    this.brushBandPadding = this.totalBandPadding / noOfGroups 
    if (this.options.orientation === 'vertical') {
      bottomRange = [0, (this.widthForCalc + this.totalBandPadding)]
    }
    else {       
      leftRange = [(this.widthForCalc + this.totalBandPadding), 0]
    }
    this.bottomAxis = d3[`scale${this.options.data.bottom.scale || 'Ordinal'}`]()
      .domain(bottomDomain)
      .range(bottomRange)  
    if (!this.brushInitialized) {    
      this.bottomBrushAxis = d3[`scale${this.options.data.bottom.scale || 'Ordinal'}`]()
        .domain(bottomBrushDomain)
        .range(bottomBrushRange)   
    }
    if (this.bottomAxis.nice) {
      // this.bottomAxis.nice()
    }    
    if (this.bottomAxis.padding && this.options.data.bottom.padding) {
      this.bottomAxis.padding(this.options.data.bottom.padding || 0)   
    }
    // BRUSH
    let brushMethod = `brushX`
    let brushLength = this.plotWidth
    let brushEnd = this.plotWidth    
    let brushThickness = this.options.brushHeight
    if (this.options.orientation === 'horizontal') {
      brushMethod = 'brushY'
      brushLength = this.options.brushHeight
      brushThickness = this.plotHeight
      if (this.brushNeeded) {        
        brushEnd = this.plotHeight * (this.plotHeight / (this.widthForCalc + this.totalBandPadding))
      }
    }    
    else {
      if (this.brushNeeded) {        
        brushEnd = this.plotWidth * (this.plotWidth / (this.widthForCalc + this.totalBandPadding))        
      }
    }
    this.brush = d3[brushMethod]()
      .extent([
        [0, 0],
        [brushLength, brushThickness]
      ])      
      .on('brush end', this.brushed) 
    // const brushResizePath = d => {
    //   let e = +(d.type === 'e')
    //   let x = e ? 1 : -1
    //   let y = this.options.brushHeight
    //   return (
    //     'M' +
    //     0.5 * x +
    //     ',' +
    //     y +
    //     'A6,6 0 0 ' +
    //     e +
    //     ' ' +
    //     6.5 * x +
    //     ',' +
    //     (y + 6) +
    //     'V' +
    //     (2 * y - 6) +
    //     'A6,6 0 0 ' +
    //     e +
    //     ' ' +
    //     0.5 * x +
    //     ',' +
    //     2 * y +
    //     'Z' +
    //     'M' +
    //     2.5 * x +
    //     ',' +
    //     (y + 8) +
    //     'V' +
    //     (2 * y - 8) +
    //     'M' +
    //     4.5 * x +
    //     ',' +
    //     (y + 8) +
    //     'V' +
    //     (2 * y - 8)
    //   )
    // }
    // this.brushHandle = this.brushLayer
    //   .select('.brush')
    //   .selectAll('.handle--custom')
    //   .remove()
    // this.brushHandle = this.brushLayer
    //   .select('.brush')
    //   .selectAll('.handle--custom')
    //   .data([{ type: 'w' }, { type: 'e' }])
    //   .enter()
    //   .append('path')
    //   .attr('class', 'handle--custom')
    //   .attr('stroke', 'transparent')
    //   .attr('fill', 'transparent')
    //   .attr('cursor', 'ew-resize')
    //   .attr('d', brushResizePath)
    // BRUSH END  
    // this.brushLayer.selectAll('.handle').remove()
    if (this.brushNeeded) {
      if (!this.brushInitialized) {
        this.brushLayer.style('visibility', 'visible')
        this.brushInitialized = true
        this.brushLayer
          .select('.brush')
          .call(this.brush)
          .call(this.brush.move, [0, brushEnd])          
      }
      else {
        this.brushLayer.style('visibility', 'visible')
      }
    }    
    else {
      this.brushLayer.style('visibility', 'hidden')
      // this.brushLayer.selectAll().remove()
      // this.brushArea.selectAll('*').remove()
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
      this.bAxisFunc = d3.axisBottom(this.bottomAxis)        
        .ticks(tickDefinition)      
      if (this.options.data.bottom.formatter) {
        this.bAxisFunc.tickFormat(d => this.options.data.bottom.formatter(d))        
      }
      this.bottomAxisLayer.call(this.bAxisFunc)
      // console.log(this.bottomAxisLayer.ticks)
      if (this.options.data.bottom.rotate) {
        this.bottomAxisLayer.selectAll('text')
          .attr('transform', `rotate(${((this.options.data.bottom && this.options.data.bottom.rotate) || 0)})`)
          .style('text-anchor', `${((this.options.data.bottom && this.options.data.bottom.rotate) || 0) === 0 ? 'middle' : 'end'}`)
          .style('transform-origin', ((this.options.data.bottom && this.options.data.bottom.rotate) || 0) === 0 ? '0 0' : `0 ${((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)}px`)
      } 
      if (this.customBottomRange.length > 0) {
        this.bottomAxisLayer.selectAll('g')
          .attr('transform', (d, i) => `translate(${this.customBottomRange[i] + ((this.customBottomRange[i + 1] - this.customBottomRange[i]) / 2)}, 0)`)
      }
    }  
    // Configure the left axis
    let leftDomain = this.createDomain('left')
    let leftBrushDomain = this.createDomain('left') 
    let rightDomain = this.createDomain('right')       
    this.leftAxis = d3[`scale${this.options.data.left.scale || 'Linear'}`]()
      .domain(leftDomain)
      .range(leftRange)
    this.leftBrushAxis = d3[`scale${this.options.data.left.scale || 'Linear'}`]()
      .domain(leftBrushDomain)
      .range(leftBrushRange)
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
      if (this.customLeftRange.length > 0) {
        this.leftAxisLayer.selectAll('g')
          .attr('transform', (d, i) => `translate(0, ${this.customLeftRange[i] + ((this.customLeftRange[i + 1] - this.customLeftRange[i]) / 2)})`)
      }     
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
          .attr('y', (this.options.data.left.titleFontSize || 10) / 2 + 2)
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
      if (this.options.margin.axisRight > 0 && (this.options.data.right.min !== 0 || this.options.data.right.max !== 0)) {
        this.rightAxisLayer.call(
          d3.axisRight(this.rightAxis)
            .ticks(this.options.data.right.ticks || 5)
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
    // Remove the unnecessary series
    let newKeys = this.options.data.series.map(s => s.key)
    for (const key in this.renderedKeys) {
      if (newKeys.indexOf(key) === -1) {
        // remove the components
        // this[`remove${this.renderedKeys[key]}`](key)
        this.removeline(key)
        this.removebar(key)
        this.removesymbol(key)
        this.removelabel(key)
      }
    }
    this.renderComponents()
  }  
}
