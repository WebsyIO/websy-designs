const puppeteer = require('puppeteer')
const report = require('./puppeteer-report')
const fs = require('fs')
const utils = require('../../utils')
const http = require('http')
let lastHTML = ''
let testHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/external/@websy/websy-designs/dist/websy-designs.min.css">
  <link rel="stylesheet" href="/styles/pdf.min.css">  
  <style>
    html {
      -webkit-print-color-adjust: exact;
      width: unset;
      background-color: white;
    }
    body {
      width: unset;
      background-color: white;
    }
    #header {
      margin: 0 15px;
      max-height: unset;
    }            
    #footer {
      margin: 0 15px;
    }
  </style>
</head>

<body>
	<div id="app">
		<div id="header">
			Header		
		</div>		
		${(new Array(300).fill({}).map((d, i) => '<p>val ' + i + '</p>')).join('')}
		<div id="footer">
			Footer
		</div>
	</div>
</body>

</html>
`

let convertHTMLToPDF = (html, name, callback, options_in = null, displayHeaderFooter) => {    
  const pOptions = { 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized', '--font-render-hinting=none']
  }  
  let options = Object.assign({}, { 
    format: 'a4', 
    printBackground: true,
    displayHeaderFooter: false,
    margin: { left: '0cm', top: '1cm', right: '0cm', bottom: '1cm' }
  }, options_in)  
  if (process.env.CHROME_PATH) {
    pOptions.executablePath = process.env.CHROME_PATH
  }
  puppeteer.launch(pOptions).then(browser => {
    browser.newPage().then(page => {  
      page.on('requestfailed', err => {
        console.log('request failed', err)
      })
      page.on('error', err => {
        console.log('error', err)
      })
      const pdfId = name
      // options.path = `${process.env.APP_ROOT}/pdf/${pdfId}.pdf`
      // From https://github.com/GoogleChrome/puppeteer/issues/728#issuecomment-359047638
      // Using this method to preserve external resources while maximizing allowed size of pdf
      // Capture first request only      
      // page.setRequestInterception(true).then(() => {
      // page.once('request', request => {
      //   // Fulfill request with HTML, and continue all subsequent requests          
      //   request.respond({body: html})
      //   page.on('request', request => request.continue())
      // })
      page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36').then(() => {
        page.setContent(html, {waitUntil: ['load', 'domcontentloaded', 'networkidle2', 'networkidle0']}).then(() => {
          page.evaluateHandle('document.fonts.ready').then(() => {
            report.pdfPage(page, options).then(pdf => {                        
              browser.close()
              callback(null, toBuffer(pdf.buffer))
            }, (error) => {
              console.log(error)
              console.log('info', `Error creating PDF: ${error}`)            
              browser.close()
              callback(error)
            })
          }, err => console.log('error evaluating handle in puppeteer', err))
        }, err => console.log('error setting content in puppeteer', err))
      }, err => console.log('error setting user agent in puppeteer', err))
      // page.goto(process.env.PDF_PAGE || 'http://localhost:4000', {waitUntil: ['load', 'domcontentloaded', 'networkidle2', 'networkidle0']}).then(gotoResponse => {
      // page.setViewport({width: 1500, height: 2000, deviceScaleFactor: 1}).then(() => {                                
      // options.path = `${process.env.APP_ROOT}/pdf/${pdfId}.pdf`          
      // report.pdfPage(page, options).then(pdf => {                        
      //   browser.close()
      //   callback(null, toBuffer(pdf.buffer))
      // }, (error) => {
      //   console.log(error)
      //   console.log('info', `Error creating PDF: ${error}`)            
      //   browser.close()
      //   callback(error)
      // })
      // })          
      // }, err => {
      //   console.log('info', `Error fetching: ${err}`)
      // })        
      // }, err => {
      //   console.log('info', `Error in interception: ${err}`)
      // })      
    }, err => {
      console.log('info', `Error creating page: ${err}`)
    })    
  }, err => {
    console.log('info', `Error launching puppeteer: ${err}`)
  })
}

function toBuffer (ab) {
  let buf = Buffer.alloc(ab.byteLength)
  let view = new Uint8Array(ab)
  for (let i = 0; i < buf.length; i++) {
    buf[i] = view[i]
  }
  return buf
}

module.exports = {
  createPDF: (data, callbackFn) => {
    let header = ''
    let footer = ''
    if (data.header) {      
      header = `<div id='header'>${data.header}</div>`
    }
    if (data.footer) {      
      footer = `<div id='footer'>${data.footer}</div>`
    }    
    if (!data.options) {
      data.options = {}
    }    
    const html = `
      <!DOCTYPE html>
      <html lang="en" dir="ltr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">         
${
  process.env.PDF_STYLE_SHEETS ? process.env.PDF_STYLE_SHEETS.split(';').map(s => {    
    return '<style>' + fs.readFileSync(process.env.APP_ROOT + s) + '</style>'
  }).join('') : ''
}          
          <style>
            html {
              -webkit-print-color-adjust: exact;
              width: unset;
              background-color: white;
              overflow: unset;
              overflow-y: unset;              
            }
            body {
              width: unset;
              background-color: white;
              overflow: unset;
              overflow-y: unset;
            }
            #header {              
              max-height: ${data.options.headerHeight ? data.options.headerHeight + 'px' : 'unset'};
            }            
            #footer {              
            }
            ${data.options.headerCSS ? data.options.headerCSS : ''}
            ${data.options.footerCSS ? data.options.footerCSS : ''}
          </style>
        </head>
        <body>          
          <div id='app' class='pdf-print'>
            ${header}
            ${data.html}  
            ${footer}
          </div>
        </body>
      </html>
    `
    lastHTML = html    
    convertHTMLToPDF(html, data.name || utils.createIdentity(), (err, pdf) => {
      console.log('info', `HTML converted to PDF`)      
      // setTimeout(() => {
      //   try {
      //     // fs.unlinkSync(`${process.env.APP_ROOT}/pdf/${pdfId}.pdf`) 
      //   } 
      //   catch (error) {
      //     console.log('Could not remove temp PDF')
      //   }        
      // }, 120000)
      callbackFn(err, pdf)
    }, data.options, (header !== '' || footer !== ''))
  },
  getLastHTML: () => {
    return lastHTML
  }
}
