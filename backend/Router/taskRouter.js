const express = require("express");
const { protectRoute } = require("../Controller/authController");
const taskRouter = express.Router();
const {
  createTask,
  getSingleTask,
  getAllTask,
  updateTask,
  deleteTask,
} = require("../Controller/taskController");

taskRouter.use(protectRoute);

taskRouter.route("/").post(createTask);
taskRouter.route("/").get(getAllTask);
taskRouter.route("/:id").get(getSingleTask);
taskRouter.route("/:id").patch(updateTask);
taskRouter.route("/:id").delete(deleteTask);

module.exports = taskRouter;
