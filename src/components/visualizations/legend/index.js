class WebsyLegend {
  constructor (elementId, options) {
    const DEFAULTS = {
      align: 'center',
      direction: 'horizontal',
      style: 'circle',
      symbolSize: 16,
      hPadding: 20,
      vPadding: 10
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this._data = []
    if (!elementId) {
      console.log('No element Id provided for Websy Chart')		
      return
    }
    const el = document.getElementById(this.elementId)    
    if (el) {
      el.classList.add('websy-legend')
      this.render()
    }
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  getLegendItemHTML (d) {
    return `
      <div 
        class='websy-legend-item ${this.options.direction}' 
        style='margin: ${this.options.vPadding / 2}px ${this.options.hPadding / 2}px;'
      >
        <span 
          class='symbol ${d.style || this.options.style}' 
          style='
            background-color: ${d.color};
            width: ${this.options.symbolSize}px;
            height: ${this.options.style === 'line' ? 3 : this.options.symbolSize}px;
          '
        ></span>
        ${d.value}
      </div>
    `
  }
  getSize () {
    const el = document.getElementById(this.elementId)
    if (el) {
      return {
        width: el.clientWidth,
        height: el.clientHeight
      }
    }
  }
  set data (d) {
    this._data = d
    this.render()
  }
  render () {
    this.resize()
  }
  resize () {
    const el = document.getElementById(this.elementId)
    if (el) {
      // if (this.options.width) {
      //   el.width = this.options.width
      // }
      // if (this.options.height) {
      //   el.height = this.options.height
      // }
      let html = `
        <div class='text-${this.options.align}'>
      `
      html += this._data.map((d, i) => this.getLegendItemHTML(d)).join('')
      html += `
        <div>
      `
      el.innerHTML = html
    }
  }
  setOptions (options) {
    this.options = Object.assign({}, this.options, options)
  }
  testWidth (v) {
    let html = this.getLegendItemHTML({value: v})
    const el = document.createElement('div')
    el.style.position = 'absolute'
    // el.style.width = '100vw'
    el.style.visibility = 'hidden'
    el.innerHTML = html
    document.body.appendChild(el)
    let w = el.clientWidth + 30 // for padding
    el.remove()
    return w
  }
}
