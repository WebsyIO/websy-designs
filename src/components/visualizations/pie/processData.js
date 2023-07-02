/* global data */ 
let tempData = {}
let tempTotal = 0
for (let i = 0; i < data.length; i++) {
  // if the dimension does not exists as a property on tempData, add it
  if (!tempData[data[i][0].label]) {
    tempData[data[i][0].label] = {
      segmentValue: 0,
      drill: []
    }
  }
  // add the value to the relevent segmentValue
  tempData[data[i][0].label].segmentValue += data[i][1].value
  // add the value to the total
  tempTotal += data[i][1].value
  // if a drill has been specified add the data to the drill property
  if (this.drill && this.drill !== '') {
    tempData[data[i][0].label].drill.push({
      label: data[i][0].label,
      value: data[i][1].value
    })
  }
}
// loop through the full data set to calculate the percentages
for (let s in tempData) {
  tempData[s].percValue = tempData[s].segmentValue / tempTotal
  tempData[s].circumference = this.calculateCircumference(tempData[s].percValue)
  tempData[s].labelAngle = 360 * (tempData[s].percValue / 2)
  // calculate where the label should be for that segment
  tempData[s].label = {
    x: ((this.outerRadius + 5) / Math.sin(this.convertDegreesToRadians(90)) * Math.sin(this.convertDegreesToRadians(180 - 90 - tempData[s].labelAngle)))
  }
  tempData[s].label.y = ((this.outerRadius + 5) / Math.sin(this.convertDegreesToRadians(90)) * Math.sin(this.convertDegreesToRadians(tempData[s].labelAngle)))
}
this.data = {
  segments: tempData,
  total: tempTotal
}
console.log(this.data)
