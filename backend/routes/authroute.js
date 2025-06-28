const express = require("express");
const { signupHandler, loginHandler } = require("../controllers/authHandler");

const authRouter = express.Router();

authRouter.route("/signup").post(signupHandler);

authRouter.route("/login").post(loginHandler);

module.exports = authRouter;
