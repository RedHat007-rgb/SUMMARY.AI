const express = require("express");
const {
  signupHandler,
  loginHandler,
  testHandler,
} = require("../controllers/authHandler");
const { authMiddleware } = require("../middlewares/authMiddleware");

const authRouter = express.Router();

authRouter.route("/signup").post(signupHandler);

authRouter.route("/login").post(loginHandler);

authRouter.use(authMiddleware);
authRouter.route("/test").get(testHandler);

module.exports = authRouter;
