// Draw the series data
this.renderedKeys = {}
this.options.data.series.forEach((series, index) => {
  if (!series.key) {
    series.key = this.createIdentity()
  }
  if (!series.color) {
    series.color = this.options.colors[index % this.options.colors.length]
  }
  this[`render${series.type || 'bar'}`](series, index)
  this.renderLabels(series, index)
  this.renderedKeys[series.key] = series.type
})
this.refLineLayer.selectAll('.reference-line').remove()
this.refLineLayer.selectAll('.reference-line-label').remove()
if (this.options.refLines && this.options.refLines.length > 0) {
  this.options.refLines.forEach(l => this.renderRefLine(l))
}
