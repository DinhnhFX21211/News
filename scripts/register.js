"use strict";

const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordconfirm = document.getElementById("input-password-confirm");

const btnSubmit = document.getElementById("btn-submit");
// Doc du lieu userArr tu localStorage
const userArr = JSON.parse(localStorage.getItem("userArr_ls")) ?? [];
saveUserDataToStorage();
const settingArr = JSON.parse(localStorage.getItem("settingArr_ls")) ?? [];
saveSettingDataToStorage();
// su kien nut Register
btnSubmit.addEventListener("click", function (e) {
  // Du lieu nhap tu man hinh
  const dataEnter = {
    firstName: inputFirstname.value,
    lastName: inputLastname.value,
    userName: inputUsername.value,
    password: inputPassword.value,
    passwordconfirm: inputPasswordconfirm.value,
  };
  const stData = {
    showPage: 4,
    category: "General",
    owner: inputUsername.value,
  };

  let validate = false;
  // Tao 1 mang chua username
  const userNameArr = userArr.map((u) => u.userName);
  if (dataEnter.firstName !== "") {
    if (dataEnter.lastName !== "") {
      if (inputUsername.value === "") {
        alert("Please input user Name.");
      } else if (userNameArr.includes(dataEnter.userName)) {
        alert("User name already exist. Please input another user Name.");
      } else {
        if (dataEnter.password.length <= 8) {
          alert("Please input password more than 8 character");
        } else if (dataEnter.password !== dataEnter.passwordconfirm) {
          alert("Password & Confirm password must be similar");
        } else {
          validate = true;
        }
      }
    } else {
      alert("Please input Last Name");
    }
  } else {
    alert("Please input First Name");
  }
  console.log(inputUsername.value === "");
  // Khi thoa tat ca dieu kien
  if (validate) {
    const user = new User(
      dataEnter.firstName,
      dataEnter.lastName,
      dataEnter.userName,
      dataEnter.password
    );
    const setting = new Setting(stData.showPage, stData.category, stData.owner);
    // add vao data setting
    settingArr.push(setting);
    // add vao data user
    userArr.push(user);

    saveSettingDataToStorage();
    saveUserDataToStorage();
    // chuyen giao dien sang trang login
    window.location.href = "./login.html";
  }
});
