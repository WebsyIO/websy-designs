const express = require('express')
const router = express.Router()
const expressSession = require('express-session')
const DBSession = require('connect-pg-simple')(expressSession)
const cookieParser = require('cookie-parser')
const sessionHelper = require('../helpers/sessionHelper')

function AuthRoutes (dbHelper, app) {
  const AuthHelper = require('../helpers/authHelper')
  const authHelper = new AuthHelper(dbHelper)
  if (!dbHelper.client) {
    dbHelper.onReadyAuthCallbackFn = readyCallback
  }
  else {
    readyCallback()
  }   
  router.post('/login', (req, res) => {
    authHelper.login(req, res).then(user => {
      if (!req.session) {
        req.session = {}
      }
      req.session.user = user
      // res.cookie('test', 'This is a test')
      // const sId = sessionHelper.getSessionId(req)
      // sessionHelper.saveSession(dbHelper, sId, req.session).then(() => {
      //   res.json(req.session.user)
      // }, err => {
      //   res.json({err})
      // })
      res.json(req.session.user)
    }, err => {
      console.log('in auth route', err)
      res.json({err})
    })
  })
  router.post('/signup', (req, res) => {    
    authHelper.signup(req, res).then(user => {
      if (!req.session) {
        req.session = {}
      }
      req.session.user = user
      const sId = sessionHelper.getSessionId(req)
      sessionHelper.saveSession(dbHelper, sId, req.session).then(() => {
        res.json(req.session.user)
      }, err => {
        res.json({err})
      })
    }, err => {
      res.json({err})
    })
  })

  function readyCallback (app) {
    createUserTable().then(() => {
      createSessionTable()
    }) 
  }

  function createSessionTable () {
    return new Promise((resolve, reject) => {
      dbHelper.execute(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE  table_schema = 'public'
          AND    table_name   = 'session'
        );
      `).then(result => {
        if (result.rows && result.rows[0] && result.rows[0].exists === false) {
          dbHelper.execute(`
            CREATE TABLE "session" (
              "sid" varchar NOT NULL COLLATE "default",
              "sess" json NOT NULL,
              "expire" timestamp(6) NOT NULL
            )
            WITH (OIDS=FALSE);
            
            ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
            
            CREATE INDEX "IDX_session_expire" ON "session" ("expire");
          `).then(() => {
            resolve()
          })
        }
        else {
          resolve()
        }
      })
    })
  }

  function createUserTable () {
    return new Promise((resolve, reject) => {
      dbHelper.execute(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE  table_schema = 'public'
          AND    table_name   = 'users'
        );
      `).then(result => {
        if (result.rows && result.rows[0] && result.rows[0].exists === false) {
          dbHelper.execute(`
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
          `).then(() => {
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
