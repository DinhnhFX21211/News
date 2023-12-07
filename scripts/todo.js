"use strict";

const todoContainer = document.getElementById("todo-container");
const inputTask = document.getElementById("input-task");
const todoList = document.getElementById("todo-list");
const btnAdd = document.getElementById("btn-add");
const close = document.querySelector("close");

// Doc du lieu userArr tu localStorage
const todoArr = JSON.parse(localStorage.getItem("todoArr_ls")) ?? [];
let todoArr_user = [];
let currentUser = JSON.parse(localStorage.getItem("currentUserArr_ls"));

// Render du lieu todoArr
const renderTODOLIST = function (arr) {
  todoList.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const type = arr[i].isDone ? 'class="checked"' : "";
    const row = `
            <li ${type} id="${arr[i].taskId}">
              ${arr[i].task}<span class="close" id="${arr[i].taskId}">×</span>
            </li>
            `;
    todoList.insertAdjacentHTML("beforeend", row);
  }
};

todoArr.forEach((user, i) => {
  user.taskId = i;
});
// Tao mang chua todo data cua currentUser
if (currentUser !== null) {
  todoArr_user = todoArr.filter((user) => user.owner === currentUser.userName);
}
// render todo List
renderTODOLIST(todoArr_user);

// Xoa du lieu task trong todoListArr
function deleteTask(taskNum) {
  if (confirm(`Delete task : ${todoArr[taskNum].task}. Are you sure?`)) {
    todoArr.splice(taskNum, 1);
  }
  // render todo List va luu vao localStorage
  window.location.reload();
  renderTODOLIST(todoArr_user);
  saveTodoDataToStorage();
}
// Su kien thay doi todo List
todoList.addEventListener("click", function (e) {
  if (e.target.outerHTML.includes("li", "span")) {
    // Thay doi trang thai isDone
    todoArr[e.target.id].isDone = !todoArr[e.target.id].isDone;
    renderTODOLIST(todoArr_user);
    saveTodoDataToStorage();
  } else {
    // delete task
    deleteTask(e.target.id);
  }
});

// Su kien add todo
btnAdd.addEventListener("click", function () {
  if (currentUser !== null) {
    // lay data tu man hinh
    const task_new = new Task(inputTask.value, currentUser.userName, false);
    // add vao mang data todolist
    todoArr.push(task_new);
    // render todo List va luu vao localStorage
    saveTodoDataToStorage();
    window.location.reload();
    renderTODOLIST(todoArr_user);
  } else {
    alert(`login required to add Todo List`);
  }
});
