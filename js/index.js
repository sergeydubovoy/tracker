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

// Функция получения названия задачи

const getTaskName = () => {
  taskName = taskNameInputNode.value;
  return taskName;
};

// Функция очистки инпута

const clearInput = () => {
  taskNameInputNode.value = "";
};

// Функция сохранения в локальное хранилище

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_LABEL_TASKS, JSON.stringify(tasks));
};

// Функция создания шаблонной строки для задачи

const renderTaskTemplate = (task) => {
  return `
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
};

// Функция создания самой задачи

const createTask = (task) => {
  const taskTemplate = renderTaskTemplate(task);
  tasksListNode.insertAdjacentHTML("afterbegin", taskTemplate);
};

// Функция загрузки задач из локального хранилища

const loadStoragedTasks = () => {
  if (storagedTasks) {
    tasks = storagedTasks;
    tasks.forEach(createTask);
  }
};

loadStoragedTasks();

// Функция проверки на такую же задачу

// const isSameTaskExist = (name) => {
//   for (let i = 0; i < tasks.length; i++) {
//     if (tasks[i].name.toLowerCase() === name.toLowerCase()) {
//       return true;
//     }
//   }
//   return false;
// };

// const isSameTaskExist = (name) => {
//   const hasTheSameTask = tasks.some((task) => {
//     return task.name.toLowerCase() === name.toLowerCase();
//   });
//   return hasTheSameTask;
// };

const checkForTheSameTaskExist = (name) => {
  return tasks.some((task) => task.name.toLowerCase() === name.toLowerCase());
};

//  Функция создания списка задач и сохранения в локальное хранилище

const createTasksList = () => {
  const name = taskNameInputNode.value;

  if (!name) return;

  const task = { name, checked: false };

  if (checkForTheSameTaskExist(name)) {
    alert("Такой фильм уже есть!");
  }

  tasks.push(task);
  createTask(task);

  clearInput();
  saveToLocalStorage();
};

// Функция поиска индекса задачи в массиве

const getTaskIndex = (taskElement) => {
  return (
    tasks.length - Array.from(tasksListNode.children).indexOf(taskElement) - 1
  );
};

// Функция переключения чекбоксов и смены стилей тела задачи

const toggleCheckboxes = (event) => {
  if (event.target.classList.contains("task__checkbox")) {
    const taskElement = event.target.closest(".task");
    const taskIndex = getTaskIndex(taskElement);
    tasks[taskIndex].checked = event.target.checked;

    taskElement
      .querySelector(".task__name")
      .classList.toggle("task__name_checked");
    taskElement
      .querySelector(".del-btn__line")
      .classList.toggle("del-btn__line_checked");
    taskElement.classList.toggle("task_checked");
    saveToLocalStorage();
  }
};

// Функция удаления задачи

const deleteTask = (event) => {
  if (
    event.target.classList.contains("task__del-btn") ||
    event.target.classList.contains("del-btn__line")
  ) {
    const taskElement = event.target.closest(".task");
    const taskIndex = getTaskIndex(taskElement);
    tasks.splice(taskIndex, 1);
    taskElement.remove();
  }
  saveToLocalStorage();
};

// Обработчики событий

taskNameInputNode.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createTasksList();
  }
});

addTaskButtonNode.addEventListener("click", createTasksList);

tasksListNode.addEventListener("click", toggleCheckboxes);

tasksListNode.addEventListener("click", deleteTask);
