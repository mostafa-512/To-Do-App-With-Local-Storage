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
            addTaskToUI(task.taskName, task.id);
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

    if (tasks.length >= 7) {
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
    };

    tasks.push(taskValue);
    tasksobj.push(task);

    setInLocal();
    addTaskToUI(taskValue, task.id);
    inputField.value = '';
}

// Function to add task to the UI
function addTaskToUI(taskValue, id) {
    let li = document.createElement("li");
    li.innerHTML = taskValue;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    li.setAttribute("data-id", id);
    taskSpace.appendChild(li);
}

// Event listener to handle task checking and deletion
taskSpace.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    if (e.target.tagName === "SPAN") {
        let taskToDelete = e.target.parentElement.innerText.slice(0, -1); 
        console.log("Task deleted: ", taskToDelete);
        tasks = tasks.filter(task => task !== taskToDelete); 
        e.target.parentElement.remove(); 
        console.log("Task deleted: ", taskToDelete);
        console.log("Remaining tasks: ", tasks);

    }

    if (e.target.tagName === "SPAN") {
        let taskToDelete = e.target.parentElement.innerText.slice(0, -1); // Remove the task text
        let taskIdToDelete = e.target.parentElement.getAttribute("data-id");

        // Remove from tasks and tasksobj
        tasksobj = tasksobj.filter(task => task.id != taskIdToDelete);

        setInLocal(); // Update local storage

        e.target.parentElement.remove();
        console.log("Task deleted: ", taskToDelete);
        console.log("Remaining tasks: ", tasks);
    }
});
