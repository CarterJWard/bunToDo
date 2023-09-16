import { InferInsertModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  name: text("name"),
});

export type Todo = InferInsertModel<typeof todos>;
