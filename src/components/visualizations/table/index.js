class WebsyTable {
  constructor (elementId, options) {
    const DEFAULTS = {
      pageSize: 20
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.rowCount = 0
    this.busy = false
    const el = document.getElementById(this.elementId)
    if (el) {
      el.innerHTML = `
        <div class='websy-vis-table'>
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
      const scrollEl = document.getElementById(`${this.elementId}`)
      scrollEl.addEventListener('scroll', this.handleScroll.bind(this))
      this.init()
    } 
    else {
      console.error(`No element found with ID ${this.elementId}`)
    }
  }
  appendRows (page) {
    let bodyHTML = ''

    if (page) {
      bodyHTML += page.qMatrix.map((r, rowIndex) => {
        return '<tr>' + r.map((c, i) => {
          if (this.columns[i].show !== false) {
            if (this.columns[i].showAsLink === true && c.qText.trim() !== '') {
              return `
                <td data-view='${c.qText}' data-index='${rowIndex}' class='trigger-item ${this.columns[i].selectOnClick === true ? 'selectable' : ''} ${this.columns[i].classes || ''}' ${this.columns[i].width ? 'style="width: ' + this.columns[i].width + '"' : ''}>${this.columns[i].linkText || 'Link'}</td>
              `
            } 
            else {
              let v = c.qNum === 'NaN' ? c.qText : c.qNum.toReduced(2, c.qText.indexOf('%') !== -1)
              
              if (c.qText && c.qText.indexOf('€') !== -1) {
                v = v.toCurrency('€')
              }
              return `
                <td class='${this.columns[i].classes || ''}' ${this.columns[i].width ? 'style="width: ' + this.columns[i].width + '"' : ''}>${v}</td>
              `
            }
          }
        }).join('') + '</tr>'
      }).join('')
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
  getData (callbackFn) {
    if (this.busy === false) {
      this.busy = true
      const pageDefs = [{
        qTop: this.rowCount,
        qLeft: 0,
        qWidth: this.dataWidth,
        qHeight: this.dataWidth * this.options.pageSize > 10000 ? Math.floor(10000 / this.dataWidth) : this.options.pageSize
      }]
      if (this.rowCount < this.layout.qHyperCube.qSize.qcy) {
        this.options.model.getHyperCubeData('/qHyperCubeDef', pageDefs).then(pages => {
          if (pages && pages[0]) {
            pages[0].qMatrix = pages[0].qMatrix.filter(r => r[0].qText !== '-')
            this.layout.qHyperCube.qDataPages.push(pages[0])
            this.rowCount += pages[0].qMatrix.length
            this.busy = false
            if (callbackFn) {
              callbackFn(pages[0])
            }
          }
        })
      } 
      else {
        this.busy = false
      }
    }
  }
  handleClick (event) {
    if (event.target.classList.contains('download-button')) {
      window.viewManager.dataExportController.exportData(this.options.model)
    }
    if (event.target.classList.contains('sortable-column')) {
      const colIndex = +event.target.getAttribute('data-index')
      const dimIndex = +event.target.getAttribute('data-dim-index')
      const expIndex = +event.target.getAttribute('data-exp-index')
      const reverse = event.target.getAttribute('data-reverse') === 'true'
      const patchDefs = [{
        qOp: 'replace',
        qPath: '/qHyperCubeDef/qInterColumnSortOrder',
        qValue: JSON.stringify([colIndex])
      }]
      patchDefs.push({
        qOp: 'replace',
        qPath: `/qHyperCubeDef/${dimIndex > -1 ? 'qDimensions' : 'qMeasures'}/${dimIndex > -1 ? dimIndex : expIndex}/qDef/qReverseSort`,
        qValue: JSON.stringify(reverse)
      })
      this.options.model.applyPatches(patchDefs) // .then(() => this.render())
    } 
    else if (event.target.classList.contains('tableSearchIcon')) {
      let field = event.target.getAttribute('data-field')
      window.viewManager.views.global.objects[1].instance.show(field, { x: event.pageX, y: event.pageY }, () => {
        event.target.classList.remove('active')
      })
    }
    else if (event.target.classList.contains('selectable')) {
      const index = +event.target.getAttribute('data-index')
      const data = this.layout.qHyperCube.qDataPages[0].qMatrix[index]
      this.options.model.selectHyperCubeValues('/qHyperCubeDef', 0, [data[0].qElemNumber], false)
    }
  }
  handleScroll (event) {
    if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
      this.getData(page => {
        this.appendRows(page)
      })
    }
  }
  init () {
    this.render()
  }
  render () {
    const bodyEl = document.getElementById(`${this.elementId}_body`)
    bodyEl.innerHTML = ''
    this.rowCount = 0
    this.options.model.getLayout().then(layout => {
      this.layout = layout
      this.dataWidth = this.layout.qHyperCube.qSize.qcx
      this.columnOrder = this.layout.qHyperCube.qColumnOrder
      if (typeof this.columnOrder === 'undefined') {
        this.columnOrder = (new Array(this.layout.qHyperCube.qSize.qcx)).fill({}).map((r, i) => i)
      }
      this.columns = this.layout.qHyperCube.qDimensionInfo.concat(this.layout.qHyperCube.qMeasureInfo)
      this.columns = this.columns.map((c, i) => {
        c.colIndex = this.columnOrder.indexOf(i)
        return c
      })
      this.columns.sort((a, b) => {
        return a.colIndex - b.colIndex
      })
      this.activeSort = this.layout.qHyperCube.qEffectiveInterColumnSortOrder[0]      
      this.getData(page => {
        this.update()
      })
    })
  }
  update () {
    if (this.layout.allowDownload === true) {
      const el = document.getElementById(this.elementId)
      if (el) {
        el.classList.add('allow-download')
      } 
      else {
        el.classList.remove('allow-download')
      }
    }
    let headHTML = '<tr>' + this.columns.map((c, i) => {
      if (c.show !== false) {
        return `
        <th ${c.width ? 'style="width: ' + c.width + '"' : ''}>
          <div class ="tableHeader">
            <div class="leftSection">
              <div
                class="tableHeaderField ${['A', 'D'].indexOf(c.qSortIndicator) !== -1 ? 'sortable-column' : ''}"
                data-index="${i}"
                data-dim-index="${i < this.layout.qHyperCube.qDimensionInfo.length ? i : -1}"
                data-exp-index="${i >= this.layout.qHyperCube.qDimensionInfo.length ? i - this.layout.qHyperCube.qDimensionInfo.length : -1}"
                data-sort="${c.qSortIndicator}"
                data-reverse="${this.activeSort === i && c.qReverseSort !== true}"
              >
                ${c.qFallbackTitle}
              </div>
            </div>
            <div class="${this.activeSort === i ? 'sortOrder' : ''} ${c.qSortIndicator === 'A' ? 'ascending' : 'descending'}"></div>
            ${c.searchable === true ? this.buildSearchIcon(c.qGroupFieldDefs[0]) : ''}
          </div>
        </th>
        `
      }
    }).join('') + '</tr>'
    const headEl = document.getElementById(`${this.elementId}_head`)
    headEl.innerHTML = headHTML
    this.appendRows(this.layout.qHyperCube.qDataPages[0])
  }
}
