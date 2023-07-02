/* global data */ 
const el = document.getElementById(this.elementId)
if (el && !el.target) {
  this.createCanvases(el)
}
if (data && !data.target) {
  this.originalData = [...data]
}
this.processData(data)
this.drawSegments()
this.drawLabels()
this.drawKPI()
