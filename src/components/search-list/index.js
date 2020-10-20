/* global WebsyDesigns */ 
class WebsySearchList {
  constructor (elementId, options) {
    this.options = Object.assign({}, options)
    this.elementId = elementId
    this.apiService = new WebsyDesigns.APIService('/api')
    if (!elementId) {
      console.log('No element Id provided for Websy Search List')		
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      // 
    }
    this.render()
  }
  render () {
    if (this.options.entity) {
      this.apiService.get(this.options.entity).then(results => {
        if (this.options.template) {
          let html = ``          
          results.rows.forEach(row => {
            let template = this.options.template
            for (let key in row) {
              let rg = new RegExp(`{${key}}`, 'gm')
              template = template.replace(rg, row[key])
            }
            html += template
          })
          const el = document.getElementById(this.elementId)
          el.innerHTML = html
        }
      })
    }
  }
  resize () {
    // 
  }
}
