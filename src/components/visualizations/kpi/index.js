/* global */
class WebsyKPI {
  constructor (elementId, options) {
    const DEFAULTS = {
      tooltip: {},
      label: {
        value: ''
      },
      value: {
        value: ''
      }
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this._isRendered = false
    this.render()
  }
  get isRendered () {
    return this._isRendered
  }
  render (options) {
    this._isRendered = false
    this.options = Object.assign({}, this.options, options)
    if (!this.options.label.classes) {
      this.options.label.classes = []
    }
    if (!this.options.value.classes) {
      this.options.value.classes = []
    }
    if (this.options.subValue && !this.options.subValue.classes) {
      this.options.subValue.classes = []
    }
    if (!this.options.tooltip.classes) {
      this.options.tooltip.classes = []
    }
    this.resize()
  }
  resize () {
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = `
        <div class="websy-kpi-container">
      `
      if (this.options.icon) {
        html += `
          <div class="websy-kpi-icon"><img src="${this.options.icon}"></div>   
        `
      }      
      html += `   
          <div class="websy-kpi-info">
            <div class="websy-kpi-label-container">
              <div class="websy-kpi-label ${this.options.label.classes.join(' ') || ''}">
                ${(this.options.label || {}).value || ''}
              </div>
      `
      if (this.options.tooltip && this.options.tooltip.value) {
        html += `
          <div class="websy-info ${this.options.tooltip.classes.join(' ') || ''}" data-info="${this.options.tooltip.value}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm48,226H216a16,16,0,0,1,0-32h28V244H228a16,16,0,0,1,0-32h32a16,16,0,0,1,16,16V332h28a16,16,0,0,1,0,32Z"/></svg>
          </div>   
        `
      }
      html += `
            </div>
            <div class="websy-kpi-value ${this.options.value.classes.join(' ') || ''}">${this.options.value.value}</div>
      `
      if (this.options.subValue) {
        html += `
          <div class="websy-kpi-sub-value ${this.options.subValue.classes.join(' ') || ''}">${this.options.subValue.value}</div>
        `
      }
      html += `                                
          </div>
        </div>
      `
      el.innerHTML = html
      this._isRendered = true
    }
  }  
}
