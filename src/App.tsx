import * as elements from "typed-html";
import AddTask from "./components/AddTask";

export default function App() {
  return (
    <BaseHTML>
      <body>
        <h1>Projectly</h1>
        <div hx-trigger="load" hx-get="todos" hx-swap="outerHTML" />
        <AddTask />
      </body>
    </BaseHTML>
  );
}
const BaseHTML = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8>
    <meta name="viewport" content="width=device-width, inital-scale=1.0">
    <title>Bun to do</title>
    <script src="https://unpkg.com/htmx.org@1.9.5" integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>
</head>
${children}`;
