const Package = require('../models/package');

// List packages
exports.packages = (req,res) => {

  Package.find({ }, (error, data) => {
    if(error){
      console.log(error);
    }else{
      if(!data){
        res.status(401).send('No packages found!');
      }else {
        res.json(data);
      }
    }
  });

}

// Single Package
exports.single_package = (req,res) => {

  Package.findOne({ _id: req.params.id }, (error, data) => {
    if(error){
      console.log(error);
    }else{
      if(!data){
        res.status(401).send('No package found!');
      }else {
        res.json(data);
      }
    }
  });

}