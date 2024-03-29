const express = require('express')
const router = express.Router()
const expressSession = require('express-session')
const DBSession = require('connect-pg-simple')(expressSession)
const cookieParser = require('cookie-parser')
const cookie = require('cookie')
const sessionHelper = require('../../helpers/v1/sessionHelper')

const sql = {
  pg: {
    users: `
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        salt character varying(128) UNIQUE,
        pepper character varying(128) UNIQUE,
        created timestamp without time zone DEFAULT now(),
        edited timestamp without time zone,
        email character varying(256),
        firstname character varying(256),
        lastname character varying(256),
        role character varying(50) DEFAULT 'User'::character varying,
        lastlogon timestamp without time zone,
        activated boolean DEFAULT false,
        activationcode uuid,
        activationexpiry bigint,
        optedin boolean DEFAULT false
      );
    `,
    sessions: `
      CREATE TABLE sessions (
        sid character varying PRIMARY KEY,
        sess json NOT NULL,
        expire timestamp(6) without time zone NOT NULL
      );
    `
  },
  mysql: {

  }
}

function AuthRoutes (dbHelper, engine, app, Strategy) {  
  // const AuthHelper = require('../../helpers/v1/authHelper')  
  if (typeof Strategy !== 'undefined') {
    app.authHelper = new Strategy(dbHelper)
  }
  // else {
  //   app.authHelper = new AuthHelper(dbHelper)
  // }
  if (dbHelper && !dbHelper.client) {
    dbHelper.onReadyAuthCallbackFn = readyCallback
  }
  else {
    readyCallback()
  }   
  router.post('/login', (req, res) => {
    app.authHelper.login(req, res).then(user => {
      console.log('after login')
      if (!req.session) {
        req.session = {}
      }
      console.log(user)
      req.session.user = user      
      if (dbHelper) {
        const sId = sessionHelper.getSessionId(req)
        let method = 'saveSession'
        let params = [dbHelper, sId, req.session]
        if (!sId) {
          method = 'createSession'
          params = [dbHelper, req.session]
        }
        // sessionHelper[method](...params).then((response) => {
        // res.setHeader('Set-Cookie', cookie.serialize(process.env.COOKIE_NAME, String(response.sessionId), {
        //   httpOnly: true,
        //   sameSite: 'none',
        //   secure: true,
        //   maxAge: (1000 * 60 * 60 * 24)
        // }))                    
        res.json(req.session.user)
        // }, err => {
        // res.json({err})
        // }) 
      }
    }, err => {
      console.log('in auth route', err)
      res.json({err})
    })
  })
  router.post('/signup', (req, res) => {    
    app.authHelper.signup(req, res).then(user => {
      if (!req.session) {
        req.session = {}
      }
      req.session.user = user
      if (dbHelper) {
        const sId = sessionHelper.getSessionId(req)
        sessionHelper.saveSession(dbHelper, sId, req.session).then(() => {
          res.json(req.session.user)
        }, err => {
          res.json({err})
        }) 
      }      
    }, err => {
      res.json({err})
    })
  })

  function readyCallback (app) {
    if (typeof strategy !== 'undefined') {
      createUserTable() 
    }    
  }

  // function createSessionTable () {
  //   return new Promise((resolve, reject) => {
  //     dbHelper.execute(`
  //       SELECT COUNT(*) AS tableexists FROM information_schema.tables 
  //       WHERE  table_name  = 'sessions'
  //     `).then(result => {
  //       if (result.rows && result.rows[0] && +result.rows[0].tableexists === 0) {
  //         dbHelper.execute(sql[engine].sessions).then(() => {
  //           resolve()
  //         })
  //       }
  //       else {
  //         resolve()
  //       }
  //     })
  //   })
  // }

  function createUserTable () {
    return new Promise((resolve, reject) => {
      dbHelper.execute(`
        SELECT COUNT(*) AS tableexists FROM information_schema.tables 
        WHERE  table_name   = 'users'
      `).then(result => {
        if (result.rows && result.rows[0] && +result.rows[0].tableexists === 0) {
          dbHelper.execute(sql[engine].users).then(() => {
            resolve()
          })
        }
        else {
          resolve()
        }
      })
    })
  }
  return router
}

module.exports = AuthRoutes
