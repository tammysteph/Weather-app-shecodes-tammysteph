function formatDate() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let minutes = now.getMinutes();
  let hours = now.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let formattedDate = `${day} ${hours}:${minutes}, ${month} ${now.getDate()}, ${now.getFullYear()}`;

  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = formattedDate;
}

formatDate();

////

function showSearchedCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#city-input");
  let showCity = document.querySelector("#current-city");
  showCity.innerHTML = searchedCity.value;
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showSearchedCity);

function getTemperature(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  currentTemperature.innerHTML = `${temperature}`;
  let currentWeather = document.querySelector("#current-weather");
  let searchedWeather = response.data.condition.description;
  currentWeather.innerHTML = searchedWeather;
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.temperature.humidity;
  humidity.innerHTML = currentHumidity;
  let windSpeed = document.querySelector("#wind-speed");
  let currentWind = response.data.wind.speed;
  windSpeed.innerHTML = currentWind;
}

let apiKey = "40650d4bb3o2af2ba3e724cb1t7e50cb";
let cityInput = document.querySelector("#city-input");

function executeTemp(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

cityForm.addEventListener("submit", executeTemp);
