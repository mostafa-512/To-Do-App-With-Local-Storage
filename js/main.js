    let tasks = [];

function addTask() {
    let inputField = document.getElementById("input");
    let taskValue = inputField.value.trim(); //trim for remove any spaces
    
    if (taskValue === '') {
        alert("You Must Write Something !!");
        return;
    }
    
    if (tasks.length >= 7) {
        alert("Sorry, the maximum number of tasks is 7. Finish a One task at least before adding more.");
        return;
    }
    let notfind = tasks.indexOf(taskValue);    
    if (notfind != -1) {
        alert(`You Add This Task   [${taskValue}]  Before !!`)
        return;
    }

    let taskSpace = document.getElementById("taskSection");
    let li = document.createElement("li");
    li.innerHTML = taskValue;
    taskSpace.appendChild(li);
    
    tasks.push(taskValue);
    console.log("Task added: ", taskValue);
    console.log("Current tasks: ", tasks);
    
    inputField.value = '';
}