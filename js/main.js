    let tasks = [];
    let inputField = document.getElementById("input");
    let taskSpace = document.getElementById("taskSection");
    
    
    function addTask() {
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

    
    let li = document.createElement("li");
    li.innerHTML = taskValue;
    taskSpace.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    addTaskToArray(taskValue)
    console.log("Task added: ", taskValue);
    console.log("Current tasks: ", tasks);
    
    inputField.value = '';
}


taskSpace.addEventListener("click",function(e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked")
    }
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
});


function addTaskToArray(tasktext) {
    let task = {
        id : Date.now(),
        taskName : tasktext,
        completed : false,
    };
    tasks.push(task);
    // return;
}