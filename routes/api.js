// Required Modules
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Event = require('../models/event')
const Special = require('../models/special')
const Package = require('../models/package')
const mongoose = require('mongoose')

// Import Controllers
const AuthController = require('../controllers/authcontroller')
const EventController = require('../controllers/eventcontroller')
const UserController = require('../controllers/usercontroller')
const PackageController = require('../controllers/packagecontroller')

const db = "mongodb+srv://yusuf:yusuf@cluster0-hb6lo.mongodb.net/traveldb?retryWrites=true&w=majority"

// Connect MongoDB
mongoose.connect(db, err => {
  if(err){
    console.log('Error! ' + err)
  }else{
    console.log('Connected to mongo')
  }
})

// Middleware for verifyToken
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

// ***
// Routes List
// **

// Root api route
router.get('/', (req, res) => {
  res.send('From API route')
})

// Register Route
router.post('/register', AuthController.register)

// Login Route
router.post('/login', AuthController.login)

// List Users api Route
router.get('/users', verifyToken, UserController.list_users)

// Events api Route
router.get('/events', EventController.events)

// Add Special api Route
router.post('/special/add', verifyToken, EventController.add_special)

// List Special api Route
router.get('/special', verifyToken, EventController.specials)

// Delete Special Api
router.post('/special/delete', verifyToken, EventController.delete_special)

// Packages api Route
router.get('/packages', PackageController.packages)

// Single Package api Route
router.get('/package/:id', PackageController.single_package)

module.exports = router