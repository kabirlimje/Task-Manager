import React, { useState } from "react";

// single task card
function TaskItem({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editStatus, setEditStatus] = useState(task.status);

  // delete handler
  const handleDelete = async () => {
    const confirm = window.confirm("are you sure you want to delete this task?");
    if (!confirm) return;

    try {
      await fetch("http://localhost:5000/api/tasks/" + task._id, {
        method: "DELETE",
      });
      onDelete(task._id);
    } catch (error) {
      console.log("delete error:", error);
    }
  };

  // mark as complete / uncomplete
  const handleToggleComplete = async () => {
    let newStatus = "";
    if (task.status === "completed") {
      newStatus = "pending";
    } else {
      newStatus = "completed";
    }

    try {
      const response = await fetch("http://localhost:5000/api/tasks/" + task._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = await response.json();
      onUpdate(updated);
    } catch (error) {
      console.log("toggle error", error);
    }
  };

  const handleSaveEdit = async () => {
    // validation
    if (editTitle === "") {
      alert("title cannot be empty");
      return;
    }

    const updatedData = {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      status: editStatus,
    };

    try {
      const response = await fetch("http://localhost:5000/api/tasks/" + task._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const updated = await response.json();
      onUpdate(updated);
      setIsEditing(false);
    } catch (error) {
      console.log("save error", error);
    }
  };

  // show edit form if editing
  if (isEditing) {
    return (
      <div style={{ border: "2px solid #4a7aff", borderRadius: "8px", padding: "15px", marginBottom: "10px", background: "#fff" }}>
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          style={{ width: "100%", padding: "6px", marginBottom: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          rows="2"
          style={{ width: "100%", padding: "6px", marginBottom: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)} style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button onClick={handleSaveEdit} style={{ background: "green", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "8px" }}>
          Save
        </button>
        <button onClick={() => setIsEditing(false)} style={{ background: "gray", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    );
  }

  // priority color - this is a bit messy but works
  let priorityColor = "orange";
  if (task.priority === "high") priorityColor = "red";
  if (task.priority === "low") priorityColor = "green";

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "10px",
      background: task.status === "completed" ? "#f0fff0" : "white",
      opacity: task.status === "completed" ? 0.75 : 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }}>

      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        {/* checkbox */}
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={handleToggleComplete}
          style={{ marginTop: "3px", cursor: "pointer", width: "16px", height: "16px" }}
        />

        <div>
          <p style={{
            margin: "0 0 4px 0",
            fontWeight: "bold",
            fontSize: "15px",
            textDecoration: task.status === "completed" ? "line-through" : "none",
            color: task.status === "completed" ? "#999" : "#000"
          }}>
            {task.title}
          </p>

          {task.description && (
            <p style={{ margin: "0 0 6px 0", fontSize: "13px", color: "#666" }}>
              {task.description}
            </p>
          )}

          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{ fontSize: "11px", background: priorityColor, color: "white", padding: "2px 7px", borderRadius: "3px", fontWeight: "bold" }}>
              {task.priority.toUpperCase()}
            </span>
            {task.status === "in-progress" && (
              <span style={{ fontSize: "11px", background: "#4a7aff", color: "white", padding: "2px 7px", borderRadius: "3px", fontWeight: "bold" }}>
                IN PROGRESS
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "6px" }}>
        <button
          onClick={() => setIsEditing(true)}
          style={{ background: "#4a7aff", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          style={{ background: "#ff4d4d", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
        >
          Delete
        </button>
      </div>

    </div>
  );
}

export default TaskItem;
