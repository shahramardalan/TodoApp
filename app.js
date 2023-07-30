const createTaskForm = document.querySelector("#todoForm");
const createTaskInput = document.querySelector("#textValue");
const createTaskButton = document.querySelector("#addToList");
const newRow = document.querySelector("#taskRows");

let taskIdCounter = 0;
const taskList = [];
let i = 0;

const task_Status = Object.freeze({
  todo: "todo",
  done: "done",
});

function taskFactory(text = "", status = task_Status.todo) {
  if (task_Status.todo != "todo" && task_Status.done != "done") {
    return;
  }

  const taskObject = {
    id: `tasks-uuid-${taskIdCounter}`,
    text,
    status,
  };

  taskIdCounter++;

  return taskObject;
}

function renderTasks() {
  console.log("---- task list ----");
  console.log(taskList);
  console.log("--------------------");

  const newTask = `<div class="flex w-2/5 justify-between pb-5 m-auto">
  <li>${taskList[i].text}</li>
  <div>
    <span
      ><i
        class="fa-solid fa-circle-check"
        style="color: #25792b"
      ></i
    ></span>
    <span
      ><i
        class="fa-solid fa-circle-minus"
        style="color: #ff0000"
      ></i
    ></span>
  </div>
</div>`;
  newRow.innerHTML += newTask;
  i++;
}

function createTask(text = "") {
  const task = taskFactory(text);
  taskList.push(task);
  renderTasks();
}

function createTaskHandler() {
  const value = createTaskInput.value;
  if (!value) {
    return;
  }
  createTask(value);
  createTaskInput.value = "";
}

createTaskButton.addEventListener("click", createTaskHandler);

createTaskForm.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    const value = createTaskInput.value;
    if (!value) {
      return;
    }
    createTask(value);
    createTaskInput.value = "";
  }
});
