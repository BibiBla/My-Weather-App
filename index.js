let apiKey = "4190a6ee70227a6b15b76f600409fe74";

// Current date and time

function showTime(time) {
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
}

function showDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];
  return `${day}`;
}

let currentTime = new Date();
let displayTime = document.querySelector(".time");
displayTime.innerHTML = showTime(currentTime);
let currentDay = document.querySelector(".day");
currentDay.innerHTML = showDay(currentTime);

// Search engine
function showTemperature(response) {
  console.log(response);
  let temperatureDisplay = document.querySelector("#temperature");
  temperatureDisplay.innerHTML = Math.round(response.data.main.temp);
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  let windspeed = document.querySelector("#windspeed");
  windspeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let status = document.querySelector("#weather-description");
  status.innerHTML = response.data.weather[0].description;
}
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#current-City");
  let currentCity = document.querySelector("h2");
  currentCity.innerHTML = `${city.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

//Your location

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocalTemperature);
}

function showLocalTemperature(response) {
  console.log(response);
  console.log(temperature);
  let temperatureDisplay = document.querySelector("#temperature");
  temperatureDisplay.innerHTML = Math.round(response.data.main.temp);
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  let windspeed = document.querySelector("#windspeed");
  windspeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let status = document.querySelector("#weather-description");
  status.innerHTML = response.data.weather[0].description;
  let location = response.data.name;
  let pageTitle = document.querySelector("h2");
  pageTitle.innerHTML = `${location}`;
}

function showYourWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#your-location");
button.addEventListener("click", showYourWeather);

//Fahrenheit calculation
let celsiusTemperature = 17;

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("h3");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureDisplay.innerHTML = `${fahrenheitTemperature}`;
  let celsius = document.querySelector(".celsius");
  celsius.innerHTML = "°F";
  let newFahrenheit = document.querySelector(".fahrenheit");
  newFahrenheit.innerHTML = "|°C";
  newFahrenheit.addEventListener("click", showCelsius);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("h3");
  let celsiusTemperature = 17;
  temperatureDisplay.innerHTML = `${celsiusTemperature}`;
  let fahrenheit = document.querySelector(".celsius");
  fahrenheit.innerHTML = "°C";
  let newFahrenheit = document.querySelector(".fahrenheit");
  newFahrenheit.innerHTML = "|°F";
  newFahrenheit.addEventListener("click", showFahrenheit);
}
let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", showCelsius);
