import * as elements from "typed-html";
import { Todo } from "../db/schema";
import TodoItem from "./TodoItem";

export default function Todolist({ todos }: { todos: Todo[] }) {
  return (
    <table>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
    </table>
  );
}
