import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import "./styles/App.css";
import todoImage from "./images/todo-image.png";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const App = () => {
  // State to manage task list
  const [todoList, setTodoList] = useState([]);
  // State to manage input for new task
  const [newTask, setNewTask] = useState("");

  // Fetch data from  API when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodoList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Event handler for input change when adding new tasks
  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  // Function to add new task
  const addTask = async () => {
    try {
      // Send POST request to API to add new task
      const response = await axios.post(API_URL, {
        title: newTask,
        completed: false,
      });
  
      // Update state with new task at beginning of list
      setTodoList((prevTodoList) => [...prevTodoList, response.data]);
      // Clear input after adding task
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  // Function to delete task
  const deleteTask = async (taskId) => {
    try {
      // Send DELETE request to API to delete task
      await axios.delete(`${API_URL}/${taskId}`);
      // Update state by removing deleted task from list
      const newTodoList = todoList.filter((task) => task.id !== taskId);
      setTodoList(newTodoList);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to edit task
  const editTask = async (taskId, updatedTitle) => {
    try {
      // Send PATCH request to API to update title of task
      await axios.patch(`${API_URL}/${taskId}`, {
        title: updatedTitle,
      });

      // Update state by mapping through tasks and updating edited task
      const updatedTodoList = todoList.map((task) =>
        task.id === taskId ? { ...task, title: updatedTitle } : task
      );

      setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // Render component
  return (
    <div className="App">
      <div className="app-wrapper">
        {/* Display header image */}
        <img src={todoImage} alt="To-Do Image" className="todo-image" />
        {/* Render TodoForm component for adding new tasks */}
        <TodoForm newTask={newTask} handleChange={handleChange} addTask={addTask} />
        {/* Display list of tasks using TodoItem component */}
        <div className="list">
          {todoList
            .slice()
            .reverse() // Reverse order to display latest tasks at begining of list
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
