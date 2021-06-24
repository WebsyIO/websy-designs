/* global WebsyDesigns */ 
class WebsyPDFButton {
  constructor (elementId, options) {
    const DEFAULTS = {
      classes: [],
      wait: 0
    }
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.service = new WebsyDesigns.APIService('pdf')
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      if (options.html) {
        el.innerHTML = options.html
      }
      else {
        el.innerHTML = `
          <button class='websy-btn websy-pdf-button ${this.options.classes.join(' ')}'>
            Create PDF
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 184.153 184.153" style="enable-background:new 0 0 184.153 184.153;" xml:space="preserve">
              <g>
                <g>
                  <g>
                    <path d="M129.318,0H26.06c-1.919,0-3.475,1.554-3.475,3.475v177.203c0,1.92,1.556,3.475,3.475,3.475h132.034
                      c1.919,0,3.475-1.554,3.475-3.475V34.131C161.568,22.011,140.771,0,129.318,0z M154.62,177.203H29.535V6.949h99.784
                      c7.803,0,25.301,18.798,25.301,27.182V177.203z"/>
                    <path d="M71.23,76.441c15.327,0,27.797-12.47,27.797-27.797c0-15.327-12.47-27.797-27.797-27.797
                      c-15.327,0-27.797,12.47-27.797,27.797C43.433,63.971,55.902,76.441,71.23,76.441z M71.229,27.797
                      c11.497,0,20.848,9.351,20.848,20.847c0,0.888-0.074,1.758-0.183,2.617l-18.071-2.708L62.505,29.735
                      C65.162,28.503,68.112,27.797,71.229,27.797z M56.761,33.668l11.951,19.869c0.534,0.889,1.437,1.49,2.462,1.646l18.669,2.799
                      c-3.433,6.814-10.477,11.51-18.613,11.51c-11.496,0-20.847-9.351-20.847-20.847C50.381,42.767,52.836,37.461,56.761,33.668z"/>
                    <rect x="46.907" y="90.339" width="73.058" height="6.949"/>
                    <rect x="46.907" y="107.712" width="48.644" height="6.949"/>
                    <rect x="46.907" y="125.085" width="62.542" height="6.949"/>
                  </g>
                </g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              </svg>
          </button>
          <div id='${this.elementId}_loader'></div>
          <div id='${this.elementId}_popup'></div>
        `
        this.loader = new WebsyDesigns.WebsyLoadingDialog(`${this.elementId}_loader`, { classes: ['global-loader'] })
        this.popup = new WebsyDesigns.WebsyPopupDialog(`${this.elementId}_popup`)
      }
    }
  }
  handleClick (event) {
    if (event.target.classList.contains('websy-pdf-button')) {
      this.loader.show()
      setTimeout(() => {        
        if (this.options.targetId) {
          const el = document.getElementById(this.options.targetId)
          if (el) {
            const pdfData = { options: {} }
            if (this.options.pdfOptions) {
              pdfData.options = Object.assign({}, this.options.pdfOptions)
            }
            if (this.options.header) {
              if (this.options.header.elementId) {
                const headerEl = document.getElementById(this.options.header.elementId)
                if (headerEl) {
                  pdfData.header = headerEl.outerHTML  
                  if (this.options.header.css) {
                    pdfData.options.headerCSS = this.options.header.css
                  }
                }
              }
              else {
                pdfData.header = this.options.header
              }
            }
            if (this.options.footer) {
              if (this.options.footer.elementId) {
                const footerEl = document.getElementById(this.options.footer.elementId)
                if (footerEl) {
                  pdfData.footer = footerEl.outerHTML  
                  if (this.options.footer.css) {
                    pdfData.options.footerCSS = this.options.footer.css
                  }
                }
              }
              else {
                pdfData.footer = this.options.footer
              }
            }
            pdfData.html = el.outerHTML
            this.service.add('', pdfData).then(response => {
              this.loader.hide()
              this.popup.show({
                message: `
                  <div class='text-center'>
                    <div>Your file is ready to download</div>
                    <a href='/pdf/${response}.pdf' target='_blank'>Download</a>
                `,
                mask: true
              })
              console.log(response)
            }, err => {
              console.error(err)
            })
          }
        } 
      }, this.options.wait)           
    }
  }
  render () {
    // 
  }
}
