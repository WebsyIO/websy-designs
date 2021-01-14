const cookieParser = require('cookie-parser')
const cookie = require('cookie')

module.exports = {
  createSession: function (dbHelper, sId, data) {
    return new Promise((resolve, reject) => {
      const dataString = JSON.stringify(data)
      const sql = `
        INSERT INTO sessions (sId, session)
        VALUES ('${sId}', '${dataString}')
      `
      dbHelper.execute(sql).then(result => resolve(), err => reject(err))
    })
  },
  saveSession: function (dbHelper, sId, data) {
    return new Promise((resolve, reject) => {
      const dataString = JSON.stringify(data)
      const sql = `
        UPDATE sessions
        SET session = '${dataString}'
        WHERE sId = '${sId}'
      `
      dbHelper.execute(sql).then(result => resolve(), err => reject(err))
    })
  },
  getSessionId: function (req) {
    let cookies = {}   
    console.log(req.headers)
    if (typeof req.headers.cookie === 'string') {
      cookies = cookie.parse(req.headers.cookie)
    }  
    console.log('cookies')
    console.log(cookies)
    console.log(process.env.COOKIE_NAME)
    // const sId = cookieParser.signedCookie(cookies[process.env.COOKIE_NAME], process.env.SESSION_SECRET)
    const sId = cookies[process.env.COOKIE_NAME]
    return sId
  },
  checkSession: function (dbHelper) {
    let that = this
    return function (req, res, next) {
      console.log('checking session')
      console.log(req.session)
      const sId = that.getSessionId(req)
      if (sId) {
        if (req.session) {
          console.log('has session')
          that.saveSession(dbHelper, sId, req.session).then(() => next())
        }
        else {
          console.log('no session')
          req.session = {}
          const sql = `
            SELECT * FROM sessions        
            WHERE sId = '${sId}'
          `
          dbHelper.execute(sql).then(result => {
            req.session = result.session
            next()
          }, err => {
            console.log(err)
            next() 
          })  
        }              
      }   
      else {
        console.log('no cookie')
        const sId = createIdentity()
        res.cookie(process.env.COOKIE_NAME, sId, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: false,
          domain: 'localhost',
          // secure: process.env.COOKIE_SECURE || false,
          sameSite: process.env.COOKIE_SAMESITE || 'none',
          credentials: 'include'
        })
        that.createSession(dbHelper, sId, {}).then(() => {
          req.session = {}
          next()
        })        
      }      
    }
  }
}

function createIdentity (size = 6) {	
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < size; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
