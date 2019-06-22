const mongoose = require('mongoose')

const Schema = mongoose.Schema
const specialSchema = new Schema({
  userID: String,
  name: String,
  description: String,
  date: String
})

module.exports = mongoose.model('special', specialSchema, 'specials')