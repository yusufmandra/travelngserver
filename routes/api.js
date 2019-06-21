const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Event = require('../models/event')
const Special = require('../models/special')
const mongoose = require('mongoose')
const db = "mongodb+srv://yusuf:yusuf@cluster0-hb6lo.mongodb.net/eventsdb?retryWrites=true&w=majority"

mongoose.connect(db, err => {
  if(err){
    console.log('Error! ' + err)
  }else{
    console.log('Connected to mongo')
  }
})

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/', (req, res) => {
  res.send('From API route')
})

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((error, registeredUser) => {
    if(error){
      console.log(error)
    }else{
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body

  User.findOne({ email: userData.email }, (error, user) => {
    if(error){
      console.log(error)
    }else{
      if(!user){
        res.status(401).send('Invalid email')
      }else {
        if( user.password !== userData.password ){
          res.status(401).send('Invalid password')
        }else {
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      }
    }
  })
})

router.get('/events', (req,res) => {

  Event.find({ }, (error, data) => {
    if(error){
      console.log(error)
    }else{
      if(!data){
        res.status(401).send('No records found!')
      }else {
        res.json(data)
      }
    }
  })

})

router.get('/special', verifyToken, (req, res) => {

  Special.find({ }, (error, data) => {
    if(error){
      console.log(error)
    }else{
      if(!data){
        res.status(401).send('No records found!')
      }else {
        res.json(data)
      }
    }
  })

})

module.exports = router