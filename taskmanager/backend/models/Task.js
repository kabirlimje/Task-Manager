const mongoose = require("mongoose");

// task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // not required
  },
  status: {
    type: String,
    default: "pending",
    // can be pending, in-progress, completed
  },
  priority: {
    type: String,
    default: "medium",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
