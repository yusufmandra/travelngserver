const Event = require('../models/event')
const Special = require('../models/special')

// List events
exports.events = (req,res) => {

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

}

// Add Special
exports.add_special = (req, res) => {

  let specialData = req.body
  let special = new Special(specialData)

  special.userID = req.userId

  special.save((error, data) => {
    if(error){
      console.log(error)
    }else{
      res.send(data);
    }
  })

}

// List Specials
exports.specials = (req, res) => {

  // get specials from userId
  Special.find({ userID: req.userId }, (error, data) => {
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

}

// Delete Special
exports.delete_special = (req, res) => {

  Special.deleteOne({ _id : req.body._id }, (error, data) => {
    if(error){
      console.log(error);
    }else{
      res.json(data)
    }
  })

}