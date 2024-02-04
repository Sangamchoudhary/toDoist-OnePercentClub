const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_key = "7f89sa7f89";

module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    if (!req.cookies.login) throw "Please login! to access resource";
    let token = req.cookies.login;
    if (!token) {
      const client = req.get("User-Agent");
      if (client.includes("Chrome")) return res.redirect("/login");
      return res.json({ message: "No token Availaible" });
    }
    const payload = jwt.verify(token, jwt_key);
    if (!payload) return res.json({ message: "Wrong token Availaible" });
    const user = await userModel.findById(payload.payload);
    if (!user) throw "invalid user";
    req.id = user.id;
    next();
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports.signup = async function signup(req, res) {
  try {
    const user = req.body;
    if (!user.username) throw "username is empty";
    if (!user.email) throw "email is empty";
    if (!user.password) throw "password is empty";
    const createdUser = await userModel.create(user);
    if (!createdUser) throw "user registration failed";
    return res.status(201).json({
      message: "user registration successfull",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.login = async function login(req, res) {
  try {
    const data = req.body;
    if (!data.email) throw "email is empty";
    if (!data.password) throw "password is empty";
    const user = await userModel.findOne({ email: data.email });
    if (!user) throw "user not found";
    const isPassowrdMatch = await bcrypt.compare(data.password, user.password);
    if (!isPassowrdMatch) throw "wrong credentials";
    const uid = user["_id"];
    const token = jwt.sign({ payload: uid }, jwt_key);
    return res.cookie("login", token).json({
      success: true,
      message: "User is logged in",
      login: token
    });
  } catch (err) {
    return err.message
      ? res.status(500).json({
          errorMessage: err.message,
        })
      : res.status(404).json({
          errorMessage: err,
        });
  }
};

module.exports.logout = function logout(req, res) {
  try {
    if (!req.id) throw "user needs to login first, before logging out";
    res.cookie("login", "", { maxAge: 1 }); // set to empty then destroy after 1ms
    return res.json({ message: "user logged out successfully" });
  } catch (error) {
    return err.message;
  }
};
