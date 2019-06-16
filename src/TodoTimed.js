import Todo from "./Todo";

export default class TodoTimed extends Todo {
  constructor(name, date, id, done) {
    super(name, id, done);
    this.date = date;
    if (!done && new Date(date).getTime() < Date.now()) this.done = true;
  }
}
