const mongoose = require('mongoose')

const Schema = mongoose.Schema
const packageSchema = new Schema({
  title: String,
  description: String,
  price: String,
  category: String,
  img: String
})

module.exports = mongoose.model('package', packageSchema, 'packages')