const mongoose = require('mongoose')

const Schema = mongoose.Schema
const orderSchema = new Schema({
  customerId: String,
  customerName: String,
  customerEmail: String,
  totalAmount: String,
  paymentMethod: String,
  paymentRefId: String,
  createdAt: String
})

module.exports = mongoose.model('order', orderSchema, 'orders')