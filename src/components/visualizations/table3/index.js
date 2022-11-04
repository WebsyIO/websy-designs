/* global WebsyDesigns */ 
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
            <table id="${this.elementId}_tableHeader" class="websy-table-header"></table>
            <table id="${this.elementId}_tableBody" class="websy-table-body"></table>
            <table id="${this.elementId}_tableFooter" class="websy-table-footer"></table>
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
      this.loadingDialog = new WebsyDesigns.LoadingDialog(`${this.elementId}_loadingContainer`)
      this.render(this.options.data)
    }
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  appendRows (data) {
    this.hideError()
    let bodyEl = document.getElementById(`${this.elementId}_tableBody`)    
    if (bodyEl) {
      bodyEl.innerHTML = this.buildBodyHtml(data, true)
    }
    this.data = this.data.concat(data)
    this.rowCount = this.data.length   
  }
  buildBodyHtml (data = [], useWidths = false) {
    if (data.length === 0) {
      return ''
    }
    let bodyHtml = ``
    let sizingColumns = this.options.columns[this.options.columns.length - 1]
    if (useWidths === true) {
      bodyHtml += '<colgroup>'
      bodyHtml += sizingColumns.map(c => `
        <col
          style='width: ${c.width || c.actualWidth}px!important'
        ></col>
      `).join('')
      bodyHtml += '</colgroup>'
    }
    data.forEach(row => {
      bodyHtml += `<tr class="websy-table-row">`
      row.forEach((cell, cellIndex) => {
        bodyHtml += `<td 
          class='websy-table-cell'
          style='${cell.style}'
          data-info='${cell.value}'
          colspan='${cell.colspan || 1}'
          rowspan='${cell.rowspan || 1}'
        `
        // if (useWidths === true) {
        //   bodyHtml += `
        //     style='width: ${sizingColumns[cellIndex].width || sizingColumns[cellIndex].actualWidth}px!important'
        //     width='${sizingColumns[cellIndex].width || sizingColumns[cellIndex].actualWidth}'
        //   `
        // }
        bodyHtml += `
        >
          ${cell.value}
        </td>`
      })
      bodyHtml += `</tr>`
    })    
    // bodyHtml += `</div>`    
    return bodyHtml
  }
  buildHeaderHtml (useWidths = false) {
    let headerHtml = ''
    let sizingColumns = this.options.columns[this.options.columns.length - 1]
    if (useWidths === true) {
      headerHtml += '<colgroup>'
      headerHtml += sizingColumns.map(c => `
        <col
          style='width: ${c.width || c.actualWidth}px!important'
        ></col>
      `).join('')
      headerHtml += '</colgroup>'
    }
    this.options.columns.forEach((row, rowIndex) => {
      headerHtml += `<tr class="websy-table-row  websy-table-header-row">`
      row.forEach(col => {
        headerHtml += `<td 
          class='websy-table-cell'  
          style='${col.style}'       
          colspan='${col.colspan || 1}'
          rowspan='${col.rowspan || 1}'
        `
        // if (useWidths === true && rowIndex === this.options.columns.length - 1) {
        //   headerHtml += `
        //     style='width: ${col.width || col.actualWidth}px'
        //     width='${col.width || col.actualWidth}'
        //   `
        // }
        headerHtml += `        
          >
          ${col.name}
        </td>`
      })
      headerHtml += `</tr>`
    })
    return headerHtml
  }
  buildTotalHtml (useWidths = false) {
    if (!this.options.totals) {
      return ''
    }
    let totalHtml = `<tr class="websy-table-row  websy-table-total-row">`
    this.options.totals.forEach((col, colIndex) => {
      totalHtml += `<td 
        class='websy-table-cell'
        colspan='${col.colspan || 1}'
        rowspan='${col.rowspan || 1}'
      `
      if (useWidths === true) {
        totalHtml += `
          style='width: ${this.options.columns[this.options.columns.length - 1][colIndex].width || this.options.columns[this.options.columns.length - 1][colIndex].actualWidth}px'
          width='${col.width || col.actualWidth}'
        `
      }
      totalHtml += `        
        >
        ${col.value}
      </td>`
    })
    totalHtml += `</tr>`
    return totalHtml
  }
  calculateSizes (sample = []) {
    let outerEl = document.getElementById(this.elementId)
    let tableEl = document.getElementById(`${this.elementId}_tableContainer`)
    let headEl = document.getElementById(`${this.elementId}_tableHeader`)
    headEl.style.width = 'auto'
    headEl.innerHTML = this.buildHeaderHtml()    
    this.sizes.header = headEl.getBoundingClientRect()
    let bodyEl = document.getElementById(`${this.elementId}_tableBody`)
    bodyEl.style.width = 'auto'
    bodyEl.innerHTML = this.buildBodyHtml([sample])
    let footerEl = document.getElementById(`${this.elementId}_tableFooter`)
    footerEl.innerHTML = this.buildTotalHtml()
    this.sizes.total = footerEl.getBoundingClientRect()
    const rows = Array.from(tableEl.querySelectorAll('.websy-table-row'))    
    let totalWidth = 0
    rows.forEach((row, rowIndex) => {
      Array.from(row.children).forEach((col, colIndex) => {
        let colSize = col.getBoundingClientRect()
        if (this.options.columns[this.options.columns.length - 1][colIndex]) {
          if (!this.options.columns[this.options.columns.length - 1][colIndex].actualWidth) {
            this.options.columns[this.options.columns.length - 1][colIndex].actualWidth = 0
          }
          this.options.columns[this.options.columns.length - 1][colIndex].actualWidth = Math.max(this.options.columns[this.options.columns.length - 1][colIndex].actualWidth, colSize.width)          
          this.options.columns[this.options.columns.length - 1][colIndex].cellHeight = colSize.height
        }        
      })      
    })
    this.sizes.totalWidth = this.options.columns[this.options.columns.length - 1].reduce((a, b) => a + (b.width || b.actualWidth), 0)
    const outerSize = outerEl.getBoundingClientRect()
    if (this.sizes.totalWidth < outerSize.width) {
      this.sizes.totalWidth = 0
      let equalWidth = outerSize.width / this.options.columns[this.options.columns.length - 1].length
      this.options.columns[this.options.columns.length - 1].forEach((c, i) => {
        if (!c.width) {
          if (c.actualWidth < equalWidth) {
            // adjust the width
            c.actualWidth = equalWidth
          }
        }
        this.sizes.totalWidth += c.width || c.actualWidth
        equalWidth = (outerSize.width - this.sizes.totalWidth) / (this.options.columns[this.options.columns.length - 1].length - (i + 1))
      })
    }
    // take the height of the last cell as the official height for data cells
    // this.sizes.dataCellHeight = this.options.columns[this.options.columns.length - 1].cellHeight
    headEl.innerHTML = ''
    bodyEl.innerHTML = ''
    footerEl.innerHTML = ''
    headEl.style.width = 'initial'
    bodyEl.style.width = 'initial'
    return this.sizes    
  }
  createSample (data) {
    let output = []
    this.options.columns[this.options.columns.length - 1].forEach((col, colIndex) => {
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
  hideError () {
    const el = document.getElementById(`${this.elementId}_tableContainer`)
    if (el) {
      el.classList.remove('has-error')
    }
    const tableEl = document.getElementById(`${this.elementId}_tableInner`)
    tableEl.classList.remove('hidden')
    const containerEl = document.getElementById(`${this.elementId}_errorContainer`)
    if (containerEl) {
      containerEl.classList.remove('active')
    }
  }
  hideLoading () {
    this.loadingDialog.hide()
  }
  render (data) {
    if (!this.options.columns) {
      console.log(`No columns provided for table with ID ${this.elementId}`)
      return
    }
    if (this.options.columns.length === 0) {
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
    // bodyEl.innerHTML = this.buildBodyHtml(data, true)
    bodyEl.style.height = `calc(100% - ${this.sizes.header.height}px - ${this.sizes.total.height}px)`
  }
  resize () {

  }
  showError (options) {
    const el = document.getElementById(`${this.elementId}_tableContainer`)
    if (el) {
      el.classList.add('has-error')
    }
    const tableEl = document.getElementById(`${this.elementId}_tableInner`)
    tableEl.classList.add('hidden')
    const containerEl = document.getElementById(`${this.elementId}_errorContainer`)
    if (containerEl) {
      containerEl.classList.add('active')
    }
    if (options.title) {
      const titleEl = document.getElementById(`${this.elementId}_errorTitle`)
      if (titleEl) {
        titleEl.innerHTML = options.title
      } 
    }
    if (options.message) {
      const messageEl = document.getElementById(`${this.elementId}_errorMessage`)
      if (messageEl) {
        messageEl.innerHTML = options.message
      } 
    }
  }
  showLoading (options) {
    this.loadingDialog.show(options)
  }
}
