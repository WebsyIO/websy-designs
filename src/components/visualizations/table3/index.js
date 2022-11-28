/* global WebsyDesigns */ 
class WebsyTable3 {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      virtualScroll: false,
      showTotalsAbove: true,
      minHandleSize: 20,
      maxColWidth: '50%',
      allowPivoting: false
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.sizes = {}
    this.scrollDragging = false
    this.cellDragging = false
    this.vScrollRequired = false
    this.hScrollRequired = false
    this.pinnedColumns = 0
    this.startRow = 0
    this.endRow = 0
    this.startCol = 0
    this.endCol = 0    
    this.mouseYStart = 0    
    this.mouseYStart = 0
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
            <div id="${this.elementId}_vScrollContainer" class="websy-v-scroll-container">
              <div id="${this.elementId}_vScrollHandle" class="websy-scroll-handle websy-scroll-handle-y"></div>
            </div>
            <div id="${this.elementId}_hScrollContainer" class="websy-h-scroll-container">
              <div id="${this.elementId}_hScrollHandle" class="websy-scroll-handle websy-scroll-handle-x"></div>
            </div>
          </div>     
          <div id="${this.elementId}_errorContainer" class='websy-vis-error-container'>
            <div>
              <div id="${this.elementId}_errorTitle"></div>
              <div id="${this.elementId}_errorMessage"></div>
            </div>            
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
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('mousedown', this.handleMouseDown.bind(this))
      window.addEventListener('mousemove', this.handleMouseMove.bind(this))
      window.addEventListener('mouseup', this.handleMouseUp.bind(this))
      let scrollEl = document.getElementById(`${this.elementId}_tableBody`)
      if (scrollEl) {
        scrollEl.addEventListener('wheel', this.handleScrollWheel.bind(this))
      }
      this.loadingDialog = new WebsyDesigns.LoadingDialog(`${this.elementId}_loadingContainer`)
      this.render(this.options.data)
    }
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  set columns (columns) {
    this.options.columns = columns
    this.renderColumnHeaders()
  }
  set totals (totals) {
    this.options.totals = totals
    this.renderTotals()
  }
  appendRows (data) {
    this.hideError()
    let bodyEl = document.getElementById(`${this.elementId}_tableBody`)    
    if (bodyEl) {
      if (this.options.virtualScroll === true) {
        bodyEl.innerHTML = this.buildBodyHtml(data, true)
      }      
      else {
        bodyEl.innerHTML += this.buildBodyHtml(data, true)
      }
    }
    // this.data = this.data.concat(data)
    // this.rowCount = this.data.length   
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
      if (useWidths === false && rowIndex !== this.options.columns.length - 1) {
        // if we're calculating the size we only want to render the last row of column headers
        return
      }
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
  calculateSizes (sample = [], totalRowCount, totalColumnCount, pinnedColumns) {
    this.totalRowCount = totalRowCount // probably need some error handling here if no value is passed in
    this.totalColumnCount = totalColumnCount // probably need some error handling here if no value is passed in
    this.pinnedColumns = pinnedColumns // probably need some error handling here if no value is passed in    
    let outerEl = document.getElementById(this.elementId)
    let tableEl = document.getElementById(`${this.elementId}_tableContainer`)
    let headEl = document.getElementById(`${this.elementId}_tableHeader`)
    headEl.style.width = 'auto'
    headEl.innerHTML = this.buildHeaderHtml()        
    this.sizes.outer = outerEl.getBoundingClientRect()
    this.sizes.table = tableEl.getBoundingClientRect()
    this.sizes.header = headEl.getBoundingClientRect()
    let maxWidth
    if (typeof this.options.maxColWidth === 'number') {
      maxWidth = this.options.maxColWidth
    }
    else if (this.options.maxColWidth.indexOf('%') !== -1) {
      maxWidth = this.sizes.outer.width * (+(this.options.maxColWidth.replace('%', '')) / 100)
    }
    else if (this.options.maxColWidth.indexOf('px') !== -1) {
      maxWidth = +this.options.maxColWidth.replace('px', '')
    }
    let bodyEl = document.getElementById(`${this.elementId}_tableBody`)
    bodyEl.style.width = 'auto'
    bodyEl.innerHTML = this.buildBodyHtml([sample])
    let footerEl = document.getElementById(`${this.elementId}_tableFooter`)
    footerEl.innerHTML = this.buildTotalHtml()
    this.sizes.total = footerEl.getBoundingClientRect()
    const rows = Array.from(tableEl.querySelectorAll('.websy-table-row'))    
    let totalWidth = 0
    this.sizes.scrollableWidth = this.sizes.outer.width
    rows.forEach((row, rowIndex) => {
      Array.from(row.children).forEach((col, colIndex) => {
        let colSize = col.getBoundingClientRect()
        this.sizes.cellHeight = colSize.height        
        if (this.options.columns[this.options.columns.length - 1][colIndex]) {
          if (!this.options.columns[this.options.columns.length - 1][colIndex].actualWidth) {
            this.options.columns[this.options.columns.length - 1][colIndex].actualWidth = 0
          }
          this.options.columns[this.options.columns.length - 1][colIndex].actualWidth = Math.min(Math.max(this.options.columns[this.options.columns.length - 1][colIndex].actualWidth, colSize.width), maxWidth)          
          this.options.columns[this.options.columns.length - 1][colIndex].cellHeight = colSize.height          
        }        
      })      
    })
    this.options.columns[this.options.columns.length - 1].forEach((col, colIndex) => {
      if (colIndex < this.pinnedColumns) {
        this.sizes.scrollableWidth -= col.actualWidth
      }
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
    this.sizes.bodyHeight = this.sizes.table.height - (this.sizes.header.height + this.sizes.total.height)
    this.sizes.rowsToRender = Math.ceil(this.sizes.bodyHeight / this.sizes.cellHeight)
    this.sizes.rowsToRenderPrecise = this.sizes.bodyHeight / this.sizes.cellHeight
    this.startRow = 0
    this.endRow = this.sizes.rowsToRender
    this.startCol = 0
    this.endCol = this.options.columns[this.options.columns.length - 1].length
    if (this.sizes.rowsToRender < this.totalRowCount) {
      this.vScrollRequired = true      
    }
    if (this.sizes.totalWidth > this.sizes.outer.width) {
      this.hScrollRequired = true
    }
    this.options.allColumns = this.options.columns.map(c => c)
    console.log('sizes', this.sizes)
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
  handleClick (event) {

  }
  handleMouseDown (event) {
    if (event.target.classList.contains('websy-scroll-handle-y')) {
      // set up the scroll start values
      this.scrollDragging = true
      this.scrollDirection = 'y'
      const scrollHandleEl = document.getElementById(`${this.elementId}_vScrollHandle`)
      this.handleYStart = scrollHandleEl.offsetTop
      this.mouseYStart = event.pageY
      console.log('mouse down', this.handleYStart, this.mouseYStart)
      console.log(scrollHandleEl.offsetTop)
    }
    else if (event.target.classList.contains('websy-scroll-handle-x')) {
      this.scrollDragging = true
      this.scrollDirection = 'x'
      const scrollHandleEl = document.getElementById(`${this.elementId}_hScrollHandle`)
      this.handleXStart = scrollHandleEl.offsetLeft
      this.mouseXStart = event.pageX
    }
  }
  handleMouseMove (event) {
    // event.preventDefault()
    if (this.scrollDragging === true) {
      if (this.scrollDirection === 'y') {        
        const diff = event.pageY - this.mouseYStart
        this.scrollY(diff)
      }
      else if (this.scrollDirection === 'x') {
        const diff = event.pageX - this.mouseXStart
        this.scrollX(diff)
      }
    }
  }
  handleMouseUp (event) {
    this.scrollDragging = false
    this.cellDragging = false
    this.handleYStart = null
    this.mouseYStart = null
    this.handleXStart = null
    this.mouseXStart = null
  }
  handleScrollWheel (event) {
    event.preventDefault()
    console.log('scrollwheel', event)
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      this.scrollX(Math.max(-5, Math.min(5, event.deltaX)))
    }
    else {
      this.scrollY(Math.max(-5, Math.min(5, event.deltaY)))
    }
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
  render (data, calcSizes = true) {
    if (!this.options.columns) {
      console.log(`No columns provided for table with ID ${this.elementId}`)
      return
    }
    if (this.options.columns.length === 0) {
      console.log(`No columns provided for table with ID ${this.elementId}`)
      return
    }
    // this.data = []
    // Adjust the sizing of the header/body/footer
    if (calcSizes === true) {
      const sample = this.createSample(data)
      this.calculateSizes(sample, data.length, (data[0] || []).length, 0)   
    }    
    console.log(this.options.columns)
    const tableInnerEl = document.getElementById(`${this.elementId}_tableInner`)
    if (tableInnerEl) {
      tableInnerEl.style.width = `${this.sizes.totalWidth}px`
    }
    this.renderColumnHeaders()
    this.renderTotals()
    if (data) {      
      this.appendRows(data)
    }
    let bodyEl = document.getElementById(`${this.elementId}_tableBody`)
    // bodyEl.innerHTML = this.buildBodyHtml(data, true)
    bodyEl.style.height = `calc(100% - ${this.sizes.header.height}px - ${this.sizes.total.height}px)`
    if (this.options.virtualScroll === true) {
      // set the scroll element positions
      if (this.vScrollRequired === true) {
        let vScrollEl = document.getElementById(`${this.elementId}_vScrollContainer`)
        let vHandleEl = document.getElementById(`${this.elementId}_vScrollHandle`)
        vScrollEl.style.top = `${this.sizes.header.height + this.sizes.total.height}px`
        vScrollEl.style.height = `${this.sizes.bodyHeight}px` 
        vHandleEl.style.height = Math.max(this.options.minHandleSize, this.sizes.bodyHeight * (this.sizes.rowsToRenderPrecise / this.totalRowCount)) + 'px'
      }   
      if (this.hScrollRequired === true) {
        let hScrollEl = document.getElementById(`${this.elementId}_hScrollContainer`)
        let hHandleEl = document.getElementById(`${this.elementId}_hScrollHandle`)
        hScrollEl.style.left = `${this.sizes.table.width - this.sizes.scrollableWidth}px`
        hScrollEl.style.width = `${this.sizes.scrollableWidth - 20}px` 
        hHandleEl.style.width = Math.max(this.options.minHandleSize, this.sizes.scrollableWidth * (this.sizes.scrollableWidth / this.sizes.totalWidth)) + 'px'
      }   
    }    
  }
  renderColumnHeaders () {
    let headEl = document.getElementById(`${this.elementId}_tableHeader`)    
    if (headEl) {
      headEl.innerHTML = this.buildHeaderHtml(true)
    }
  }
  renderTotals () {
    let headEl = document.getElementById(`${this.elementId}_tableHeader`)    
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
  scrollX (diff) {
    const scrollContainerEl = document.getElementById(`${this.elementId}_hScrollContainer`)
    const scrollHandleEl = document.getElementById(`${this.elementId}_hScrollHandle`)    
    let handlePos
    if (typeof this.handleXStart !== 'undefined' && this.handleXStart !== null) {
      handlePos = this.handleXStart + diff 
    }
    else {
      handlePos = scrollHandleEl.offsetLeft + diff
    }   
    const scrollableSpace = scrollContainerEl.getBoundingClientRect().width - scrollHandleEl.getBoundingClientRect().width
    console.log('dragging x', diff, scrollContainerEl.getBoundingClientRect().width - scrollHandleEl.getBoundingClientRect().width)
    scrollHandleEl.style.left = Math.min(scrollableSpace, Math.max(0, handlePos)) + 'px'
    if (this.options.onScroll) {
      let actualLeft = (this.sizes.totalWidth - this.sizes.scrollableWidth) * (Math.min(scrollableSpace, Math.max(0, handlePos)) / scrollableSpace)
      let cumulativeWidth = 0
      this.startCol = 0
      this.endCol = 0
      for (let i = 0; i < this.options.allColumns[this.options.allColumns.length - 1].length; i++) {            
        cumulativeWidth += this.options.allColumns[this.options.allColumns.length - 1][i].actualWidth      
        console.log(actualLeft, this.sizes.totalWidth, cumulativeWidth, cumulativeWidth + this.options.allColumns[this.options.allColumns.length - 1][i].actualWidth)
        if (actualLeft < cumulativeWidth) {
          this.startCol = i  
          break            
        }             
      } 
      cumulativeWidth = 0                
      for (let i = this.startCol; i < this.options.allColumns[this.options.allColumns.length - 1].length; i++) {
        cumulativeWidth += this.options.allColumns[this.options.allColumns.length - 1][i].actualWidth
        if (cumulativeWidth < this.sizes.scrollableWidth) {              
          this.endCol = i
        }            
      }
      if (this.endCol < this.options.allColumns[this.options.allColumns.length - 1].length - 1) {
        this.endCol += 1 
      }          
      if (this.endCol === this.options.allColumns[this.options.allColumns.length - 1].length - 1 && cumulativeWidth > this.sizes.totalWidth) {
        this.startCol += 1
      } 
      this.endCol = Math.max(this.startCol, this.endCol)         
      this.options.onScroll('y', this.startRow, this.endRow, this.startCol, this.endCol)
    } 
  }
  scrollY (diff) {
    const scrollContainerEl = document.getElementById(`${this.elementId}_vScrollContainer`)
    const scrollHandleEl = document.getElementById(`${this.elementId}_vScrollHandle`)    
    let handlePos
    if (typeof this.handleYStart !== 'undefined' && this.handleYStart !== null) {
      handlePos = this.handleYStart + diff 
    }
    else {
      console.log('appending not resetting')
      handlePos = scrollHandleEl.offsetTop + diff
    }    
    const scrollableSpace = scrollContainerEl.getBoundingClientRect().height - scrollHandleEl.getBoundingClientRect().height
    console.log('dragging y', (diff), scrollContainerEl.getBoundingClientRect().height - scrollHandleEl.getBoundingClientRect().height)
    scrollHandleEl.style.top = Math.min(scrollableSpace, Math.max(0, handlePos)) + 'px'
    if (this.options.onScroll) {
      this.startRow = Math.min(this.totalRowCount - this.sizes.rowsToRender, Math.max(0, Math.round((this.totalRowCount - this.sizes.rowsToRender) * (handlePos / scrollableSpace))))
      this.endRow = this.startRow + this.sizes.rowsToRender
      if (this.endRow === this.totalRowCount) {
        this.startRow += 1
      }
      this.options.onScroll('y', this.startRow, this.endRow, this.startCol, this.endCol)
    }
  }
  showLoading (options) {
    this.loadingDialog.show(options)
  }
}