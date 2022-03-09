/* global history */
class WebsyRouter {
  constructor (options) {
    const defaults = {
      triggerClass: 'websy-trigger',
      triggerToggleClass: 'websy-trigger-toggle',
      viewClass: 'websy-view',
      activeClass: 'active',
      viewAttribute: 'data-view',
      groupAttribute: 'data-group',
      parentAttribute: 'data-parent',
      defaultView: '',
      defaultGroup: 'main',
      subscribers: { show: [], hide: [] }
    }  
    this.triggerIdList = []
    this.viewIdList = []    
    this.previousPath = ''
    this.previousView = ''
    this.currentView = ''
    this.currentViewMain = ''
    this.currentParams = {}
    this.controlPressed = false
    this.usesHTMLSuffix = window.location.pathname.indexOf('.htm') !== -1
    window.addEventListener('popstate', this.onPopState.bind(this))
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
    window.addEventListener('focus', this.handleFocus.bind(this))
    window.addEventListener('click', this.handleClick.bind(this))
    this.options = Object.assign({}, defaults, options)  
    if (this.options.onShow) {
      this.on('show', this.options.onShow)
    }  
    if (this.options.onHide) {
      this.on('hide', this.options.onHide)
    }  
    this.init()
  }
  addGroup (group) {
    if (!this.groups[group]) {
      const els = document.querySelectorAll(`.websy-view[data-group="${group}"]`)
      if (els) {
        console.log('els', els)
        this.getClosestParent(els[0], parent => {
          this.groups[group] = {
            activeView: '',
            views: [],
            parent: parent.getAttribute('data-view')
          }          
        })  
      }           
    }
  }
  getClosestParent (el, callbackFn) {
    if (el && el.parentElement) {
      if (el.parentElement.attributes['data-view'] || el.tagName === 'BODY') {
        callbackFn(el.parentElement)
      }
      else {
        this.getClosestParent(el.parentElement, callbackFn)
      } 
    }    
  }
  addUrlParams (params) {    
    if (typeof params === 'undefined') {
      return
    }
    const output = {
      path: '',
      items: {}
    }
    let path = ''
    if (this.currentParams && this.currentParams.items) {
      output.items = Object.assign({}, this.currentParams.items, params)
      path = this.buildUrlPath(output.items)
    }
    else if (Object.keys(params).length > 0) {
      output.items = Object.assign({}, params)
      path = this.buildUrlPath(output.items)
    }
    this.currentParams = output
    let inputPath = this.currentView
    if (this.options.urlPrefix) {
      inputPath = `/${this.options.urlPrefix}/${inputPath}`
    }
    history.pushState({
      inputPath
    }, inputPath, `${inputPath}?${path}`) 
  }
  buildUrlPath (params) {
    let path = []
    for (let key in params) {
      path.push(`${key}=${params[key]}`)
    }
    return path.join('&')
  }
  checkChildGroups (parent) {
    if (!this.groups) {
      this.groups = {}
    }
    const parentEl = document.querySelector(`.websy-view[data-view="${parent}"]`)
    if (parentEl) {
      const els = parentEl.querySelectorAll(`.websy-view[data-group]`)
      for (let i = 0; i < els.length; i++) {
        const g = els[i].getAttribute('data-group')
        const v = els[i].getAttribute('data-view')
        if (!this.groups[g]) {
          this.addGroup(g)
        }
        if (this.groups[g].views.indexOf(v) === -1) {
          this.groups[g].views.push(v)
        }
      }      
    }
  }
  formatParams (params) {
    const output = {
      path: params,
      items: {}
    }
    if (typeof params === 'undefined') {
      return
    }
    const parts = params.split('&')
    for (let i = 0; i < parts.length; i++) {
      const bits = parts[i].split('=')
      output.items[bits[0]] = bits[1]      
    }
    this.currentParams = output
    return output
  }
  generateId (item) {
    const chars = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789'  
    const value = []
    const len = chars.length
    for (let i = 0; i < 6; i++) {
      let rnd = Math.floor(Math.random() * 62)
      value.push(chars[rnd])
    }
    return `${item}_${value.join('')}`
  }
  getActiveViewsFromParent (parent) {
    let views = []    
    this.checkChildGroups(parent)
    for (let g in this.groups) {
      if (this.groups[g].parent === parent) {
        if (this.groups[g].activeView) {
          views.push({view: this.groups[g].activeView, group: g})
        }
        else {
          views.push({view: this.groups[g].views[0], group: g})
        }        
      }
    }
    return views
  }
  handleClick (event) {
    // const id = event.target.id        
    if (event.target.classList.contains(this.options.triggerClass)) {
      const view = event.target.getAttribute(this.options.viewAttribute)
      const group = event.target.getAttribute(this.options.groupAttribute)
      this.navigate(view, group || 'main', event)
    }
  }
  init () {
    // this.registerElements(document)
    let view = ''    
    let params = this.formatParams(this.queryParams)
    let url
    if (this.currentPath === '' && this.options.defaultView !== '') {
      view = this.options.defaultView      
    }
    else if (this.currentPath !== '') {
      view = this.currentPath      
    }
    url = view
    if (typeof params !== 'undefined') {
      url += `?${params.path}`
    }
    this.currentView = view
    this.currentViewMain = view
    if (this.currentView === '/' || this.currentView === '') {
      this.currentView = this.options.defaultView
    }
    if (this.currentViewMain === '/' || this.currentViewMain === '') {
      this.currentViewMain = this.options.defaultView
    }    
    if (view !== '') {
      this.showView(view, params)      
    }
  }
  handleFocus (event) {
    this.controlPressed = false
  }
  handleKeyDown (event) {    
    switch (event.key) {
    case 'Control':
    case 'Meta':
      this.controlPressed = true      
      break        
    }
  }
  handleKeyUp (event) {
    this.controlPressed = false  
  }
  hideView (view, group) {
    this.hideTriggerItems(view, group)
    this.hideViewItems(view, group)    
    // if (group === this.options.defaultGroup) {
    //   let children = document.getElementsByClassName(`parent-${view}`)
    //   if (children) {
    //     for (let c = 0; c < children.length; c++) {
    //       if (children[c].classList.contains(this.options.viewClass)) {
    //         let viewAttr = children[c].attributes[this.options.viewAttribute]
    //         let groupAttr = children[c].attributes[this.options.groupAttribute]
    //         if (viewAttr && viewAttr.value !== '') {
    //           this.hideView(viewAttr.value, groupAttr.value || this.options.defaultGroup)
    //         }
    //       }
    //     }
    //   }
    // }
    // else {
    //   if (this.groups[group] && this.groups[group].activeView === view) {
    //     this.groups[group].activeView = null
    //   }
    // }
    let children = this.getActiveViewsFromParent(view)
    for (let c = 0; c < children.length; c++) {
      this.hideView(children[c].view, children[c].group)
    }
    this.publish('hide', [view])
  }
  // registerElements (root) {
  //   if (root.nodeName === '#document') {
  //     this.groups = {}  
  //   }    
  //   let triggerItems = root.getElementsByClassName(this.options.triggerClass)
  //   for (let i = 0; i < triggerItems.length; i++) {
  //     if (!triggerItems[i].id) {
  //       triggerItems[i].id = this.generateId('trigger')
  //     }
  //     if (this.triggerIdList.indexOf(triggerItems[i].id) !== -1) {
  //       continue
  //     }
  //     this.triggerIdList.push(triggerItems[i].id)
  //     // get the view for each item
  //     let viewAttr = triggerItems[i].attributes[this.options.viewAttribute]
  //     if (viewAttr && viewAttr.value !== '') {
  //       // check to see if the item belongs to a group
  //       // use the group to add an additional class to the item
  //       // this combines the triggerClass and groupAttr properties
  //       let groupAttr = triggerItems[i].attributes[this.options.groupAttribute]
  //       let group = this.options.defaultGroup
  //       if (groupAttr && groupAttr.value !== '') {
  //         // if no group is found, assign it to the default group
  //         group = groupAttr.value
  //       }
  //       let parentAttr = triggerItems[i].attributes[this.options.parentAttribute]
  //       if (parentAttr && parentAttr.value !== '') {
  //         triggerItems[i].classList.add(`parent-${parentAttr.value}`)
  //       }
  //       triggerItems[i].classList.add(`${this.options.triggerClass}-${group}`)        
  //     }
  //   }
  //   // Assign group class to views
  //   let viewItems = root.getElementsByClassName(this.options.viewClass)
  //   for (let i = 0; i < viewItems.length; i++) {
  //     let groupAttr = viewItems[i].attributes[this.options.groupAttribute]
  //     let viewAttr = viewItems[i].attributes[this.options.viewAttribute]
  //     if (!groupAttr || groupAttr.value === '') {
  //       // if no group is found, assign it to the default group
  //       viewItems[i].classList.add(`${this.options.viewClass}-${this.options.defaultGroup}`)
  //     }
  //     else {
  //       this.addGroup(groupAttr.value)
  //       if (viewItems[i].classList.contains(this.options.activeClass)) {
  //         this.groups[groupAttr.value].activeView = viewAttr.value
  //       }
  //       viewItems[i].classList.add(`${this.options.viewClass}-${groupAttr.value}`)
  //     }
  //     let parentAttr = viewItems[i].attributes[this.options.parentAttribute]
  //     if (parentAttr && parentAttr.value !== '') {
  //       viewItems[i].classList.add(`parent-${parentAttr.value}`)
  //       if (groupAttr && groupAttr.value !== '' && this.groups[groupAttr.value]) {
  //         this.groups[groupAttr.value].parent = parentAttr.value
  //       }
  //     }
  //   }
  // }
  prepComponent (elementId, options) {
    let el = document.getElementById(`${elementId}_content`)
    if (el) {
      return ''
    }
    let html = `
      <article id='${elementId}_content' class='websy-content-article'></article>
      <div id='${elementId}_loading' class='websy-loading-container'><div class='websy-ripple'><div></div><div></div></div></div>
    `
    if (options.help && options.help !== '') {
      html += `
        <Help not yet supported>
      `
    }
    if (options.tooltip && options.tooltip.value && options.tooltip.value !== '') {
      html += `
          <div class="websy-info ${this.options.tooltip.classes.join(' ') || ''}" data-info="${this.options.tooltip.value}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm48,226H216a16,16,0,0,1,0-32h28V244H228a16,16,0,0,1,0-32h32a16,16,0,0,1,16,16V332h28a16,16,0,0,1,0,32Z"/></svg>
          </div>   
        `
    }
    el = document.getElementById(elementId)
    if (el) {
      el.innerHTML = html 
    }    
  }
  showComponents (view) {
    if (this.options.views && this.options.views[view] && this.options.views[view].components) {
      this.options.views[view].components.forEach(c => {
        if (typeof c.instance === 'undefined') {
          this.prepComponent(c.elementId, c.options)
          c.instance = new (c.Component)(c.elementId, c.options)
        }
        else if (c.instance.render) {
          c.instance.render()
        }
      })      
    }
  }
  showView (view, params) {
    this.activateItem(view, this.options.triggerClass)
    this.activateItem(view, this.options.viewClass)
    let children = this.getActiveViewsFromParent(view)
    for (let c = 0; c < children.length; c++) {
      this.activateItem(children[c].view, this.options.triggerClass)
      this.activateItem(children[c].view, this.options.viewClass)
      this.showComponents(children[c].view)
      this.publish('show', [children[c].view])
    }
    this.showComponents(view)
    this.publish('show', [view, params])
  }
  reloadCurrentView () {
    this.showView(this.currentView, this.currentParams)
  }
  navigate (inputPath, group = 'main', event, popped) {
    if (typeof popped === 'undefined') {
      popped = false
    }    
    this.popped = popped
    let toggle = false
    let groupActiveView
    let params = {}       
    let newPath = inputPath    
    if (inputPath === this.options.defaultView && this.usesHTMLSuffix === false) {
      inputPath = inputPath.replace(this.options.defaultView, '/')
    }    
    if (this.options.persistentParameters === true) {
      if (inputPath.indexOf('?') === -1 && this.queryParams) {
        inputPath += `?${this.queryParams}`
      }
    } 
    if (this.usesHTMLSuffix === true) {
      if (inputPath.indexOf('?') === -1) {
        inputPath = `?view=${inputPath}`
      }
      else if (inputPath.indexOf('view=') === -1) {
        inputPath = `&view=${inputPath}`
      }      
    }    
    let previousParamsPath = this.currentParams.path
    if (this.controlPressed === true && group === this.options.defaultGroup) {      
      // Open the path in a new browser tab
      window.open(`${window.location.origin}/${inputPath}`, '_blank')
      return
    }
    if (inputPath.indexOf('?') !== -1 && group === this.options.defaultGroup) {
      let parts = inputPath.split('?')
      params = this.formatParams(parts[1])
      inputPath = parts[0]
    }
    else if (group === this.options.defaultGroup) {
      this.currentParams = {}
    }
    if (event) {
      if (event.target && event.target.classList.contains(this.options.triggerToggleClass)) {
        toggle = true
      }
      else if (typeof event === 'boolean') {
        toggle = event
      }
    }
    if (!this.groups) {
      this.groups = {}
    }
    if (!this.groups[group]) {
      this.addGroup(group)
    }
    if (toggle === true && this.groups[group].activeView !== '') {
      newPath = ''
    }        
    this.previousView = this.currentView    
    this.previousPath = this.currentPath    
    if (this.groups[group]) {
      if (toggle === false) {      
        groupActiveView = this.groups[group].activeView
      }      
      this.previousPath = this.groups[group].activeView
    }
    if (toggle === true) {
      if (this.previousPath !== '') {
        this.hideView(this.previousPath, group)
      }
    }
    else {
      this.hideView(this.previousView, group)
    }    
    if (toggle === true && newPath === groupActiveView) {
      return
    }
    if (group && this.groups[group] && group !== this.options.defaultGroup) {
      this.groups[group].activeView = newPath
    }
    if (toggle === false && group === 'main') {
      this.currentView = inputPath
    }
    if (group === 'main') {
      this.currentViewMain = inputPath
    }    
    if (this.currentView === '/') {
      this.currentView = this.options.defaultView
    }
    if (this.currentViewMain === '/') {
      this.currentViewMain = this.options.defaultView
    }
    if (toggle === false) {
      this.showView(this.currentView, this.currentParams)
    }
    else if (newPath && newPath !== '') {      
      this.showView(newPath)
    }
    if (this.usesHTMLSuffix === true) {
      inputPath = window.location.pathname.split('/').pop() + inputPath
    }
    if ((this.currentPath !== newPath || previousParamsPath !== this.currentParams.path) && group === this.options.defaultGroup) {            
      if (popped === false) {
        let historyUrl = inputPath
        if (this.options.urlPrefix) {
          historyUrl = `/${this.options.urlPrefix}/${historyUrl}`
          inputPath = `/${this.options.urlPrefix}/${inputPath}`
        }
        if (this.currentParams && this.currentParams.path) {
          historyUrl += `?${this.currentParams.path}`
        }
        else if (this.queryParams) {
          historyUrl += `?${this.queryParams}`
        }        
        history.pushState({
          inputPath
        }, inputPath, historyUrl) 
      }
      else {
        // 
      }
    }
  }
  on (event, fn) {
    this.options.subscribers[event].push(fn)
  }
  onPopState (event) {
    if (event.state) {
      let url
      if (event.state.url) {
        url = event.state.url
      }
      else {
        url = event.state.inputPath
        if (url.indexOf(this.options.urlPrefix) !== -1) {
          url = url.replace(`/${this.options.urlPrefix}/`, '')
        }
      }
      this.navigate(url, 'main', null, true)
    }
    else {
      this.navigate(this.options.defaultView || '/', 'main', null, true)
    }
  }
  publish (event, params) {
    this.options.subscribers[event].forEach((item) => {
      item.apply(null, params)
    })
  }
  subscribe (event, fn) {
    this.options.subscribers[event].push(fn)
  }  
  get currentPath () {
    let path = window.location.pathname.split('/').pop()    
    if (path.indexOf('.htm') !== -1) {
      return ''
    }
    if (this.options.urlPrefix && path === this.options.urlPrefix) {
      return ''
    }
    return path
  }
  get queryParams () {
    if (window.location.search.length > 1) {
      return window.location.search.substring(1)
    }
    return ''
  }
  hideTriggerItems (view, group) {
    this.hideItems(this.options.triggerClass, group)
  }
  hideViewItems (view, group) {
    this.hideItems(view, group)
  }
  hideItems (view, group) {
    let els 
    if (group && group !== 'main') {
      els = [...document.querySelectorAll(`[${this.options.groupAttribute}='${group}']`)]
    }
    else {
      els = [...document.querySelectorAll(`[${this.options.viewAttribute}='${view}']`)]
    }    
    if (els) {
      for (let i = 0; i < els.length; i++) {
        els[i].classList.remove(this.options.activeClass)
      }
    }
  }
  activateItem (path, className) {
    let els = document.getElementsByClassName(className)
    if (els) {
      for (let i = 0; i < els.length; i++) {
        if (els[i].attributes[this.options.viewAttribute] && els[i].attributes[this.options.viewAttribute].value === path) {
          els[i].classList.add(this.options.activeClass)          
          break
        }
      }
    }
  }
}
