const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const DBSession = require(process.env.EXPRESS_SESSION_CONNECT)(expressSession)

module.exports = function (options) {
  return new Promise((resolve, reject) => {
    const app = express()
    app.use(bodyParser.json({limit: '5mb'}))
    app.use(bodyParser.urlencoded({limit: '5mb'}))
    app.use(bodyParser.raw({limit: '5mb'}))
    const allowCrossDomain = (req, res, next) => {
      // console.log(req.url);
      const allowedOrigins = ['http://localhost:4000', 'http://ec2-3-92-185-52.compute-1.amazonaws.com', 'https://ec2-3-92-185-52.compute-1.amazonaws.com']
      const origin = req.headers.origin   
      console.log('cross domain check for', origin) 
      console.log(allowedOrigins.indexOf(origin))
      if (allowedOrigins.indexOf(origin) !== -1) {
        console.log('here')
        res.header('Access-Control-Allow-Origin', origin)
      }
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
      res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Authorization, X-Requested-With')
      next()
    }
    app.use(allowCrossDomain)
    if (options.useDB) {
      const dbHelper = require(`./helpers/${options.dbEngine}Helper`)
      dbHelper.init().then(() => {     
        const store = new DBSession({
          pool: dbHelper.pool, // Connection pool, need to make dynamic to accommodate mySql
          tableName: 'session' // Use another table-name than the default "session" one
        })
        app.use(cookieParser(process.env.SESSION_SECRET))
        app.use(expressSession({
          secret: process.env.SESSION_SECRET,
          resave: true,
          saveUninitialized: false,
          cookie: {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false, domain: 'localhost', sameSite: 'None'},
          name: process.env.COOKIE_NAME,
          store: store
        }))   
        if (options.useAPI === true) {
          app.use('/api', require('./routes/api')(dbHelper)) 
        }  
        if (options.useAuth === true) {          
          app.use('/auth', require('./routes/auth')(dbHelper, app))
        }
        if (options.useShop === true) {
          app.use('/shop', require('./routes/shop')(dbHelper))
        }
        resolve(app)
      })    
    }    
    else {
      resolve(app)
    }
  })  
}
