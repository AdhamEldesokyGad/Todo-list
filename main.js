
let myInput = document.querySelector(".task");
let themeBtm = document.querySelector("#black-mood");
let myUl = document.getElementById("todo-list");

let btnAll = document.getElementById("btn-all");
let btnActive = document.getElementById("btn-active");
let btnCompleted = document.getElementById("btn-completed");
let btnClear = document.getElementById("btn-clear"); 
let myArray = [];
let itemsLeftSpan = document.getElementById("left-items");


function updateActiveCount() {
  let allTasksCount = document.querySelectorAll(".task-item").length;
  let completedTasksCount = document.querySelectorAll(".task-item.completed").length;
  let activeCount = allTasksCount - completedTasksCount;
  itemsLeftSpan.textContent = `${activeCount} items left`;
}


myInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter" && myInput.value.trim() !== "") {
    let currentTaskText = myInput.value;
    let myNewTask = document.createElement("li");
    myNewTask.classList.add("task-item");
    myNewTask.innerHTML = `<span class="circle"></span> <span class="task-text">${myInput.value}</span>     
    <span class="icon-cross"><img src="images/icon-cross.svg" alt="icon-cross"></span>`;
    
    let deleteBtn = myNewTask.querySelector(".icon-cross");


    deleteBtn.addEventListener("click", function () {
      myNewTask.remove();
      let taskIndex = myArray.indexOf(currentTaskText);
      if (taskIndex !== -1) {
        myArray.splice(taskIndex, 1);
        window.localStorage.setItem("Tasks", JSON.stringify(myArray));
      }
      updateActiveCount();
    });

    // اكتمال مهمة جديدة
    myNewTask.addEventListener("click", function () {
      myNewTask.classList.toggle("completed");
      updateActiveCount(); 
    });

    myUl.append(myNewTask);
    myArray.push(myInput.value);
    window.localStorage.setItem("Tasks", JSON.stringify(myArray));
    myInput.value = "";
    
    updateActiveCount(); 
  }
});


if (window.localStorage.getItem("Tasks")) {
  myArray = JSON.parse(window.localStorage.getItem("Tasks"));
}

myArray.forEach(function (taskText) {
  let myNewTask = document.createElement("li");
  myNewTask.classList.add("task-item");
  myNewTask.innerHTML = `
    <span class="circle"></span>
    <span class="task-text">${taskText}</span>
    <span class="icon-cross"><img src="images/icon-cross.svg" alt="icon-cross"></span>
  `;

  let deleteBtn = myNewTask.querySelector(".icon-cross");

  deleteBtn.addEventListener("click", function () {
    myNewTask.remove(); 
    let taskIndex = myArray.indexOf(taskText); 
    if (taskIndex !== -1) {
      myArray.splice(taskIndex, 1); 
      window.localStorage.setItem("Tasks", JSON.stringify(myArray));
    }
    updateActiveCount(); 
  });


  myNewTask.addEventListener("click", function () {
    myNewTask.classList.toggle("completed");
    updateActiveCount(); 
  });

  myUl.append(myNewTask);
}); 


btnAll.addEventListener("click", function() {
  let allTasks = document.querySelectorAll(".task-item");
  allTasks.forEach(function(task) {
    task.style.display = "flex"; 
  });
});

btnActive.addEventListener("click", function() {
  let allTasks = document.querySelectorAll(".task-item");
  allTasks.forEach(function(task) {
    if (task.classList.contains("completed")) {
      task.style.display = "none"; 
    } else {
      task.style.display = "flex"; 
    }
  });
});

btnCompleted.addEventListener("click", function() {
  let allTasks = document.querySelectorAll(".task-item");
  allTasks.forEach(function(task) {
    if (task.classList.contains("completed")) {
      task.style.display = "flex"; 
    } else {
      task.style.display = "none"; 
    }
  });
});

btnClear.addEventListener("click", function () {
  myUl.innerHTML = "";
  myArray = [];
  window.localStorage.removeItem("Tasks");
  updateActiveCount(); 
});

themeBtm.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    window.localStorage.setItem("Theme", "Dark");
    themeBtm.src = "images/icon-sun.svg";
  } else {
    window.localStorage.setItem("Theme", "Light");
    themeBtm.src = "images/icon-moon.svg";
  }
});

if (window.localStorage.getItem("Theme") === "Dark") {
  document.body.classList.add("dark-mode");
  themeBtm.src = "images/icon-sun.svg"; 
}

updateActiveCount(); 