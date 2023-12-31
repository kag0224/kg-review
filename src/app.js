function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateToday = document.querySelector("#date-today");
let currentTime = new Date();

dateToday.innerHTML = formatDate(currentTime);

//function displayForecast() {
//  let forecastElement = document.querySelector("#forecast");

//  let days = ["Mon", "Tue", "Wed", "Thu"];

//  let forecastHTML = `<div class="row">`;
//  days.forEach(function (day) {
//    forecastHTML =
//      forecastHTML +
//      `
//    <div class="col-3">
//      <div class="weather-forecast-day">${day}</div>
//    <img
//      src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
//      alt=""
//      width="42"
//    />
//      <div class="weather-forecast-temp">
//      <span class="weather-forecast-temp-max">42°</span>
//      <span class="weather-forecast-temp-min">26°</span>
//      </div>
//    </div>
//  `;
//  });

//  forecastHTMl = forecastHTML + `</div>`;
//  forecastElement.innerHTML = forecastHTML;
//}

function showWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "748e575d7c9421f3b821d29a87e2a544";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Las Vegas");
//displayForecast();
