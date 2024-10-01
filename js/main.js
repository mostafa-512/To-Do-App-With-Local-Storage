let tasks = [];
let tasksobj = [];
let inputField = document.getElementById("input");
let taskSpace = document.getElementById("taskSection");

// Load tasks from local storage when the page loads
window.onload = function() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        tasksobj = savedTasks;
        tasksobj.forEach(task => {
            addTaskToUI(task.taskName, task.id, task.completed);
            tasks.push(task.taskName); // Maintain the tasks array
        });
    }
};

// Function to set tasks in local storage
function setInLocal() {
    localStorage.setItem("tasks", JSON.stringify(tasksobj));
}

// Function to add a task
function addTask() {
    let taskValue = inputField.value.trim();

    if (taskValue === '') {
        alert("You Must Write Something !!");
        return;
    }

    if (tasksobj.length >= 7) {
        alert("Sorry, the maximum number of tasks is 7. Finish a One task at least before adding more.");
        return;
    }

    if (tasks.indexOf(taskValue) !== -1) {
        alert(`You Add This Task   [${taskValue}]  Before !!`);
        return;
    }

    let task = {
        id: Date.now(),
        taskName: taskValue,
        completed: false // By default, the task is not completed
    };

    tasks.push(taskValue);
    tasksobj.push(task);

    setInLocal();
    addTaskToUI(taskValue, task.id, task.completed);
    inputField.value = '';
}

// Function to add task to the UI
function addTaskToUI(taskValue, id, completed = false) {
    let li = document.createElement("li");
    li.innerHTML = taskValue;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    if (completed) {
        li.classList.add("checked"); // Mark as completed if true
    }

    li.setAttribute("data-id", id);
    taskSpace.appendChild(li);
}

// Event listener to handle task checking and deletion
taskSpace.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        // Update the completed status in the tasksobj array
        let taskId = e.target.getAttribute("data-id");
        tasksobj = tasksobj.map(task => {
            if (task.id == taskId) {
                task.completed = !task.completed; // Toggle the completed status
            }
            return task;
        });

        setInLocal(); // Update local storage with the new completed status
    }

    if (e.target.tagName === "SPAN") {
        let taskToDelete = e.target.parentElement.innerText.slice(0, -1); // Remove the task text
        let taskIdToDelete = e.target.parentElement.getAttribute("data-id");

        // Remove from tasks and tasksobj
        tasks = tasks.filter(task => task !== taskToDelete);
        tasksobj = tasksobj.filter(task => task.id != taskIdToDelete);

        setInLocal(); // Update local storage

        e.target.parentElement.remove();
        console.log("Task deleted: ", taskToDelete);
        console.log("Remaining tasks: ", tasks);
    }
});

input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        addTask();
    }
  });


function clearAll() {

   let bool= confirm("Are You Sure ??! , You Can't Restore any Data After Clear");
if (bool) {
    localStorage.clear();
    tasks = [];
    taskSpace.innerHTML = "";
    tasksobj = [];
    
}else{
    return false;
}
};
