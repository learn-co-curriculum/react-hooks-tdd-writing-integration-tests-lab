import { useState } from 'react';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const enterTodo = (e) => {
    setNewTodo(e.target.value);
  }

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, { text: newTodo }]);
    setNewTodo("");
  };

  const deleteTodo = (text) => {
    setTodos(todos.filter((todo) => todo.text !== text))
  }

  const markDone = (text) => {
    setTodos(todos.map((todo) => todo.text === text ? {...todo, done: true} : todo));
  }

  return (
  <div>
    <h1>My To-dos</h1>
    <ul>
      {todos.map((todo) => (
        <Todo
          key={todo.text} 
          todo={todo}
          markDone={markDone}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
    <form onSubmit={addTodo}>
      <input 
        type="text" 
        onChange={enterTodo} 
        value={newTodo} 
        placeholder="Add to-do"
      />
      <input type="submit"/>
    </form>
  </div>
  )};

export default TodoList;
