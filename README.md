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

Note: it is not important to match this example exactly - you are free to style
the app as you like. However, it should include all the demonstrated
functionality.

As always, you will follow the test-driven development process of writing the
tests for a particular element or functionality, then writing the code to get
the tests to pass. We recommend completing all the requirements for the delete
button first, then moving on to the done button.

Once you are finished, you can compare your code to the solution branch.

## Getting Started

Fork and clone this repo, then run `npm install` and `npm test`. Open a second
tab and run `npm start` so you can see your progress in the browser as well.

Note that the files containing the tests and code for the base functionality we
built in the previous lesson have been provided for you. You will be adding your
tests to `src/App.test.js`, and your code to `src/TodoList.js` and `src/Todo.js`.

## Instructions

This lab consists of two tasks: adding a "delete" button and adding a "done"
button. Take a look at the placeholders at the bottom of `src/App.test.js`. As
you can see, you will need to construct a total of five integration tests: two
tests for the initial state of `Todo.js` and three tests for user events.

**Note:** because you will be testing functionality associated with individual
to-dos, you will need to include code that simulates the user events for adding
to-dos (typing the to-do into the input and clicking Submit) at the beginning of
each test block. This code should come immediately after `render(<App />)` — see
the last test that's currently in `App.test.js` for an example. We recommend
adding two to-dos each time, as is done there.

### Delete Button

To add the delete button to each to-do, you will simply add it in the `Todo`
component:

```jsx
// Todo.js
return (
  <li>
    {todo.text} 
    <button>X</button>
  </li>
)
```

However, testing the functionality of the button raises a bit of a problem. You
will need to simulate a user clicking the delete button, but you can't just use
`getByRole` to access the button because there may be more than one delete
button on the page with the same name ("X"). You need to be able to select the
delete button that's associated with a particular to-do.

To do this, you will use another function provided by React Testing Library:
[within][]. Note that `within` is already being imported in the `App.test.js`
file.

`within` will allow you to first find the `li` that contains the to-do to be
deleted, then specify that you want the button "within" _that_ element. The code
will look something like this:

```jsx
render(<MyComponent />)

const li = screen.getByText( /name of to-do/i };
const button = within(li).getByRole("button", {name: /x/i });
```

Once you've identified the button "within" the correct to-do and stored it in a
variable, you can then use it in your user event.

### Done Button

Your next task is to use test-driven development to add the ability for users to
mark a to-do as done. The requirements for the done button's functionality are:

- Each to-do in the list has a `done` button in addition to the delete button
- When the user clicks the `done` button for a to-do, the text of the to-do
  appears with strikethrough
- When the user clicks the `done` button for a to-do, the button should be
  removed from the DOM

There are a couple of different ways you could code the second requirement; we
recommend creating a CSS class and using conditional rendering to add the class
to the `li` when the to-do is marked as done.

**Hint**: to complete these requirements, you will need to keep track of each
to-do's completion status in state.

## Conclusion

In this lab, you got some practice writing integration tests using Jest and
React Testing Library. By writing your tests to mirror how users will interact
with your To-do app, you have increased your confidence that your app is
functioning as desired.

## Resources

- [Testing Library: Queries][queries]
- [Jest DOM - Custom Matchers][jest-dom]
- [MDN: ARIA Role Reference][mdn-aria-roles]
- [React Testing Library: within][within]

[within]: https://testing-library.com/docs/dom-testing-library/api-within/
[queries]: https://testing-library.com/docs/queries/about
[jest-dom]: https://github.com/testing-library/jest-dom
[mdn-aria-roles]:
  https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques