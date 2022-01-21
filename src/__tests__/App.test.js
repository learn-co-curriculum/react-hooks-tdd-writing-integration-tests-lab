import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// TodoList Component
describe("TodoList component initial status", () => {
  test("todo list is initially empty", () => {
    render(<App />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("the page includes an 'Add To-do' input element that has a submit button", () => {
    render(<App />);

    expect(screen.getByPlaceholderText(/add to-do/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});

describe("TodoList component user events", () => {
  test("when a new to-do is submitted it appears in the list of to-dos", () => {
    render(<App />);

    const inputField = screen.getByPlaceholderText(/add to-do/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    userEvent.type(inputField, "take out the trash");
    userEvent.click(submitButton);
    userEvent.type(inputField, "walk the dog");
    userEvent.click(submitButton);

    expect(screen.getAllByRole("listitem").length).toBe(2);
    expect(screen.getByText("take out the trash")).toBeInTheDocument();
    expect(screen.getByText("walk the dog")).toBeInTheDocument();
  });
});

// Todo Component
describe("Todo component initial status", () => {
  test("each list item includes a delete button", () => {});
  test("each list item includes a done button", () => {});
});

describe("Todo component user events", () => {
  test("clicking the delete button for a to-do removes it from the list", () => {});

  test("clicking the done button for a to-do displays the text with strikethrough", () => {});

  test("the done button is removed once it has been clicked", () => {});
});
