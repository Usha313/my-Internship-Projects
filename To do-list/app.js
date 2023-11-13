document.addEventListener('DOMContentLoaded', function () {
    const taskBox = document.getElementById('task-list');

    // Check for saved tasks in local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    displayTasks(tasks);

    // Event listener for adding a new task
    document.getElementById('task-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a new task
    window.addTask = function () {
        const taskInput = document.getElementById('task-input');
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const tasks = getTasks();
            tasks.push({ text: taskText, completed: false });
            saveTasks(tasks);
            displayTasks(tasks);
            taskInput.value = '';
        }
    };

    // Function to toggle the status of a task (completed or uncompleted)
    window.toggleTaskStatus = function (index) {
        const tasks = getTasks();
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        displayTasks(tasks);
    };

    // Function to edit a task
    window.editTask = function (index) {
        const tasks = getTasks();
        const updatedTaskText = prompt('Edit task:', tasks[index].text);
        if (updatedTaskText !== null) {
            tasks[index].text = updatedTaskText.trim();
            saveTasks(tasks);
            displayTasks(tasks);
        }
    };

    // Function to delete a task
    window.deleteTask = function (index) {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        displayTasks(tasks);
    };

    // Function to retrieve tasks from local storage
    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Function to save tasks to local storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to display tasks on the web page
    function displayTasks(tasks) {
        taskBox.innerHTML = '';
        tasks.forEach((task, index) => {
            const card = document.createElement('div');
            card.classList.add('task-card');

            const cardContent = document.createElement('div');
            cardContent.classList.add('task-card-content');

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            if (task.completed) {
                taskText.classList.add('completed');
            }

            const icons = document.createElement('div');

            const editIcon = document.createElement('span');
            editIcon.classList.add('edit');
            editIcon.innerHTML = '<i class="fas fa-edit"></i>';
            editIcon.addEventListener('click', () => editTask(index));

            const selectIcon = document.createElement('span');
            selectIcon.classList.add('select');
            selectIcon.innerHTML = task.completed ? '<i class="fas fa-check-circle"></i>' : '<i class="far fa-circle"></i>';
            selectIcon.addEventListener('click', () => toggleTaskStatus(index));

            const deleteIcon = document.createElement('span');
            deleteIcon.classList.add('delete');
            deleteIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteIcon.addEventListener('click', () => deleteTask(index));

            icons.appendChild(editIcon);
            icons.appendChild(selectIcon);
            icons.appendChild(deleteIcon);

            cardContent.appendChild(taskText);
            cardContent.appendChild(icons);
            card.appendChild(cardContent);
            taskBox.appendChild(card);
        });
    }
});
