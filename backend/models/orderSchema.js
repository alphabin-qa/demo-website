const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  address: {
    type: Object,
    required: true,
  },
  orderId: {
    type: Number,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
