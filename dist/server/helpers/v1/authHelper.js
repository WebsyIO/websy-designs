const bCrypt = require('bcrypt-nodejs')
const md5 = require('md5')

class AuthHelper {
  constructor (dbHelper) {
    this.dbHelper = dbHelper    
  }
  login (req, res) {
    return new Promise((resolve, reject) => {
      const isValidPassword = function (user, password) {
        return (md5(md5(password) + user.salt)) === user.pepper
      }
      // check in mongo if a user with username exists or not
      const email = req.body.email.toLowerCase()
      const userQuery = `
        SELECT *
        FROM users
        WHERE email = '${email}'
      `    
      this.dbHelper.execute(userQuery).then(result => {      
        // Username does not exist, log the error and redirect back
        if (result.rows.length === 0) {
          console.log('No User')
          reject(`User not found with email ${email}`)
          return
        }
        const user = result.rows[0]
        // User exists but wrong password, log the error
        if (!isValidPassword(user, req.body.password)) {    
          console.log('Invalid Password')
          reject('Invalid Password')
          return
        }
        delete user.salt
        delete user.pepper
        const userUpdateQuery = `
          UPDATE users
          SET lastlogon = now()
          WHERE id = ${user.id}
        `
        this.dbHelper.execute(userUpdateQuery).then(result => resolve(user), err => reject(err))
        // LogonHistory.create({
        //   userid: user.userid
        // }, function(err, result) {
        //   if (err) {
        //     console.log("Couldn't add logon history record");
        //     console.log(err);
        //   }
        // })
      }, err => reject(err))
    })
  }
  signup (req, res) {
    return new Promise((resolve, reject) => {
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
      const email = req.body.email.toLowerCase()
      const userQuery = `
        SELECT *
        FROM users
        WHERE email = '${email}'
      `    
      this.dbHelper.execute(userQuery).then(result => {
        if (result.rows.length > 0) {          
          reject(new Error('A user with that email already exists.'))
        }
        else {          
          const newUser = {}            
          newUser.email = email            
          if (req.body.optedin === 'on') {
            newUser.optedin = true
          }
          newUser.role = 'User'
          newUser.salt = createSalt(req.body.password)
          newUser.activationcode = uuidv4()
          newUser.activationexpiry = (new Date()).getTime() + 1.8e6
          if (req.session && req.session.referral) {
            newUser.referredby = req.session.referral
          }
          newUser.pepper = hashPassword(req.body.password, newUser.salt)
          const insertSql = this.dbHelper.buildInsert('users', newUser)
          this.dbHelper.execute(insertSql).then(result => resolve(newUser), err => reject(err))
        }
      }, err => reject(err))
    })
  }
  logout (req, res) {    
    req.logout()
    req.session.destroy((err) => {
      if (err) {
        console.log(err)
        res.redirect('/')
      }
      else {
        res.redirect('/')
      }
    })    
  }
  isLoggedIn (req, res, next) {
    if (req.isAuthenticated) {
      if (req.isAuthenticated()) {
        next()
      }
      else {
        res.redirect('/login')
      } 
    }
    else {
      next()
    }  
  }
}

module.exports = AuthHelper
