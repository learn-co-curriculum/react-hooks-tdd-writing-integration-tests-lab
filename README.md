# Writing Integration Tests Lab

## Learning Goals

- Practice writing integration tests for React components

## Introduction

In the previous lesson, we walked through the process of writing integration
tests for the base functionality of a To-do App. Now it's your turn. In this
lab, you will add the following functionality to the app:

- The ability to delete a to-do
- The ability to mark a to-do as done

The final product should work like this:

![To-do App final result](https://curriculum-content.s3.amazonaws.com/react-hooks-tdd/writing-integration-tests-lab/todo-app.gif)

As always, you will follow the test-driven development process of writing the
tests for a particular element or functionality, then writing the code to get
the tests to pass.

## Getting Started

Fork and clone this repo, then run `npm install` and `npm test`. Open a second
tab and run `npm start` so you can see your progress in the browser as well.

Note that the files containing the tests and code for the base functionality
have been provided for you. You will be adding your tests to `src/App.test.js`,
and your code to `TodoList.js` and `Todo.js`.

## Instructions



### Adding the Ability to Delete a To-Do

Next we want to give the user the ability to delete individual to-dos. We'll add
a delete button for each to-do in the list. Therefore, our test for the initial
state of the `Todo` component will verify that the page contains the correct
number of delete buttons:

```jsx
describe("Todo component initial status", () => {
  test("each list item includes a delete button", () => {
    render(<App />);
  
    const inputField = screen.getByPlaceholderText( /add to-do/i );
    const submitButton = screen.getByRole("button", { name: /submit/i });
    
    userEvent.type(inputField, "take out the trash");
    userEvent.click(submitButton);
    userEvent.type(inputField, "walk the dog");
    userEvent.click(submitButton);

    expect(screen.getAllByRole("button", { name: /x/i }).length).toBe(2);
  });
});
```

Getting this test to pass is a simple matter of adding the button in the `Todo`
component:

```jsx
  return (
    <li>
      {todo.text} 
      <button>X</button>
    </li>
  )
```

The next step is to check that clicking the delete button will remove the
associated to-do from the DOM. This gives us a bit of a problem. We need to
simulate a user clicking the delete button, but we can't just use `getByRole` to
access the button because there may be more than one delete button on the page,
all with the same name ("X"). We need to be able to select the delete button
that's associated with a particular to-do. To do this, we'll use another
function provided by React Testing Library: [within][].

What `within` allows us to do is first find the `li` that contains the to-do to
be deleted, then specify that we want the button "within" _that_ element.

We'll start by adding `within` to the functions being imported from React
Testing Library in `App.test.js`:

```jsx
import { render, screen, within } from '@testing-library/react';
```

Then we can write our test:

```jsx
describe("Todo component user events", () => {
  test("clicking the delete button for a to-do removes it from the list", () => {
    render(<App />);

    const inputField = screen.getByPlaceholderText( /add to-do/i );
    const submitButton = screen.getByRole("button", { name: /submit/i });
    
    userEvent.type(inputField, "take out the trash");
    userEvent.click(submitButton);
    userEvent.type(inputField, "walk the dog");
    userEvent.click(submitButton);

    const li = screen.getByText( /take out the trash/i );
    const deleteButton = within(li).getByRole("button", { name: "X" });

    userEvent.click(deleteButton);

    expect(screen.queryByText (/take out the trash/i )).not.toBeInTheDocument();
    expect(screen.getByText( /walk the dog/i )).toBeInTheDocument();
  });
});
```

There's a lot going on here, but everything other than the use of `within`
should be familiar: we render the `App` component, simulate the user events to
add to-dos, simulate the user event to delete one of them, and finally check the
updated status of the page.

Let's take a closer look at the code that finds the delete button associated with
the `li` we want to delete:

```jsx
const li = screen.getByText( /take out the trash/i );
const deleteButton = within(li).getByRole("button", { name: "X" });
```

Here, we're first finding the `li` that contains the to-do to be deleted, then
specifying that we want the delete button that's "within" that li. Once we've
identified the correct button and stored it in the `deleteButton` variable, we
can use it in our simulated user event.

To get this test passing, we'll add a `deleteTodo` function to `TodoList.js`:

```jsx
//TodoList.js
const deleteTodo = (text) => {
  setTodos(todos.filter((todo) => todo.text !== text))
}
```

And pass it down as a prop to `Todo`:

```jsx
<ul>
  {todos.map((todo) => (
    <Todo
      key={todo.text} 
      todo={todo}
      deleteTodo={deleteTodo}
    />
  ))}
</ul>
```

Then in `Todo.js`, we'll add it to the variables being deconstructed from
`props` and use it as the button's `onClick` handler:

```jsx
//Todo.js
function Todo({todo, deleteTodo}) {
  return (
    <li>
      {todo.text} 
      <button onClick={() => deleteTodo(todo.text)}>X</button>
    </li>
  )
}

export default Todo;
```

With these changes, our test should be passing!

### Your Turn

Your task is to use test-driven development to add the ability for users to mark
a to-do as done. You should have a test that checks each of the following:

- Each to-do in the list has a `done` button in addition to the delete button
- When the user clicks the `done` button, the display of the to-do updates in
  some way to indicate that the to-do is done. (Note: You are free to do this in
  any way you like; one option would be displaying the text with strikethrough.)
- When the user clicks the `done` button for a to-do, that button should be
  removed from the DOM

The final product should look something like the following:



Once you've written a test, write the code to get it passing before continuing
on to the next. When you're done, you can compare your code to the solution branch.

## Conclusion

In this code-along, you learned about the purpose of integration tests and how
they differ from unit tests. You also got some practice writing integration
tests using Jest and React Testing Library.

[eslint]: https://eslint.org/
[typescript]: https://www.typescriptlang.org/
[guiding-principles]: https://testing-library.com/docs/guiding-principles
[source]: https://kentcdodds.com/blog/write-tests
[testing-library]: https://testing-library.com/
[getByPlaceholderText]: https://testing-library.com/docs/queries/byplaceholdertext/
[within]: https://testing-library.com/docs/dom-testing-library/api-within/
