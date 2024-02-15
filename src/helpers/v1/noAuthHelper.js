const bCrypt = require('bcrypt-nodejs')
const md5 = require('md5')

class AuthHelper {
  constructor (dbHelper, options) {
    this.dbHelper = dbHelper    
    const DEFAULTS = {
      loginType: 'email'
    }
    this.options = Object.assign({}, DEFAULTS, options)
    // console.log(this.options)
  }  
  isLoggedIn (req, res, next) {
    next()      
  }
  checkPermissions (req, res, next) {    
    next()  
  }
}

module.exports = AuthHelper
