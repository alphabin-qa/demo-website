const bcrypt = require("bcrypt");
const User = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");
const Order = require("../models/orderSchema.js");
const Address = require("../models/addressSchema.js");
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
        let orderIds = user.orders;
        let ordersArray = [];
        try {
          ordersArray = await Order.find({ _id: { $in: orderIds } }).exec();
        } catch (err) {
          console.error(err);
        }
        const addressesArray = await Promise.all(
          user?.addresses?.map(async (id) => {
            const response = await Address.findById(id);
            if (response !== null) {
              return response;
            } else {
              await User.findByIdAndUpdate(user._id, {
                $pull: { addresses: id },
              });
            }
          })
        );

        const filteredAddressesArray = addressesArray.filter(
          (address) => address !== null
        );

        let data = {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          contactNumber: user.phoneNumber,
          address: filteredAddressesArray,
          orders: ordersArray,
          id: user._id,
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
    const { firstName, lastName, phoneNumber } = req.body;

    const authHeader = req.headers["authorization"];
    const authToken = authHeader && authHeader.split(" ")[1];
    const decodedToken = jwt.decode(authToken, { complete: true });

    if (decodedToken && decodedToken.payload.email) {
      const email = decodedToken.payload.email;
      let user = await User.findOne({ email });

      if (user) {
        let updatedFields = {}; // Object to track updated fields

        if (firstName && firstName.trim() !== user.firstname.trim()) {
          updatedFields.firstname = firstName; // Make sure the field name matches your schema
        }

        if (lastName && lastName !== user.lastname) {
          updatedFields.lastname = lastName;
        }

        if (phoneNumber && phoneNumber !== user.phoneNumber) {
          updatedFields.phoneNumber = phoneNumber;
        }

        // If no fields were changed, return an error
        if (Object.keys(updatedFields).length === 0) {
          return res.status(400).json({
            success: false,
            message: "No changes detected",
          });
        }

        // Update the user with the new data
        await User.updateOne({ email }, { $set: updatedFields });

        // Fetch the updated user and send response
        const updatedUser = await User.findOne({ email });

        return res.status(200).json({
          success: true,
          updatedUser,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { id, address } = req.body;

    if (!id || !address) {
      return res.status(400).json({
        success: false,
        message: "Invalid request format",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check for duplicate address
    const isDuplicate = user?.addresses?.some(
      (existingAddr) =>
        existingAddr?.street?.toLowerCase() === address?.street?.toLowerCase() &&
        existingAddr?.city?.toLowerCase() === address?.city?.toLowerCase() &&
        existingAddr?.zipCode === address?.zipCode
    );

    if (isDuplicate) {
      return res.status(400).json({
        success: false,
        message: "This address already exists",
      });
    }

    const newAddress = await Address.create({
      firstname: address.firstname || "",
      email: address.email || "",
      city: address.city || "",
      street: address.street || "",
      country: address.country || "",
      state: address.state || "",
      zipCode: address.zipCode || "",
    });

    user.addresses.push(newAddress);
    await user.save();

    // Get updated user with populated addresses
    const updatedUser = await User.findById(id).populate('addresses');

    return res.status(200).json({
      success: true,
      data: { user: updatedUser },
      message: "Address added successfully"
    });
  } catch (error) {
    console.error("Error adding address:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id, userId, ...addressData } = req.body;

    if (!id || !userId) {
      return res.status(400).json({ 
        success: false, 
        message: "Address ID and User ID are required" 
      });
    }

    // First find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Then find the address
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ 
        success: false, 
        message: "Address not found" 
      });
    }

    // Verify that this address belongs to the user
    const hasAddress = user.addresses.some(addr => addr._id.toString() === id);
    if (!hasAddress) {
      return res.status(403).json({
        success: false,
        message: "Address does not belong to this user"
      });
    }

    // Update address fields
    Object.keys(addressData).forEach(key => {
      if (addressData[key] !== undefined) {
        address[key] = addressData[key];
      }
    });

    await address.save();

    // Update the user's address list
    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === id);
    if (addressIndex !== -1) {
      user.addresses[addressIndex] = address;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      data: { address },
      message: "Address updated successfully"
    });

  } catch (error) {
    console.error("Error updating address:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        message: "Address ID is required" 
      });
    }

    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ 
        success: false, 
        message: "Address not found" 
      });
    }

    // Find user before deleting address
    const user = await User.findOne({ "addresses": id });
    if (user) {
      user.addresses = user.addresses.filter(addr => addr._id.toString() !== id);
      await user.save();
    }

    // Delete the address
    await Address.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User is not registered",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Update password only
  user.password = hashedPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
};
