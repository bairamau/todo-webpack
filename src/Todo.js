function createId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export default class Todo {
  constructor(name, id = createId() , done = false) {
    this.name = name;
    this.id = id;
    this.done = done;
  }

  toggle() {
    this.done = !this.done;
  }
}
