/* global WebsyDesigns */ 
class WebsyTable3 {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      virtualScroll: false,
      showTotalsAbove: true,
      minHandleSize: 20,
      maxColWidth: '50%',
      allowPivoting: false,
      searchIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><title>ionicons-v5-f</title><path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><line x1="338.29" y1="338.29" x2="448" y2="448" style="fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg>`,
      plusIcon: WebsyDesigns.Icons.PlusFilled,
      minusIcon: WebsyDesigns.Icons.MinusFilled      
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.sizes = {}
    this.currentData = []
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
        this.currentData = data
      }      
      else {
        bodyEl.innerHTML += this.buildBodyHtml(data, true)
        this.currentData = this.currentData.concat(data)
      }
    }
    // this.data = this.data.concat(data)
    // this.rowCount = this.data.length   
  }
  buildBodyHtml (data = [], useWidths = false) {
    if (!this.options.columns) {
      return ''
    }
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
    data.forEach((row, rowIndex) => {
      bodyHtml += `<tr class="websy-table-row">`
      row.forEach((cell, cellIndex) => {
        let sizeIndex = cell.level || cellIndex        
        if (typeof sizingColumns[sizeIndex] === 'undefined') {
          return // need to revisit this logic
        }
        let style = ''
        let divStyle = ''
        if (useWidths === true && (+cell.colspan === 1 || !cell.colspan)) {
          style = `width: ${sizingColumns[sizeIndex].width || sizingColumns[sizeIndex].actualWidth}px!important; `        
          divStyle = style
        }
        if (cell.style) {
          style += cell.style
        }
        if (useWidths === true && (+cell.colspan === 1 || !cell.colspan)) {
          style += `max-width: ${sizingColumns[sizeIndex].width || sizingColumns[sizeIndex].actualWidth}px!important;`
          divStyle += `max-width: ${sizingColumns[sizeIndex].width || sizingColumns[sizeIndex].actualWidth}px!important;`
        }        
        if (cell.backgroundColor) {
          style += `background-color: ${cell.backgroundColor}; `
          if (!cell.color) {
            style += `color: ${WebsyDesigns.Utils.getLightDark(cell.backgroundColor)}; `  
          }
        }
        if (cell.color) {
          style += `color: ${cell.color}; `
        }
        // console.log('rowspan', cell.rowspan)
        bodyHtml += `<td 
          class='websy-table-cell ${sizeIndex < this.pinnedColumns ? 'pinned' : 'unpinned'} ${(cell.classes || []).join(' ')}'
          style='${style}'
          data-info='${cell.value}'
          colspan='${cell.colspan || 1}'
          rowspan='${cell.rowspan || 1}'
          data-row-index='${rowIndex}'
          data-cell-index='${cellIndex}'
          data-col-index='${sizeIndex}'
        `
        // if (useWidths === true) {
        //   bodyHtml += `
        //     style='width: ${sizingColumns[cellIndex].width || sizingColumns[cellIndex].actualWidth}px!important'
        //     width='${sizingColumns[cellIndex].width || sizingColumns[cellIndex].actualWidth}'
        //   `
        // }
        bodyHtml += `
        ><div 
          style='${divStyle}' 
          class='websy-table-cell-content'
          data-row-index='${rowIndex}'
          data-cell-index='${cellIndex}'
          data-col-index='${sizeIndex}'
        >`
        if (cell.expandable === true) {
          bodyHtml += `<i 
            data-row-index='${rowIndex}'
            data-col-index='${cell.level || cellIndex}'
            class='websy-table-cell-expand'
          >${this.options.plusIcon}</i>`
        }
        if (cell.collapsable === true) {
          bodyHtml += `<i 
            data-row-index='${rowIndex}'
            data-col-index='${cell.level || cellIndex}'
            class='websy-table-cell-collapse'
          >${this.options.minusIcon}</i>`
        }
        if (sizingColumns[sizeIndex].showAsLink === true && cell.value.trim() !== '') {
          cell.value = `
            <a href='${cell.value}' target='${sizingColumns[sizeIndex].openInNewTab === true ? '_blank' : '_self'}'>${cell.displayText || sizingColumns[sizeIndex].linkText || cell.value}</a>
          `
        }
        if (sizingColumns[sizeIndex].showAsRouterLink === true && cell.value.trim() !== '') {
          cell.value = `
            <a data-view='${(cell.link || cell.value).replace(/'/g, '\'')}' class='websy-trigger'>${cell.value}</a>
          `
        }
        if (sizingColumns[sizeIndex].showAsImage === true) {
          cell.value = `
            <img               
              style="width: ${sizingColumns[sizeIndex].imgWidth ? sizingColumns[sizeIndex].imgWidth : 'auto'}; height: ${sizingColumns[sizeIndex].imgHeight ? sizingColumns[sizeIndex].imgHeight : 'auto'};" 
              src='${cell.value}'
              ${sizingColumns[sizeIndex].errorImage ? 'onerror="this.src=\'' + sizingColumns[sizeIndex].errorImage + '\'"' : ''}
            />
          `
        }
        bodyHtml += `
          ${cell.value}
        </div></td>`
      })
      bodyHtml += `</tr>`
    })    
    // bodyHtml += `</div>`    
    return bodyHtml
  }
  buildHeaderHtml (useWidths = false) {
    if (!this.options.columns) {
      return ''
    }
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
      row.forEach((col, colIndex) => {
        let style = `width: ${sizingColumns[colIndex].width || sizingColumns[colIndex].actualWidth}px!important; `        
        let divStyle = style
        if (useWidths === true) {
          style += `max-width: ${sizingColumns[colIndex].width || sizingColumns[colIndex].actualWidth}px!important;`        
          divStyle += `max-width: ${sizingColumns[colIndex].width || sizingColumns[colIndex].actualWidth}px!important;`        
        }
        if (col.style) {
          style += col.style
        }
        headerHtml += `<td 
          class='websy-table-cell ${colIndex < this.pinnedColumns ? 'pinned' : 'unpinned'}'  
          style='${style}'       
          colspan='${col.colspan || 1}'
          rowspan='${col.rowspan || 1}'
        `
        // if (useWidths === true && rowIndex === this.options.columns.length - 1) {
        //   headerHtml += `
        //     style='width: ${col.width || col.actualWidth}px'
        //     width='${col.width || col.actualWidth}'
        //   `
        // }
        headerHtml += `>
          <div 
            style='${divStyle}'
            data-col-index="${colIndex}"
            class='${['asc', 'desc'].indexOf(col.sort) !== -1 ? 'sortable-column' : ''}'
          >
            ${col.name}${col.activeSort ? this.buildSortIcon(col.sort, colIndex) : ''}${col.searchable === true ? this.buildSearchIcon(col, colIndex) : ''}
          </div>
        </td>`
      })
      headerHtml += `</tr>`
    })
    const dropdownEl = document.getElementById(`${this.elementId}_dropdownContainer`)          
    this.options.columns[this.options.columns.length - 1].forEach((c, i) => {
      if (c.searchable && c.isExternalSearch === true) {      
        const testEl = document.getElementById(`${this.elementId}_columnSearch_${c.dimId || i}`)
        if (!testEl) {
          const newE = document.createElement('div')
          newE.id = `${this.elementId}_columnSearch_${c.dimId || i}`
          newE.className = 'websy-modal-dropdown'
          dropdownEl.appendChild(newE)
        }
      }
    })      
    return headerHtml
  }
  buildSearchIcon (col, index) {
    // return `<div class="websy-table-search-icon" data-col-id="${col.dimId}" data-col-index="${index}">
    return `<div class="websy-table-search-icon" data-col-index="${index}">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><line x1="338.29" y1="338.29" x2="448" y2="448" style="fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg>
      </div>`
  }
  buildSortIcon (direction, index) {
    // return `<div class="websy-table-search-icon" data-col-id="${col.dimId}" data-col-index="${index}">
    return `<div class="websy-table-sort-icon ${direction}" data-col-index="${index}">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512"><path d="M98,190.06,237.78,353.18a24,24,0,0,0,36.44,0L414,190.06c13.34-15.57,2.28-39.62-18.22-39.62H116.18C95.68,150.44,84.62,174.49,98,190.06Z"/></svg>
      </div>`
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
    let firstNonPinnedColumnWidth = 0
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
          if (colIndex >= this.pinnedColumns) {
            firstNonPinnedColumnWidth = this.options.columns[this.options.columns.length - 1][colIndex].actualWidth
          }      
        }        
      })      
    })
    this.options.columns[this.options.columns.length - 1].forEach((col, colIndex) => {
      if (colIndex < this.pinnedColumns) {
        this.sizes.scrollableWidth -= col.actualWidth
      }
    })
    this.sizes.totalWidth = this.options.columns[this.options.columns.length - 1].reduce((a, b) => a + (b.width || b.actualWidth), 0)    
    this.sizes.totalNonPinnedWidth = this.options.columns[this.options.columns.length - 1].filter((c, i) => i >= this.pinnedColumns).reduce((a, b) => a + (b.width || b.actualWidth), 0)
    this.sizes.pinnedWidth = this.sizes.totalWidth - this.sizes.totalNonPinnedWidth
    // const outerSize = outerEl.getBoundingClientRect()
    if (this.sizes.totalWidth < this.sizes.outer.width) {
      let equalWidth = (this.sizes.outer.width - this.sizes.totalWidth) / this.options.columns[this.options.columns.length - 1].length
      this.sizes.totalWidth = 0
      this.sizes.totalNonPinnedWidth = 0      
      this.options.columns[this.options.columns.length - 1].forEach((c, i) => {        
        // if (!c.width) {
        // if (c.actualWidth < equalWidth) {
        // adjust the width
        if (c.width) {
          c.width += equalWidth
        }
        c.actualWidth += equalWidth
        //   }
        // }
        this.sizes.totalWidth += c.width || c.actualWidth
        if (i < this.pinnedColumns) {
          this.sizes.totalNonPinnedWidth += c.width || c.actualWidth
        }
        // equalWidth = (outerSize.width - this.sizes.totalWidth) / (this.options.columns[this.options.columns.length - 1].length - (i + 1))
      })
    }
    // check that we have enough from for all of the pinned columns plus 1 non pinned column    
    if (this.sizes.pinnedWidth > (this.sizes.outer.width - firstNonPinnedColumnWidth)) {
      this.sizes.totalWidth = 0
      let diff = this.sizes.pinnedWidth - (this.sizes.outer.width - firstNonPinnedColumnWidth)
      // let colDiff = diff / this.pinnedColumns
      for (let i = 0; i < this.options.columns[this.options.columns.length - 1].length; i++) {        
        if (i < this.pinnedColumns) {          
          let colDiff = (this.options.columns[this.options.columns.length - 1][i].actualWidth / this.sizes.pinnedWidth) * diff
          this.options.columns[this.options.columns.length - 1][i].actualWidth -= colDiff
        }
        this.sizes.totalWidth += this.options.columns[this.options.columns.length - 1][i].width || this.options.columns[this.options.columns.length - 1][i].actualWidth
      }
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
    else {
      this.vScrollRequired = false 
    }
    if (this.sizes.totalWidth > this.sizes.outer.width) {
      this.hScrollRequired = true
    }
    else {
      this.hScrollRequired = false
    }
    this.options.allColumns = this.options.columns.map(c => c)
    // console.log('sizes', this.sizes)
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
          if (data[i].length === this.options.columns[this.options.columns.length - 1].length) {
            if (longest.length < data[i][colIndex].value.length) {
              longest = data[i][colIndex].value
            }
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
    const colIndex = +event.target.getAttribute('data-col-index')
    const cellIndex = +event.target.getAttribute('data-cell-index')
    const rowIndex = +event.target.getAttribute('data-row-index')
    if (event.target.classList.contains('websy-table-search-icon')) {     
      if (this.options.columns[this.options.columns.length - 1][colIndex].onSearch) {
        this.options.columns[this.options.columns.length - 1][colIndex].onSearch(event, this.options.columns[this.options.columns.length - 1][colIndex])
      } 
    }
    if (event.target.classList.contains('websy-table-cell-collapse')) {
      if (this.options.onCollapseCell) {
        this.options.onCollapseCell(event, +rowIndex, +colIndex)
      }
      else {
        // out of box function
      }
    }
    else if (event.target.classList.contains('websy-table-cell-expand')) {
      if (this.options.onExpandCell) {
        this.options.onExpandCell(event, +rowIndex, +colIndex)
      }
      else {
        // out of box function
      }
    }
    else if (event.target.classList.contains('sortable-column')) {
      // const sortIndex = +event.target.getAttribute('data-sort-index')
      const column = this.options.columns[this.options.columns.length - 1][colIndex]
      if (this.options.onSort) {
        this.options.onSort(event, column, colIndex)
      }
      else {
        this.internalSort(column, colIndex)
      }
    } 
    else if (event.target.classList.contains('websy-table-cell-content') || event.target.classList.contains('websy-table-cell')) {
      if (this.options.onCellSelect) {
        this.options.onCellSelect(event, {
          cellIndex,
          colIndex, 
          rowIndex,
          cell: (this.currentData[rowIndex] || [])[cellIndex],
          column: (this.options.columns[this.options.columns.length - 1] || [])[colIndex]
        })
      }
    }
  }
  handleMouseDown (event) {
    if (event.target.classList.contains('websy-scroll-handle-y')) {
      // set up the scroll start values
      this.scrollDragging = true
      this.scrollDirection = 'y'
      const scrollHandleEl = document.getElementById(`${this.elementId}_vScrollHandle`)
      this.handleYStart = scrollHandleEl.offsetTop
      this.mouseYStart = event.pageY
      // console.log('mouse down', this.handleYStart, this.mouseYStart)
      // console.log(scrollHandleEl.offsetTop)
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
    if (this.options.virtualScroll === true) {
      event.preventDefault()
      // console.log('scrollwheel', event)
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        this.scrollX(Math.max(-5, Math.min(5, event.deltaX)))
      }
      else {
        this.scrollY(Math.max(-5, Math.min(5, event.deltaY)))
      }
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
    // console.log(this.options.columns)
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
      let vScrollEl = document.getElementById(`${this.elementId}_vScrollContainer`)
      let vHandleEl = document.getElementById(`${this.elementId}_vScrollHandle`)
      if (this.vScrollRequired === true) {        
        vScrollEl.style.top = `${this.sizes.header.height + this.sizes.total.height}px`
        vScrollEl.style.height = `${this.sizes.bodyHeight}px` 
        vHandleEl.style.height = Math.max(this.options.minHandleSize, this.sizes.bodyHeight * (this.sizes.rowsToRenderPrecise / this.totalRowCount)) + 'px'
      }
      else {
        vHandleEl.style.height = '0px'
      } 
      let hScrollEl = document.getElementById(`${this.elementId}_hScrollContainer`)
      let hHandleEl = document.getElementById(`${this.elementId}_hScrollHandle`)
      if (this.hScrollRequired === true) {        
        hScrollEl.style.left = `${this.sizes.table.width - this.sizes.scrollableWidth}px`
        hScrollEl.style.width = `${this.sizes.scrollableWidth - 20}px` 
        hHandleEl.style.width = Math.max(this.options.minHandleSize, this.sizes.scrollableWidth * (this.sizes.scrollableWidth / this.sizes.totalNonPinnedWidth)) + 'px'
      }  
      else {
        hHandleEl.style.width = '0px'
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
    if (this.options.showTotalsAbove === true && headEl) {
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
    const el = document.getElementById(`${this.elementId}_tableContainer`)
    if (!el.classList.contains('scrolling')) {
      el.classList.add('scrolling')
    }    
    if (this.scrollTimeoutFn) {
      clearTimeout(this.scrollTimeoutFn)
    }
    this.scrollTimeoutFn = setTimeout(() => {      
      el.classList.remove('scrolling')
    }, 200)    
    if (this.hScrollRequired === false) {
      return
    }
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
    // console.log('dragging x', diff, scrollContainerEl.getBoundingClientRect().width - scrollHandleEl.getBoundingClientRect().width)
    scrollHandleEl.style.left = Math.min(scrollableSpace, Math.max(0, handlePos)) + 'px'
    if (this.options.onScroll) {
      let actualLeft = (this.sizes.totalNonPinnedWidth - this.sizes.scrollableWidth) * (Math.min(scrollableSpace, Math.max(0, handlePos)) / scrollableSpace)
      let cumulativeWidth = 0
      this.startCol = 0
      this.endCol = 0
      for (let i = this.pinnedColumns; i < this.options.allColumns[this.options.allColumns.length - 1].length; i++) {            
        cumulativeWidth += this.options.allColumns[this.options.allColumns.length - 1][i].actualWidth      
        // console.log('actualLeft', actualLeft, this.sizes.totalWidth, cumulativeWidth, cumulativeWidth + this.options.allColumns[this.options.allColumns.length - 1][i].actualWidth)
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
      if (this.endCol === this.options.allColumns[this.options.allColumns.length - 1].length - 1 && cumulativeWidth > this.sizes.scrollableWidth && actualLeft > 0) {
        this.startCol += 1
      } 
      this.endCol = Math.max(this.startCol, this.endCol)         
      this.options.onScroll('y', this.startRow, this.endRow, this.startCol - this.pinnedColumns, this.endCol - this.pinnedColumns)
    } 
  }
  scrollY (diff) {
    const el = document.getElementById(`${this.elementId}_tableContainer`)
    if (!el.classList.contains('scrolling')) {
      el.classList.add('scrolling')
    }    
    if (this.scrollTimeoutFn) {
      clearTimeout(this.scrollTimeoutFn)
    }
    this.scrollTimeoutFn = setTimeout(() => {      
      el.classList.remove('scrolling')
    }, 200)
    if (this.vScrollRequired === false) {
      return
    }
    const scrollContainerEl = document.getElementById(`${this.elementId}_vScrollContainer`)
    const scrollHandleEl = document.getElementById(`${this.elementId}_vScrollHandle`)    
    let handlePos
    if (typeof this.handleYStart !== 'undefined' && this.handleYStart !== null) {
      handlePos = this.handleYStart + diff 
    }
    else {
      // console.log('appending not resetting')
      handlePos = scrollHandleEl.offsetTop + diff
    }    
    const scrollableSpace = scrollContainerEl.getBoundingClientRect().height - scrollHandleEl.getBoundingClientRect().height
    // console.log('dragging y', (diff), scrollContainerEl.getBoundingClientRect().height - scrollHandleEl.getBoundingClientRect().height)
    scrollHandleEl.style.top = Math.min(scrollableSpace, Math.max(0, handlePos)) + 'px'
    if (this.options.onScroll) {
      this.startRow = Math.min(this.totalRowCount - this.sizes.rowsToRender, Math.max(0, Math.round((this.totalRowCount - this.sizes.rowsToRender) * (handlePos / scrollableSpace))))
      this.endRow = this.startRow + this.sizes.rowsToRender
      if (this.endRow === this.totalRowCount) {
        this.startRow += 1
      }
      this.options.onScroll('y', this.startRow, this.endRow, this.startCol - this.pinnedColumns, this.endCol - this.pinnedColumns)
    }
  }
  showLoading (options) {
    this.loadingDialog.show(options)
  }
}
