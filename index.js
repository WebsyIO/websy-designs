const express = require('express')
const app = express()

try {
  let config = require('./config')
  if (config) {
    for (let c in config) {
      process.env[c] = config[c]
    }
  }
}
catch (err) {
  // No configuration file found. Not an issue if deploying on heroku for example
}

app.use('/examples', express.static(`${__dirname}/examples`))
app.use('/dist', express.static(`${__dirname}/dist`))
app.use('/src', express.static(`${__dirname}/src`))
app.use('/resources', express.static(`${__dirname}/resources`))
app.use('/node_modules', express.static(`${__dirname}/node_modules`))

app.use('/examples/:site/*', (req, res) => {
  res.sendFile(`${__dirname}/examples/${req.params.site}/index.html`)
})

require('./dist/server/websy-designs-server')({
  // 
}).then(({ app }) => {  
  process.env.APP_ROOT = __dirname  
  app.use('/favicon.ico', (req, res) => {
    res.sendFile(`${__dirname}/public/favicon.svg`)
  })
  app.use('/public', express.static(`${__dirname}/public`))  
  app.use(`/`, (req, res) => {  
    res.sendFile(`${process.env.APP_ROOT}/public/${process.env.LATEST_VERSION}/index.html`)
  }) 
  
  app.listen(process.env.PORT || 9000, function () {
    console.log('listening on port 9000')
  })
})
