const api = "3c312926c7f0c3adb4dbb54425ecff86";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");
const weatherList = document.querySelector(".list-of-weather");
const container = document.querySelector(".container");
const now = new Date();

const eightPM = new Date();
eightPM.setHours(20, 0, 0, 0);

searchBtn.addEventListener("click", () => {
  if (searchBar.value === "") {
    searchBar.value = "bharatpur";
  }
  const numberOfItem = document.querySelectorAll(".lists").length;
  if (numberOfItem == 4) {
    let lastElement = weatherList.lastElementChild;
    console.log(lastElement);
    lastElement.remove();
  }
  showWeather(searchBar.value);
});

window.onload = () => {
  if (now > eightPM) {
    container.classList.add("night-mode");
  } else {
    container.classList.add("day-mode");
  }
  showWeather("bharatpur");
};

async function showWeather(city) {
  let response = await fetch(`${apiURL}` + `&q=${city}&appid=${api}`);
  let data = await response.json();
  console.log(data);

  const newList = document.createElement("li");
  newList.classList.add("lists");

  const cityName = document.createElement("p");
  cityName.classList.add("city");
  cityName.innerText = data.name;
  if (now > eightPM) {
    cityName.style.color = "white";
  }
  newList.appendChild(cityName);

  const image = document.createElement("img");
  let src;
  image.classList.add("weather-image");
  const weatherType = data.weather[0].main;
  if (weatherType == "Clear") {
    src = "weatherphotos/sun.png";
  } else if (weatherType == "Rain") {
    src = "weatherphotos/rain.png";
  } else if (weatherType == "Haze") {
    src = "weatherphotos/haze.png";
  } else if (weatherType == "Clouds") {
    src = "weatherphotos/cloudy.png";
  } else if (weatherType == "Mist") {
    src = "weatherphotos/foggy-day.png";
  }
  image.src = src;
  newList.appendChild(image);

  const temperature = document.createElement("p");
  temperature.classList.add("temperature");
  temperature.innerText = `${Math.round(data.main.temp)} \u00B0C`;
  if (now > eightPM) {
    temperature.style.color = "white";
  }
  newList.appendChild(temperature);

  const atmosphere = document.createElement("p");
  atmosphere.classList.add("atmosphere");
  atmosphere.innerText = `Mostly ${data.weather[0].main}`;
  if (now > eightPM) {
    atmosphere.style.color = "white";
  }
  newList.appendChild(atmosphere);

  weatherList.insertBefore(newList, weatherList.firstChild);

  searchBar.value = "";
}
