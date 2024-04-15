/* global WebsyDesigns */ 
class WebsyTemplate {
  constructor (elementId, options) {
    const DEFAULTS = {
      listeners: {
        click: {}
      }
    }
    this.options = Object.assign({}, DEFAULTS, options)
    if (typeof elementId === 'object') {
      if (elementId.id) {
        this.elementId = elementId.id
      }
      else {
        elementId.id = WebsyDesigns.Utils.createIdentity()
        this.elementId = elementId.id
      }
    }
    else {
      this.elementId = elementId
    }
    this.templateService = new WebsyDesigns.APIService('')
    if (!elementId) {
      console.log('No element Id provided for Websy Template')		
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
  buildHTML () {
    let html = ``
    if (this.options.template) {            
      let template = this.options.template
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
                if (typeof this.options.data[parts[0]] !== 'undefined' && this.options.data[parts[0]] === parts[1]) {
                  // remove the <if> tags
                  removeAll = false
                }
                else if (parts[0] === parts[1]) {
                  removeAll = false
                }
              } 
              else if (polarity === false) {
                if (typeof this.options.data[parts[0]] !== 'undefined' && this.options.data[parts[0]] !== parts[1]) {
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
          template = template.replace(m[0], `${m[0]}`)
        }
      })
      for (let key in this.options.data) {
        let rg = new RegExp(`{${key}}`, 'gm')
        if (rg) {
          template = template.replace(rg, this.options.data[key])
        }                                    
      } 
      html = template     
    }
    return html
  }
  set data (d) {
    this.options.data = d
    this.render()
  }
  handleClick (event) {
    if (event.target.classList.contains('clickable')) {
      this.handleEvent(event, 'clickable', 'click')
    }
  }
  handleEvent (event, eventType, action) {
    let l = event.target.getAttribute('data-event')
    if (l) {
      l = l.split('(')
      let params = []
      const id = event.target.getAttribute('data-id')
      // const locator = event.target.getAttribute('data-locator')
      // if (l[1]) {
      //   l[1] = l[1].replace(')', '')
      //   params = l[1].split(',')      
      // }
      // l = l[0]
      let data = this.options.data
      // if (locator !== '') {
      //   let locatorItems = locator.split(';')
      //   locatorItems.forEach(loc => {
      //     let locatorParts = loc.split(':')
      //     if (data[locatorParts[0]]) {
      //       data = data[locatorParts[0]]
      //       let parts = locatorParts[1].split('.')
      //       parts.forEach(p => {
      //         data = data[p]
      //       })              
      //     }
      //   })
      // }
      // params = params.map(p => {
      //   if (typeof p !== 'string' && typeof p !== 'number') {
      //     if (data[+id]) {
      //       p = data[+id][p]
      //     }
      //   }
      //   else if (typeof p === 'string') {
      //     p = p.replace(/"/g, '').replace(/'/g, '')
      //   }
      //   return p
      // })
      if (event.target.classList.contains(eventType) && this.options.listeners[action] && this.options.listeners[action][l]) {      
        event.stopPropagation()
        this.options.listeners[action][l].call(this, event, data[+id], ...params)
      }  
    }
  }
  render () {
    this.resize()
  }
  resize () {    
    const html = this.buildHTML()
    const el = document.getElementById(this.elementId)
    el.innerHTML = html.replace(/\n/g, '')
    if (this.options.readyCallbackFn) {
      this.options.readyCallbackFn()
    }
  }
}
