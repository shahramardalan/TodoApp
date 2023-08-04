const createTaskForm = document.querySelector("#todoForm");
const createTaskInput = document.querySelector("#textValue");
const createTaskButton = document.querySelector("#addToList");

let taskIdCounter = 0;
let taskList = [];

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

function renderTask(taskObject) {
  if (!taskObject || typeof taskObject !== "object") {
    return;
  }

  let todoListStateClass = "";
  if (taskObject.status === task_Status.todo) {
    todoListStateClass = "bg-gray-100";
  } else if (taskObject.status === task_Status.done) {
    todoListStateClass = "bg-green-100";
  }
  return `<li class="rounded-xl p-2 mt-1 flex justify-between ${todoListStateClass}">
              <p class = ${
                taskObject.status === task_Status.done ? "line-through" : ""
              }>${taskObject.text}</p>
              <div>
                  <span class="fa fa-minus-circle text-red-500" data-action="delete" data-target="${
                    taskObject.id
                  }"></span>
                  <span class="fa fa-check-circle text-green-500"></span>
              </div>
          </li>`;
}

function renderTasks() {
  const todoListElement = document.querySelector("#todo-list");
  let renederdTasks = [];
  for (let i = 0; i < taskList.length; i += 1) {
    renederdTasks.push(renderTask(taskList[i]));
  }
  todoListElement.innerHTML = renederdTasks.join("\n");
}

function createTask(text = "") {
  const task = taskFactory(text);
  taskList.push(task);
  renderTasks();
}

/* function deleteTask(taskID) {
  if (typeof taskID !== "string" || !taskID) {
    return;
  }
  let newTaskList = [];
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id !== taskID) {
      newTaskList.push(taskList[i]);
    }
  }
  taskList = newTaskList;
  renderTasks();
}
 */

/* function deleteTask(taskID) {
  if (typeof taskID !== "string" || !taskID) {
    return;
  }
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === taskID) {
      taskList.splice(i, 1);
    }
  }
  renderTasks();
} */

function deleteTask(taskID) {
  if (typeof taskID !== "string" || !taskID) {
    return;
  }
  let filtered = taskList.filter(function (task) {
    return task.id !== taskID;
  });
  taskList = filtered;
  renderTasks();
}

const todoListElement = document.querySelector("#todo-list");

todoListElement.addEventListener("click", function (event) {
  const target = event.target;
  if (target.dataset.action === "delete") {
    const taskID = target.dataset.target;
    deleteTask(taskID);
  } else {
    console.log("be man marboot nist!");
  }
});

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
