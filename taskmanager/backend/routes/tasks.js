const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.log("error getting tasks", err);
    res.status(500).json({ message: "something went wrong" });
  }
});

// create new task
router.post("/", async (req, res) => {
  // get data from body
  const title = req.body.title;
  const description = req.body.description;
  const priority = req.body.priority;
  const status = req.body.status;

  // basic check
  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  try {
    const newTask = new Task({
      title: title,
      description: description,
      priority: priority,
      status: status,
    });

    const savedTask = await newTask.save();
    console.log("task created:", savedTask);
    res.status(201).json(savedTask);
  } catch (err) {
    console.log("error creating task", err);
    res.status(500).json({ message: "something went wrong" });
  }
});

// update task by id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.log("update error:", err);
    res.status(500).json({ message: "something went wrong" });
  }
});

// delete task
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    res.json({ message: "task deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "could not delete task" });
  }
});

module.exports = router;
