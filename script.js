// Get references to elements
const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const completedTaskList = document.getElementById('completedTaskList');
const recycleBin = document.getElementById('recycleBin');
const deleteForeverButton = document.getElementById('deleteForever');

// Event listener for adding tasks
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        // Create a new task item
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <label class="task-label">
                <input type="checkbox" class="completeTask">
                <span class="checkmark"></span>
            </label>
            <button class="deleteTask">Delete</button>
        `;
        // Append the task item to the task list
        taskList.appendChild(taskItem);
        taskInput.value = ''; // Clear the input field
    }
});

// Updated code to handle "Complete" button clicks
taskList.addEventListener('click', (event) => {
    const taskItem = event.target.closest('li');
    if (event.target.classList.contains('completeTask')) {
        // Toggle task completion
        toggleComplete(taskItem);
    } else if (event.target.classList.contains('deleteTask')) {
        if (confirm('Are you sure you want to delete this task?')) {
            // Move the task to the recycle bin
            recycleBin.appendChild(taskItem);
            event.target.remove();
            removeCompleteButton(taskItem);
        }
    }
});

// Event listener for the recycle bin
recycleBin.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteTask')) {
        // Confirm and move the task back to the task list
        const confirmation = confirm('Are you sure you want to delete this task?');
        if (confirmation) {
            const taskItem = event.target.parentElement;
            const completeCheckbox = taskItem.querySelector('.completeTask');
            if (completeCheckbox.checked) {
                completeCheckbox.checked = false; // Uncheck the completed task
                taskItem.classList.remove('completed-task'); // Remove the completed-task class
                taskList.appendChild(taskItem); // Move back to the task list
            }
        }
    } else if (event.target.classList.contains('deleteForever')) {
        // Confirm and permanently delete tasks in the recycle bin
        if (confirm('Are you sure you want to delete this task forever?')) {
            event.target.parentElement.remove();
        }
    }
});

// Event listener for the "Delete Forever" button in the recycle bin
deleteForeverButton.addEventListener('click', () => {
    // Confirm and clear the recycle bin
    if (confirm('Are you sure you want to delete all tasks in the recycle bin forever?')) {
        recycleBin.innerHTML = '';
    }
});

// Function to remove the "Complete" button from a task item
function removeCompleteButton(taskItem) {
    const completeButton = taskItem.querySelector('.completeTask');
    if (completeButton) {
        completeButton.remove();
    }
}


// Function to toggle task completion
function toggleComplete(taskItem) {
    const completeCheckbox = taskItem.querySelector('.completeTask');
    if (completeCheckbox.checked) {
        // Mark as completed and move to the completed tasks list
        taskItem.classList.add('completed-task');
        completedTaskList.appendChild(taskItem);
    } else {
        // Mark as incomplete and move back to the task list
        taskItem.classList.remove('completed-task');
        taskList.appendChild(taskItem);
    }
}

// Event listener for clicking on the complete checkbox
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('completeTask')) {
        // Find the parent task item
        const taskItem = event.target.closest('li');
        if (taskItem) {
            toggleComplete(taskItem);
        }
    }
});

// Event listener for clicking on the complete checkbox in completed tasks
completedTaskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('completeTask')) {
        // Find the parent task item
        const taskItem = event.target.closest('li');
        if (taskItem) {
            toggleComplete(taskItem);
        }
    }
});


