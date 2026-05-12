// all api calls are here
const BASE_URL = "http://localhost:5000/api";

// get all tasks from backend
export const getAllTasks = async () => {
  const response = await fetch(BASE_URL + "/tasks");
  const data = await response.json();
  return data;
};

// add new task
export const createTask = async (taskData) => {
  const response = await fetch(BASE_URL + "/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  const data = await response.json();
  return data;
};

// update existing task
export const updateTask = async (id, taskData) => {
  const response = await fetch(BASE_URL + "/tasks/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  const data = await response.json();
  return data;
};

// delete a task
export const deleteTask = async (id) => {
  const response = await fetch(BASE_URL + "/tasks/" + id, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
