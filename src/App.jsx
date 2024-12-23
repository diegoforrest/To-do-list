import { useState, useEffect } from "react";
import "./App.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [timer, setTimer] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "" && timer.trim() !== "" && !isNaN(timer)) {
      const id = Date.now(); 
      const duration = parseInt(timer); 

      setTodos([
        ...todos,
        { id, text: newTodo.trim(), checked: false, remainingTime: duration },
      ]);
      setNewTodo("");
      setTimer("");
    }
  };

  const handleDeleteTodoById = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.remainingTime > 0) {
            return { ...todo, remainingTime: todo.remainingTime - 1 };
          } else {
            handleDeleteTodoById(todo.id);
            return null;
          }
        }).filter(Boolean)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Reminders!</h1>
      <p className="app-subtitle">Work Smarter Not Harder!</p>

      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter your task..."
          className="todo-input"
        />
        <input
          type="number"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          placeholder="Timer(secs)"
          className="timer-input"
        />
        <button onClick={handleAddTodo} className="add-button">
          Add Task
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={todo.id} className="todo-item">
<div className="timer-container">
  <span className="timer-display">
  <span className="material-icons">access_time</span>
    {todo.remainingTime > 0 ? `${todo.remainingTime}s` : "Expired"}
  </span>
</div>

            <div className="todo-box">
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleToggleTodo(index)}
                className="checkbox"
              />
              <span className={`todo-text ${todo.checked ? "completed" : ""}`}>
                {todo.text}
              </span>
              <button
                onClick={() => handleDeleteTodoById(todo.id)}
                className="delete-button"
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

export default TodoList;
