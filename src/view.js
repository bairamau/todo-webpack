//beware shock-content

function create(tag, className, textContent) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = textContent;
  return element;
}

function createTodos(removeHandler, toggleHandler, filterValue = "") {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const filteredTodos = todos.filter(todo =>
    todo.name.toLowerCase().includes(filterValue.toLowerCase())
  );
  const list = create(
    "div",
    "ui large relaxed middle aligned divided selection list"
  );

  filteredTodos.forEach(todo => {
    const item = create("div", "item");
    item.id = todo.id;
    item.style.display = "grid";
    item.style.gridTemplateColumns = "auto 1fr auto";
    item.style.alignItems = "center";
    item.addEventListener("click", () => {
      toggleHandler(todo.id);
      window.dispatchEvent(new Event("render"));
    });

    const right = create("div", "content");
    const button = create("button", "ui compact icon basic button");
    const icon = create("i", "times icon");
    button.appendChild(icon);
    button.addEventListener("click", e => {
      e.stopPropagation();
      removeHandler(todo.id);
      window.dispatchEvent(new Event("render"));
    });
    right.appendChild(button);

    const left = create("div", "ui checkbox");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      toggleHandler(todo.id);
      window.dispatchEvent(new Event("render"));
    });
    left.appendChild(checkbox);
    left.appendChild(document.createElement("label"));

    const label = create("div", "header", todo.name);
    label.style.fontWeight = "normal";
    label.style.textDecoration = todo.done ? "line-through" : "none";
    label.style.opacity = todo.done ? "0.4" : "1";

    item.appendChild(left);
    item.appendChild(label);

    if (todo.date) {
      const until = create("div", "content", todo.date);
      until.textContent = `until ${todo.date}`;
      item.appendChild(until);
      item.style.gridTemplateColumns = "auto 1fr 1fr auto";
    }

    item.appendChild(right);

    list.appendChild(item);
  });

  return list;
}

function createMenu(addHandler) {
  function createRadio(id, name, label, checked = false) {
    const radio = create("div", "field");
    const radioWrapper = create("div", "ui radio checkbox");
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = name;
    radioInput.checked = checked;
    radioInput.id = id;
    const radioLabel = document.createElement("label");
    radioLabel.textContent = label;
    radioLabel.style.cursor = "pointer";
    radioLabel.setAttribute("for", id);

    radio.appendChild(radioWrapper);
    radioWrapper.appendChild(radioInput);
    radioWrapper.appendChild(radioLabel);

    return radio;
  }
  const container = create("div", "ui compact raised padded text segment");
  const menuWrapper = create("div", "ui form");
  const menu = create("div", "inline fields");

  const plain = createRadio("plain-radio", "type", "Plain", true);
  const timed = createRadio("timed-radio", "type", "Timed");
  const multiple = createRadio("multiple-radio", "type", "Multiple");

  menuWrapper.appendChild(menu);
  menu.appendChild(plain);
  menu.appendChild(timed);
  menu.appendChild(multiple);

  container.appendChild(menuWrapper);

  function createForm(type) {
    const form = create("form", "ui form");

    const nameWrapper = create("div", "field");
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("maxlength", "50");
    nameInput.required = true;
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "To do name";
    nameWrapper.appendChild(nameLabel);
    nameWrapper.appendChild(nameInput);

    const addButton = create("button", "ui fluid button", "Add");

    form.appendChild(nameWrapper);

    if (type === "timed") {
      const dateWrapper = create("div", "field");
      const dateInput = document.createElement("input");
      dateInput.setAttribute("type", "date");
      dateInput.required = true;
      const dateLabel = document.createElement("label");
      dateLabel.textContent = "Until";
      dateWrapper.appendChild(dateLabel);
      dateWrapper.appendChild(dateInput);
      form.appendChild(dateWrapper);
    }

    form.appendChild(addButton);

    form.addEventListener("submit", evt => {
      evt.preventDefault();
      const targets = [...evt.target];
      targets.pop();
      const data = targets.map(target => target.value);
      const state = {
        name: data[0],
        date: data[1]
      };

      addHandler(state);
      window.dispatchEvent(new Event("render"));
      targets.forEach(target => (target.value = ""));
    });

    return form;
  }

  let form = createForm();
  container.appendChild(form);

  menu.addEventListener("change", evt => {
    switch (true) {
      case plain.contains(evt.target):
        const plainForm = createForm();
        form.replaceWith(plainForm);
        form = plainForm;
        break;
      case timed.contains(evt.target):
        const timedForm = createForm("timed");
        form.replaceWith(timedForm);
        form = timedForm;
        break;
      case multiple.contains(evt.tagret):
        break;
      default:
        break;
    }
  });

  return container;
}

function createSearch() {
  const container = create("div", "ui left icon fluid input");
  const search = document.createElement("input");
  search.type = "text";
  search.placeholder = "Search...";
  const icon = create("i", "search icon");
  container.appendChild(icon);
  container.appendChild(search);

  search.addEventListener("input", () => {
    window.dispatchEvent(new Event("render"));
  });

  return container;
}

export default function render(addHandler, removeHandler, toggleHandler) {
  const root = document.getElementById("root");
  const header = create("h1", "ui center aligned icon header", "To do list");
  const appContainer = create("div", "ui grid container segments horizontal");
  const listContainer = create(
    "div",
    "ui ten wide column raised padded text segment"
  );

  const search = createSearch();
  let list = createTodos(removeHandler, toggleHandler);
  const menu = createMenu(addHandler);

  window.addEventListener("render", () => {
    const newList = createTodos(
      removeHandler,
      toggleHandler,
      search.children[1].value
    );
    list.replaceWith(newList);
    list = newList;
  });

  listContainer.appendChild(search);
  listContainer.appendChild(list);
  appContainer.appendChild(menu);
  appContainer.appendChild(listContainer);
  root.appendChild(header);
  root.appendChild(appContainer);
}
