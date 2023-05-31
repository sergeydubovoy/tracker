const taskNameInputNode = document.getElementById("taskNameInput"); // Инпут
const addTaskButtonNode = document.getElementById("addTaskButton"); // Кнопка Добавить

const taskNode = document.getElementById("task"); // Тело задачи
const checkboxNode = document.getElementById("checkbox"); // Чекбокс
const taskNameNode = document.getElementById("task__name"); // Название задачи
const tasksListNode = document.getElementById("manage__list"); // Контейнер для задач

const deleteTaskButtonNode = document.getElementById("task__del-btn"); // Кнопка удаления
const deleteTaskButtonLineNode = document.getElementById("del-btn__line"); // Линии в кнопке удаления, для смены стиля

const STORAGE_LABEL_TASKS = "Task";
const storagedTasks = JSON.parse(localStorage.getItem(STORAGE_LABEL_TASKS));

let tasks = [];

const getTaskName = () => {
  taskName = taskNameInputNode.value;
  return taskName;
};

const clearInput = () => {
  taskNameInputNode.value = "";
};

const renderStoragedTasks = () => {
  if (storagedTasks) {
    tasks = storagedTasks;
    tasks.forEach((task) => {
      const taskTemplate = `
          <div class="task ${task.checked ? "task_checked" : ""}">
            <label for="checkbox" class="checkbox-cover">
              <input type="checkbox" id="checkbox" class="task__checkbox" ${
                task.checked ? "checked" : ""
              }/>
            </label>
            <p class="task__name ${task.checked ? "task__name_checked" : ""}">${
        task.name
      }</p>
            <button class="task__del-btn">
              <span class="del-btn__line"></span>
            </button>
          </div>
        `;
      tasksListNode.insertAdjacentHTML("afterbegin", taskTemplate);
    });
  }
};

renderStoragedTasks();

const renderTasksList = () => {
  const name = taskNameInputNode.value;

  if (!name) {
    return;
  } else {
    const newTask = { name, checked: false };
    tasks.push(newTask);
    const taskTemplate = `
    <div id="task" class="task">
      <label for="checkbox" class="checkbox-cover">
        <input type="checkbox" id="checkbox" class="task__checkbox"/>
      </label>
      <p id="task__name" class="task__name">${name}</p>
      <button id="task__del-btn" class="task__del-btn">
        <span id="del-btn__line" class="del-btn__line"></span>
      </button>
    </div>
  `;
    tasksListNode.insertAdjacentHTML("afterbegin", taskTemplate);
    clearInput();
  }
  localStorage.setItem(STORAGE_LABEL_TASKS, JSON.stringify(tasks));
};

addTaskButtonNode.addEventListener("click", renderTasksList);

taskNameInputNode.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    renderTasksList();
  }
});

const toggleCheckboxes = (event) => {
  if (event.target.classList.contains("task__checkbox")) {
    const taskElement = event.target.closest(".task");
    const taskIndex =
      tasksListNode.children.length -
      Array.from(tasksListNode.children).indexOf(taskElement) -
      1;
    tasks[taskIndex].checked = event.target.checked;

    taskElement
      .querySelector(".task__name")
      .classList.toggle("task__name_checked");
    taskElement
      .querySelector(".del-btn__line")
      .classList.toggle("del-btn__line_checked");
    taskElement.classList.toggle("task_checked");
    localStorage.setItem(STORAGE_LABEL_TASKS, JSON.stringify(tasks));
  }
};

tasksListNode.addEventListener("click", toggleCheckboxes);

const deleteTask = (event) => {
  if (
    event.target.classList.contains("task__del-btn") ||
    event.target.classList.contains("del-btn__line")
  ) {
    const taskElement = event.target.closest(".task");
    const taskIndex =
      tasksListNode.children.length -
      Array.from(tasksListNode.children).indexOf(taskElement) -
      1;
    tasks.splice(taskIndex, 1);
    taskElement.remove();
  }
  localStorage.setItem(STORAGE_LABEL_TASKS, JSON.stringify(tasks));
};

tasksListNode.addEventListener("click", deleteTask);
