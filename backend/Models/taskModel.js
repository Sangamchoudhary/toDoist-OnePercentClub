const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },
  date: {
    type: Date,
    default: new Date().toISOString(),
    require: true
  },
  authorId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "task must belong to a valid user"],
  },
});

module.exports = mongoose.model("taskModel", taskSchema);
