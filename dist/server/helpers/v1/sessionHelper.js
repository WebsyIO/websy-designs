const cookieParser = require('cookie-parser')
const cookie = require('cookie')

module.exports = {
  saveSession: function (dbHelper, sid, data) {
    return new Promise((resolve, reject) => {
      const dataString = JSON.stringify(data)
      const sql = `
        UPDATE session
        SET sess = '${dataString}'
        WHERE sid = '${sid}'
      `
      dbHelper.execute(sql).then(result => resolve(), err => reject(err))
    })
  },
  getSessionId: function (req) {
    let cookies = {}
    if (typeof req.headers.cookie === 'string') {
      cookies = cookie.parse(req.headers.cookie)
    }  
    const sid = cookieParser.signedCookie(cookies[process.env.COOKIE_NAME], process.env.SESSION_SECRET)
    return sid
  },
  cookieCheck: function (cookieConfig) {
    return function (req, res, next) {      
      next()
    }
  }
}
