"use strict";

const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
btnPrev.classList.add("hidden");
const settingArr = JSON.parse(localStorage.getItem("settingArr_ls")) ?? [];
let currentUser = JSON.parse(localStorage.getItem("currentUserArr_ls")) ?? [];
let page = 1,
  rows = 0,
  pagemax = 0;
const d = new Date();
// Doc data stCategory, so dong cua tin tuc tu localStorage
let stShowPage = 4;
let stCategory = "General";
if (currentUser !== null) {
  for (let i = 0; i < settingArr.length; i++)
    if (currentUser.userName === settingArr[i].owner) {
      stShowPage = settingArr[i].showPage;
      stCategory = settingArr[i].category;
    }
}
// render data tu API
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

// func news API
const news = async function (page, key) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?language=en&q=${stCategory}&apiKey=763828ae3c364aa2b0d4e75e34acc3d0`
    );

    if (!res.ok) throw new Error("Problem getting data from API");

    const data = await res.json();
    // tinh so trang max can de hien thi du lieu
    pagemax = Math.ceil(data.totalResults / stShowPage);
    renderNEWS(data, page);
    console.log(data);
  } catch (err) {
    console.error(`${err.message}`);
  }
};
// render trang 1
news(page, stCategory);

// su kien nut next
btnNext.addEventListener("click", function () {
  page++;
  pageNum.innerText = `${page}`;
  // Hien nut previous
  btnPrev.classList.remove("hidden");
  // An hien nut next (API show max 100)
  if (page === pagemax || page === Math.floor(100 / stShowPage) + 1) {
    btnNext.classList.add("hidden");
  }
  // chay ham render
  news(page, stCategory);
});

// Su kien nut previous
btnPrev.addEventListener("click", function () {
  page--;
  pageNum.innerText = `${page}`;
  // An nut previous
  if (page === 1) {
    btnPrev.classList.add("hidden");
  }
  // Hien nut next
  btnNext.classList.remove("hidden");
  // chay ham render
  news(page, stCategory);
});
