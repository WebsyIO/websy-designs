const express = require('express')
const bodyParser = require('body-parser')
const cookie = require('cookie')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const sessionHelper = require('./helpers/v1/sessionHelper')
// const DBSession = require(process.env.EXPRESS_SESSION_CONNECT)(expressSession)

module.exports = function (options) {
  return new Promise((resolve, reject) => {
    const app = express()
    app.set('trust proxy', 1)
    let version = options.version || 'v1'
    app.use(bodyParser.json({limit: '5mb'}))
    app.use(bodyParser.urlencoded({limit: '5mb', extended: true}))
    app.use(bodyParser.raw({limit: '5mb'}))
    const allowCrossDomain = (req, res, next) => {
      // console.log(req.url);
      // const allowedOrigins = ['https://www.google.com', 'http://localhost:4000', 'https://localhost:4000', 'http://ec2-3-92-185-52.compute-1.amazonaws.com', 'https://ec2-3-92-185-52.compute-1.amazonaws.com']
      let allowedOrigins = ['*']
      if (process.env.ALLOWS_ORIGINS) {
        allowedOrigins = process.env.ALLOWS_ORIGINS.split(',')
      }
      const origin = req.headers.origin
      console.log(allowedOrigins.indexOf(origin))
      if (allowedOrigins.indexOf(origin) !== -1) {        
        res.header('Access-Control-Allow-Origin', origin)
      }
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
      res.header('Access-Control-Allow-Credentials', true)
      res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Content-Type, Authorization, X-Requested-With, Set-Cookie')
      next()
    }
    app.use(allowCrossDomain)
    app.get('/environment', (req, res) => {
      const env = {}
      for (let key in process.env) {
        if (key.substring(0, 7) === 'CLIENT_') {
          env[key.substring(7)] = process.env[key]
        }
      }
      res.json(env)
    })
    if (options.useRecaptcha === true) {
      app.use('/google', require(`./routes/${version}/recaptcha`))
    }
    if (options.useDB === true) {
      const dbHelper = require(`./helpers/${version}/${options.dbEngine}Helper`)
      dbHelper.init().then(() => {        
        console.log('initializing session')
        console.log(dbHelper.pool)
        // const store = new DBSession({
        //   pool: dbHelper.pool, // Connection pool, need to make dynamic to accommodate mySql
        //   tableName: 'sessions' // Use another table-name than the default "session" one
        // })
        console.log('setting up session')
        console.log(process.env)
        app.set('trust proxy', 1)
        app.use(cookieParser(process.env.SESSION_SECRET))
        let cookieConfig = {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: false,
          domain: process.env.COOKIE_DOMAIN || 'localhost',
          // secure: process.env.COOKIE_SECURE || true,
          sameSite: process.env.COOKIE_SAMESITE || 'none',
          credentials: 'include'
        }
        if (process.env.COOKIE_SECURE === 'true' || process.env.COOKIE_SECURE === true) {
          cookieConfig.secure = true
        }
        app.use(expressSession({
          secret: process.env.SESSION_SECRET,
          resave: false,
          saveUninitialized: true,
          cookie: cookieConfig,
          name: process.env.COOKIE_NAME
          // store: store
        })) 
        // app.use(sessionHelper.checkSession(dbHelper))
        // app.use(function (req, res, next) {
        //   console.log('WD MIDDLEWARE')
        //   console.log(req.session)
        //   let cookies = {}
        //   if (typeof req.headers.cookie === 'string') {
        //     cookies = cookie.parse(req.headers.cookie)
        //   }
        //   console.log('cookies')
        //   console.log(cookies)
        //   next()
        // })  
        if (options.useAPI === true) {
          app.use('/api', require(`./routes/${version}/api`)(dbHelper)) 
        }  
        if (options.useAuth === true) {          
          app.use('/auth', require(`./routes/${version}/auth`)(dbHelper, options.dbEngine, app))
        }
        if (options.useShop === true) {
          app.use('/shop', require(`./routes/${version}/shop`)(dbHelper, options.dbEngine, app))
          if (options.usePayPal === true) {
            app.use('/checkout', require(`./routes/${version}/checkout`)(dbHelper, options, app))
          }
        }
        resolve({app, dbHelper})
      })    
    }    
    else {
      resolve(app)
    }
  })  
}
