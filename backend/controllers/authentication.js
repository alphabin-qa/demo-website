const bcrypt = require("bcrypt");
const User = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

const setCookieOptions = () => {
  return {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
};

const handlePasswordMismatch = (res) => {
  return res.status(403).json({
    success: false,
    message: "Password does not match",
  });
};

exports.register = async (req, res) => {
  try {
    //get data
    const { firstname, lastname, email, password } = req.body;

    //check if user already exit
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exist",
      });
    }

    //Secure Password
    async function hashPassword(password) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
      } catch (error) {
        throw new Error("Error in hashing password");
      }
    }
    const hashedPassword = await hashPassword(password);

    //creating entry for user

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User Cannot be registered, please try again later",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
    };

    if (await bcrypt.compare(password, user.password)) {
      const token = generateToken(payload);

      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = setCookieOptions();

      res.cookie("token", token, options).status(200).json({ user });
    } else {
      return handlePasswordMismatch(res);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const authToken = authHeader && authHeader.split(" ")[1];

    const decodedToken = jwt.decode(authToken, { complete: true });

    if (decodedToken && decodedToken.payload.email) {
      const email = decodedToken.payload.email;

      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User is not registered",
        });
      }
      if (user?.addresses.length > 4) {
        return res.status(401).json({
          success: false,
          message: "You can not add more than 4 addresses",
        });
      } else {
        const { address } = req.body;
        user.addresses.push({
          city: address?.city || "",
          country: address.country || "",
          email: address.email || "",
          firstname: address.firstName || "",
          state: address.state || "",
          street: address.street || "",
          zipCode: address.zipCode || "",
        });
        await user.save();
      }

      const userAddress = {
        id: user._id,
        fistname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.addresses,
      };
      return res.status(200).json({
        data: { success: true, userAddress },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.userDetail = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const authToken = authHeader && authHeader.split(" ")[1];

    const decodedToken = jwt.decode(authToken, { complete: true });

    if (decodedToken && decodedToken.payload.email) {
      const email = decodedToken.payload.email;
      let user = await User.findOne({ email });
      if (!user) {
        res.json({
          data: {
            status: "failure",
            data: "User is not found",
          },
        });
      } else {
        let data = {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          address: user.addresses,
        };
        return res.status(200).json({
          data: { success: true, data },
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, password } = req.body;

    const authHeader = req.headers["authorization"];
    const authToken = authHeader && authHeader.split(" ")[1];

    const decodedToken = jwt.decode(authToken, { complete: true });

    if (decodedToken && decodedToken.payload.email) {
      const email = decodedToken.payload.email;
      let user = await User.findOne({ email });

      const hashedPassword = await bcrypt.hash(password, 10);

      if (user) {
        await User.updateOne(user, {
          fistname: firstName,
          lastname: lastName,
          phoneNumber,
          password: hashedPassword,
        });

        let updatedUser = await User.findOne({ email });
        return res.status(200).json({
          data: { success: true, updatedUser },
        });
      }
    }
  } catch (error) {}
};

exports.updateAddress = async (req, res) => {
  try {
    const { city, country, email, firstname, state, street, zipCode, id } =
      req.body;
    const authHeader = req.headers["authorization"];
    const authToken = authHeader && authHeader.split(" ")[1];

    const decodedToken = jwt.decode(authToken, { complete: true });

    if (decodedToken && decodedToken.payload.email) {
      const email = decodedToken.payload.email;
      let user = await User.findOne({ email });
      let address = user.addresses.find({
        _id: "659ab7f8b74d8d434ed75372",
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User is not registered",
        });
      } else {
        return res.status(200).json({
          data: { success: true, user },
        });
      }
    }
  } catch (error) {}
};
