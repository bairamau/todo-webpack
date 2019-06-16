import TodoApp from "./TodoApp";
import render from "./view";

const app = new TodoApp();
app.load();
render(app.add, app.remove, app.toggle);