const express = require("express");
const router = express.Router();

const {
  login,
  register,
  addAddress,
  userDetail,
  updateUser,
} = require("../controllers/authentication");

router.post("/login", login);
router.post("/register", register);
router.post("/address", addAddress);
router.get("/me", userDetail);
router.put("/updateUser", updateUser);

module.exports = router;
