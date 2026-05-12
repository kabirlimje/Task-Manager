import React, { useState } from "react";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "") {
      alert("please enter a title");
      return;
    }

    setLoading(true);

    const taskData = {
      title: title,
      description: description,
      priority: priority,
      status: "pending",
    };

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const newTask = await response.json();
      console.log("new task added:", newTask);

      // clear form
      setTitle("");
      setDescription("");
      setPriority("medium");

      // tell parent component to refresh
      onTaskAdded();
    } catch (error) {
      console.log("error:", error);
      alert("something went wrong, check console");
    }

    setLoading(false);
  };

  return (
    <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "10px" }}>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description (optional)"
            rows="3"
            style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Priority:</label><br />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ background: "#4a7aff", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "14px" }}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>

      </form>
    </div>
  );
}

export default TaskForm;
