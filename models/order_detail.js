const mongoose = require('mongoose')

const Schema = mongoose.Schema
const orderDetailSchema = new Schema({
  orderId: String,
  packageId: String,
  packageName: String,
  packagePrice: String,
  createdAt: String
})

module.exports = mongoose.model('order_detail', orderDetailSchema, 'order_details')