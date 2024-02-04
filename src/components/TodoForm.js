// TodoForm.js
import React from "react";
import "../styles/App.css";

const TodoForm = ({ newTask, handleChange, addTask }) => {
  return (
    <div className="addTask">
      <input
        type="text"
        id="newTaskInput"  // Add a unique id attribute
        value={newTask}
        onChange={handleChange}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default TodoForm;
