const User = require('../models/user')

exports.list_users = (req,res) => {

  User.find({ }, (error, data) => {
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