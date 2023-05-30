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
      subscribers: { show: [], hide: [] },
      persistentParameters: false,
      fieldValueSeparator: ':'
    }  
    this.triggerIdList = []
    this.viewIdList = []    
    this.previousPath = ''
    this.previousView = ''
    this.currentView = ''
    this.currentViewMain = ''
    this.currentParams = {
      path: '',
      items: {}
    }
    this.previousParams = {
      path: '',
      items: {}
    }
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
    // this.init()
  }
  addGroup (group) {
    if (!this.groups[group]) {
      const els = document.querySelectorAll(`.websy-view[data-group="${group}"]`)
      if (els) {        
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
  addUrlParams (params, reloadView = false, noHistory = true) {    
    if (typeof params === 'undefined') {
      return
    }
    this.previousParams = Object.assign({}, this.currentParams)
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
    output.path = path
    this.currentParams = output
    let inputPath = this.currentView
    if (this.options.urlPrefix) {
      inputPath = `/${this.options.urlPrefix}/${inputPath}`
    }
    // history.pushState({
    //   inputPath
    // }, 'unused', `${inputPath}?${path}`) 
    if (reloadView === true) {
      // this.showView(this.currentView, this.currentParams, 'main')
      this.navigate(`${inputPath}?${path}`, 'main', null, noHistory)
    }
    else {
      this.updateHistory(inputPath, !noHistory, true)
    }
  }
  removeUrlParams (params = [], reloadView = false, noHistory = true) {        
    this.previousParams = Object.assign({}, this.currentParams)
    
    let path = ''
    if (this.currentParams && this.currentParams.items) {
      params.forEach(p => {
        delete this.currentParams.items[p]
      })
      path = this.buildUrlPath(this.currentParams.items)
    }    
    let inputPath = this.currentView
    if (this.options.urlPrefix) {
      inputPath = `/${this.options.urlPrefix}/${inputPath}`
    }    
    if (reloadView === true) {
      // this.showView(this.currentView, this.currentParams, 'main')
      this.navigate(`${inputPath}?${path}`, 'main', null, noHistory)
    }
    else if (noHistory === false) {
      this.currentParams = {
        items: this.currentParams.items,
        path
      }
      this.updateHistory(inputPath, !noHistory, true)
    }
  }
  removeAllUrlParams (reloadView = false, noHistory = true) {
    // const output = {
    //   path: '',
    //   items: {}
    // }
    // this.currentParams = output
    let inputPath = this.currentView
    if (this.options.urlPrefix) {
      inputPath = `/${this.options.urlPrefix}/${inputPath}`
    }
    this.currentParams = {
      path: '',
      items: {}
    }
    if (reloadView === true) {
      this.navigate(`${inputPath}`, 'main', null, noHistory)
    }
    else {
      this.updateHistory(inputPath, !noHistory, true)
    }
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
        if (els[i].classList.contains(this.options.activeClass)) {
          this.groups[g].activeView = v
        }
        if (this.groups[g].views.indexOf(v) === -1) {
          this.groups[g].views.push(v)
        }
      }      
    }
  }
  formatParams (params) {
    this.previousParams = Object.assign({}, this.currentParams)
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
      if (bits[0] && bits[0] !== '' && bits[1] && bits[1] !== '') {
        output.items[bits[0]] = bits[1]
      }      
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
        // else {
        //   views.push({view: this.groups[g].views[0], group: g})
        // }        
      }
    }
    return views
  }
  getParamValues (param) {
    let output = []
    if (this.currentParams && this.currentParams.items && this.currentParams.items[param] && this.currentParams.items[param] !== '') {
      return this.currentParams.items[param].split('|').map(d => decodeURI(d))
    }
    return output
  }
  getAPIQuery (ignoredParams = []) {    
    if (this.currentParams && this.currentParams.items) {
      let query = []
      for (const key in this.currentParams.items) {          
        if (ignoredParams.indexOf(key) === -1) {
          query.push(`${key}${this.options.fieldValueSeparator}${this.currentParams.items[key]}`)
        }        
      }
      return query
    }
    return []
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
    this.navigate(url)
    // this.currentView = view
    // this.currentViewMain = view
    // if (this.currentView === '/' || this.currentView === '') {
    //   this.currentView = this.options.defaultView
    // }
    // if (this.currentViewMain === '/' || this.currentViewMain === '') {
    //   this.currentViewMain = this.options.defaultView
    // }    
    // if (view !== '') {
    //   this.showView(view, params, 'main')      
    // }
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
  hideChildren (view, group) {
    let children = this.getActiveViewsFromParent(view)
    for (let c = 0; c < children.length; c++) {      
      this.hideTriggerItems(children[c].view, group)
      this.hideViewItems(children[c].view, group)
      this.publish('hide', [children[c].view])
    }
  }
  hideView (view, group) {   
    if (view === '/' || view === '') {
      view = this.options.defaultView
    }         
    this.hideChildren(view, group)
    if (this.previousView !== this.currentView || group !== this.options.defaultGroup) {
      this.hideTriggerItems(view, group)
      this.hideViewItems(view, group)
      this.publish('hide', [view])
      if (this.options.views && this.options.views[view]) {
        this.options.views[view].components.forEach(c => {
          if (typeof c.instance !== 'undefined') {
            if (c.instance.close) {
              c.instance.close() 
            }          
          }
        })
      }      
    }
    // else if (group !== this.options.defaultGroup) {
    //   this.hideTriggerItems(view, group)
    //   this.hideViewItems(view, group)
    //   this.publish('hide', [view])
    // }    
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
    if (options && options.help && options.help !== '') {
      html += `
        <Help not yet supported>
      `
    }
    if (options && options.tooltip && options.tooltip.value && options.tooltip.value !== '') {
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
  showView (view, params, group) {
    if (view === '/' || view === '') {
      view = this.options.defaultView || ''
    }
    this.activateItem(view, this.options.triggerClass)
    this.activateItem(view, this.options.viewClass)
    let children = this.getActiveViewsFromParent(view)
    for (let c = 0; c < children.length; c++) {
      this.activateItem(children[c].view, this.options.triggerClass)
      this.activateItem(children[c].view, this.options.viewClass)
      this.showComponents(children[c].view)
      this.publish('show', [children[c].view, null, group])
    }
    if (this.previousView !== this.currentView || group !== 'main') {
      this.showComponents(view)
      this.publish('show', [view, params, group]) 
    }       
    else if (this.previousView === this.currentView && this.previousParams.path !== this.currentParams.path) { 
      this.showComponents(view)
      this.publish('show', [view, params, group]) 
    }    
  }
  reloadCurrentView () {
    this.showView(this.currentView, this.currentParams, 'main')
  }
  navigate (inputPath, group = 'main', event, popped) {
    if (typeof popped === 'undefined') {
      popped = false
    }    
    this.popped = popped
    let toggle = false
    let noInputParams = inputPath.indexOf('?') === -1
    let groupActiveView
    let params = {}       
    let newPath = inputPath    
    if (inputPath.split('?')[0] === this.options.defaultView && this.usesHTMLSuffix === false) {
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
      this.previousParams = Object.assign({}, this.currentParams)
      this.currentParams = {
        path: '',
        items: {}
      }
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
      newPath = inputPath === this.groups[group].activeView ? '' : inputPath
    }        
    this.previousView = this.currentView    
    this.previousPath = this.currentPath    
    if (this.groups[group]) {
      if (toggle === false) {      
        groupActiveView = this.groups[group].activeView
      }      
      this.previousPath = this.groups[group].activeView
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
    if (toggle === true) {
      if (this.previousPath !== '') {
        this.hideView(this.previousPath, group)
      }
    }
    else if (group === this.options.defaultGroup) {      
      this.hideView(this.previousView, group)
    } 
    else {      
      this.hideView(this.previousPath, group)
    }    
    if (toggle === true && newPath === groupActiveView) {
      return
    }    
    if (this.usesHTMLSuffix === true) {
      inputPath = window.location.pathname.split('/').pop() + inputPath
    }
    if ((this.currentPath !== inputPath || previousParamsPath !== this.currentParams.path) && group === this.options.defaultGroup) {            
      let historyUrl = inputPath
      this.updateHistory(historyUrl, popped)
    }
    if (toggle === false) {
      this.showView(newPath.split('?')[0], this.currentParams, group)
    }
    else if (newPath && newPath !== '') {      
      this.showView(newPath, null, group)
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
  updateHistory (historyUrl, replaceState = false, overridePersistent = false) {
    if (this.options.urlPrefix) {
      historyUrl = historyUrl === '/' ? '' : `/${historyUrl}`      
      historyUrl = (`/${this.options.urlPrefix}${historyUrl}`).replace(/\/\//g, '/')
    }
    if ((this.currentParams && this.currentParams.path) || overridePersistent === true) {
      historyUrl += `?${this.currentParams.path}`
    }
    else if (this.queryParams && this.options.persistentParameters === true) {
      historyUrl += `?${this.queryParams}`
    }
    if (replaceState === false) {                
      history.pushState({
        inputPath: historyUrl
      }, 'unused', historyUrl) 
    }
    else {
      history.replaceState({
        inputPath: historyUrl
      }, 'unused', historyUrl) 
    }
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
