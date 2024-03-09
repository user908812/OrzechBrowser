const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

var username = document.getElementById('username');
var password = document.getElementById('password');
var opinion = document.getElementById('opinion');

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});


let chosenColor = document.querySelector('.background-color');
let buttonsColor = document.querySelector('.buttons-color');
let searchButtonEl = document.querySelector('#search-button');
let guiColor = document.querySelector('.gui-color');

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});

window.addEventListener("load", () => {
  loadSavedColors();
});

function loadSavedColors() {
  const savedBackgroundColor = localStorage.getItem("backgroundColor");
  const savedButtonsColor = localStorage.getItem("buttonsColor");
  const savedGuiColor = localStorage.getItem("guiColor");

  if (savedBackgroundColor) {
      document.body.style.backgroundColor = savedBackgroundColor;
  } else {
      // If no saved color, set default
      setDefaultColor();
  }

  if (savedButtonsColor) {
      searchButtonEl.style.backgroundColor = savedButtonsColor;
      showMoreButtonEl.style.backgroundColor = savedButtonsColor;
  } else {
      setDefaultButtonsColor();
  }

  if (savedGuiColor) {
      searchInputEl.style.backgroundColor = savedGuiColor;
      document.querySelector('nav').style.backgroundColor = savedGuiColor;
  } else {
      setDefaultGuiColor();
  }
}

function setChosenColor() {
  const chosenColorValue = chosenColor.value;
  document.body.style.backgroundColor = chosenColorValue;
  localStorage.setItem("backgroundColor", chosenColorValue);
}
function setDefaultColor() {
  document.body.style.backgroundColor = '#36393e';
  localStorage.removeItem("backgroundColor");
}
function setButtonsColor() {
  const buttonsColorValue = buttonsColor.value;
  searchButtonEl.style.backgroundColor = buttonsColorValue;
  showMoreButtonEl.style.backgroundColor = buttonsColorValue;
  localStorage.setItem("buttonsColor", buttonsColorValue);
}
function setDefaultButtonsColor() {
  searchButtonEl.style.backgroundColor = '#7289da';
  showMoreButtonEl.style.backgroundColor = '#7289da';
  localStorage.removeItem("buttonsColor");
}

function setGuiColor() {
  const guiColorValue = guiColor.value;
  searchInputEl.style.backgroundColor = guiColorValue;
  document.querySelector('nav').style.backgroundColor = guiColorValue;
  localStorage.setItem("guiColor", guiColorValue);
}
function setDefaultGuiColor() {
  searchInputEl.style.backgroundColor = '#282b30';
  document.querySelector('nav').style.backgroundColor = '#282b30';
  localStorage.removeItem("guiColor");
}