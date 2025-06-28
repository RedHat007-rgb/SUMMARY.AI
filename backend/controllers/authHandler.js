const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");
require("dotenv").config();

const signupHandler = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const duplicateUser = await userModel.findOne({ email });
    if (duplicateUser) {
      return res.status(409).json({
        message: "Email ID already exists. Please use another Email ID.",
      });
    }
    const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await userModel.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Account created successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(email);
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const foundUser = await userModel.findOne({ email: email });
    console.log(foundUser);
    if (!foundUser) {
      return res.status(404).json({
        message: "Please enter valid EmailId",
      });
    }
    const decryptPassword = await bcrypt.compare(password, foundUser.password);
    console.log(decryptPassword);
    if (!decryptPassword) {
      return res.status(401).json({
        message: "Please enter correct password.",
      });
    }
    try {
      const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_KEY, {
        expiresIn: "1h",
      });

      return res.status(200).setHeader("token", `Bearer ${token}`).json({
        message: "Successfully logged in",
      });
    } catch (jwtError) {
      console.error("JWT generation error:", jwtError);
      return res.status(500).json({
        message: "Failed to generate authentication token",
      });
    }
  } catch {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const testHandler = (req, res) => {
  res.json("in test");
};

module.exports = { loginHandler, signupHandler, testHandler };
