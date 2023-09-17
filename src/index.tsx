import { html } from "@elysiajs/html";
import { db } from "./db";
import { Todo, todos } from "./db/schema";
import { Elysia } from "elysia";
import * as elements from "typed-html";
import { eq } from "drizzle-orm";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseHTML>
        <body>
          <h1 id="parent">wow</h1>
          <CreateButton />
          <div hx-trigger="load" hx-get="/todos"></div>
        </body>
      </BaseHTML>
    )
  )
  .get("/todos", async () => {
    const items = await db.select().from(todos).all();
    return <Todolist todos={items} />;
  })
  .post("/todos/complete/:id", async ({ params: { id } }) => [
    await db
      .update(todos)
      .set({ completed: true })
      .where(eq(todos.id, parseInt(id))),
  ])
  .post("/addTodo", async () => {
    await db.insert(todos).values({ name: "my todo" });
  })
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

function TodoItem({ id, completed, name }: Todo) {
  return (
    <div>
      <p>{name}</p>
      <p>{id}</p>
      <p>{completed}</p>
      <input
        type="checkbox"
        checked={completed}
        hx-post={`/todos/complete/${id}`}
      ></input>
    </div>
  );
}

function Todolist({ todos }: { todos: Todo[] }) {
  return (
    <div>
      <h2>Todo's</h2>
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
