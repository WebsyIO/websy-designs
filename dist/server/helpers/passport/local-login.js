const LocalStrategy = require('passport-local').Strategy
const md5 = require('md5')

module.exports = function (passport, dbHelper) {
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    const isValidPassword = function (user, password) {
      return (md5(md5(password) + user.salt)) === user.pepper
    }
    // check in mongo if a user with username exists or not
    email = email.toLowerCase()
    const userQuery = `
      SELECT *
      FROM users
      WHERE email = '${email}'
    `    
    dbHelper.exectue(userQuery).then(result => {      
      // Username does not exist, log the error and redirect back
      if (result.rows.length === 0) {
        return done(`User not found with email ${email}`, false)
      }
      const user = result.rows[0]
      // User exists but wrong password, log the error
      if (!isValidPassword(user, password)) {        
        return done('Invalid Password', false)        
      }
      delete user.salt
      delete user.pepper
      const userUpdateQuery = `
        UPDATE users
        SET lastlogon = now()
        WHERE userid = ${user.userid}
      `
      dbHelper.execute(userUpdateQuery).then(result => done(null, user), err => done(err))
      // LogonHistory.create({
      //   userid: user.userid
      // }, function(err, result) {
      //   if (err) {
      //     console.log("Couldn't add logon history record");
      //     console.log(err);
      //   }
      // })
    }, err => done(err))
  }))
}
