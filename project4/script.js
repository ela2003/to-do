document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to local storage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('li');
            taskElement.className = `task ${task.completed ? 'completed' : ''}`;
            taskElement.innerHTML = `
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="complete">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            `;

            taskList.appendChild(taskElement);

            // Complete/Uncomplete task
            taskElement.querySelector('.complete').addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            // Edit task
            taskElement.querySelector('.edit').addEventListener('click', () => {
                const newText = prompt('Edit task:', task.text);
                if (newText !== null) {
                    task.text = newText;
                    saveTasks();
                    renderTasks();
                }
            });

            // Delete task
            taskElement.querySelector('.delete').addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
        });
    };

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    // Initial render
    renderTasks();
});
