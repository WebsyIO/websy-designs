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
    this.rows = this.options.data || []
    this.apiService = new WebsyDesigns.APIService('/api')
    this.templateService = new WebsyDesigns.APIService('')
    this.activeTemplate = ''
    if (!elementId) {
      console.log('No element Id provided for Websy Search List')		
      return
    }
    const el = document.getElementById(elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('change', this.handleChange.bind(this))
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      el.addEventListener('keydown', this.handleKeyDown.bind(this))
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
    this.activeTemplate = this.options.template
    const html = this.buildHTML(d, startIndex)
    const el = document.getElementById(this.elementId)
    el.innerHTML += html.replace(/\n/g, '')
    if (this.options.onAppend) {
      this.options.onAppend()
    }
  }
  buildHTML (d = [], startIndex = 0, inputTemplate, locator = []) {
    let html = ``
    if (this.options.template) {      
      if (d.length > 0) {
        d.forEach((row, ix) => {
          let template = `${ix > 0 ? '-->' : ''}${inputTemplate || this.options.template}${ix < d.length - 1 ? '<!--' : ''}`
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
          let forMatches = [...template.matchAll(/<\s*for[^>]*>([\s\S]*?)<\s*\/\s*for>/g)]
          forMatches.forEach(m => {
            let itemsMatch = m[0].match(/(items=["|']\w.+)["|']/g)
            let forMarkup = m[0].match(/<\s*for[^>]*>/)
            let withoutFor = m[0].replace(forMarkup, '').replace('</for>', '').replace(/<\s*for[^>]*>/g, '')
            if (itemsMatch && itemsMatch[0]) {
              let c = itemsMatch[0].trim().replace('items=', '')
              if (c.split('')[0] === '"') {
                c = c.replace(/"/g, '')
              }
              else if (c.split('')[0] === '\'') {
                c = c.replace(/'/g, '')
              }              
              let items = row
              let parts = c.split('.')
              parts.forEach(p => {
                items = items[p]
              })
              template = template.replace(m[0], this.buildHTML(items, 0, withoutFor, [...locator, `${startIndex + ix}:${c}`]))              
            }
          })
          let tagMatches = [...template.matchAll(/(\sdata-event=["|']\w.+)["|']/g)]
          tagMatches.forEach(m => {
            if (m[0] && m.index > -1) {
              template = template.replace(m[0], `${m[0]} data-id=${startIndex + ix} data-locator='${locator.join(';')}'`)
            }
          })         
          let flatRow = this.flattenObject(row) 
          for (let key in flatRow) {
            let rg = new RegExp(`{${key}}`, 'gm')                            
            template = template.replace(rg, flatRow[key] || '')
          }
          template = template.replace(/\{(.*?)\}/g, '')
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
  flattenObject (obj) {
    const toReturn = {}
    for (const i in obj) {
      if (!obj.hasOwnProperty(i)) {
        continue
      }
      if (typeof obj[i] === 'object') {
        const flatObject = this.flattenObject(obj[i])
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) {
            continue
          }
          toReturn[i + '.' + x] = flatObject[x]
        }
      }
      else {
        toReturn[i] = obj[i]
      }
    }
    return JSON.parse(JSON.stringify(toReturn))
  }
  handleClick (event) {    
    if (event.target.classList.contains('clickable')) {
      this.handleEvent(event, 'clickable', 'click')
    }
  }
  handleChange (event) {
    this.handleEvent(event, 'keyable', 'change')
  }
  handleKeyUp (event) {
    this.handleEvent(event, 'keyable', 'keyup')
  }
  handleKeyDown (event) {
    this.handleEvent(event, 'keyable', 'keydown')
  }
  handleEvent (event, eventType, action) {
    let l = event.target.getAttribute('data-event')
    if (l) {
      l = l.split('(')
      let params = []
      const id = event.target.getAttribute('data-id')
      const locator = event.target.getAttribute('data-locator')
      if (l[1]) {
        l[1] = l[1].replace(')', '')
        params = l[1].split(',')      
      }
      l = l[0]
      let data = this.rows
      if (locator !== '') {
        let locatorItems = locator.split(';')
        locatorItems.forEach(loc => {
          let locatorParts = loc.split(':')
          if (data[locatorParts[0]]) {
            data = data[locatorParts[0]]
            let parts = locatorParts[1].split('.')
            parts.forEach(p => {
              data = data[p]
            })              
          }
        })
      }
      params = params.map(p => {
        if (typeof p !== 'string' && typeof p !== 'number') {
          if (data[+id]) {
            p = data[+id][p]
          }
        }
        else if (typeof p === 'string') {
          p = p.replace(/"/g, '').replace(/'/g, '')
        }
        return p
      })
      if (event.target.classList.contains(eventType) && this.options.listeners[action] && this.options.listeners[action][l]) {      
        event.stopPropagation()
        this.options.listeners[action][l].call(this, event, data[+id], ...params)
      }  
    }
  }
  render () {
    if (this.options.entity) {
      let url = this.options.entity
      if (this.options.sortField) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + `by=${this.options.sortField}&order=${this.options.sortOrder || 'ASC'}`
      }
      this.apiService.get(url).then(results => {
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
    if (this.options.onResize) {
      this.options.onResize()
    }  
  }
}
