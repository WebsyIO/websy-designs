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
  appendData (d) {
    let startIndex = this.rows.length
    this.rows = this.rows.concat(d)
    const html = this.buildHTML(d, startIndex)
    const el = document.getElementById(this.elementId)
    el.innerHTML += html.replace(/\n/g, '')
  }
  buildHTML (d, startIndex = 0) {
    let html = ``
    if (this.options.template) {      
      if (d.length > 0) {
        d.forEach((row, ix) => {
          let template = `${ix > 0 ? '-->' : ''}${this.options.template}${ix < d.length - 1 ? '<!--' : ''}`
          // find conditional elements
          let ifMatches = [...template.matchAll(/<\s*if[^>]*>([\s\S]*?)<\s*\/\s*if>/g)]
          ifMatches.forEach(m => {
            // get the condition
            if (m[0] && m.index > -1) {
              let conditionMatch = m[0].match(/(\scondition=["|']\w.+)["|']/g)
              if (conditionMatch && conditionMatch[0]) {
                let c = conditionMatch[0].trim().replace('condition=', '')
                if (c.split('')[0] === '"') {
                  c = c.replace(/"/g, '')
                }
                else if (c.split('')[0] === '\'') {
                  c = c.replace(/'/g, '')
                }
                let parts = []
                let polarity = true
                if (c.indexOf('===') !== -1) {
                  parts = c.split('===')
                }
                else if (c.indexOf('!==') !== -1) {
                  parts = c.split('!==')
                  polarity = false
                }
                else if (c.indexOf('==') !== -1) {
                  parts = c.split('==')
                }
                else if (c.indexOf('!=') !== -1) {
                  parts = c.split('!=')
                  polarity = false
                }
                let removeAll = true
                if (parts.length === 2) {
                  if (!isNaN(parts[1])) {
                    parts[1] = +parts[1]
                  }
                  if (parts[1] === 'true') {
                    parts[1] = true
                  }
                  if (parts[1] === 'false') {
                    parts[1] = false
                  }
                  if (typeof parts[1] === 'string') {
                    if (parts[1].indexOf('"') !== -1) {
                      parts[1] = parts[1].replace(/"/g, '')
                    }
                    else if (parts[1].indexOf('\'') !== -1) {
                      parts[1] = parts[1].replace(/'/g, '')
                    } 
                  }
                  if (polarity === true) {
                    if (typeof row[parts[0]] !== 'undefined' && row[parts[0]] === parts[1]) {
                      // remove the <if> tags
                      removeAll = false
                    }
                    else if (parts[0] === parts[1]) {
                      removeAll = false
                    }
                  } 
                  else if (polarity === false) {
                    if (typeof row[parts[0]] !== 'undefined' && row[parts[0]] !== parts[1]) {
                      // remove the <if> tags
                      removeAll = false
                    }
                  }                                                
                }
                if (removeAll === true) {
                  // remove the whole markup                
                  template = template.replace(m[0], '')
                }
                else {
                  // remove the <if> tags
                  let newMarkup = m[0]
                  newMarkup = newMarkup.replace('</if>', '').replace(/<\s*if[^>]*>/g, '')
                  template = template.replace(m[0], newMarkup) 
                }
              }
            }
          })
          let tagMatches = [...template.matchAll(/(\sdata-event=["|']\w.+)["|']/g)]
          tagMatches.forEach(m => {
            if (m[0] && m.index > -1) {
              template = template.replace(m[0], `${m[0]} data-id=${startIndex + ix}`)
            }
          })
          for (let key in row) {
            let rg = new RegExp(`{${key}}`, 'gm')                            
            template = template.replace(rg, row[key])
          }
          html += template        
        })
      }
      else if (this.options.noRowsHTML) {
        html += this.options.noRowsHTML
      }
    }
    return html
  }
  set data (d) {
    this.rows = d || []
    this.render()
  }
  get data () {
    return this.rows
  } 
  findById (id) {
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].id === id) {
        return this.rows[i]
      }      
    }
    return null
  }
  handleClick (event) {    
    if (event.target.classList.contains('clickable')) {
      let l = event.target.getAttribute('data-event')
      if (l) {
        l = l.split('(')
        let params = []
        const id = event.target.getAttribute('data-id')
        if (l[1]) {
          l[1] = l[1].replace(')', '')
          params = l[1].split(',')      
        }
        l = l[0]
        params = params.map(p => {
          if (typeof p !== 'string' && typeof p !== 'number') {
            if (this.rows[+id]) {
              p = this.rows[+id][p]
            }
          }
          else if (typeof p === 'string') {
            p = p.replace(/"/g, '').replace(/'/g, '')
          }
          return p
        })
        if (event.target.classList.contains('clickable') && this.options.listeners.click[l]) {      
          event.stopPropagation()
          this.options.listeners.click[l].call(this, event, this.rows[+id], ...params)
        }  
      }
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
    const html = this.buildHTML(this.rows)
    const el = document.getElementById(this.elementId)
    el.innerHTML = html.replace(/\n/g, '')    
  }
}
