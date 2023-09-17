import * as elements from "typed-html";
import { Todo } from "../db/schema";
import TodoItem from "./TodoItem";

export default function Todolist({ todos }: { todos: Todo[] }) {
  return (
    <div>
      <h2>Todo's</h2>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
    </div>
  );
}
