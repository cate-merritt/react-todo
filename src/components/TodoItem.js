import React, { useState } from "react";
import "../styles/App.css";

// TodoItem component responsible for rendering individual tasks in the to-do list.
// Props:
// - task: The task object containing information about the task (id, title, completed).
// - deleteTask: Event handler for deleting a task.
// - editTask: Event handler for editing a task.
const TodoItem = ({ task, deleteTask, editTask }) => {
  // State for tracking whether the task is in edit mode.
  const [isEditing, setEditing] = useState(false);

  // State for tracking the edited task title.
  const [editedTask, setEditedTask] = useState(task.title);

  // State for tracking the completion status of the task.
  const [isChecked, setChecked] = useState(task.completed);

  // Event handler to enable edit mode for the task.
  const handleEdit = () => {
    setEditing(true);
  };

  // Event handler to cancel the editing of the task.
  const handleCancelEdit = () => {
    setEditing(false);
    setEditedTask(task.title);
  };

  // Event handler to save the edited task.
  const handleSaveEdit = () => {
    editTask(task.id, editedTask, isChecked);
    setEditing(false);
  };

  // Event handler to handle changes in the edited task title.
  const handleChange = (event) => {
    setEditedTask(event.target.value);
  };

  // Event handler to toggle the completion status of the task.
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <div className={`item-wrapper ${isChecked ? "completed" : ""}`}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Checkbox for marking the task as completed */}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          style={{ transform: "scale(1.5)", marginRight: "8px" }}
        />
        {/* Task title */}
        <h1 className="task-title">{task.title}</h1>
      </div>
      <div className="action-buttons">
        {/* Render edit and delete buttons only if not in edit mode */}
        {!isEditing && (
          <>
            <button onClick={handleEdit} className="action-button">
              Edit
            </button>
            <button onClick={() => deleteTask(task.id)} className="action-button">
              Delete
            </button>
          </>
        )}
      </div>
      {/* Render input field and buttons for editing only if in edit mode */}
      {isEditing && (
        <div>
          <input type="text" value={editedTask} onChange={handleChange} />
          <button onClick={handleSaveEdit} className="action-button">
            Save
          </button>
          <button onClick={handleCancelEdit} className="action-button">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;

