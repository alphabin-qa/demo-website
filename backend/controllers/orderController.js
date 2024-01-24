require("dotenv").config();
const Order = require("../models/orderSchema");
const User = require("../models/userSchema.js");

exports.createOrder = async (req, res) => {
  try {
    const { address, paymentMethod, totalAmount, orderDate, email } = req.body;
    const newOrder = {
      address,
      paymentMethod,
      totalAmount,
      orderDate,
    };
    const result = await Order.create(newOrder);
    const userDetails = await User.findOne({ email });

    if (userDetails) {
      userDetails.orders.push(result._id);
      await userDetails.save();
    }

    res.json({
      message: "Order placed successfully",
      orderId: result._id,
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
    const getOrder = await Order.findById(id);

    user.orders = user.orders.filter(
      (order) => order.toString() !== getOrder?._id.toString()
    );

    await user.save();

    const order = await Order.findByIdAndDelete(id);

    const updatedUser = await User.findById(userId);

    // Step 4: Respond based on the result
    if (order) {
      res.json({
        message: "Your order is canceled successfully",
        user: updatedUser,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    // Handle errors at a higher level (e.g., database connection issues)
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
