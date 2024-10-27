const api = "3c312926c7f0c3adb4dbb54425ecff86";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");
const weatherList = document.querySelector(".list-of-weather");
const recentWeatherList = document.querySelector(".recent-searched");
const container = document.querySelector(".container");
const boxContainer = document.querySelectorAll(".box-container");
const daysWeather = document.querySelector(".days-weather");
const now = new Date();

const eightPM = new Date();
eightPM.setHours(20, 0, 0, 0);

searchBtn.addEventListener("click", () => {
  if (searchBar.value === "") {
    searchBar.value = "bharatpur";
  }
  const numberOfItem = document.querySelectorAll(".lists").length;
  if (numberOfItem == 5) {
    let lastElement = weatherList.lastElementChild;
    console.log(lastElement);
    lastElement.remove();
  }
  showWeather(searchBar.value);
});

window.onload = () => {
  if (now > eightPM) {
    container.classList.add("night-mode");
    boxContainer.forEach((box) => {
      box.classList.add("dark-mode");
    });
  } else {
    container.classList.add("day-mode");
    daysWeather.classList.add("light-mode");
    boxContainer.forEach((box) => {
      box.classList.add("light-mode");
    });
  }
  showWeather("bharatpur");
};

async function showWeather(city) {
  let src;
  let response = await fetch(`${apiURL}` + `&q=${city}&appid=${api}`);
  let data = await response.json();
  console.log(data);

  document.querySelector(".recent-city").innerText = data.name;
  let recentImage = document.querySelector(".recent-image");
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
  } else if (weatherType == "Smoke") {
    src = "weatherphotos/Clouds.png";
  } else if (weatherType == "Drizzle") {
    src = "weatherphotos/drizzle.png";
  } else if (weatherType == "Fog") {
    src = "weatherphotos/fog.png";
  }
  recentImage.src = src;
  document.querySelector(".recent-temperature").innerText = `${Math.round(
    data.main.temp
  )} \u00B0C`;
  document.querySelector(
    ".recent-atmosphere"
  ).innerText = `Mostly ${data.weather[0].main}`;

  searchBar.value = "";

  let prevCity = data.name;
  let prevImageSrc = src;
  let prevTemperature = `${Math.round(data.main.temp)} \u00B0C`;
  let prevAtmosphere = data.weather[0].main;

  const newList = document.createElement("li");
  newList.classList.add("lists");

  const cityName = document.createElement("p");
  cityName.classList.add("city");
  cityName.innerText = prevCity;
  if (now > eightPM) {
    cityName.style.color = "white";
  }
  newList.appendChild(cityName);

  const image = document.createElement("img");
  image.classList.add("weather-image");
  image.src = prevImageSrc;
  if (now > eightPM) {
    image.style.color = "white";
  }
  newList.appendChild(image);

  const temperature = document.createElement("p");
  temperature.classList.add("temperature");
  temperature.innerText = prevTemperature;
  if (now > eightPM) {
    temperature.style.color = "white";
  }
  newList.appendChild(temperature);

  const atmosphere = document.createElement("p");
  atmosphere.classList.add("atmosphere");
  atmosphere.innerText = `Mostly ${prevAtmosphere}`;
  if (now > eightPM) {
    atmosphere.style.color = "white";
  }
  newList.appendChild(atmosphere);

  weatherList.insertBefore(newList, weatherList.firstChild);

  document.querySelector(".min-temperature").innerText = Math.round(
    data.main.temp_min
  );
  document.querySelector(".max-temperature").innerText = Math.round(
    data.main.temp_max
  );

  document.querySelector(
    ".humidity-percentage"
  ).innerText = `${data.main.humidity} %`;

  document.querySelector(".wind-percentage").innerText = `${Math.round(
    data.wind.speed
  )} KM/H`;

  document.querySelector(".wind-degree").innerText = `The Gusts speed is ${
    data.wind.gust === undefined ? 0 : Math.round(data.wind.gust)
  } KM/H`;

  document.querySelector(
    ".pressure-percentage"
  ).innerText = `${data.main.pressure} hPa`;

  document.querySelector(
    ".pressure-degree"
  ).innerText = `The pressure is ${data.main.pressure} hPa`;
}

weatherList.addEventListener("click", (event) => {
  const listItem = event.target.closest("li.lists");
  if (listItem) {
    const cityNameElement = listItem.querySelector(".city");
    if (cityNameElement) {
      const clickedCity = cityNameElement.innerText;
      const numberOfItem = document.querySelectorAll(".lists").length;
      if (numberOfItem == 5) {
        let lastElement = weatherList.lastElementChild;
        console.log(lastElement);
        lastElement.remove();
      }
      showWeather(clickedCity);
    }
  }
});
