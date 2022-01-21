import { render, screen, within } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';

function addItems() {
  const inputField = screen.getByPlaceholderText( /add to-do/i );
  const submitButton = screen.getByRole("button", { name: /submit/i });
  
  userEvent.type(inputField, "take out the trash");
  userEvent.click(submitButton);
  userEvent.type(inputField, "walk the dog");
  userEvent.click(submitButton);
};

// TodoList Component
describe("TodoList component initial status", () => {
  test("todo list is initially empty", () => {
    render(<App />);
  
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
  
  test("the page includes an 'Add To-do' input element that has a submit button", () => {
    render(<App />);
  
    expect(screen.getByPlaceholderText( /add to-do/i )).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

});

describe("TodoList component user events", () => {
  test("when a new to-do is submitted it appears in the list of to-dos", () => {
    render(<App />);

    addItems();

    expect(screen.getAllByRole("listitem").length).toBe(2);
    expect(screen.getByText("take out the trash")).toBeInTheDocument();
    expect(screen.getByText("walk the dog")).toBeInTheDocument();
  });
});

// Todo Component
describe("Todo component initial status", () => {
  test("each list item includes a delete button", () => {
    render(<App />);

    addItems();

    expect(screen.getAllByRole("button", { name: /x/i }).length).toBe(2);
  });

  test("each list item includes a done button", () => {
    render(<App />);

    addItems();

    expect(screen.getAllByRole("button", { name: /done/i }).length).toBe(2);
  });
});

describe("Todo component user events", () => {
  test("clicking the delete button for a to-do removes it from the list", () => {
    render(<App />);

    addItems();

    const li = screen.getByText( /take out the trash/i );
    const deleteButton = within(li).getByRole("button", {name: /x/i });

    userEvent.click(deleteButton);

    expect(screen.queryByText (/take out the trash/i )).not.toBeInTheDocument();
    expect(screen.getByText( /walk the dog/i )).toBeInTheDocument();
  });

  test("clicking the done button for a to-do displays the text with strikethrough", () => {
    render(<App />);

    addItems();

    const li = screen.getByText( /take out the trash/i );
    const doneButton = within(li).getByRole("button", { name: /done/i });

    userEvent.click(doneButton);

    expect(screen.getByText( /take out the trash/i )).toHaveClass("done");
  });

  test("the done button is removed once it has been clicked", () => {
    render (<App />);

    addItems();

    const li = screen.getByText( /take out the trash/i );
    const doneButton = within(li).getByRole("button", { name: /done/i });

    userEvent.click(doneButton);
    
    expect(screen.queryByRole("button", {name: /take out the trash/i })).not.toBeInTheDocument();
  });
});
