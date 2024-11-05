document.addEventListener('DOMContentLoaded', function() {
  fetchTasks();
});

function fetchTasks() {
  fetch('get_tasks.php')
    .then(response => response.json())
    .then(data => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
      data.forEach(task => {
        const newTask = document.createElement('li');
        newTask.classList.add('task-item');
        newTask.innerHTML = `${task.task} - Due: ${task.due_date} <span class="close" onclick="removeTask(${task.id})">×</span>`;
        taskList.appendChild(newTask);
      });
    });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const dueDateInput = document.getElementById('dueDate');
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (taskText !== '' && dueDate !== '') {
    fetch('add_task.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `task=${encodeURIComponent(taskText)}&due_date=${dueDate}`
    })
    .then(response => response.text())
    .then(() => {
      fetchTasks();
      taskInput.value = '';
      dueDateInput.value = '';
    });
  }
}

function removeTask(id) {
  fetch('delete_task.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `id=${id}`
  })
  .then(response => response.text())
  .then(() => {
    fetchTasks();
  });
}
