const express = require("express");
const getHomePageRouter = express.Router();
const { getHomePage } = require("../Controller/taskController");

getHomePageRouter.route("/").get(getHomePage);

module.exports = getHomePageRouter;
