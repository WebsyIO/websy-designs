// this.labelPaper.pen.translate(this.center.x, this.center.y)
if (this.options.showLabels) {  
  for (let s in this.data.segments) {
    this.labelPaper.pen.beginPath()
    this.labelPaper.pen.font = '20px arial'
    this.labelPaper.pen.textAlign = 'center'
    this.labelPaper.pen.textBaseline = 'text-bottom'
    this.labelPaper.pen.fillStyle = 'black'
    // calculate the nearest 90 degrees to the mid point and reduce to within 360 degrees
    let midAngleDeg = this.data.segments[s].midAngleDeg % 360
    let nearest90Deg = (Math.round(midAngleDeg / 90) * 90) % 360
    console.log(Math.abs(nearest90Deg - midAngleDeg))
    let missingAngleDeg = 270 - (Math.abs(nearest90Deg - midAngleDeg))
    console.log(nearest90Deg)
    let oppLength = (this.outerRadius * Math.sin(this.convertDegreesToRadians(Math.abs(nearest90Deg - midAngleDeg)))) / Math.sin(this.convertDegreesToRadians(missingAngleDeg))
    oppLength = Math.abs(oppLength)
    let moveLength = this.outerRadius + 5
    let slopeMultiplier = 1.2
    let flatMultiplier = 1.3
    if (midAngleDeg > 0 && midAngleDeg <= 45) {
      this.labelPaper.pen.moveTo(this.center.x + moveLength, this.center.y + oppLength)
      this.labelPaper.pen.lineTo(this.center.x + (moveLength * slopeMultiplier), this.center.y + (oppLength * slopeMultiplier))
      this.labelPaper.pen.lineTo(this.center.x + (moveLength * flatMultiplier), this.center.y + (oppLength * slopeMultiplier))
    }
    else if (midAngleDeg > 45 && midAngleDeg <= 90) {
      this.labelPaper.pen.moveTo(this.center.x + oppLength, this.center.y + moveLength)
      this.labelPaper.pen.lineTo(this.center.x + (oppLength * slopeMultiplier), this.center.y + (moveLength * slopeMultiplier))
      this.labelPaper.pen.lineTo(this.center.x + (oppLength * flatMultiplier), this.center.y + (moveLength * slopeMultiplier))
    }
    else if (midAngleDeg > 90 && midAngleDeg <= 135) {
      this.labelPaper.pen.moveTo(this.center.x - oppLength, this.center.y + moveLength)
      this.labelPaper.pen.lineTo(this.center.x - (oppLength * slopeMultiplier), this.center.y + (moveLength * slopeMultiplier))
      this.labelPaper.pen.lineTo(this.center.x - (oppLength * flatMultiplier), this.center.y + (moveLength * slopeMultiplier))
    }
    else if (midAngleDeg > 135 && midAngleDeg <= 180) {
      this.labelPaper.pen.moveTo(this.center.x - moveLength, this.center.y + oppLength)
      this.labelPaper.pen.lineTo(this.center.x - (moveLength * slopeMultiplier), this.center.y + (oppLength * slopeMultiplier))
      this.labelPaper.pen.lineTo(this.center.x - (moveLength * flatMultiplier), this.center.y + (oppLength * slopeMultiplier))
    }
    else if (midAngleDeg > 180 && midAngleDeg <= 225) {
      this.labelPaper.pen.moveTo(this.center.x - moveLength, this.center.y - oppLength)
      this.labelPaper.pen.lineTo(this.center.x - (moveLength * slopeMultiplier), this.center.y - (oppLength * slopeMultiplier))
      this.labelPaper.pen.lineTo(this.center.x - (moveLength * flatMultiplier), this.center.y - (oppLength * slopeMultiplier))
    }
    else if (midAngleDeg > 225 && midAngleDeg <= 270) {
      this.labelPaper.pen.moveTo(this.center.x - oppLength, this.center.y - moveLength)
      this.labelPaper.pen.lineTo(this.center.x - (oppLength * slopeMultiplier), this.center.y - (moveLength * slopeMultiplier))
      this.labelPaper.pen.lineTo(this.center.x - (oppLength * flatMultiplier), this.center.y - (moveLength * slopeMultiplier))
    }
    else if (midAngleDeg > 270 && midAngleDeg <= 315) {
      this.labelPaper.pen.moveTo(this.center.x + oppLength, this.center.y - moveLength)
      this.labelPaper.pen.lineTo(this.center.x + (oppLength * slopeMultiplier), this.center.y - (moveLength * slopeMultiplier))
      this.labelPaper.pen.lineTo(this.center.x + (oppLength * flatMultiplier), this.center.y - (moveLength * slopeMultiplier))
    }
    else {
      this.labelPaper.pen.moveTo(this.center.x + moveLength, this.center.y - oppLength)
      this.labelPaper.pen.lineTo(this.center.x + (moveLength * slopeMultiplier), this.center.y - (oppLength * slopeMultiplier))
      this.labelPaper.pen.lineTo(this.center.x + (moveLength * flatMultiplier), this.center.y - (oppLength * slopeMultiplier))
    }
    this.labelPaper.pen.strokeStyle = '#cccccc'
    this.labelPaper.pen.stroke()

    this.labelPaper.pen.fillText(this.center.x + this.data.segments[s].label.x, this.center.y + this.data.segments[s].label.y, s)
    this.labelPaper.pen.closePath()
  }
}
