function Todo({ todo, deleteTodo, markDone }) {
  const className = todo.done ? "done" : null;

  const renderDoneButton = () => {
    return !todo.done ? 
      <button onClick={() => markDone(todo.text)}>done</button> : null
  }

  return (
    <li className={className}>
      {todo.text} 
      {renderDoneButton()}
      <button onClick={() => deleteTodo(todo.text)}>X</button>
    </li>
  )
}

export default Todo;
