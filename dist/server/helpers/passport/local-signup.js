const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt-nodejs')
const md5 = require('md5')

module.exports = function (passport, dbHelper) {
  console.log('here 2.5')
  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, (req, email, password, done) => {
    console.log('here 3')
    // Generates salt using bCrypt
    const createSalt = function (password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
    }
    const hashPassword = function (password, salt) {
      return md5(md5(password) + salt)
    }
    const uuidv4 = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }    
    email = email.toLowerCase()
    const userQuery = `
      SELECT *
      FROM users
      WHERE email = '${email}'
    `    
    dbHelper.exectue(userQuery).then(result => {        
      console.log('here 4')
      console.log(result)
      // already exists
      if (result.rows.length > 0) {          
        return done('A user with that email already exists.', false)
      }
      else {          
        const newUser = {}            
        newUser.email = email            
        if (req.body.optedin === 'on') {
          newUser.optedin = true
        }
        newUser.role = 'User'
        newUser.salt = createSalt(password)
        newUser.activationcode = uuidv4()
        newUser.activationexpiry = (new Date()).getTime() + 1.8e6
        if (req.session && req.session.referral) {
          newUser.referredby = req.session.referral
        }
        newUser.pepper = hashPassword(password, newUser.salt)
        const insertSql = dbHelper.buildInsert('users', newUser).then(result => done(newUser), err => done(err))            
      }
    }, err => done(err))
  }))  
}
