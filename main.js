// Define App object
const app = {
  $taskInput: document.getElementById('task-input'),
  $addTaskButton: document.getElementById('add-task-button'),
  $taskList: document.getElementById('task-list'),
  tasks: []
}

// Apply AddNewTask Listener
app.$addTaskButton.addEventListener('click', () => addTaskToList(app));

// Add listener for Enter key on the input field
app.$taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTaskToList(app);
  }
});

// Load tasks when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
});

// Functionality
function createTask(title, isCompleted = false) {
  return {
    title,
    id: Date.now(),
    isCompleted,
  }
}

function createTaskElement(task) {
  const $taskItem = document.createElement('li');
  $taskItem.textContent = task.title;
  return $taskItem;
}

function addTaskToList(app) {
  // Get the input value
  const taskTitle = app.$taskInput.value.trim();

  // Check if the input is not empty
  if (taskTitle === '') {
    alert('Please enter a task!');
    return;
  }

  // Create a new task object
  const newTask = createTask(taskTitle);

  // Add the task to the tasks array
  app.tasks.push(newTask);

  // Save tasks to Local Storage
  saveTasksToLocalStorage(app.tasks);

  // Create a task element
  const $taskElement = createTaskElement(newTask);

  // Append the task element to the task list
  app.$taskList.appendChild($taskElement);

  // Clear the input field
  app.$taskInput.value = '';
}

// Function to save tasks to Local Storage
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from Local Storage on startup
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    app.tasks = JSON.parse(storedTasks);
    app.tasks.forEach(task => {
      const $taskElement = createTaskElement(task);
      app.$taskList.appendChild($taskElement);
    });
  }
}