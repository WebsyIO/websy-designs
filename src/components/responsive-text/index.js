class ResponsiveText {
  constructor (elementId, options) {
    const DEFAULTS = {
      textAlign: 'center',
      verticalAlign: 'flex-end',
      wrapText: false
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.elementId = elementId
    this.canvas = document.createElement('canvas')
    window.addEventListener('resize', () => this.render())
    const el = document.getElementById(this.elementId)
    if (el) {
      this.render() 
    }    
  }
  css (element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property)
  }
  render (text) {
    if (typeof text !== 'undefined') {
      this.options.text = text
    }
    if (this.options.text) {
      let wrappingRequired = false
      const el = document.getElementById(this.elementId)
      let cx = this.canvas.getContext('2d')
      let f = 0
      let fits = false
      // let el = document.getElementById(`${layout.qInfo.qId}_responsiveInner`)
      let height = el.clientHeight
      if (typeof this.options.maxHeight === 'string' && this.options.maxHeight.indexOf('%') !== -1) {
        let p = +this.options.maxHeight.replace('%', '')
        if (!isNaN(p)) {
          this.options.maxHeight = Math.floor(height * (p / 100))
        }
      } 
      else if (
        typeof this.options.maxHeight === 'string' &&
        this.options.maxHeight.indexOf('px') !== -1
      ) {
        this.options.maxHeight = +this.options.maxHeight.replace('px', '')
      }
      if (typeof this.options.minHeight === 'string' && this.options.minHeight.indexOf('%') !== -1) {
        let p = +this.options.minHeight.replace('%', '')
        if (!isNaN(p)) {
          this.options.minHeight = Math.floor(height * (p / 100))
        }
      } 
      else if (
        typeof this.options.minHeight === 'string' &&
        this.options.minHeight.indexOf('px') !== -1
      ) {
        this.options.minHeight = +this.options.minHeight.replace('px', '')
      }

      const fontFamily = this.css(el, 'font-family')
      const fontWeight = this.css(el, 'font-weight')
      let allowedWidth = el.clientWidth
      if (allowedWidth === 0) {
        // check for a max-width property
        if (
          el.style.maxWidth &&
          el.style.maxWidth !== 'auto'
        ) {
          if (el.parentElement.clientWidth > 0) {
            let calc = el.style.maxWidth
            if (calc.indexOf('calc') !== -1) {
              // this logic currently only handles calc statements using % and px
              // and only + or - formulas
              calc = calc.replace('calc(', '').replace(')', '')
              calc = calc.split(' ')
              if (calc[0].indexOf('px') !== -1) {
                allowedWidth = calc[0].replace('px', '')
              } 
              else if (calc[0].indexOf('%') !== -1) {
                allowedWidth = el.parentElement.clientWidth * (+calc[0].replace('%', '') / 100)
              }
              if (calc[2] && calc[4]) {
                // this means we have an operator and a second value
                // handle -
                if (calc[2] === '-') {
                  if (calc[4].indexOf('px') !== -1) {
                    allowedWidth -= +calc[4].replace('px', '')
                  }
                }
                if (calc[2] === '+') {
                  if (calc[4].indexOf('px') !== -1) {
                    allowedWidth += +calc[4].replace('px', '')
                  }
                }
              }
            } 
            else if (calc.indexOf('px') !== -1) {
              allowedWidth = +calc.replace('px', '')
            } 
            else if (calc.indexOf('%') !== -1) {
              allowedWidth =
                el.parentElement.clientWidth *
                (+calc.replace('%', '') / 100)
            }
          }
        }
      }
      // console.log('max height', this.options.maxHeight);
      let innerElHeight = el.clientHeight
      while (fits === false) {
        f++
        cx.font = `${fontWeight} ${f}px ${fontFamily}`
        let measurements = cx.measureText(this.options.text)
        // add support for safari where some elements end up with zero height
        if (navigator.userAgent.indexOf('Safari') !== -1) {
          // get the closest parent that has a height
          let heightFound = false
          let currEl = el
          while (heightFound === false) {
            if (currEl.clientHeight > 0) {
              innerElHeight = currEl.clientHeight
              heightFound = true
            } 
            else if (currEl.parentNode) {
              currEl = currEl.parentNode
            } 
            else {
              // prevent the loop from running indefinitely
              heightFound = true
            }
          }
        }
        if (typeof this.options.maxHeight !== 'undefined' && f === this.options.maxHeight) {
          f = this.options.maxHeight
          height = measurements.actualBoundingBoxAscent
          fits = true
        } 
        else if (
          measurements.width > allowedWidth ||
          measurements.actualBoundingBoxAscent >= innerElHeight
        ) {
          f--
          height = measurements.actualBoundingBoxAscent
          fits = true
        }
      }
      if (this.options.minHeight === '') {
        this.options.minHeight = undefined
      }
      if (typeof this.options.minHeight !== 'undefined') {
        if (this.options.minHeight > f && this.options.wrapText === true) {
          // we run the process again but this time separating the words onto separate lines
          // this currently only supports wrapping onto 2 lines          
          wrappingRequired = true
          fits = false
          f = this.options.minHeight
          let spaceCount = this.options.text.match(/ /g)
          if (spaceCount && spaceCount.length > 0) {
            spaceCount = spaceCount.length
            let words = this.options.text.split(' ')
            while (fits === false) {
              f++
              cx.font = `${fontWeight} ${f}px ${fontFamily}`
              for (let i = spaceCount; i > 0; i--) {
                let fitsCount = 0
                let lines = [
                  words.slice(0, i).join(' '),
                  words.slice(i, words.length).join(' ')
                ]
                let longestLine = lines.reduce(
                  (a, b) => (a.length > b.length ? a : b),
                  ''
                )
                // lines.forEach(l => {
                let measurements = cx.measureText(longestLine)
                // add support for safari where some elements end up with zero height
                if (navigator.userAgent.indexOf('Safari') !== -1) {
                  // get the closest parent that has a height
                  let heightFound = false
                  let currEl = el
                  while (heightFound === false) {
                    if (currEl.clientHeight > 0) {
                      innerElHeight = currEl.clientHeight
                      heightFound = true
                    } 
                    else if (currEl.parentNode) {
                      currEl = currEl.parentNode
                    } 
                    else {
                      // prevent the loop from running indefinitely
                      heightFound = true
                    }
                  }
                }
                if (typeof this.options.maxHeight !== 'undefined' && f === this.options.maxHeight) {
                  f = this.options.maxHeight
                  height = measurements.actualBoundingBoxAscent
                  fits = true
                  break
                } 
                else if (
                  measurements.width > allowedWidth ||
                  measurements.actualBoundingBoxAscent >=
                    (innerElHeight / 2) * 0.75
                ) {
                  f--
                  height = measurements.actualBoundingBoxAscent
                  fits = true
                  break
                }
                // })
              }
            }
          }
          if (typeof this.options.minHeight !== 'undefined' && this.options.minHeight > f) {
            f = this.options.minHeight
          }
        } 
        else if (this.options.minHeight > f) {
          f = this.options.minHeight
        }
      }      
      let spanHeight = Math.min(innerElHeight, height)
      el.innerHTML = `
        <div 
          class='websy-responsive-text' 
          style='
            justify-content: ${this.options.verticalAlign};
            font-size: ${f}px;
            font-weight: ${fontWeight || 'normal'};
          '
        >  
          <span
            style='
              white-space: ${this.options.wrapText === true ? 'normal' : 'nowrap'};
              height: ${Math.floor(wrappingRequired === true ? spanHeight * ((1 * 1) / 3) * 2 : spanHeight)}px;
              line-height: ${Math.ceil(wrappingRequired === true ? f * 1.2 : spanHeight)}px;
              justify-content: ${this.options.textAlign};
              text-align: ${this.options.textAlign};
            '
          >${this.options.text}</span>
        </div>
      `
    }
  }
}
