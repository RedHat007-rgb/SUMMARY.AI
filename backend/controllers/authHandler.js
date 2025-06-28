const bcrypt = require("bcrypt");
const { userModel } = require("../models/userModel");
require("dotenv").config();
const signupHandler = async (req, res) => {
  console.log(req.body);
  try {
    console.log("inside signup....");
    const { email, firstName, lastName, password } = req.body;
    console.log(req.body);
    const duplicateUser = await userModel.findOne({ email: email });
    if (duplicateUser) {
      return res.status(409).json({
        message: "EmailID already exists.Please use another EmailId",
      });
    }
    bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS),
      async function (err, hash) {
        if (hash) {
          await userModel.create({
            email,
            firstName,
            lastName,
            hash,
          });
        }
        res.status(200).json({
          message: "Account Created...",
        });
      }
    );
  } catch {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginHandler = (req, res) => {
  res.status(200).json({
    message: "Successfully lopggedin...",
  });
};

module.exports = { loginHandler, signupHandler };
