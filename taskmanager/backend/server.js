const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// TODO: move this to config file later
const MONGO_URL = process.env.MONGO_URI || "mongodb://localhost:27017/taskmanager";

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("error connecting to mongo", err);
  });

// routes
const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

// just a test route to check if server works
app.get("/", (req, res) => {
  res.send("server is running!!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
