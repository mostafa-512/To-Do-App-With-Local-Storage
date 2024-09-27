function addTask() {
    let x = document.getElementById("input").value; 
    if (x === '') {
        alert("You Must Write Something !!");
    } else {
        let i = 1;
            let taskSpace = document.getElementById("taskSection");
            console.log("Task added: ", x);
            let li = document.createElement("li");
            li.innerHTML = x;
            taskSpace.appendChild(li);
            
        }
        
    
    }    
    

    