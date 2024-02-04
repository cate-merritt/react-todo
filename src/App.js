// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import "./styles/App.css";
import todoImage from "./images/todo-image.png";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodoList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = async () => {
    try {
      const response = await axios.post(API_URL, {
        title: newTask,
        completed: false,
      });
  
      setTodoList((prevTodoList) => [...prevTodoList, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      const newTodoList = todoList.filter((task) => task.id !== taskId);
      setTodoList(newTodoList);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = async (taskId, updatedTitle) => {
    try {
      await axios.patch(`${API_URL}/${taskId}`, {
        title: updatedTitle,
      });

      const updatedTodoList = todoList.map((task) =>
        task.id === taskId ? { ...task, title: updatedTitle } : task
      );

      setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <img src={todoImage} alt="To-Do Image" className="todo-image" />
        <TodoForm newTask={newTask} handleChange={handleChange} addTask={addTask} />
        <div className="list">
          {todoList
            .slice()
            .reverse()
            .map((task) => (
              <TodoItem
                key={`task_${task.id}`}
                task={task}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
