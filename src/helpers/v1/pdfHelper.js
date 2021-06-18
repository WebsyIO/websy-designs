const puppeteer = require('puppeteer')
const report = require('puppeteer-report')
const fs = require('fs')

let convertHTMLToPDF = (html, name, callback, options = null) => {
  console.log('info', `Launching Puppeteer`)
  const pOptions = { 
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized']
  }
  if (process.env.CHROME_PATH) {
    pOptions.executablePath = process.env.CHROME_PATH
  }
  puppeteer.launch(pOptions).then(browser => {
    console.log('info', `Puppeteer Launched: ${browser}`)
    console.log('info', `Creating new PDF page`)
    browser.newPage().then(page => {
      if (!options) {
        options = { 
          format: 'Letter', 
          printBackground: true,
          displayHeaderFooter: true,
          margin: { left: '0cm', top: '1cm', right: '0cm', bottom: '2cm' }
        }
      }
      const pdfId = name
      options.path = `${process.env.APP_ROOT}/pdf/${pdfId}.pdf`
      // From https://github.com/GoogleChrome/puppeteer/issues/728#issuecomment-359047638
      // Using this method to preserve external resources while maximizing allowed size of pdf
      // Capture first request only
      page.setRequestInterception(true).then(() => {
        page.once('request', request => {
          // Fulfill request with HTML, and continue all subsequent requests          
          request.respond({body: html})
          page.on('request', request => request.continue())
        })
        console.log('info', `Fetching page contents`)
        page.goto(process.env.PDF_PAGE || 'http://localhost:4000', {waitUntil: ['load', 'domcontentloaded', 'networkidle2', 'networkidle0']}).then(() => {
          // page.setViewport({width: 1500, height: 2000, deviceScaleFactor: 1}).then(() => {            
          console.log('info', `Content fetched`)
          console.log(options)
          // page.pdf(options).then(pdf => {
          report.pdfPage(page, options).then(pdf => {
            browser.close()
            callback(pdfId)
          }, (error) => {
            console.log(error)
            console.log('info', `Error creating PDF: ${error}`)
            browser.close()
          })
          // })          
        }, err => {
          console.log('info', `Error fetching: ${err}`)
        })        
      }, err => {
        console.log('info', `Error in interception: ${err}`)
      })      
    }, err => {
      console.log('info', `Error creating page: ${err}`)
    })    
  }, err => {
    console.log('info', `Error launching puppeteer: ${err}`)
  })
}

module.exports = {
  createPDF: (data, callbackFn) => {
    let header = ''
    if (data.header) {      
      header = `<div id='header'>${data.header}</div>`
    }
    const html = `
      <!DOCTYPE html>
      <html lang="en" dir="ltr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">         
${
  process.env.PDF_STYLE_SHEETS ? process.env.PDF_STYLE_SHEETS.split(';').map(s => {
    return '<link rel="stylesheet" href="' + s + '">'
  }) : '<link rel="stylesheet" href="/styles/app.min.css">'
}          
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
              max-height: ${data.options.headerHeight}px;
            }            
            #footer {
              margin: 0 15px;
            }
          </style>
        </head>
        <body>          
          <div class='pdf-print'>
            ${header}
            ${data.html}  
            <div id='footer'>
              <div class='text-center'>
                <span style='font-size: 12px; font-weight: bold;' class='pageNumber'></span>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
    // console.log(html)
    convertHTMLToPDF(html, data.name || 'someName', pdfId => {
      console.log('info', `HTML converted to PDF`)      
      setTimeout(() => {
        try {
          fs.unlinkSync(`${process.env.APP_ROOT}/pdf/${pdfId}.pdf`) 
        } 
        catch (error) {
          console.log('Could not remove temp PDF')
        }        
      }, 120000)
      callbackFn(pdfId)
    }, data.options)
  }
}
