class WebsySearch {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      searchIcon: `<svg class='search' width="20" height="20" viewBox="0 0 512 512"><path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><line x1="338.29" y1="338.29" x2="448" y2="448" style="fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg>`,
      clearIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><title>ionicons-v5-l</title><line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,
      clearAlwaysOn: false,
      placeholder: 'Search',
      searchTimeout: 500,
      suggestTimeout: 100,
      suggestingTimeout: 3000,
      suggestLimit: 5,
      minLength: 2
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.searchTimeoutFn = null
    this.suggestTimeoutFn = null
    this.suggestingTimeoutFn = null
    this.isSuggesting = false
    this.inSuggestions = false
    this.cursorPosition = 0
    this.terms = []
    this.Key = {
      BACKSPACE: 8,
      ESCAPE: 27,
      CONTROL: 17,
      COMMAND: 91,
      PASTE: 86,
      TAB: 9,
      ENTER: 13,
      SHIFT: 16,
      UP: 38,
      DOWN: 40,
      RIGHT: 39,
      LEFT: 37,
      DELETE: 46,
      SPACE: 32
    }
    const el = document.getElementById(elementId)
    if (el) {
      // el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      el.addEventListener('keydown', this.handleKeyDown.bind(this))
      el.addEventListener('mouseover', this.handleMouseOver.bind(this))
      // el.innerHTML = `
      //   <div class='websy-search-input-container'>
      //     ${this.options.searchIcon}
      //     <input id='${this.elementId}_search' class='websy-search-input' placeholder='${this.options.placeholder || 'Search'}' value='${this.options.initialValue || ''}'>
      //     <div class='clear ${this.options.clearAlwaysOn === true ? '' : 'websy-hidden'}' id='${this.elementId}_clear'>
      //       ${this.options.clearIcon}
      //     </div>
      //   </div>
      // `
      el.innerHTML = `
        <div class='websy-search-input-container'>
          ${this.options.searchIcon}
          <div id='${this.elementId}_ghost' class='websy-search-input-ghost'></div>
          <div id='${this.elementId}_lozenges' class='websy-search-lozenge-container'></div>
          <input id='${this.elementId}_search' class='websy-search-input' placeholder='${this.options.placeholder || 'Search'}' value='${this.options.initialValue || ''}' autocorrect='off' autocomplete='off' autocapitalize='off' spellcheck='false'>
          <div id='${this.elementId}_ambiguities' class='websy-search-ambiguity-container'></div>
          <div class='clear ${this.options.clearAlwaysOn === true ? '' : 'websy-hidden'}' id='${this.elementId}_clear'>
            ${this.options.clearIcon}
          </div>
          <div id='${this.elementId}_suggestions' class='websy-search-suggestion-container'>
            <ul id='${this.elementId}_suggestionList'></ul>
          </div>
          <div id='${this.elementId}_associations' class='websy-search-association-container'>
            <ul id='${this.elementId}_associationsList'></ul>
          </div>
        </div>
      `
    }
    else {
      console.log('No element found with Id', elementId)
    }
  }
  acceptSuggestion () {
    this.searchText = this.ghostQuery
    this._suggestions = []
    this.hideSuggestions()    
    const inputEl = document.getElementById(`${this.elementId}_search`)
    if (inputEl) {
      inputEl.value = this.searchText
    }    
    if (this.options.onSearch) {
      this.options.onSearch(this.searchText)
    }
  }
  handleClick (event) {
    if (event.target.classList.contains('clear')) {
      const inputEl = document.getElementById(`${this.elementId}_search`)
      inputEl.value = ''
      // if (this.options.onSearch) {
      //   this.options.onSearch('')
      // }      
      if (this.options.onClear) {
        this.options.onClear()
      }      
    }
    else if (event.target.classList.contains('websy-search-suggestion-item')) {
      this.acceptSuggestion() 
    }
  }
  handleKeyDown (event) {
    if (event.key === 'Enter') {
      if (this.options.onSubmit) {
        this.options.onSubmit(event.target.value)
        event.preventDefault()
        return false
      }
    }
    else if (event.keyCode === this.Key.ESCAPE) {
      this.hideSuggestions()
    }
    else if (event.keyCode === this.Key.CONTROL || event.keyCode === this.Key.COMMAND) {
      // show the suggestions again
      this.isCutCopyPaste = true
    }
    else if (event.keyCode === this.Key.PASTE && this.isCutCopyPaste) {
      // show the suggestions again
      this.isPaste = true
    }
    else if (event.keyCode === this.Key.DOWN) {
      // show the suggestions again
      this.inSuggestions = true
      this.showSuggestions()
    }
    else if (event.keyCode === this.Key.UP) {
      // show the suggestions again
      if (this.inSuggestions) {
        event.preventDefault()
      }
      this.inSuggestions = false      
    }
    else if (event.keyCode === this.Key.RIGHT) {
      if (this.suggesting && this.inSuggestions) {
        // activate the next suggestion
        event.preventDefault()
        this.nextSuggestion()
      }
    }
    else if (event.keyCode === this.Key.LEFT) {
      if (this.suggesting && this.inSuggestions) {
        // activate the previous suggestion
        event.preventDefault()
        this.prevSuggestion()
      }
    }
    else if (event.keyCode === this.Key.ENTER || event.keyCode === this.Key.TAB) {
      if (this.suggesting) {
        event.preventDefault()
        this.acceptSuggestion()
      }
      else if (this.associating && event.keyCode === this.Key.ENTER) {
        event.preventDefault()
        // this.searchEntity.selectAssociations(this.searchFields || [],  0);
        this.hideAssociations()
      }
    }
    else if (event.keyCode === this.Key.SPACE) {     
      this.hideSuggestions()
      // this.hideAssociations()  
    }
    // else{
    //   this.hideSuggestions();
    //   this.hideAssociations();
    // }
  }
  handleKeyUp (event) {
    if (event.target.classList.contains('websy-search-input')) {
      this.cursorPosition = event.target.selectionStart
      this.searchText = event.target.value
      if (this.searchTimeoutFn) {
        clearTimeout(this.searchTimeoutFn)
      }
      if (event.key === 'Enter' || event.key === 'Tab') {
        return false
      }
      const clearEl = document.getElementById(`${this.elementId}_clear`)
      if (this.options.clearAlwaysOn === false) {
        if (event.target.value.length > 0) {
          clearEl.classList.remove('websy-hidden')
        }
        else {
          clearEl.classList.add('websy-hidden')
        }
      }    
      if (this.options.onKeyUp) {
        this.options.onKeyUp(event.target.value, event)
      }  
      if (event.target.value.length >= this.options.minLength) {
        this.searchTimeoutFn = setTimeout(() => {
          if (this.options.onSearch) {
            this.options.onSearch(event.target.value, event)
          }
        }, this.options.searchTimeout) 
      }      
      else {
        if (this.options.onSearch && (event.key === 'Delete' || event.key === 'Backspace')) {
          if (this.options.onSearch) {
            this.options.onSearch('', event)
          }
        }
      }
    }
    this.renderLozenges()
  }
  handleMouseOver (event) {
    if (event.target.classList.contains('websy-search-suggestion-item')) {
      this.startSuggestionTimeout()
      const index = event.target.getAttribute('data-index')
      this.activeSuggestion = +index
      this.renderGhost()
      this.highlightActiveSuggestion()    
    }
  }
  hideSuggestions () {
    this.suggesting = false
    this.activeSuggestion = 0
    this.inSuggestions = false
    this.ghostPart = ''
    this.ghostQuery = ''
    this.ghostDisplay = ''
    this.hideGhost()    
    const suggestEl = document.getElementById(`${this.elementId}_suggestions`)
    if (suggestEl) {
      suggestEl.classList.remove('active')
    }    
  }
  hideGhost () {
    const ghostEl = document.getElementById(`${this.elementId}_ghost`)
    if (ghostEl) {
      ghostEl.innerHTML = ''
    }
  }
  highlightActiveSuggestion () {    
    // remove all previous highlights    
    // const parent = document.getElementById(`${this.elementId}_suggestionList`)
    // if (parent) {
    //   for (let c = 0; c < parent.childElementCount; c++) {
    //     parent.childNodes[c].classList.remove('active')
    //   }
    // }
    // // add the 'active' class to the current suggestion
    // const activeSuggEl = document.getElementById(`${this.elementId}_suggestion_${this.activeSuggestion}`)
    // if (activeSuggEl) {
    //   activeSuggEl.classList.add('active')
    // }   
    const el = document.getElementById(this.elementId)
    if (el) {
      const els = document.querySelectorAll('.websy-search-suggestion-item')
      Array.from(els).forEach(e => {
        e.classList.remove('active')
        const index = e.getAttribute('data-index')
        if (+index === this.activeSuggestion) {
          e.classList.add('active')
        }
      })
    }
  }
  nextSuggestion () {    
    this.startSuggestionTimeout()
    if (this.activeSuggestion === this._suggestions.length - 1) {
      this.activeSuggestion = 0
    }
    else {
      this.activeSuggestion++
    }
    this.renderGhost()
    this.highlightActiveSuggestion()    
  }
  prevSuggestion () {    
    this.startSuggestionTimeout()
    if (this.activeSuggestion === 0) {
      this.activeSuggestion = this._suggestions.length - 1
    }
    else {
      this.activeSuggestion--
    }
    this.renderGhost()
    this.highlightActiveSuggestion()
  }
  renderGhost () {
    this.ghostPart = getGhostString(this.searchText, this._suggestions[this.activeSuggestion].label)    
    this.ghostQuery = this.searchText + this.ghostPart    
    const ghostDisplay = `<span style='color: transparent;'>${this.searchText}</span>${this.ghostPart}`
    const ghostEl = document.getElementById(`${this.elementId}_ghost`)
    if (ghostEl) {
      ghostEl.innerHTML = ghostDisplay
    }    
    function getGhostString (query, suggestion) {
      let suggestBase = query.toLowerCase()      
      suggestion = suggestion.toLowerCase()      
      while (suggestion.indexOf(suggestBase) === -1) {
        suggestBase = suggestBase.split(' ')
        suggestBase.splice(0, 1)
        suggestBase = suggestBase.join(' ')
      }
      const re = new RegExp(suggestBase, 'i')
      return suggestion.replace(re, '')
    }
  }
  renderLozenges () {
    let searchLetters = (this.searchText || '').split('').map(d => ({text: d}))    
    this._terms.sort((a, b) => {
      return b.position - a.position
    }).forEach(term => {
      searchLetters.splice(term.position, term.length, {text: term.term, term: term})
    })    
    let items = searchLetters.map(d => {
      let html = `<div`
      if (d.term && d.term.label) {
        html += `
          data-label="${d.term.label}"
        `
      }
      html += `>${d.text.replace(/ /g, '&nbsp;')}</div>`
      return html
    })
    const el = document.getElementById(`${this.elementId}_lozenges`)
    if (el) {      
      el.innerHTML = items.join('')
    }
  }
  renderSuggestion () {
    let suggestionsHtml = ''
    for (let i = 0; i < this._suggestions.length; i++) {
      suggestionsHtml += `
        <li id='${this.elementId}_suggestion_${i}' class='websy-search-suggestion-item' data-index='${i}'>
          ${this._suggestions[i].label}
        </li>
      `
    }    
    const suggListEl = document.getElementById(`${this.elementId}_suggestionList`)
    if (suggListEl) {
      suggListEl.innerHTML = suggestionsHtml
    }    
    this.highlightActiveSuggestion()
  }
  showSuggestions () {
    this.startSuggestionTimeout()
    if (this.searchText && this.searchText.length > 1 && this.cursorPosition === this.searchText.length && this._suggestions.length > 0) {
      if (!this.suggesting) {
        this.activeSuggestion = 0
        this.suggesting = true      
      }
      // render the suggested completion
      this.renderGhost()
      // render the suggestions      
      const suggestEl = document.getElementById(`${this.elementId}_suggestions`)
      if (suggestEl) {
        suggestEl.classList.add('active')
      }      
      this.renderSuggestion()
    }
    else {
      this.suggesting = false
      this.hideGhost()
      this.hideSuggestions()
    }
  }
  startSuggestionTimeout () {
    if (this.suggestingTimeoutFn) {
      clearTimeout(this.suggestingTimeoutFn)
    }
    this.suggestingTimeoutFn = setTimeout(() => {
      // close the suggestions after inactivity for [suggestingTimeout] milliseconds      
      this.hideSuggestions(this)      
    }, this.options.suggestingTimeout)
  }
  set suggestions (items = []) {
    this._suggestions = items.splice(0, this.options.suggestLimit)
    this.showSuggestions()
  }
  get text () {
    const el = document.getElementById(`${this.elementId}_search`)
    if (el) {
      return el.value
    }
    return ''
  }
  set text (text) {
    const el = document.getElementById(`${this.elementId}_search`)
    if (el) {
      el.value = text
    }
  }
  set terms (terms = []) {
    this._terms = terms
    console.log('terms', terms)
    this.renderLozenges()
  }
}
