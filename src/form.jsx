import AppHeader from "./header.jsx";
import { useState } from "react";

function handleSubmit(event) {
  event.preventDefault();
}

// deafault tasks
let arr_tasks = [
  {
    task: "Seawind Solutions - walk-in interview on 10th Jan 2023",
    completed: true,
  },
  { task: "Complete and crack next round", completed: true },
];

localStorage.setItem("tasks", JSON.stringify(arr_tasks));

function TaskForm() {
  let [tasks, setTasks] = useState(getTasks());
  let [newTask, setNewTask] = useState("");

  // ADD TASKS TO LOCAL STORAGE
  function addTask() {
    if (newTask === "") {
      alert("Please enter a task");
      return;
    }
    const taskToAdd = { task: newTask, completed: false };
    const updatedTasks = [...tasks, taskToAdd];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setNewTask("");
  }

  // GET TASKS FROM LOCAL STORAGE
  function getTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    return tasks ? tasks : [];
  }

  // DELETE TASKS FROM LOCAL STORAGE
  function deleteTask(taskValue) {
    const updatedTasks = tasks.filter((toDo) => toDo.task !== taskValue);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function toggleTask(taskValue) {
    const updatedTasks = tasks.map((toDo) =>
      toDo.task === taskValue ? { ...toDo, completed: !toDo.completed } : toDo
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  return (
    <div id="input-form-container" className="input-form-container">
      <AppHeader />
      <form onSubmit={handleSubmit} id="input-form" className="input-form">
        <input
          id="input"
          className="input"
          placeholder="Add your task!!"
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          required
        />
        <button onClick={addTask} type="submit" id="submit">
          Add Task
        </button>
      </form>
      <div>
        <h2>Task List</h2>
        <ul id="task-list" className="task-list">
          {tasks.map((toDo, index) => (
            <li
              style={{ textDecoration: toDo.completed ? "line-through" : "" }}
              key={index}
              className={toDo.completed ? "completed" : ""}
            >
              <input
                type="checkbox"
                checked={toDo.completed}
                onChange={() => toggleTask(toDo.task)}
              />
              <span>{toDo.task}</span>
              <button
                onClick={() => deleteTask(toDo.task)}
                value={toDo.task}
                id="delete"
                className="delete"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskForm;
