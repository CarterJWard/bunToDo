import { Todo } from "../db/schema";
import * as elements from "typed-html";

export default function TodoItem({ id, completed, name }: Todo) {
  return (
    <tr>
      <td>{name}</td>
      <td>{id}</td>
      <td>
        <input
          type="checkbox"
          checked={completed}
          hx-post={`/todos/complete/${id}`}
        ></input>
      </td>
      <td>
        <button
          hx-delete={`todos/${id}`}
          hx-target="closest tr"
          hx-swap="delete"
        >
          Delete task
        </button>
      </td>
    </tr>
  );
}
