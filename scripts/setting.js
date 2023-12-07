"use strict";

const inputstCategory = document.getElementById("input-category");
const inputPageSize = document.getElementById("input-page-size");

const btnSubmit = document.getElementById("btn-submit");
const settingArr = JSON.parse(localStorage.getItem("settingArr_ls"));
let currentUser = JSON.parse(localStorage.getItem("currentUserArr_ls"));

// Su kien nut Setting
btnSubmit.addEventListener("click", function () {
  console.log(settingArr);
  if (currentUser !== null) {
    const stData = {
      showPage: parseInt(inputPageSize.value),
      category: inputstCategory.value,
      owner: currentUser.userName,
    };
    if (
      !isNaN(parseInt(inputPageSize.value)) &&
      0 < parseInt(inputPageSize.value) &&
      parseInt(inputPageSize.value) <= 10
    ) {
      const setting = new Setting(
        stData.showPage,
        stData.category,
        stData.owner
      );
      for (let i = 0; i < settingArr.length; i++)
        if (stData.owner === settingArr[i].owner) {
          settingArr.splice(i, 1);
        }
      // add vao mang data setting
      settingArr.push(setting);
      // refresh giao dien va luu xuong localStorage
      saveSettingDataToStorage();
      alert(`Settings:
    News per page: ${stData.showPage}
    News category: ${stData.category}
is OK`);
      console.log(settingArr);
    } else {
      alert("News per page must be between 1 and 10!");
    }
  } else {
    alert(`login required to change settings`);
  }
});
function saveSettingDataToStorage() {
  localStorage.setItem("settingArr_ls", JSON.stringify(settingArr));
}
