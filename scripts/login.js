"use strict";

const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

let currentUser = [];
// Doc du lieu userArr tu localStorage
const userArr = JSON.parse(localStorage.getItem("userArr_ls")) ?? [];

// Su kien Login
btnSubmit.addEventListener("click", function (e) {
  let us = false,
    pw = false;
  // Kiem tra da co nhap data chua
  if (inputUsername.value !== "") {
    us = true;
    inputPassword.value !== "" ? (pw = true) : alert("Enter password!");
  } else {
    alert("Enter User Name!");
  }
  // Truong hop da nhap thi kiem tra voi du lieu User da co
  if (us && pw) {
    // Tim ten user name
    currentUser = userArr.find((user) => user.userName === inputUsername.value);
    // Kiểm tra user name
    if (currentUser == null) {
      alert(
        `We don't have a registered user with that ${inputUsername.value} address.`
      );
    } else {
      // Kiem tra password neu dung user name
      if (currentUser.passWord === inputPassword.value) {
        //Luu currentUser xuong
        saveCurrentUserDataToStorage();
        //Hien thi giao dien sang trang Home
        window.location.href = "../index.html";
      } else {
        // Bao loi khi data ko dung
        alert(
          `The password entered doesn't match the one on file for that ${inputUsername.value} address.`
        );
      }
    }
  }
});
