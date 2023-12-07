"use strict";

const row = document.querySelector(".row");
const btnLogout = document.getElementById("btn-logout");
const loginModal = document.getElementById("login-modal");
const welcomeMessage = document.getElementById("welcome-message");
const loginRegister = document.getElementById("login-register");
const mainContent = document.getElementById("main-content");

// Doc du lieu userArr tu localStorage
const userArr = JSON.parse(localStorage.getItem("userArr_ls")) ?? [];

// Doc du lieu currentUser tu localStorage
let currentUser = JSON.parse(localStorage.getItem("currentUserArr_ls"));
if (currentUser === null) {
  mainContent.classList.add("hidden");
}
// Ghi loi chao welcome khi login thanh cong
if (currentUser !== null) {
  // Hidden yêu cầu login & register
  loginRegister.classList.add("hidden");
  row.classList.add("hidden");
  // Display welcome
  welcomeMessage.innerText = `Welcome ${currentUser?.firstName}`;
  //  su kien Logout
  btnLogout.addEventListener("click", function () {
    //delete currentUser
    currentUser = "";
    localStorage.removeItem("currentUserArr_ls");
    //chuyen giao dien sang trang login
    window.location.href = "./pages/login.html";
  });
}
