const WebsyUtils = {
  createIdentity: (size = 6) => {	
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
    for (let i = 0; i < size; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  },
  getElementPos: el => {
    const rect = el.getBoundingClientRect()
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return { 
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      bottom: rect.top + scrollTop + el.clientHeight,
      right: rect.left + scrollLeft + el.clientWidth
    }
  },
  getLightDark: (backgroundColor, darkColor = '#000000', lightColor = '#ffffff') => {
    let colorParts
    let red = 0
    let green = 0
    let blue = 0
    let alpha = 1
    if (backgroundColor.indexOf('#') !== -1) {
      // hex color
      backgroundColor = backgroundColor.replace('#', '')
      colorParts = backgroundColor
      colorParts = colorParts.split('')
      red = parseInt(colorParts[0] + colorParts[1], 16)
      green = parseInt(colorParts[2] + colorParts[3], 16)
      blue = parseInt(colorParts[4] + colorParts[5], 16)
    }
    else if (backgroundColor.toLowerCase().indexOf('rgb') !== -1) {
      // rgb color
      colorParts = backgroundColor.replace(/rgba\(/gi, '').replace(/\)/gi, '')
      colorParts = colorParts.replace(/rgb\(/gi, '')
      colorParts = colorParts.split(',')
      red = colorParts[0]
      green = colorParts[1]
      blue = colorParts[2]
      alpha = colorParts[3] || 1
    }
    return ((red * 0.299 + green * 0.587 + blue * 0.114) / alpha) > 186 ? darkColor : lightColor
  },
  measureText (text, rotation = 0, fontSize = '12px') {
    if (!isNaN(fontSize)) {
      fontSize = `${fontSize}px`
    }
    let html = `<div style='display: inline-block; width: auto; font-size: ${fontSize}'>${text}</div>`
    const el = document.createElement('div')
    el.style.position = 'absolute'    
    el.style.visibility = 'hidden'
    el.style.transform = `rotate(${rotation}deg)`
    el.innerHTML = html
    document.body.appendChild(el)
    let w = el.getBoundingClientRect()
    el.remove()
    return w
  },
  parseUrlParams: () => {
    let queryString = window.location.search.replace('?', '')
    const params = {}
    let parts = queryString.split('&')
    for (let i = 0; i < parts.length; i++) {
      let keyValue = parts[i].split('=')
      params[keyValue[0]] = keyValue[1]
    }
    return params
  },
  buildUrlParams: (params) => {    
    let out = []
    for (const key in params) {
      out.push(`${key}=${params[key]}`)
    }
    return out.join('&')
  },
  fromQlikDate: d => {    
    let output = new Date(Math.round((d - 25569) * 86400000))    
    output.setTime(output.getTime() + output.getTimezoneOffset() * 60000)
    return output
  },
  toReduced: (v, decimals = 0, isPercentage = false, test = false, control) => {
    let ranges = [{
      divider: 1e18,
      suffix: 'E'
    }, {
      divider: 1e15,
      suffix: 'P'
    }, {
      divider: 1e12,
      suffix: 'T'
    }, {
      divider: 1e9,
      suffix: 'G'
    }, {
      divider: 1e6,
      suffix: 'M'
    }, {
      divider: 1e3,
      suffix: 'K'
    }]  
    let numOut
    let divider
    let suffix = ''  
    if (control) {    
      let settings = getDivider(control)
      divider = settings.divider
      suffix = settings.suffix    
    }  
    if (v === 0) {
      numOut = 0
    }
    else if (control) {
      numOut = (v / divider) // .toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$100,')
    }
    else if (v < 1000 && v % 1 === 0) {
      numOut = v
      // decimals = 0
    }
    else {
      numOut = v
      for (let i = 0; i < ranges.length; i++) {
        if (v >= ranges[i].divider) {
          numOut = (v / ranges[i].divider) // .toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$100,')
          suffix = ranges[i].suffix
          break
        } 
        // else if (isPercentage === true) {
        //   numOut = (this * 100).toFixed(decimals)
        // }
        // else {
        //   numOut = (this).toFixed(decimals)
        // }
      }
    }
    if (isPercentage === true) {
      numOut = numOut * 100    
    }
    if (numOut % 1 > 0) {
      decimals = 1
    }
    if (numOut < 1) {
      decimals = getZeroDecimals(numOut)    
    }  
    numOut = (+numOut).toFixed(decimals)
    if (test === true) {
      return numOut
    }
    if (numOut.replace) {
      numOut = numOut.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    function getDivider (n) {
      let s = ''
      let d = 1
      // let out
      for (let i = 0; i < ranges.length; i++) {      
        if (n >= ranges[i].divider) {
          d = ranges[i].divider
          s = ranges[i].suffix
          // out = (n / ranges[i].divider).toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$100,')                
          break
        }       
      }    
      return { divider: d, suffix: s }
    }
    function getZeroDecimals (n) {
      let d = 0
      n = Math.abs(n)
      if (n === 0) {
        return 0
      }
      while (n < 10) {
        d++
        n = n * 10
      }    
      return d    
    }
    return `${numOut}${suffix}${isPercentage === true ? '%' : ''}`
  },
  toQlikDateNum: d => {
    return Math.floor(d.getTime() / 86400000 + 25570)
  },
  toQlikDate: d => {
    return Math.floor(d.getTime() / 86400000 + 25570)
  }
}
