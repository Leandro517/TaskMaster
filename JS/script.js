// script.js

const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filters button');

let tasks = loadTasks(); // Carrega as tarefas do localStorage

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const text = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (text !== '') {
    tasks.push({ text, priority, done: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
});

function renderTasks(filter = 'todas') {
  taskList.innerHTML = '';

  const filtered = tasks.filter(task => {
    if (filter === 'todas') return true;
    if (filter === 'pendentes') return !task.done;
    if (filter === 'concluidas') return task.done;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;

    li.classList.add(task.priority);
    if (task.done) li.classList.add('done');

    li.addEventListener('click', () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks(filter);
    });

    taskList.appendChild(li);
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    renderTasks(filter);
  });
});

function saveTasks() {
  localStorage.setItem('taskmaster-tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem('taskmaster-tasks');
  return stored ? JSON.parse(stored) : [];
}

renderTasks();
