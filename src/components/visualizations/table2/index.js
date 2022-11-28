/* global WebsyDesigns */ 
class WebsyTable2 {
  constructor (elementId, options) {
    const DEFAULTS = {
      pageSize: 20,
      paging: 'scroll',
      cellSize: 35,
      virtualScroll: false,
      leftColumns: 0
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.rowCount = 0
    this.busy = false
    this.tooltipTimeoutFn = null
    this.data = []
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = `
        <div id='${this.elementId}_tableContainer' class='websy-vis-table ${this.options.paging === 'pages' ? 'with-paging' : ''} ${this.options.virtualScroll === true ? 'with-virtual-scroll' : ''}'>
          <!--<div class="download-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z"/></svg>
          </div>-->
          <table id="${this.elementId}_table">            
            <thead id="${this.elementId}_head">
            </thead>
            <tbody id="${this.elementId}_body">
            </tbody>
            <tfoot id="${this.elementId}_foot">
            </tfoot>
          </table>      
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
      let pageOptions = [10, 20, 50, 100, 200]
      el.innerHTML = html      
      if (this.options.paging === 'pages') {
        this.pageSizeSelector = new WebsyDesigns.Dropdown(`${this.elementId}_pageSizeSelector`, {
          selectedItems: [pageOptions.indexOf(this.options.pageSize)],
          items: pageOptions.map(p => ({ label: p.toString(), value: p })),
          allowClear: false,
          disableSearch: true,          
          onItemSelected: (selectedItem) => {
            if (this.options.onChangePageSize) {
              this.options.onChangePageSize(selectedItem.value)
            }
          }
        })
      }
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('mouseout', this.handleMouseOut.bind(this))
      el.addEventListener('mousemove', this.handleMouseMove.bind(this))
      el.addEventListener('mousedown', this.handleMouseDown.bind(this))
      el.addEventListener('mouseup', this.handleMouseUp.bind(this))
      document.addEventListener('mouseup', this.handleGlobalMouseUp.bind(this))
      const scrollEl = document.getElementById(`${this.elementId}_tableContainer`)
      scrollEl.addEventListener('scroll', this.handleScroll.bind(this))
      this.loadingDialog = new WebsyDesigns.LoadingDialog(`${this.elementId}_loadingContainer`)
      this.render()
    } 
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  appendRows (data) {
    this.hideError()
    const bodyEl = document.getElementById(`${this.elementId}_body`)
    let bodyHTML = ''    
    if (data) {      
      bodyHTML += data.map((r, rowIndex) => {
        return '<tr>' + r.map((c, i) => {
          if (this.options.columns[i].show !== false) {
            let style = `height: ${this.options.cellSize}px; line-height: ${this.options.cellSize}px;`
            if (c.style) {
              style += c.style
            }
            if (this.options.columns[i].width) {
              style += `width: ${this.options.columns[i].width}; `
            }
            if (c.backgroundColor) {
              style += `background-color: ${c.backgroundColor}; `
              if (!c.color) {
                style += `color: ${WebsyDesigns.Utils.getLightDark(c.backgroundColor)}; `  
              }
            }
            if (c.color) {
              style += `color: ${c.color}; `
            }            
            if (this.options.columns[i].showAsLink === true && c.value.trim() !== '') {
              return `
                <td 
                  data-row-index='${this.rowCount + rowIndex}' 
                  data-col-index='${i}' 
                  class='${this.options.columns[i].classes || ''}' 
                  style='${style}'
                  colspan='${c.colspan || 1}'
                  rowspan='${c.rowspan || 1}'
                >
                  <a href='${c.value}' target='${this.options.columns[i].openInNewTab === true ? '_blank' : '_self'}'>${c.displayText || this.options.columns[i].linkText || c.value}</a>
                </td>
              `
            } 
            else if ((this.options.columns[i].showAsNavigatorLink === true || this.options.columns[i].showAsRouterLink === true) && c.value.trim() !== '') {
              return `
                <td 
                  data-view='${c.value}' 
                  data-row-index='${this.rowCount + rowIndex}' 
                  data-col-index='${i}' 
                  class='websy-trigger trigger-item ${this.options.columns[i].clickable === true ? 'clickable' : ''} ${this.options.columns[i].classes || ''}' 
                  style='${style}'
                  colspan='${c.colspan || 1}'
                  rowspan='${c.rowspan || 1}'
                >${c.displayText || this.options.columns[i].linkText || c.value}</td>
              `
            } 
            else {  
              let info = c.value
              if (this.options.columns[i].showAsImage === true) {
                c.value = `
                  <img src='${c.value}'>
                `
              }            
              return `
                <td 
                  data-info='${info}' 
                  data-row-index='${this.rowCount + rowIndex}' 
                  data-col-index='${i}' 
                  class='${this.options.columns[i].classes || ''}' 
                  style='${style}'
                  colspan='${c.colspan || 1}'
                  rowspan='${c.rowspan || 1}'
                >${c.value}</td>
              `
            }
          }
        }).join('') + '</tr>'
      }).join('')
      this.data = this.data.concat(data)
      this.rowCount = this.data.length      
    }    
    bodyEl.innerHTML += bodyHTML    
    if (this.options.virtualScroll === true) {
      // get height of the thead      
      if (this.options.paging !== 'pages') {
        const headEl = document.getElementById(`${this.elementId}_head`)              
        const vScrollContainerEl = document.getElementById(`${this.elementId}_vScrollContainer`)
        vScrollContainerEl.style.top = `${headEl.clientHeight}px`       
      }      
      const hScrollContainerEl = document.getElementById(`${this.elementId}_hScrollContainer`)
      let left = 0
      const cells = bodyEl.querySelectorAll(`tr:first-of-type td`)
      for (let i = 0; i < this.options.leftColumns; i++) {
        left += cells[i].offsetWidth || cells[i].clientWidth        
      }
      hScrollContainerEl.style.left = `${left}px`      
    }
  }
  buildSearchIcon (columnIndex) {
    return `
      <div class="websy-table-search-icon" data-col-index="${columnIndex}">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><title>ionicons-v5-f</title><path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><line x1="338.29" y1="338.29" x2="448" y2="448" style="fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg>
      </div>
    `
  }  
  handleClick (event) {
    if (event.target.classList.contains('download-button')) {
      window.viewManager.dataExportController.exportData(this.options.model)
    }
    if (event.target.classList.contains('sortable-column')) {
      const colIndex = +event.target.getAttribute('data-index')
      const sortIndex = +event.target.getAttribute('data-sort-index')
      const column = this.options.columns[colIndex]
      if (this.options.onSort) {
        this.options.onSort(event, column, colIndex, sortIndex)
      }
      else {
        this.internalSort(column, colIndex)
      }
      // const colIndex = +event.target.getAttribute('data-index')
      // const dimIndex = +event.target.getAttribute('data-dim-index')
      // const expIndex = +event.target.getAttribute('data-exp-index')
      // const reverse = event.target.getAttribute('data-reverse') === 'true'
      // const patchDefs = [{
      //   qOp: 'replace',
      //   qPath: '/qHyperCubeDef/qInterColumnSortOrder',
      //   qValue: JSON.stringify([colIndex])
      // }]
      // patchDefs.push({
      //   qOp: 'replace',
      //   qPath: `/qHyperCubeDef/${dimIndex > -1 ? 'qDimensions' : 'qMeasures'}/${dimIndex > -1 ? dimIndex : expIndex}/qDef/qReverseSort`,
      //   qValue: JSON.stringify(reverse)
      // })
      // this.options.model.applyPatches(patchDefs) // .then(() => this.render())
    } 
    else if (event.target.classList.contains('websy-table-search-icon')) {
      // let field = event.target.getAttribute('data-field')
      // window.viewManager.views.global.objects[1].instance.show(field, { x: event.pageX, y: event.pageY }, () => {
      //   event.target.classList.remove('active')
      // })
      const colIndex = +event.target.getAttribute('data-col-index')      
      if (this.options.columns[colIndex].onSearch) {
        this.options.columns[colIndex].onSearch(event, this.options.columns[colIndex])
      } 
    }
    else if (event.target.classList.contains('clickable')) {
      const colIndex = +event.target.getAttribute('data-col-index')
      const rowIndex = +event.target.getAttribute('data-row-index')
      if (this.options.onClick) {
        this.options.onClick(event, this.data[rowIndex][colIndex], this.data[rowIndex], this.options.columns[colIndex])
      }      
    }
    else if (event.target.classList.contains('websy-page-num')) {
      const pageNum = +event.target.getAttribute('data-page')
      if (this.options.onSetPage) {
        this.options.onSetPage(pageNum)
      }
    }
    else if (event.target.classList.contains('websy-h-scroll-container')) {
      console.log('scroll handle clicked', event)
      let clickX = event.clientX
      let elX = event.target.getBoundingClientRect().left
      const handleEl = document.getElementById(`${this.elementId}_hScrollHandle`)
      let startPoint = clickX - elX - (handleEl.clientWidth / 2)
      startPoint = Math.max(0, Math.min(startPoint, event.target.clientWidth - handleEl.clientWidth))
      handleEl.style.left = `${startPoint}px`
      if (this.options.onScrollX) {
        this.options.onScrollX(startPoint)
      } 
    }
  }
  handleMouseDown (event) {
    if (event.target.classList.contains('websy-scroll-handle')) {
      this.scrolling = true
      const el = document.getElementById(this.elementId)
      el.classList.add('scrolling')
    }
    if (event.target.classList.contains('websy-scroll-handle-x')) {
      const handleEl = document.getElementById(`${this.elementId}_hScrollHandle`)
      this.handleXStart = handleEl.offsetLeft
      this.scrollXStart = event.clientX
      this.scrollDirection = 'X'
    }
  }
  handleGlobalMouseUp (event) {
    this.scrolling = false
    const el = document.getElementById(this.elementId)
    if (el) {
      el.classList.remove('scrolling') 
    }    
  }
  handleMouseUp (event) {
    this.scrolling = false
    const el = document.getElementById(this.elementId)
    el.classList.remove('scrolling')
  }
  handleMouseMove (event) {  
    if (this.tooltipTimeoutFn) {
      event.target.classList.remove('websy-delayed-info')
      clearTimeout(this.tooltipTimeoutFn)
    }  
    if (event.target.tagName === 'TD') {
      this.tooltipTimeoutFn = setTimeout(() => {
        event.target.classList.add('websy-delayed-info')
      }, 500)  
    }    
    if (this.scrolling === true && this.options.virtualScroll === true) {
      const tableContainerEl = document.getElementById(`${this.elementId}_tableContainer`)
      if (this.scrollDirection === 'X') {
        const handleEl = document.getElementById(`${this.elementId}_hScrollHandle`)      
        // console.log(this.handleXStart + handleEl.offsetWidth + (event.clientX - this.scrollXStart), this.columnParameters.scrollableWidth)        
        let startPoint = 0
        if (this.handleXStart + (event.clientX - this.scrollXStart) < this.columnParameters.scrollableWidth - handleEl.offsetWidth) {
          handleEl.style.left = `${this.handleXStart + (event.clientX - this.scrollXStart)}px`
          startPoint = this.handleXStart + (event.clientX - this.scrollXStart)
        }
        else {
          startPoint = this.columnParameters.scrollableWidth - handleEl.offsetWidth
        }
        if (this.handleXStart + (event.clientX - this.scrollXStart) < 0) {
          handleEl.style.left = 0
          startPoint = 0
        }
        if (this.options.onScrollX) {
          this.options.onScrollX(startPoint)
        } 
      }      
    }
  }
  handleMouseOut (event) {
    if (this.tooltipTimeoutFn) {
      event.target.classList.remove('websy-delayed-info')
      clearTimeout(this.tooltipTimeoutFn)
    }
  }
  handleScroll (event) {
    if (this.options.onScroll && this.options.paging === 'scroll') {
      this.options.onScroll(event)
    }    
  } 
  hideError () {
    const el = document.getElementById(`${this.elementId}_tableContainer`)
    if (el) {
      el.classList.remove('has-error')
    }
    const tableEl = document.getElementById(`${this.elementId}_table`)
    tableEl.classList.remove('hidden')
    const containerEl = document.getElementById(`${this.elementId}_errorContainer`)
    if (containerEl) {
      containerEl.classList.remove('active')
    }
  }
  hideLoading () {
    if (this.options.onLoading) {
      this.options.onLoading(false)
    }
    else {
      this.loadingDialog.hide()
    }
  }
  internalSort (column, colIndex) {
    this.options.columns.forEach((c, i) => {
      c.activeSort = i === colIndex      
    })
    if (column.sortFunction) {
      this.data = column.sortFunction(this.data, column)
    }
    else {
      let sortProp = 'value'
      let sortOrder = column.sort === 'asc' ? 'desc' : 'asc' 
      column.sort = sortOrder
      let sortType = column.sortType || 'alphanumeric'     
      if (column.sortProp) {
        sortProp = column.sortProp
      }
      this.data.sort((a, b) => {
        switch (sortType) {
        case 'numeric':
          if (sortOrder === 'asc') {
            return a[colIndex][sortProp] - b[colIndex][sortProp]
          }
          else {
            return b[colIndex][sortProp] - a[colIndex][sortProp]
          }          
        default:
          if (sortOrder === 'asc') {
            return a[colIndex][sortProp] > b[colIndex][sortProp] ? 1 : -1
          }
          else {
            return a[colIndex][sortProp] < b[colIndex][sortProp] ? 1 : -1
          }
        }
      })
    }
    this.render(this.data)
  } 
  render (data) {
    if (!this.options.columns) {
      return
    }
    this.hideError()
    this.data = []
    this.rowCount = 0
    const bodyEl = document.getElementById(`${this.elementId}_body`)
    bodyEl.innerHTML = ''
    if (this.options.allowDownload === true) {
      // doesn't do anything yet
      const el = document.getElementById(this.elementId)
      if (el) {
        el.classList.add('allow-download')
      } 
      else {
        el.classList.remove('allow-download')
      }
    }
    // let colGroupHTML = this.options.columns.map(c => `<col style="${c.width ? 'width: ' + c.width : ''}"></col>`)
    let headHTML = '<tr>' + this.options.columns.map((c, i) => {
      if (c.show !== false) {
        let style = ''
        if (c.style) {
          style += c.style
        }
        if (c.width) {
          style += `width: ${c.width || 'auto'}; `
        }
        return `
        <th style="${style}">
          <div class ="tableHeader">
            <div class="leftSection">
              <div
                class="tableHeaderField ${['asc', 'desc'].indexOf(c.sort) !== -1 ? 'sortable-column' : ''}"
                data-sort-index="${c.sortIndex || i}"
                data-index="${i}"
                data-sort="${c.sort}"
                style="${c.style || ''}"                
              >
                ${c.name}
              </div>
            </div>
            <div class="${c.activeSort ? c.sort + ' sortOrder' : ''}"></div>
            ${c.searchable === true ? this.buildSearchIcon(i) : ''}
          </div>
        </th>
        `
      }
    }).join('') + '</tr>'
    const headEl = document.getElementById(`${this.elementId}_head`)
    headEl.innerHTML = headHTML
    const dropdownEl = document.getElementById(`${this.elementId}_dropdownContainer`)
    if (dropdownEl.innerHTML === '') {
      let dropdownHTML = ``
      this.options.columns.forEach((c, i) => {
        if (c.searchable && c.searchField) {      
          dropdownHTML += `
            <div id="${this.elementId}_columnSearch_${i}" class="websy-modal-dropdown"></div>
          `
        }
      })    
      dropdownEl.innerHTML = dropdownHTML 
    }    
    // const colGroupEl = document.getElementById(`${this.elementId}_cols`)
    // colGroupEl.innerHTML = colGroupHTML
    // let footHTML = '<tr>' + this.options.columns.map((c, i) => {
    //   if (c.show !== false) {
    //     return `
    //       <th></th>
    //     `
    //   }
    // }).join('') + '</tr>'
    // const footEl = document.getElementById(`${this.elementId}_foot`)
    // footEl.innerHTML = footHTML
    if (this.options.paging === 'pages') {
      const pagingEl = document.getElementById(`${this.elementId}_pageList`)
      if (pagingEl) {
        let pages = (new Array(this.options.pageCount)).fill('').map((item, index) => {
          return `<li data-page="${index}" class="websy-page-num ${(this.options.pageNum === index) ? 'active' : ''}">${index + 1}</li>`
        })
        let startIndex = 0
        if (this.options.pageCount > 8) {
          startIndex = Math.max(0, this.options.pageNum - 4)
          pages = pages.splice(startIndex, 10)
          if (startIndex > 0) {
            pages.splice(0, 0, `<li>Page&nbsp;</li><li data-page="0" class="websy-page-num">First</li><li>...</li>`)
          }
          else {
            pages.splice(0, 0, '<li>Page&nbsp;</li>')
          }
          if (this.options.pageNum < this.options.pageCount - 1) {
            pages.push('<li>...</li>')
            pages.push(`<li data-page="${this.options.pageCount - 1}" class="websy-page-num">Last</li>`)
          }
        }
        pagingEl.innerHTML = pages.join('')
      }
    }
    if (data) {      
      this.appendRows(data)
    }
  } 
  showError (options) {
    const el = document.getElementById(`${this.elementId}_tableContainer`)
    if (el) {
      el.classList.add('has-error')
    }
    const tableEl = document.getElementById(`${this.elementId}_table`)
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
  setHorizontalScroll (options) {
    const el = document.getElementById(`${this.elementId}_hScrollHandle`)
    if (options.width) {
      el.style.width = `${options.width}px`
    }
  }
  setWidth (width) {
    const el = document.getElementById(`${this.elementId}_table`)
    if (el) {
      el.style.width = `${width}px`
    }
  }
  showLoading (options) {
    if (this.options.onLoading) {
      this.options.onLoading(true)
    }
    else {
      this.loadingDialog.show(options)
    }
  }
  getColumnParameters (values) {
    const tableEl = document.getElementById(`${this.elementId}_table`)
    tableEl.style.tableLayout = 'auto'
    tableEl.style.width = 'auto'
    const headEl = document.getElementById(`${this.elementId}_head`)
    const bodyEl = document.getElementById(`${this.elementId}_body`)
    headEl.innerHTML = '<tr style="visibility: hidden;">' + values.map((c, i) => `
      <th>
        <div class ="tableHeader">
          <div class="leftSection">
            <div
              class="tableHeaderField"              
            >
              ${c.value || 'nbsp;'}
            </div>
          </div>          
          ${c.searchable === true ? this.buildSearchIcon(i) : ''}
        </div>
      </th>
    `).join('') + '</tr>'
    bodyEl.innerHTML = '<tr style="visibility: hidden;">' + values.map(c => `
      <td                 
        style='height: ${this.options.cellSize}px; line-height: ${this.options.cellSize}px; padding: 10px 5px;'
      >${c.value || '&nbsp;'}</td>
    `).join('') + '</tr>'    
    // get height of the first data cell
    const cells = bodyEl.querySelectorAll(`tr:first-of-type td`)
    const tableContainerEl = document.getElementById(`${this.elementId}_tableContainer`)
    const cellHeight = cells[0].offsetHeight || cells[0].clientHeight
    const cellWidths = []
    let accWidth = 0
    let nonScrollableWidth = 0
    for (let i = 0; i < cells.length; i++) {
      if (i < this.options.leftColumns) {
        nonScrollableWidth += values[i].width || cells[i].offsetWidth || cells[i].clientWidth
      }
      cellWidths.push(values[i].width || cells[i].offsetWidth || cells[i].clientWidth)      
      accWidth += values[i].width || cells[i].offsetWidth || cells[i].clientWidth
    }
    // if the table doesn't fill the available space we adjust the space so that the columns grow
    if (accWidth < (tableContainerEl.offsetWidth || tableContainerEl.clientWidth) - nonScrollableWidth) {
      for (let i = this.options.leftColumns; i < cellWidths.length; i++) {
        cellWidths[i] = ((tableContainerEl.offsetWidth || tableContainerEl.clientWidth) - nonScrollableWidth) / (cellWidths.length - this.options.leftColumns)
      }
    }
    // const cellWidth = firstDataCell.offsetWidth || firstDataCell.clientWidth        
    // tableEl.style.width = ''
    this.columnParameters = { 
      cellHeight, 
      cellWidths, 
      availableHeight: tableContainerEl.offsetHeight || tableContainerEl.clientHeight, 
      availableWidth: tableContainerEl.offsetWidth || tableContainerEl.clientWidth,
      nonScrollableWidth,
      scrollableWidth: (tableContainerEl.offsetWidth || tableContainerEl.clientWidth) - nonScrollableWidth
    }
    bodyEl.innerHTML = ''
    tableEl.style.tableLayout = ''
    tableEl.style.width = ''
    return this.columnParameters
  }
}
