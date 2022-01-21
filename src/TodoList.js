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

  return (
  <div>
    <h1>My To-dos</h1>
    <ul>
      {todos.map((todo) => (
        <Todo
          key={todo.text} 
          todo={todo}
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
