document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    const addBtn = document.getElementById("addBtn");
    
    function addTask() {
        if (inputBox.value === ""){
            alert("Please enter a task!");
        } else {
            let li = document.createElement("li");
            li.innerHTML = inputBox.value;
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML = "\u00d7"; // Unicode for multiplication sign (×)
            li.appendChild(span);
        }
        inputBox.value = ""; // Clear the input box after adding the task
        saveTasks(); // Save tasks to local storage
    }
    
    addBtn.addEventListener("click", addTask);
    inputBox.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        addTask();
      }
    });
    
    
    listContainer.addEventListener("click", (e) =>{
       if(e.target.tagName === "LI") {
           e.target.classList.toggle("checked");
           saveTasks();
       } else if (e.target.tagName === "SPAN") {
           e.target.parentElement.remove();
           saveTasks();
       }
    }, false);



    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        listContainer.querySelectorAll("li").forEach((li) => {
            tasks.push({
                text: li.firstChild.textContent, // Task text
                checked: li.classList.contains("checked"), // Whether the task is checked
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save as JSON string
    }

    
    // Load tasks from local storage and display them
    function showTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []; // Parse JSON or use an empty array
        savedTasks.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task.text;
            if (task.checked) li.classList.add("checked");
    
            const span = document.createElement("span");
            span.innerHTML = "\u00d7"; // Unicode for multiplication sign (×)
            li.appendChild(span);
    
            listContainer.appendChild(li);
        });
    }

    showTasks(); 

 });


