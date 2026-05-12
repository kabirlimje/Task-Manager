# Task Manager App - MERN Stack

A simple task management app built with MongoDB, Express, React and Node.js

## Features
- Add new tasks
- Edit and delete tasks
- Mark tasks as completed
- Filter tasks by status
- Priority levels (high, medium, low)

## Folder Structure

```
taskmanager/
│
├── backend/
│   ├── models/
│   │   └── Task.js           # mongoose task schema
│   ├── routes/
│   │   └── tasks.js          # all task api routes
│   ├── .env.example          # copy this to .env
│   ├── package.json
│   └── server.js             # main server file
│
└── frontend/
    └── src/
        ├── api/
        │   └── taskApi.js    # api helper functions
        ├── components/
        │   ├── TaskForm.js   # form to add new task
        │   ├── TaskItem.js   # single task card
        │   └── TaskList.js   # list of all tasks
        ├── App.css
        └── App.js            # main react component
```

## How to Run

### 1. Start the Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend will run on http://localhost:5000

### 2. Start the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend will run on http://localhost:3000

### 3. Make sure MongoDB is running on your machine

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET    | /api/tasks     | get all tasks |
| POST   | /api/tasks     | create new task |
| PUT    | /api/tasks/:id | update a task |
| DELETE | /api/tasks/:id | delete a task |

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **API**: REST
