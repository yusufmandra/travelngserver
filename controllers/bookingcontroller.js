const Order = require('../models/order');
const OrderDetail = require('../models/order_detail');

// List packages
exports.createOrder = (req,res) => {

  let order_data = req.body.order
  let order_details_data = req.body.order_details
  let order = new Order(order_data)

  order.customerId = req.userId
  
  order.save((error, orderData) => {

    if(error){
      console.log(error)
    }else{

      order_details_data.forEach(function(element) { element.orderId = orderData._id.toString(); });

      OrderDetail.collection.insertMany(order_details_data, function (err, orderDetailsData) {
        if (err){ 
            console.log(err)
        } else {
          res.status(200).send(orderDetailsData)
        }
      })

    }
  })

}