"use client";
import React, { useState, useEffect } from "react";

const CreateTask = () => {
const [taskList, setTaskList] = useState(() => {
try {
const savedTasks = localStorage.getItem("tasks");
return savedTasks ? JSON.parse(savedTasks) : [];
} catch {
return [];
}
});

const [task, setTask] = useState("");
const [taskDescription, setTaskDescription] = useState("");

useEffect(() => {
localStorage.setItem("tasks", JSON.stringify(taskList));
}, [taskList]);

const addTask = () => {
if (!task.trim()) return;

const newTask = {
id: Date.now(),
text: task,
description: taskDescription,
completed: false,
};

setTaskList((prev) => [...prev, newTask]);

setTask("");
setTaskDescription("");
};

const deleteTask = (id) => {
setTaskList((prev) => prev.filter((task) => task.id !== id));
};

const toggleComplete = (id) => {
setTaskList((prev) =>
prev.map((task) =>
task.id === id
? { ...task, completed: !task.completed }
: task
)
);
};

return (
<div
style={{
padding: "20px",
maxWidth: "500px",
margin: "20px auto",
backgroundColor: "#2b1d16",
borderRadius: "12px",
color: "#f5e6d3",
boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
}}
>
    <h1 className="">NOVATECH SOLUTIONS</h1>
<h2 style={{ textAlign: "center", marginBottom: "20px" }}>
My Task List
</h2>

<input
type="text"
value={task}
onChange={(e) => setTask(e.target.value)}
placeholder="What needs to be done?"
style={{
width: "100%",
marginBottom: "10px",
padding: "10px",
borderRadius: "8px",
border: "none",
outline: "none",
backgroundColor: "#4a2f24",
color: "#fff",
}}
/>

<input
type="text"
value={taskDescription}
onChange={(e) => setTaskDescription(e.target.value)}
placeholder="Add a description (optional)"
style={{
width: "100%",
marginBottom: "10px",
padding: "10px",
borderRadius: "8px",
border: "none",
outline: "none",
backgroundColor: "#4a2f24",
color: "#fff",
}}
/>

<button
onClick={addTask}
style={{
width: "100%",
padding: "10px",
borderRadius: "8px",
border: "none",
backgroundColor: "#8b5e3c",
color: "#fff",
cursor: "pointer",
marginBottom: "20px",
fontWeight: "bold",
}}
>
Add Task
</button>

<ul style={{ listStyle: "none", padding: 0 }}>
{taskList.map((task) => (
<li
key={task.id}
style={{
marginBottom: "15px",
padding: "12px",
borderRadius: "10px",
backgroundColor: "#3a261d",
display: "flex",
flexDirection: "column",
}}
>
<p
style={{
textDecoration: task.completed ? "line-through" : "none",
marginBottom: "5px",
}}
>
<strong>{task.text}</strong>
</p>

{task.description && (
<p style={{ color: "#cbb39a", fontSize: "14px" }}>
{task.description}
</p>
)}

<div style={{ marginTop: "10px" }}>
<button
onClick={() => toggleComplete(task.id)}
style={{
padding: "6px 10px",
borderRadius: "6px",
border: "none",
backgroundColor: "#a67c52",
color: "#fff",
cursor: "pointer",
marginRight: "8px",
}}
>
{task.completed ? "Undo" : "Complete"}
</button>

<button
onClick={() => deleteTask(task.id)}
style={{
padding: "6px 10px",
borderRadius: "6px",
border: "none",
backgroundColor: "#5a3a2e",
color: "#fff",
cursor: "pointer",
}}
>
Delete
</button>
</div>
</li>
))}
</ul>
</div>
);
};

export default CreateTask;