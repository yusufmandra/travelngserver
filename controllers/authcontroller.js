// Auth token api
const jwt = require('jsonwebtoken')
// Models
const User = require('../models/user')
// Has Password
const bcrypt = require('bcrypt')
const saltRounds = 10;

exports.login = (req, res) => {
  let userData = req.body

  User.findOne({ email: userData.email }, (error, user) => {
    if(error){
      console.log(error)
    }else{
      if(!user){
        res.status(401).send('Invalid email or password.')
      }else {
        const hash = user.password;
        // Load hash from your password DB.
        bcrypt.compare(userData.password, hash, function(err, response) {
            if(response === true){
              let payload = {subject: user._id}
              let token = jwt.sign(payload, 'secretKey')
              res.status(200).send({token})
            }else{
              res.status(401).send('Invalid email or password.')
            }
        });
      }
    }
  })

}

exports.register = (req, res) => {

  let userData = req.body
  let user = new User(userData)

  // Check user is already register.
  User.findOne({ email: userData.email }, (error, userFound) => {

    if(error){

      console.log(error)

    }else{

      if(userFound){

        res.status(401).send('email already registered')

      }else {
        // Store hash in your password DB.
        bcrypt.hash(user.password, saltRounds, function(err, hash) {
          user.password = hash;
          // Save user data
          user.save((error, registeredUser) => {
            if(error){
              console.log(error)
            }else{
              let payload = {subject: registeredUser._id}
              let token = jwt.sign(payload, 'secretKey')
              res.status(200).send({token})
            }
          })
          // User Save
        });
      }
      // userFound else
    }
    // error else
  })
  // User findOne
}