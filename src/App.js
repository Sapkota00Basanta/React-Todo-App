import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';

const LOCAL_STORAGE_kEY = "react-todo-list-todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_kEY));
    if(storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_kEY, JSON.stringify(todos));
  }, [todos]);


  function addTodo(todo) {
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className="App">
        <Typography style={{ padding: 16 }}variant="h1">
        React ToDo
        </Typography>
        <TodoForm addTodo={addTodo}/>
        <TodoList 
        todos={todos} 
        toggleComplete = {toggleComplete}
        removeTodo={removeTodo}
        />
    </div>
  );
}

export default App;
