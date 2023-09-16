import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseHTML>
        <body>
          <h1 id="parent">wow</h1>
          <Todolist todos={db} />
          <CreateButton />
        </body>
      </BaseHTML>
    )
  )
  .post("/addTodo", () => "button clicked")
  .listen(3000);
console.log(
  `server running at http://${app.server?.hostname}:${app.server?.port}`
);

const BaseHTML = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8>
    <meta name="viewport" content="width=device-width, inital-scale=1.0">
    <title>Bun to do</title>
    <script src="https://unpkg.com/htmx.org@1.9.5" integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>
</head>
${children}
`;

type Todo = {
  id: number;
  name: string;
  completed: boolean;
};

const db: Todo[] = [
  { id: 1, name: "learn vim", completed: false },
  { id: 2, name: "create this app", completed: true },
];

function TodoItem({ id, completed, name }: Todo) {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
}

function Todolist({ todos }: { todos: Todo[] }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
    </div>
  );
}

function CreateButton() {
  return (
    <button
      hx-post="/addTodo"
      hx-trigger="click"
      hx-target="#parent"
      hx-swap="innerHTML"
    >
      new task
    </button>
  );
}
