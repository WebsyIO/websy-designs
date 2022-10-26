class WebsyTable3 {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      virtualScroll: false,
      showTotalsAbove: true
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.sizes = {}
    if (!elementId) {
      console.log('No element Id provided for Websy Table')		
      return
    }
    const el = document.getElementById(this.elementId)    
    if (el) {
      let html = `
        <div id='${this.elementId}_tableContainer' class='websy-vis-table-3 ${this.options.paging === 'pages' ? 'with-paging' : ''} ${this.options.virtualScroll === true ? 'with-virtual-scroll' : ''}'>
          <!--<div class="download-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z"/></svg>
          </div>-->
          <div id="${this.elementId}_tableInner" class="websy-table-inner-container">
            <div id="${this.elementId}_tableHeader" class="websy-table-header"></div>
            <div id="${this.elementId}_tableBody" class="websy-table-body"></div>
            <div id="${this.elementId}_tableFooter" class="websy-table-footer"></div>
          </div>     
          <div id="${this.elementId}_errorContainer" class='websy-vis-error-container'>
            <div>
              <div id="${this.elementId}_errorTitle"></div>
              <div id="${this.elementId}_errorMessage"></div>
            </div>            
          </div>
          <div id="${this.elementId}_vScrollContainer" class="websy-v-scroll-container">
            <div id="${this.elementId}_vScrollHandle" class="websy-scroll-handle websy-scroll-handle-y"></div>
          </div>
          <div id="${this.elementId}_hScrollContainer" class="websy-h-scroll-container">
            <div id="${this.elementId}_hScrollHandle" class="websy-scroll-handle websy-scroll-handle-x"></div>
          </div>
          <div id="${this.elementId}_dropdownContainer"></div>
          <div id="${this.elementId}_loadingContainer"></div>
        </div>
      `      
      if (this.options.paging === 'pages') {
        html += `
          <div class="websy-table-paging-container">
            Show <div id="${this.elementId}_pageSizeSelector" class="websy-vis-page-selector"></div> rows
            <ul id="${this.elementId}_pageList" class="websy-vis-page-list"></ul>
          </div>
        `
      }
      el.innerHTML = html
      this.render(this.options.data)
    }
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  appendRows (data) {
    let bodyEl = document.getElementById(`${this.elementId}_tableBody`)    
    if (bodyEl) {
      bodyEl.innerHTML = this.buildBodyHtml(data)
    }
    this.data = this.data.concat(data)
    this.rowCount = this.data.length   
  }
  buildBodyHtml (data = [], useWidths = false) {
    if (data.length === 0) {
      return ''
    }
    let bodyHtml = ``    
    data.forEach(row => {
      bodyHtml += `<div class="websy-table-row">`
      row.forEach((cell, cellIndex) => {
        bodyHtml += `<div 
          class='websy-table-cell'
          data-info='${cell.value}'
        `
        if (useWidths === true) {
          bodyHtml += `
            style='width: ${this.options.columns[cellIndex].width || this.options.columns[cellIndex].actualWidth}px'
          `
        }
        bodyHtml += `
        >
          ${cell.value}
        </div>`
      })
      bodyHtml += `</div>`
    })    
    bodyHtml += `</div>`    
    return bodyHtml
  }
  buildHeaderHtml (useWidths = false) {
    let headerHtml = `<div class="websy-table-row  websy-table-header-row">`
    this.options.columns.forEach(col => {
      headerHtml += `<div 
        class='websy-table-cell'
      `
      if (useWidths === true) {
        headerHtml += `
          style='width: ${col.width || col.actualWidth}px'
        `
      }
      headerHtml += `        
        >
        ${col.name}
      </div>`
    })
    headerHtml += `</div>`
    return headerHtml
  }
  buildTotalHtml (useWidths = false) {
    if (!this.options.totals) {
      return ''
    }
    let totalHtml = `<div class="websy-table-row  websy-table-total-row">`
    this.options.totals.forEach((col, colIndex) => {
      totalHtml += `<div 
        class='websy-table-cell'
      `
      if (useWidths === true) {
        totalHtml += `
          style='width: ${this.options.columns[colIndex].width || this.options.columns[colIndex].actualWidth}px'
        `
      }
      totalHtml += `        
        >
        ${col.value}
      </div>`
    })
    totalHtml += `</div>`
    return totalHtml
  }
  calculateSizes (sample = []) {
    let outerEl = document.getElementById(this.elementId)
    let tableEl = document.getElementById(`${this.elementId}_tableContainer`)
    let headEl = document.getElementById(`${this.elementId}_tableHeader`)
    headEl.innerHTML = this.buildHeaderHtml()    
    this.sizes.header = headEl.getBoundingClientRect()
    let bodyEl = document.getElementById(`${this.elementId}_tableBody`)
    bodyEl.innerHTML = this.buildBodyHtml([sample])
    let footerEl = document.getElementById(`${this.elementId}_tableFooter`)
    footerEl.innerHTML = this.buildTotalHtml()
    this.sizes.total = footerEl.getBoundingClientRect()
    const rows = Array.from(tableEl.querySelectorAll('.websy-table-row'))    
    let totalWidth = 0
    rows.forEach((row, rowIndex) => {
      Array.from(row.children).forEach((col, colIndex) => {
        let colSize = col.getBoundingClientRect()
        if (this.options.columns[colIndex]) {
          if (!this.options.columns[colIndex].actualWidth) {
            this.options.columns[colIndex].actualWidth = 0
          }
          this.options.columns[colIndex].actualWidth = Math.max(this.options.columns[colIndex].actualWidth, colSize.width)          
        }        
      })      
    })
    this.sizes.totalWidth = this.options.columns.reduce((a, b) => a + (b.width || b.actualWidth), 0)
    const outerSize = outerEl.getBoundingClientRect()
    if (this.sizes.totalWidth < outerSize.width) {
      this.sizes.totalWidth = 0
      let equalWidth = outerSize.width / this.options.columns.length
      this.options.columns.forEach((c, i) => {
        if (!c.width) {
          if (c.actualWidth < equalWidth) {
            // adjust the width
            c.actualWidth = equalWidth
          }
        }
        this.sizes.totalWidth += c.width || c.actualWidth
        equalWidth = (outerSize.width - this.sizes.totalWidth) / (this.options.columns.length - (i + 1))
      })
    }
    headEl.innerHTML = ''
    bodyEl.innerHTML = ''
    footerEl.innerHTML = ''    
  }
  createSample (data) {
    let output = []
    this.options.columns.forEach((col, colIndex) => {
      if (col.maxLength) {
        output.push({value: new Array(col.maxLength).fill('W').join('')})
      }
      else if (data) {
        let longest = ''
        for (let i = 0; i < Math.min(data.length, 1000); i++) {          
          if (longest.length < data[i][colIndex].value.length) {
            longest = data[i][colIndex].value
          }
        }
        output.push({value: longest})
      }
      else {
        output.push({value: ''})
      }
    })
    return output
  }
  render (data) {
    if (!this.options.columns) {
      console.log(`No columns provided for table with ID ${this.elementId}`)
      return
    }
    this.data = []
    // Adjust the sizing of the header/body/footer
    const sample = this.createSample(data)
    this.calculateSizes(sample)  
    console.log(this.options.columns)
    const tableInnerEl = document.getElementById(`${this.elementId}_tableInner`)
    if (tableInnerEl) {
      tableInnerEl.style.width = `${this.sizes.totalWidth}px`
    }
    let headEl = document.getElementById(`${this.elementId}_tableHeader`)    
    if (headEl) {
      headEl.innerHTML = this.buildHeaderHtml(true)
    }
    let totalHtml = this.buildTotalHtml(true)
    if (this.options.showTotalsAbove === true) {
      headEl.innerHTML += totalHtml
    }
    else {
      const footerEl = document.getElementById(`${this.elementId}_tableFooter`)
      if (footerEl) {
        footerEl.innerHTML = totalHtml
      }
    }
    if (data) {      
      this.appendRows(data)
    }
    let bodyEl = document.getElementById(`${this.elementId}_tableBody`)
    bodyEl.innerHTML = this.buildBodyHtml(data, true)
    bodyEl.style.height = `calc(100% - ${this.sizes.header.height}px - ${this.sizes.total.height}px)`
  }
  resize () {

  }
}
