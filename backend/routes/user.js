const express = require("express");
const router = express.Router();

const {
  login,
  register,
  addAddress,
  userDetail,
} = require("../controllers/authentication");

router.post("/login", login);
router.post("/register", register);
router.post("/address", addAddress);
router.get("/me", userDetail);

module.exports = router;
