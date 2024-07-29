let tasks = [];
let arrayFromStroage = JSON.parse(localStorage.getItem("task"));

let toDoInput = document.getElementById("todo-input");

toDoInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addToList();
  }
});

function addToList(){
    let toDoList = document.getElementById("todo-list-content");
    let toDoInput = document.getElementById("todo-input");
    let toDoInputText = document.getElementById("todo-input").value;
    if(toDoInputText.trim() == ''){
        alert("Enter Your Task!")
        return
    } else {
        for(let i = 0; i < tasks.length; i++ ){
            if(tasks[i].text == toDoInputText){
                alert("you have already entered this task!");
                return
            }
        }
        let taskObj = {text: toDoInputText, completed: false}
        tasks.push(taskObj)
        saveItem(tasks)
        let listDiv = document.createElement('div');
        listDiv.className = "list-container";

        let li = document.createElement("li");
        li.textContent = toDoInputText;
        li.setAttribute('onclick', 'taskCompleted(this)');

        let img = document.createElement("img");
        img.className = "trash-icon"
        img.src = "./assets/delete.png";

        let deleteBtn = document.createElement("button");
        deleteBtn.appendChild(img);
        deleteBtn.className = "task-delete-btn"
        deleteBtn.setAttribute('onclick', 'deleteTask(this)');

        listDiv.appendChild(li);
        listDiv.appendChild(deleteBtn)
        toDoList.appendChild(listDiv);
        toDoInput.value = "";
    }
}

function saveItem(tasks){
    localStorage.setItem("task", JSON.stringify(tasks))
}

function deleteTask(button){
    let li = button.parentElement;
    for(let i = 0; i< tasks.length ;i++){
        if(tasks[i].text == li.textContent){
            tasks[i].text = "";
            localStorage.setItem('task', JSON.stringify(tasks))
            li.remove();
            return
        }
    }
}

function taskCompleted(list){
    let arrayFromStroage = JSON.parse(localStorage.getItem("task"));
    for(let i = 0; i<arrayFromStroage.length;i++){
        if(arrayFromStroage[i].text == list.textContent){
            if(arrayFromStroage[i].completed == true){
                arrayFromStroage[i].completed = false;
            } else {
                arrayFromStroage[i].completed = true;
            }
            localStorage.setItem('task', JSON.stringify(arrayFromStroage))
            list.classList.toggle("completed");
            return
        }
    }ṇṇ
}

function loadItems(){
    let arrayFromStroage = JSON.parse(localStorage.getItem("task"));
    let arrayLength = arrayFromStroage.length;
    
    for(let i=0; i < arrayLength; i++){
        if(arrayFromStroage[i].text !== ""){
            let taskObj = {text: arrayFromStroage[i].text, completed: arrayFromStroage[i].completed}
            tasks.push(taskObj)
            saveItem(tasks)

            let toDoList = document.getElementById("todo-list-content");
            let listDiv = document.createElement('div');
            listDiv.className = "list-container";
            
            let li = document.createElement("li");
            li.textContent = arrayFromStroage[i].text;
            if(arrayFromStroage[i].completed){
                li.className = "completed";
            } else {
                li.className = "none";
            }
            li.setAttribute('onclick', 'taskCompleted(this)');
            
            let img = document.createElement("img");
            img.className = "trash-icon"
            img.src = "./assets/delete.png";
            
            let deleteBtn = document.createElement("button");
            deleteBtn.appendChild(img);
            deleteBtn.className = "task-delete-btn"
            deleteBtn.setAttribute('onclick', 'deleteTask(this)');
            
            listDiv.appendChild(li);
            listDiv.appendChild(deleteBtn)
            toDoList.appendChild(listDiv);
        }
    }
}