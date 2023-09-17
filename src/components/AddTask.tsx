import * as elements from "typed-html";

export default function AddTask() {
  return (
    <div>
      <form onsubmit="return false">
        <input
          name="title"
          hx-post="/addtodo"
          hx-target="table"
          hx-swap="beforeend"
        />
      </form>
    </div>
  );
}
