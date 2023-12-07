"use strict";
// Ham luu user data vao localStorage
function saveUserDataToStorage() {
  localStorage.setItem("userArr_ls", JSON.stringify(userArr));
}

// Ham luu CurrentUser data vao localStorage
function saveCurrentUserDataToStorage() {
  localStorage.setItem("currentUserArr_ls", JSON.stringify(currentUser));
}
// Ham luu Setting user vao localStorage
function saveSettingDataToStorage() {
  localStorage.setItem("settingArr_ls", JSON.stringify(settingArr));
}
// Ham luu todo list vao localStorage
function saveTodoDataToStorage() {
  localStorage.setItem("todoArr_ls", JSON.stringify(todoArr));
}
