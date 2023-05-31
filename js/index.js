const taskNameInputNode = document.getElementById("taskNameInput"); // Инпут
const addTaskButtonNode = document.getElementById("addTaskButton"); // Кнопка Добавить

const taskNode = document.getElementById("task"); // Тело задачи
const checkboxNode = document.getElementById("checkbox"); // Чекбокс
const taskNameNode = document.getElementById("task__name"); // Название задачи
const tasksListNode = document.getElementById("manage__list"); // Контейнер для задач

const deleteTaskButtonNode = document.getElementById("task__del-btn"); // Кнопка удаления
const deleteTaskButtonLineNode = document.getElementById("del-btn__line"); // Линии в кнопке удаления, для смены стиля

let tasks = [];

const getTaskName = () => {
  taskName = taskNameInputNode.value;
  return taskName;
};

const clearInput = () => {
  taskNameInputNode.value = "";
};

const renderTasksList = () => {
  const taskName = getTaskName();
  tasks.push(taskName);
  const taskTemplate = `
  <div id="task" class="task">
    <label for="checkbox" class="checkbox-cover">
      <input type="checkbox" id="checkbox" class="task__checkbox"/>
    </label>
    <p id="task__name" class="task__name">${taskName}</p>
    <button id="task__del-btn" class="task__del-btn">
      <span id="del-btn__line" class="del-btn__line"></span>
    </button>
  </div>
`;
  tasksListNode.insertAdjacentHTML("afterbegin", taskTemplate);
  clearInput();
};

addTaskButtonNode.addEventListener("click", renderTasksList);

taskNameInputNode.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    renderTasksList();
  }
});

const toggleCheckboxes = () => {
  taskNameNode.classList.toggle("task__name_checked");
  deleteTaskButtonLineNode.classList.toggle("del-btn__line_checked");
  taskNode.classList.toggle("task_checked");
};

checkboxNode.addEventListener("click", toggleCheckboxes);

const deleteTask = () => {
  const taskElement = taskNode;
  const taskIndex =
    tasksListNode.children.length -
    Array.from(tasksListNode.children).indexOf(taskElement) -
    1;
  tasks.splice(taskIndex, 1);
  taskElement.remove();
};

deleteTaskButtonNode.addEventListener("click", deleteTask);
