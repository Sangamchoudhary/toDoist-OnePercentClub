const express = require("express");
const userRouter = express.Router();
const {
  signup,
  login,
  logout,
  protectRoute,
} = require("../Controller/authController");

// user's work
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);

userRouter.use(protectRoute);

userRouter.route("/logout").get(logout);

module.exports = userRouter;
