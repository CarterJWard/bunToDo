import { html } from "@elysiajs/html";
import { db } from "./db";
import { Todo, todos } from "./db/schema";
import { Elysia } from "elysia";
import * as elements from "typed-html";
import { eq } from "drizzle-orm";
import App from "./app";
import Todolist from "./components/TodoList";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) => html(<App />))
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
