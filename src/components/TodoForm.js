import React from "react";
import "../styles/App.css";

// TodoForm component responsible for rendering input form
// Props:
// - newTask: Current value of the input field.
// - handleChange: Event handler for input changes.
// - addTask: Event handler for adding a new task.
const TodoForm = ({ newTask, handleChange, addTask }) => {
  return (
    <div className="addTask">
      {/* Input field for entering new tasks */}
      <input
        type="text"
        id="newTaskInput"
        value={newTask}
        onChange={handleChange}
      />
      {/* Button to add new task, triggers addTask event handler */}
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default TodoForm;
