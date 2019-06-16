function createId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export default class Todo {
  constructor(name, id = createId() , done = false) {
    this.id = id;
    this.name = name;
    this.done = done;
  }

  toggle() {
    this.done = !this.done;
  }
}
