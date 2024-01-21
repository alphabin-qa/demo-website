const express = require("express");
const router = express.Router();

const {
  login,
  register,
  addAddress,
  userDetail,
  updateUser,
  updateAddress,
} = require("../controllers/authentication");
const {
  createOrder,
  findOrderByIds,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/login", login);
router.post("/register", register);
router.post("/address", addAddress);
router.get("/me", userDetail);
router.put("/updateUser", updateUser);
router.put("/updateAddress", updateAddress);
router.post("/createOrder", createOrder);
router.get("/findOrder/:id", findOrderByIds);
router.put("/cancleOrder", deleteOrder);

module.exports = router;
