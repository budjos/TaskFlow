const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    addTaskToDOM(task.text, task.done);
  });
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({ text: li.textContent.trim(), done: li.classList.contains("done") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text !== "") {
    addTaskToDOM(text, false);
    saveTasks();
    taskInput.value = "";
  }
}

function addTaskToDOM(text, done) {
  const li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("done");

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  const removeBtn = document.createElement("span");
  removeBtn.textContent = "❌";
  removeBtn.style.cursor = "pointer";
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

window.onload = loadTasks;
