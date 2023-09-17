import { Todo } from "../db/schema";
import * as elements from "typed-html";

export default function TodoItem({ id, completed, name }: Todo) {
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
