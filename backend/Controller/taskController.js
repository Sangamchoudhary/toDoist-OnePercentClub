const taskModel = require("../Models/taskModel");
const User = require("../Models/userModel");

exports.getHomePage = async (req, res) => {
  try {
    res.status(200).json({
      message: "welcome to 1% club!!!",
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

module.exports.getSingleTask = async function (req, res) {
  try {
    const task = await taskModel.findById(req.params.id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({
      id: task._id,
      task: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllTask = async (req, res) => {
  try {
    const tasks = await taskModel.find({ authorId: req.id });

    let ans = [];

    tasks.forEach((element) => {
      ans.push(element);
    });

    res.status(200).send(ans);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports.createTask = async function (req, res) {
  try {
    const taskData = req.body;
    if (!taskData.title) return res.json({ message: "title is empty" });
    if (!taskData.description)
      return res.json({ message: "description is empty" });
    taskData.authorId = req.id;
    const task = await taskModel.create(taskData);
    const user = await User.findById(taskData.authorId);
    user.tasks.unshift(task.authorId);
    await user.save();
    res.status(201).json({
      task
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports.deleteTask = async function (req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.json({ message: "trying to delete invalid task" });
    await taskModel.findByIdAndDelete(id);
    res.json({ message: "task deleted successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports.updateTask = async function (req, res) {
  try {
    const id = req.params.id;
    let dataToBeUpdate = req.body;
    let keys = [];
    for (let key in dataToBeUpdate) {
      keys.push(key);
    }
    let task = await taskModel.findById(id);
    if (!task) return res.json({ message: "trying to update invalid task" });
    if (task.authorId != req.id)
      return res.json({ message: "trying to update un-authorized task" });
    for (let i = 0; i < keys.length; i++) {
      task[keys[i]] = dataToBeUpdate[keys[i]];
    }
    await task.save();
    res.json({ message: "task updated successfully", updatedPlan: task });
  } catch (error) {
    res.json({ error: error.message });
  }
};
