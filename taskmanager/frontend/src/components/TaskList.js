import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onUpdate, filter }) {
  // filter the tasks based on selected filter
  let filteredTasks = [];

  if (filter === "all") {
    filteredTasks = tasks;
  } else if (filter === "pending") {
    filteredTasks = tasks.filter((t) => t.status === "pending");
  } else if (filter === "in-progress") {
    filteredTasks = tasks.filter((t) => t.status === "in-progress");
  } else if (filter === "completed") {
    filteredTasks = tasks.filter((t) => t.status === "completed");
  }

  if (filteredTasks.length === 0) {
    return <p style={{ textAlign: "center", color: "#999", marginTop: "30px" }}>No tasks found</p>;
  }

  return (
    <div>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default TaskList;
