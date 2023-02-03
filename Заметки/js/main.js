const input_form = document.querySelector("#form");
const input_text = document.querySelector(".form-control");
const emptyList = document.querySelector("#emptyList");
const tasks_list = document.querySelector("#tasksList");

let tasks = [];

input_form.addEventListener("submit", addTasks);
tasks_list.addEventListener("click", doneTask);
tasks_list.addEventListener("click", deleteTask);

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach((task) => renderTask(task));
}

checkEmpty_list();

function addTasks(event) {
  event.preventDefault();

  const task_text = input_text.value;

  const newTask = {
    // добавляем время
    id: Date.now(),
    text: task_text,
    done: false,
  };

  tasks.push(newTask);
  // form CSS class

  renderTask(newTask);

  input_text.value = "";
  input_text.focus();

  checkEmpty_list();

  saveToLocalStorage();
  //   if (tasks_list.children.length > 1) {
  //     emptyList.classList.add("none");
  //   }
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;
  else {
    const tasks__parent = event.target.closest("li");

    // // стрелочная функция
    // const index = tasks.findIndex((task) => task.id === id);

    // tasks.splice(index, 1);

    // удаляет задачу через фильтрацию массива

    const id = Number(tasks__parent.id);
    tasks = tasks.filter((task) => task.id !== id);

    tasks__parent.remove();

    // if (tasks_list.children.length === 1) {
    //   emptyList.classList.remove("none");
    // }
  }

  checkEmpty_list();

  saveToLocalStorage();
}

function doneTask(event) {
  if (event.target.dataset.action == "done") {
    const parentsTag = event.target.closest("li");

    const id = Number(parentsTag.id);

    const task = tasks.find((task) => task.id === id);

    task.done = !task.done;

    const taskTitle = parentsTag.querySelector(".task-title");
    taskTitle.classList.toggle("task-title--done");

    saveToLocalStorage();
  }
}

function checkEmpty_list() {
  if (tasks.length === 0) {
    const emptyListElem = `<li id="emptyList" class="list-group-item empty-list">
    <img src="./img/priority tasks_icon.png" alt="Empty" width="48" class="mt-3" />
    <div class="empty-list__title">----------</div>
  </li>`;

    tasks_list.insertAdjacentHTML("afterbegin", emptyListElem);
  }
  if (tasks.length > 0) {
    const emptyListHTML = document.querySelector("#emptyList");

    emptyListHTML ? emptyListHTML.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  const task_HTML = `<li id ="${task.id}" class="list-group-item d-flex justify-content-between task-item">
      <span class="${cssClass}">${task.text}</span>
      <div class="task-item__buttons">
          <button type="button" data-action="done" class="btn-action">
              <img src="./img/tick.svg" alt="Done" width="18" height="18">
          </button>
          <button type="button" data-action="delete" class="btn-action">
              <img src="./img/cross.svg" alt="Done" width="18" height="18">
          </button>
      </div>
    </li>`;

  tasks_list.insertAdjacentHTML("beforeend", task_HTML);
}
