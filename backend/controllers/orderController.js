require("dotenv").config();
const Order = require("../models/orderSchema");
const User = require("../models/userSchema.js");

exports.createOrder = async (req, res) => {
  try {
    const {
      product,
      quantity,
      address,
      paymentMethod,
      totalAmount,
      orderDate,
      email,
    } = req.body;
    const newOrder = {
      product,
      quantity,
      address,
      paymentMethod,
      totalAmount,
      orderDate,
    };
    const result = await Order.create(newOrder);
    const userDetails = await User.findOne({ email });
    
    if (userDetails) {
      userDetails.orders.push(result.id);
      await userDetails.save();
    }

    res.json({
      message: "Order placed successfully",
      orderId: result.id,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.findOrderByIds = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const order = await Order.findById(id);

      if (order) {
        res.json({
          message: "Order found successfully",
          order: order,
        });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error("Error finding order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error parsing order ID:", error);
    res.status(400).json({ error: "Invalid Order ID format" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    user.orders = user.orders.filter(
      (orderItem) => orderItem.toString() !== order._id.toString()
    );

    await user.save();
    await Order.findByIdAndDelete(id);

    return res.status(200).json({ 
      success: true,
      message: "Order cancelled successfully",
      user: user
    });
  } catch (error) {
    console.error("Error in deleteOrder:", error);
    return res.status(500).json({ 
      message: "Failed to delete order",
      error: error.message 
    });
  }
};
