"use strict";

const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const btnSubmit = document.getElementById("btn-submit");
const inputQuery = document.getElementById("input-query");
btnPrev.classList.add("hidden");
const navPage = document.getElementById("nav-page-num");
navPage.classList.add("hidden");
const settingArr = JSON.parse(localStorage.getItem("settingArr_ls")) ?? [];
let currentUser = JSON.parse(localStorage.getItem("currentUserArr_ls")) ?? [];
let page = 1,
  rows = 0,
  pagemax = 0;
let stShowPage = 4;
let stCategory = "General";
if (currentUser !== null) {
  for (let i = 0; i < settingArr.length; i++)
    if (currentUser.userName === settingArr[i].owner) {
      stShowPage = settingArr[i].showPage;
      stCategory = settingArr[i].category;
    }
}
// Doc data category, so dong cua tin tuc tu localStorage

const renderNEWS = function (data, page) {
  let bd = stShowPage * (page - 1);
  let kt = stShowPage * page;

  //Hien so new 1 page theo setting/ mac dinh = 4
  newsContainer.innerHTML = "";
  for (let i = bd; i < kt; i++) {
    const html = `
          <div class="news-block">
              <div class="TechCrunch__img">
                  <img src="${data.articles[i].urlToImage}" />
              </div>
              <div class="info">
                  <h5 class="title">${data.articles[i].title}</h5>
                  <h6 class="author">${data.articles[i].author}</h6>
                  <p class="content">${data.articles[i].content}</p>
                  <button type="button" class="btn btn-primary">View</button>
              </div>
          </div>
        `;
    newsContainer.insertAdjacentHTML("beforeend", html);
  }
};
const search = async function (page, key) {
  try {
    //search data
    const res = await fetch(
      `https://newsapi.org/v2/everything?language=en&q="${key}","${stCategory}"&apiKey=763828ae3c364aa2b0d4e75e34acc3d0`
    );
    if (!res.ok) throw new Error("Problem getting data from API");
    const data = await res.json();
    // tinh so trang max can de hien thi du lieu tai ve
    pagemax = Math.ceil(data.totalResults / stShowPage);
    renderNEWS(data, page);
    console.log(data);
    console.log(data.totalResults);
  } catch (err) {
    console.error(`${err.message}`);
  }
  if (pagemax === 0) {
    btnPrev.classList.add("hidden");
    btnNext.classList.add("hidden");
    alert(`Category: ${stCategory} not found: ${inputQuery.value}
    please change Search content or category in Settings to find`);
  }
};
let searchContent = "";
console.log(stCategory);
// su kien nut search
btnSubmit.addEventListener("click", function () {
  // kiểm tra data search
  if (inputQuery.value === "") {
    alert("Please input search conten");
  } else {
    searchContent = inputQuery.value;
    // quay lại page 1 khi thực hiện search lần 2
    page = 1;
    pageNum.innerText = `${page}`;
    btnPrev.classList.add("hidden");
    btnNext.classList.remove("hidden");
    navPage.classList.remove("hidden");
    //render trang 1
    search(page, searchContent);
  }
});
// Su kien nut Next
btnNext.addEventListener("click", function () {
  // Hien searchContent
  inputQuery.value = searchContent;
  page++;
  pageNum.innerText = `${page}`;
  // Hien nut previous
  btnPrev.classList.remove("hidden");
  // An hien nut next (API show max 100)
  if (page === pagemax || page === Math.floor(100 / stShowPage) + 1) {
    btnNext.classList.add("hidden");
  }
  // chay ham render
  search(page, searchContent);
});
// Su kien nut previous
btnPrev.addEventListener("click", function () {
  // Hien searchContent
  inputQuery.value = searchContent;
  page--;
  pageNum.innerText = `${page}`;
  // An nut previous
  if (page === 1) {
    btnPrev.classList.add("hidden");
  }
  // Hien nut next
  btnNext.classList.remove("hidden");
  // chay ham render
  search(page, searchContent);
});
