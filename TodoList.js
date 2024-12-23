import React, { useState } from "react";

const Todolist = () => {
    const [todos, setTodos] = useState([]);
    const [newtodos, setNewTodos] = useState("");
    
    const handleAddTodo = () => {
        if (newTodo.trim() !=="") {
            setTodos([...todos, { Text: newTodo.trim(), checked}])
            setNewTodo("");
        }
    };

    const handleDeleteTodo = (index) => {

    }

    const handleToggleTodo = (index) => {
        
    };
    return (
        <div>
            <h1>To-do-List</h1>
            <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
            <button onCLick={(handleAddTodo)}>Add</button>

        <ul>
            {todos.map((todo, index) => {
                <li> key={index}
                   <input type="checkbox" checked={todo.checked}/>     
                </li>
            })}
        </ul>
        </div>
    );
};

export default Todolist;
