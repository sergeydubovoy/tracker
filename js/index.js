const filmNameInputNode = document.getElementById("filmNameInput"); // Инпут
const addFilmButtonNode = document.getElementById("addFilmButton"); // Кнопка Добавить

const filmNode = document.getElementById("film"); // Тело задачи
const checkboxNode = document.getElementById("checkbox"); // Чекбокс
const filmNameNode = document.getElementById("film__name"); // Название задачи
const filmsListNode = document.getElementById("manage__list"); // Контейнер для задач

const deleteFilmButtonNode = document.getElementById("film__del-btn"); // Кнопка удаления
const deleteFilmButtonLineNode = document.getElementById("del-btn__line"); // Линии в кнопке удаления, для смены стиля

const STORAGE_LABEL_TASKS = "Film"; // Пометка для сохранение в локальное хранилище
const storagedFilms = JSON.parse(localStorage.getItem(STORAGE_LABEL_TASKS)); // Методом parse извлекаем из JSON строки обратно в JS объект

let films = []; // Массив с задачами

// Функция получения названия задачи

const getFilmName = () => {
  filmName = filmNameInputNode.value.trim();
  return filmName;
};

// Функция очистки инпута

const clearInput = () => {
  filmNameInputNode.value = "";
};

// Функция сохранения в локальное хранилище

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_LABEL_TASKS, JSON.stringify(films));
};

// Функция создания шаблонной строки для задачи

const renderFilmTemplate = (film) => {
  return `
<div class="film ${film.checked ? "film_checked" : ""}">
  <label for="checkbox" class="checkbox-cover">
    <input type="checkbox" id="checkbox" class="film__checkbox" ${
      film.checked ? "checked" : ""
    }/>
  </label>
  <p class="film__name ${film.checked ? "film__name_checked" : ""}">${
    film.name
  }</p>
  <button class="film__del-btn">
    <span class="del-btn__line"></span>
  </button>
</div>
`;
};

// Функция создания самой задачи

const createFilm = (film) => {
  const filmTemplate = renderFilmTemplate(film);
  filmsListNode.insertAdjacentHTML("afterbegin", filmTemplate);
};

// Функция загрузки задач из локального хранилища

const loadStoragedFilms = () => {
  if (storagedFilms) {
    films = storagedFilms;
    films.forEach(createFilm);
  }
};

loadStoragedFilms();

// Функция проверки на такую же задачу

const checkForTheSameFilmExist = (name) => {
  return films.some((film) => film.name.toLowerCase() === name.toLowerCase());
};

// Функция проверки на длину названия

const checkForNameLength = (film) => {
  return film.name.length >= 150;
};

// Функция проверки на пробелы

const checkForSpaces = (film) => {
  return film.name.replace(/\s/g, "") === "";
};

// Функция создания списка задач и сохранения в локальное хранилище

const createFilmsList = () => {
  const name = filmNameInputNode.value;

  if (!name) return;

  const film = { name, checked: false };

  if (checkForTheSameFilmExist(name)) {
    alert("Такой фильм уже есть!");
    return;
  }

  if (checkForNameLength(film)) {
    alert("Название фильма должно быть меньше 150 символов!");
    return;
  }

  if (checkForSpaces(film)) {
    alert("Название фильма не должно состоять из пробелов!");
    clearInput();
    return;
  }

  films.push(film);
  createFilm(film);

  clearInput();
  saveToLocalStorage();
};

// Функция поиска индекса задачи в массиве

const getFilmIndex = (filmElement) => {
  return (
    films.length - Array.from(filmsListNode.children).indexOf(filmElement) - 1
  );
};

// Функция переключения чекбоксов и смены стилей тела задачи

const toggleCheckboxes = (event) => {
  if (event.target.classList.contains("film__checkbox")) {
    const filmElement = event.target.closest(".film");
    const filmIndex = getFilmIndex(filmElement);
    films[filmIndex].checked = event.target.checked;

    filmElement
      .querySelector(".film__name")
      .classList.toggle("film__name_checked");
    filmElement
      .querySelector(".del-btn__line")
      .classList.toggle("del-btn__line_checked");
    filmElement.classList.toggle("film_checked");
    saveToLocalStorage();
  }
};

// Функция удаления задачи

const deleteFilm = (event) => {
  if (
    event.target.classList.contains("film__del-btn") ||
    event.target.classList.contains("del-btn__line")
  ) {
    const filmElement = event.target.closest(".film");
    const filmIndex = getFilmIndex(filmElement);
    films.splice(filmIndex, 1);
    filmElement.remove();
  }
  saveToLocalStorage();
};

// Обработчики событий

filmNameInputNode.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createFilmsList();
  }
});

addFilmButtonNode.addEventListener("click", createFilmsList);

filmsListNode.addEventListener("click", toggleCheckboxes);

filmsListNode.addEventListener("click", deleteFilm);
