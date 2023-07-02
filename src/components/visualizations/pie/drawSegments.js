let originalStartPoint = this.convertDegreesToRadians(270)
let startPoint = originalStartPoint
let colourIndex = 0
for (let s in this.data.segments) {
  if (colourIndex >= this.options.colors.length) {
    colourIndex = 0
  }
  let segmentColour = this.options.colors[colourIndex]
  let endPoint = startPoint + this.data.segments[s].circumference
  let midAngle = (startPoint + endPoint) / 2

  this.data.segments[s].labelCanvasRotation = startPoint
  this.data.segments[s].startAngle = startPoint
  this.data.segments[s].midAngle = midAngle
  this.data.segments[s].endAngle = endPoint
  this.data.segments[s].startAngleDeg = this.convertRadiansToDegrees(startPoint)
  this.data.segments[s].midAngleDeg = this.convertRadiansToDegrees(midAngle)
  this.data.segments[s].endAngleDeg = this.convertRadiansToDegrees(endPoint)
  this.segmentPaper.pen.beginPath()
  this.segmentPaper.pen.moveTo(this.center.x, this.center.y)
  this.segmentPaper.pen.fillStyle = segmentColour
  this.segmentPaper.pen.arc(this.center.x, this.center.y, this.outerRadius, startPoint, endPoint)
  console.log(this.segmentPaper.pen)
  this.segmentPaper.pen.fill()
  this.segmentPaper.pen.closePath()
  startPoint = endPoint
  colourIndex++
}
// cut out the center of the pie if an inner radius has been set
if (this.innerRadius && this.innerRadius !== 0) {
  // inner radius is a percentage so we compare it against outerRadius (px) to calculate the pixel value
  this.innerRadiusPixels = Math.round(this.outerRadius * (this.innerRadius / 100))
  this.segmentPaper.pen.save()
  this.segmentPaper.pen.beginPath()
  this.segmentPaper.pen.moveTo(this.center.x, this.center.y)
  this.segmentPaper.pen.arc(this.center.x, this.center.y, (this.innerRadiusPixels + 5), 0, Math.PI * 2)
  this.segmentPaper.pen.clip()
  this.segmentPaper.pen.clearRect(0, 0, this.width * 2, this.height * 2)
  this.segmentPaper.pen.closePath()
  this.segmentPaper.pen.restore()

  // add shading if required
  if (this.addShading === true) {
    startPoint = originalStartPoint
    colourIndex = 0
    for (let s in this.data.segments) {
      if (colourIndex >= this.options.colors.length) {
        colourIndex = 0
      }
      let segmentColour = this.hexToRGBA(this.options.colors[colourIndex], 0.8)
      let endPoint = startPoint + this.data.segments[s].circumference
      this.segmentPaper.pen.beginPath()
      this.segmentPaper.pen.moveTo(this.center.x, this.center.y)
      this.segmentPaper.pen.fillStyle = segmentColour
      this.segmentPaper.pen.arc(this.center.x, this.center.y, (this.innerRadiusPixels + 6), startPoint, endPoint)
      this.segmentPaper.pen.fill()
      this.segmentPaper.pen.closePath()
      startPoint = endPoint
      colourIndex++
    }
    // cut out the center again
    this.segmentPaper.pen.save()
    this.segmentPaper.pen.beginPath()
    this.segmentPaper.pen.moveTo(this.center.x, this.center.y)
    this.segmentPaper.pen.arc(this.center.x, this.center.y, this.innerRadiusPixels, 0, Math.PI * 2)
    this.segmentPaper.pen.clip()
    this.segmentPaper.pen.clearRect(0, 0, this.width * 2, this.height * 2)
    this.segmentPaper.pen.closePath()
    this.segmentPaper.pen.restore()
  }
}
console.log(this.data)
