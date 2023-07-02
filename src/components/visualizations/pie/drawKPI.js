let kpiStyleDefaults = this.options.kpi
if (this.kpi) {
  // draw the circle for the background colour if one has been specified
  if (!this.kpi.background || this.kpi.background !== 'transparent') {
    this.kpiPaper.pen.beginPath()
    this.kpiPaper.pen.fillStyle = this.kpi.background || kpiStyleDefaults.background
    this.kpiPaper.pen.moveTo(this.center.x, this.center.y)
    this.kpiPaper.pen.arc(this.center.x, this.center.y, this.innerRadiusPixels + (5 * !this.addShading) + 1, 0, Math.PI * 2)
    this.kpiPaper.pen.fill()
    this.kpiPaper.pen.closePath()
  }
  // draw the kpi value
  if (this.kpi.value) {
    this.kpiPaper.pen.save()
    this.kpiPaper.pen.beginPath()
    this.kpiPaper.pen.moveTo(this.center.x, this.center.y)
    this.kpiPaper.pen.font = (this.kpi.value.weight || kpiStyleDefaults.value.weight) + ' ' + (this.kpi.value.size || kpiStyleDefaults.value.size) + ' ' + (this.kpi.value.family || kpiStyleDefaults.value.family)
    this.kpiPaper.pen.textAlign = 'center'
    if (this.kpi.label) {
      this.kpiPaper.pen.textBaseline = 'text-bottom'
    }
    else {
      this.kpiPaper.pen.textBaseline = 'middle'
    }
    this.kpiPaper.pen.fillStyle = this.kpi.value.colour || kpiStyleDefaults.value.colour
    this.kpiPaper.pen.fillText(this.kpi.value.text, this.center.x, this.center.y)
    this.kpiPaper.pen.closePath()
    this.kpiPaper.pen.restore()
  }
  // draw the kpi label
  if (this.kpi.label) {
    this.kpiPaper.pen.save()
    this.kpiPaper.pen.beginPath()
    this.kpiPaper.pen.moveTo(this.center.x, this.center.y)
    this.kpiPaper.pen.font = (this.kpi.label.weight || kpiStyleDefaults.label.weight) + ' ' + (this.kpi.label.size || kpiStyleDefaults.label.size) + ' ' + (this.kpi.label.family || kpiStyleDefaults.label.family)
    this.kpiPaper.pen.textAlign = 'center'
    if (this.kpi.value) {
      this.kpiPaper.pen.textBaseline = 'top'
    }
    else {
      this.kpiPaper.pen.textBaseline = 'middle'
    }
    this.kpiPaper.pen.fillStyle = this.kpi.label.colour || kpiStyleDefaults.label.colour
    this.kpiPaper.pen.fillText(this.kpi.label.text, this.center.x, this.center.y + 10)
    this.kpiPaper.pen.closePath()
    this.kpiPaper.pen.restore()
  }
}
