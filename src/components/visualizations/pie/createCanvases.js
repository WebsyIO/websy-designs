/* global element */ 
if (element && !element.target) {
  if (!this.listening) {
    // add event listeners to help with responsiveness
    element.addEventListener('resize', this.render.bind(this), false)
    window.addEventListener('resize', this.render.bind(this), false)
    this.listening = true
  }
  let height = element.clientHeight
  let width = element.clientWidth
  this.width = width
  this.height = height
  this.center = {
    x: (width / 2),
    y: (height / 2)
  }
  this.outerRadius = (Math.min(this.height, this.width) / 2) - 20
  console.log('radius is ' + this.outerRadius)
  // segment canvas
  const segmentCanvas = document.createElement('canvas')
  this.segmentPaper = {
    canvas: segmentCanvas,
    pen: segmentCanvas.getContext('2d')
  }
  this.segmentPaper.canvas.style.position = 'absolute'
  this.segmentPaper.canvas.style.top = '0px'
  this.segmentPaper.canvas.style.left = '0px'
  this.segmentPaper.canvas.style.zIndex = '5'
  this.segmentPaper.canvas.style.width = width + 'px'
  this.segmentPaper.canvas.style.height = height + 'px'
  // make the canvase size double to accommodate for retina displays
  this.segmentPaper.canvas.width = width * 2
  this.segmentPaper.canvas.height = height * 2
  this.segmentPaper.pen.scale(2, 2)
  element.appendChild(this.segmentPaper.canvas)

  // label canvas
  const labelCanvas = document.createElement('canvas')
  this.labelPaper = {
    canvas: labelCanvas,
    pen: labelCanvas.getContext('2d')
  }
  this.labelPaper.canvas.style.position = 'absolute'
  this.labelPaper.canvas.style.top = '0px'
  this.labelPaper.canvas.style.left = '0px'
  this.labelPaper.canvas.style.zIndex = '5'
  this.labelPaper.canvas.style.width = width + 'px'
  this.labelPaper.canvas.style.height = height + 'px'
  // make the canvase size double to accommodate for retina displays
  this.labelPaper.canvas.width = width * 2
  this.labelPaper.canvas.height = height * 2
  this.labelPaper.pen.scale(2, 2)
  element.appendChild(this.labelPaper.canvas)

  // kpi canvas
  const kpiCanvas = document.createElement('canvas')
  this.kpiPaper = {
    canvas: kpiCanvas,
    pen: kpiCanvas.getContext('2d')
  }
  this.kpiPaper.canvas.style.position = 'absolute'
  this.kpiPaper.canvas.style.top = '0px'
  this.kpiPaper.canvas.style.left = '0px'
  this.kpiPaper.canvas.style.zIndex = '5'
  this.kpiPaper.canvas.style.width = width + 'px'
  this.kpiPaper.canvas.style.height = height + 'px'
  // make the canvase size double to accommodate for retina displays
  this.kpiPaper.canvas.width = width * 2
  this.kpiPaper.canvas.height = height * 2
  this.kpiPaper.pen.scale(2, 2)
  element.appendChild(this.kpiPaper.canvas)
}
else {
  // clear the canvases
  this.segmentPaper.canvas.width = this.width * 2
  this.labelPaper.canvas.width = this.width * 2
  this.kpiPaper.canvas.width = this.width * 2
}
