import { Todo } from "../db/schema";
import * as elements from "typed-html";

export default function TodoItem({ id, completed, name, due }: Todo) {
  const newDate = new Date(due);
  newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
  const valueDate = newDate.toISOString().slice(0, 16);
  return (
    <tr>
      <td>{name}</td>
      <td>
        <input
          type="checkbox"
          checked={completed}
          hx-post={`/todos/complete/${id}`}
        ></input>
      </td>
      <td>
        <input
          type="datetime-local"
          value={valueDate}
          hx-post={`todos/date/${id}`}
          name="date"
        />
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
