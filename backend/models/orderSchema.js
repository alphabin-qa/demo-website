const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product: [
    {
      type: Object,
      required: true,
    },
  ],
  quntity: {
    type: Number,
    required: true,
  },
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
