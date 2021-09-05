class WebsyTable {
  constructor (elementId, options) {
    const DEFAULTS = {
      pageSize: 20
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.rowCount = 0
    this.busy = false
    this.data = []
    const el = document.getElementById(this.elementId)
    if (el) {
      el.innerHTML = `
        <div id='${this.elementId}_tableContainer' class='websy-vis-table'>
          <!--<div class="download-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z"/></svg>
          </div>-->
          <table>
            <thead id="${this.elementId}_head">
            </thead>
            <tbody id="${this.elementId}_body">
            </tbody>
          </table>
        </div>
      `
      el.addEventListener('click', this.handleClick.bind(this))
      const scrollEl = document.getElementById(`${this.elementId}_tableContainer`)
      scrollEl.addEventListener('scroll', this.handleScroll.bind(this))
      this.render()
    } 
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  appendRows (data) {
    let bodyHTML = ''
    if (data) {
      bodyHTML += data.map((r, rowIndex) => {
        return '<tr>' + r.map((c, i) => {
          if (this.options.columns[i].show !== false) {
            if (this.options.columns[i].showAsLink === true && c.value.trim() !== '') {
              return `
                <td class='${this.options.columns[i].classes || ''}' ${this.options.columns[i].width ? 'style="width: ' + this.options.columns[i].width + '"' : ''}><a href='${c.value}' target='${c.openInNewTab === true ? '_blank' : '_self'}'>${this.options.columns[i].linkText || 'Link'}</a></td>
              `
            } 
            if (this.options.columns[i].showAsNavigatorLink === true && c.value.trim() !== '') {
              return `
                <td data-view='${c.value}' data-row-index='${this.rowCount + rowIndex}' data-col-index='${i}' class='trigger-item ${this.options.columns[i].clickable === true ? 'clickable' : ''} ${this.options.columns[i].classes || ''}' ${this.options.columns[i].width ? 'style="width: ' + this.options.columns[i].width + '"' : ''}>${this.options.columns[i].linkText || 'Link'}</td>
              `
            } 
            else {              
              return `
                <td class='${this.options.columns[i].classes || ''}' ${this.options.columns[i].width ? 'style="width: ' + (this.options.columns[i].width || 'auto') + '"' : ''}>${c.value}</td>
              `
            }
          }
        }).join('') + '</tr>'
      }).join('')
      this.data = this.data.concat(data)
      this.rowCount = this.data.length
    }
    const bodyEl = document.getElementById(`${this.elementId}_body`)
    bodyEl.innerHTML += bodyHTML
  }
  buildSearchIcon (field) {
    return `
      <div>
        <svg
          class="tableSearchIcon"
          data-field="${field}"
          xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"
        >
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
    `
  }  
  handleClick (event) {
    if (event.target.classList.contains('download-button')) {
      window.viewManager.dataExportController.exportData(this.options.model)
    }
    if (event.target.classList.contains('sortable-column')) {
      const colIndex = +event.target.getAttribute('data-index')
      const column = this.options.columns[colIndex]
      if (this.options.onSort) {
        this.options.onSort(event, column, colIndex)
      }
      else {
        this.internalSort()
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
    else if (event.target.classList.contains('tableSearchIcon')) {
      let field = event.target.getAttribute('data-field')
      window.viewManager.views.global.objects[1].instance.show(field, { x: event.pageX, y: event.pageY }, () => {
        event.target.classList.remove('active')
      })
    }
    else if (event.target.classList.contains('clickable')) {
      const colIndex = +event.target.getAttribute('data-col-index')
      const rowIndex = +event.target.getAttribute('data-row-index')
      if (this.options.onClick) {
        this.options.onClick(event, this.data[rowIndex][colIndex], this.data[rowIndex], this.options.columns[colIndex])
      }      
    }
  }
  handleScroll (event) {
    if (this.options.onScroll) {
      this.options.onScroll(event)
    }
  } 
  internalSort () {

  } 
  render (data) {
    if (!this.options.columns) {
      return
    }
    this.data = []
    this.rowCount = 0
    const bodyEl = document.getElementById(`${this.elementId}_body`)
    bodyEl.innerHTML = ''
    if (this.options.allowDownload === true) {
      const el = document.getElementById(this.elementId)
      if (el) {
        el.classList.add('allow-download')
      } 
      else {
        el.classList.remove('allow-download')
      }
    }
    let headHTML = '<tr>' + this.options.columns.map((c, i) => {
      if (c.show !== false) {
        return `
        <th ${c.width ? 'style="width: ' + (c.width || 'auto') + ';"' : ''}>
          <div class ="tableHeader">
            <div class="leftSection">
              <div
                class="tableHeaderField ${['asc', 'desc'].indexOf(c.sort) !== -1 ? 'sortable-column' : ''}"
                data-index="${i}"                
                data-sort="${c.sort}"                
              >
                ${c.name}
              </div>
            </div>
            <div class="${c.activeSort ? c.sort + ' sortOrder' : ''}"></div>
            <!--${c.searchable === true ? this.buildSearchIcon(c.qGroupFieldDefs[0]) : ''}-->
          </div>
        </th>
        `
      }
    }).join('') + '</tr>'
    const headEl = document.getElementById(`${this.elementId}_head`)
    headEl.innerHTML = headHTML
    if (data) {
      this.data = this.data.concat(data)
      this.appendRows(data) 
    }
  }  
}
