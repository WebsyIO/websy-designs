/* global WebsyDesigns */
class Pager {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      pageSizePrefix: 'Show',
      pageSizeSuffix: 'rows',
      pageSizeOptions: [
        { label: '10', value: 10 }, 
        { label: '20', value: 20 }, 
        { label: '50', value: 50 }, 
        { label: '100', value: 100 }
      ],
      selectedPageSize: 20,
      pageLabel: 'Page',
      showPageSize: true,
      activePage: 0,
      pages: []
    }    
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = `
        <div class="websy-pager-container">
      `
      if (this.options.showPageSize === true) {
        html += `
          ${this.options.pageSizePrefix} <div id="${this.elementId}_pageSizeSelector" class="websy-page-selector"></div> ${this.options.pageSizeSuffix}          
        `
      }          
      html += `
          <ul id="${this.elementId}_pageList" class="websy-page-list"></ul>        
        </div> 
      `
      el.innerHTML = html
      el.addEventListener('click', this.handleClick.bind(this))
      if (this.options.showPageSize === true) {
        this.pageSizeSelector = new WebsyDesigns.Dropdown(`${this.elementId}_pageSizeSelector`, {
          selectedItems: [this.options.pageSizeOptions.indexOf(this.options.selectedPageSize)],
          items: this.pageSizeOptions.map(p => ({ label: p.toString(), value: p })),
          allowClear: false,
          disableSearch: true,
          onItemSelected: (selectedItem) => {
            if (this.options.onChangePageSize) {
              this.options.onChangePageSize(selectedItem.value)
            }
          }
        })
      }      
      this.render() 
    }    
  }
  handleClick (event) {    
    if (event.target.classList.contains('websy-page-num')) {
      const pageNum = +event.target.getAttribute('data-index')
      if (this.options.onSetPage) {
        this.options.onSetPage(this.options.pages[pageNum])
      }
    }   
  }
  render () {
    const el = document.getElementById(`${this.elementId}_pageList`)
    if (el) {
      let pages = this.options.pages.map((item, index) => {
        return `<li data-index="${index}" class="websy-page-num ${(this.options.activePage === index) ? 'active' : ''}">${index + 1}</li>`
      })
      let startIndex = 0
      if (this.options.pages.length > 8) {
        startIndex = Math.max(0, this.options.activePage - 4)
        pages = pages.splice(startIndex, 10)
        if (startIndex > 0) {
          pages.splice(0, 0, `<li>${this.options.pageLabel}&nbsp;</li><li data-page="0" class="websy-page-num">First</li><li>...</li>`)
        }
        else {
          pages.splice(0, 0, `<li>${this.options.pageLabel}&nbsp;</li>`)
        }
        if (this.options.activePage < this.options.pages.length - 1) {
          pages.push('<li>...</li>')
          pages.push(`<li data-page="${this.options.pages.length - 1}" class="websy-page-num">Last</li>`)
        }
      }
      el.innerHTML = pages.join('')
    }
  }
}
