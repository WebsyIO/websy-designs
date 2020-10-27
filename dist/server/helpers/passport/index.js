module.exports = function (passport, dbHelper) {
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  // Configure the local login strategy
  require('./local-login.js')(passport, dbHelper)

  // Configure the local signup strategy
  require('./local-signup.js')(passport, dbHelper)
}
