class WebsySearch {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      searchIcon: `<svg class='search' width="20" height="20" viewBox="0 0 512 512"><path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><line x1="338.29" y1="338.29" x2="448" y2="448" style="fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg>`,
      clearIcon: `<svg class='clear' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><title>ionicons-v5-l</title><line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,
      placeholder: 'Search',
      searchTimeout: 500,
      minLength: 2
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.searchTimeoutFn = null
    const el = document.getElementById(elementId)
    if (el) {
      // el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      el.innerHTML = `
          <div class='websy-search-input-container'>
            ${this.options.searchIcon}
            <input id='${this.elementId}_search' class='websy-search-input' placeholder='${this.options.placeholder || 'Search'}'>
            ${this.options.clearIcon}
          </div>
        `
    }
    else {
      console.log('No element found with Id', elementId)
    }
  }
  handleKeyUp (event) {
    if (event.target.classList.contains('websy-search-input')) {
      if (this.searchTimeoutFn) {
        clearTimeout(this.searchTimeoutFn)
      }
      if (event.target.value.length >= this.options.minLength) {
        this.searchTimeoutFn = setTimeout(() => {
          if (this.options.onSearch) {
            this.options.onSearch(event.target.value)
          }
        }, this.options.searchTimeout) 
      }      
      else {
        if (this.options.onSearch) {
          this.options.onSearch('')
        }
      }
    }
  }
}
