import { html } from "@elysiajs/html";
import { eq } from "drizzle-orm";
import { Elysia } from "elysia";
import * as elements from "typed-html";
import App from "./app";
import Todolist from "./components/TodoList";
import { db } from "./db";
import { todos } from "./db/schema";
import TodoItem from "./components/TodoItem";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) => html(<App />))
  .get("/todos", async () => {
    const items = await db.select().from(todos).all();
    return <Todolist todos={items} />;
  })
  .post("/todos/complete/:id", async ({ params: { id } }) => {
    const currentStatus = await db
      .select({
        status: todos.completed,
      })
      .from(todos)
      .where(eq(todos.id, parseInt(id)));
    await db
      .update(todos)
      .set({ completed: !currentStatus[0].status })
      .where(eq(todos.id, parseInt(id)));
  })
  .post("/addtodo", async ({ body }) => {
    const newItem = await db
      .insert(todos)
      .values({ name: body.title, due: new Date().toString() })
      .returning();
    return <TodoItem {...newItem[0]} />;
  })
  .delete("todos/:id", async ({ params: { id } }) => {
    await db.delete(todos).where(eq(todos.id, parseInt(id)));
    return;
  })
  .post("todos/date/:id", async ({ params: { id }, body: body }) => {
    await db
      .update(todos)
      .set({ due: body.date })
      .where(eq(todos.id, parseInt(id)));
  })
  .listen(3000);
console.log(
  `server running at http://${app.server?.hostname}:${app.server?.port}`
);
