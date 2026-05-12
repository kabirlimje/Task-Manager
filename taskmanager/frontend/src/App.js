import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  // load tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/tasks");
      const data = await response.json();
      console.log("tasks from api:", data);
      setTasks(data);
    } catch (err) {
      console.log("fetch error:", err);
      setError("Could not load tasks. Make sure backend is running.");
    }
    setLoading(false);
  };

  // when task is added, reload all tasks
  const handleTaskAdded = () => {
    fetchTasks();
  };

  // remove task from state
  const handleDelete = (deletedId) => {
    const updatedTasks = tasks.filter((task) => task._id !== deletedId);
    setTasks(updatedTasks);
  };

  // update single task in state
  const handleUpdate = (updatedTask) => {
    const newTasks = tasks.map((task) => {
      if (task._id === updatedTask._id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(newTasks);
  };

  // count tasks for stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>

      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "5px" }}>Task Manager App</h1>
      <p style={{ textAlign: "center", color: "#888", marginBottom: "25px", fontSize: "13px" }}>MERN Stack</p>

      {/* show error if any */}
      {error && (
        <div style={{ background: "#ffe0e0", border: "1px solid red", padding: "10px", borderRadius: "4px", marginBottom: "15px", color: "red" }}>
          {error}
        </div>
      )}

      {/* stats */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <div style={{ flex: 1, background: "#e8f0fe", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "22px", fontWeight: "bold", color: "#4a7aff" }}>{totalTasks}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>Total</div>
        </div>
        <div style={{ flex: 1, background: "#fff3cd", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "22px", fontWeight: "bold", color: "#f0a500" }}>{pendingTasks}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>Pending</div>
        </div>
        <div style={{ flex: 1, background: "#d4edda", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "22px", fontWeight: "bold", color: "#28a745" }}>{completedTasks}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>Completed</div>
        </div>
      </div>

      {/* add task form */}
      <TaskForm onTaskAdded={handleTaskAdded} />

      {/* filter buttons */}
      <div style={{ marginBottom: "15px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <span style={{ alignSelf: "center", fontSize: "13px", color: "#666" }}>Filter: </span>
        <button onClick={() => setFilter("all")} style={{ padding: "6px 14px", borderRadius: "20px", border: "1px solid #ccc", background: filter === "all" ? "#4a7aff" : "white", color: filter === "all" ? "white" : "#333", cursor: "pointer", fontSize: "13px" }}>
          All ({totalTasks})
        </button>
        <button onClick={() => setFilter("pending")} style={{ padding: "6px 14px", borderRadius: "20px", border: "1px solid #ccc", background: filter === "pending" ? "#4a7aff" : "white", color: filter === "pending" ? "white" : "#333", cursor: "pointer", fontSize: "13px" }}>
          Pending
        </button>
        <button onClick={() => setFilter("in-progress")} style={{ padding: "6px 14px", borderRadius: "20px", border: "1px solid #ccc", background: filter === "in-progress" ? "#4a7aff" : "white", color: filter === "in-progress" ? "white" : "#333", cursor: "pointer", fontSize: "13px" }}>
          In Progress
        </button>
        <button onClick={() => setFilter("completed")} style={{ padding: "6px 14px", borderRadius: "20px", border: "1px solid #ccc", background: filter === "completed" ? "#4a7aff" : "white", color: filter === "completed" ? "white" : "#333", cursor: "pointer", fontSize: "13px" }}>
          Completed
        </button>
      </div>

      {/* task list */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          filter={filter}
        />
      )}

    </div>
  );
}

export default App;
