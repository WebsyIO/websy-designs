const express = require('express')
const app = express()

app.use('/examples', express.static(`${__dirname}/examples`))
app.use('/dist', express.static(`${__dirname}/dist`))
app.use('/src', express.static(`${__dirname}/src`))
app.use('/resources', express.static(`${__dirname}/resources`))
app.use('/node_modules', express.static(`${__dirname}/node_modules`))

app.use('/examples/:site/*', (req, res) => {
  res.sendFile(`${__dirname}/examples/${req.params.site}/index.html`)
})

app.listen(9000, function () {
  console.log('listening on port 9000')
})
