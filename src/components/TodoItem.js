// TodoItem.js
import React, { useState } from "react";
import "../styles/App.css";

const TodoItem = ({ task, deleteTask, editTask }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.title);
  const [isChecked, setChecked] = useState(task.completed);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedTask(task.title);
  };

  const handleSaveEdit = () => {
    editTask(task.id, editedTask, isChecked);
    setEditing(false);
  };

  const handleChange = (event) => {
    setEditedTask(event.target.value);
  };

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <div className={`item-wrapper ${isChecked ? "completed" : ""}`}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          style={{ transform: "scale(1.5)", marginRight: "8px" }}
        />
        <h1 className="task-title">{task.title}</h1>
      </div>
      <div className="action-buttons">
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




