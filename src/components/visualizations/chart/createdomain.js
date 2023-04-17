/* global d3 side domain:writable forBrush */ 
// if we have a brushed domain we use that
let xAxis = 'bottom'
if (this.options.orientation === 'horizontal') {
  xAxis = 'left'
}
if (this.brushedDomain.length > 0 && side === xAxis && forBrush === false) {
  domain = [...this.brushedDomain]    
}
else {
  // otherwise we create the domain
  if (typeof this.options.data[side].min !== 'undefined' && typeof this.options.data[side].max !== 'undefined') {
    // domain = [this.options.data[side].min - (this.options.data[side].min * 0.1), this.options.data[side].max * 1.1]
    domain = [this.options.data[side].min, this.options.data[side].max]
    if (this.options.forceZero === true) {
      domain = [Math.min(0, this.options.data[side].min), this.options.data[side].max]
    }
  }
  if (this.options.data[side].data) {
    domain = this.options.data[side].data.map(d => d.value)  
  }
  if (this.options.data[side].scale === 'Time') {
    let min = this.options.data[side].data[0].value
    let max = this.options.data[side].data[this.options.data[side].data.length - 1].value
    min = this.parseX(min)
    max = this.parseX(max)
    domain = [min, max]
  }
}
