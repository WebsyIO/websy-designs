/* global WebsyDesigns */ 
class WebsyResultList {
  constructor (elementId, options) {
    const DEFAULTS = {
      listeners: {
        click: {}
      }
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.elementId = elementId
    this.rows = []
    this.apiService = new WebsyDesigns.APIService('/api')
    this.templateService = new WebsyDesigns.APIService('')
    if (!elementId) {
      console.log('No element Id provided for Websy Search List')		
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
    }
    if (typeof options.template === 'object' && options.template.url) {
      this.templateService.get(options.template.url).then(templateString => {
        this.options.template = templateString
        this.render()
      })
    }
    else {
      this.render()
    }    
  }
  set data (d) {
    this.rows = d || []
    this.render()
  }
  get date () {
    return this.rows
  }  
  findById (id) {
    console.log('finding', id)
    for (let i = 0; i < this.rows.length; i++) {
      console.log(id, this.rows[i].id)
      if (this.rows[i].id === id) {
        return this.rows[i]
      }      
    }
    return null
  }
  handleClick (event) {    
    const l = event.target.getAttribute('data-event')
    const id = event.target.getAttribute('data-id')
    if (event.target.classList.contains('clickable') && this.options.listeners.click[l]) {      
      event.stopPropagation()
      this.options.listeners.click[l].call(this, event, this.findById(+id))
    }
  }
  render () {
    if (this.options.entity) {
      this.apiService.get(this.options.entity).then(results => {
        this.rows = results.rows  
        this.resize()
      })
    }
    else {
      this.resize()
    }
  }
  resize () {
    if (this.options.template) {
      let html = ``                  
      this.rows.forEach(row => {
        let template = this.options.template
        let tagMatches = [...template.matchAll(/(\sdata-event=["|']\w.+)["|']/g)]
        tagMatches.forEach(m => {
          if (m[0] && m.index > -1) {
            template = template.replace(m[0], `${m[0]} data-id=${row.id}`)
          }
        })
        for (let key in row) {
          let rg = new RegExp(`{${key}}`, 'gm')                            
          template = template.replace(rg, row[key])
        }
        html += template
      })
      const el = document.getElementById(this.elementId)
      el.innerHTML = html
    }
  }
}
