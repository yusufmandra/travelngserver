const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.login = (req, res) => {
  let userData = req.body

  User.findOne({ email: userData.email }, (error, user) => {
    if(error){
      console.log(error)
    }else{
      if(!user){
        res.status(401).send('Invalid email or password.')
      }else {
        if( user.password !== userData.password ){
          res.status(401).send('Invalid email or password.')
        }else {
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
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
      }
      // userFound else
    }
    // error else
  })
  // User findOne
}