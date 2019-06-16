import Todo from "./Todo";
import TodoTimed from "./TodoTimed";

export default class TodoApp {
  constructor() {
    this.todos = [];

    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  load() {
    const state = JSON.parse(localStorage.getItem("todos")) || [];
    this.todos = state.map(todo => {
      if (todo.date) {
        return new TodoTimed(todo.name, todo.date, todo.id, todo.done);
      }
      return new Todo(todo.name, todo.id, todo.done);
    });
    this.save();
  }

  save() {
    const json = JSON.stringify(this.todos);
    localStorage.setItem("todos", json);
  }

  add(todo) {
    if (todo.date) {
      this.todos.push(new TodoTimed(todo.name, todo.date, todo.id, todo.done));
    } else this.todos.push(new Todo(todo.name, todo.id, todo.done));
    this.save();
  }

  remove(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.save();
  }

  toggle(id) {
    this.todos.find(todo => todo.id === id).toggle();
    this.save();
  }
}
