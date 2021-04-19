let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let formattedDate = `${currentDay}, ${currentHours}:${currentMinutes}`;

  let currentTime = document.querySelector("#accurate-current-time");
  currentTime.innerHTML = `${formattedDate}`;
}
formatDate(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function onSubmit(event) {
  event.preventDefault();
  let searchField = document.querySelector("#search-field");
  let city = searchField.value;
  getTemperatureByCity(city);
}

function getTemperatureByCity(city) {
  let apiKey = "c9e949520b33b479d97265ad4b8693ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showData);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", onSubmit);

function showData(response) {
  showTemperature(response);
  showWindSpeed(response);
  showPerceivedTemperature(response);
  showEnteredCity(response);
  showWeatherDescription(response);
  showWeatherIcon(response);
  getCoordinates(response.data.coord);
}
function showEnteredCity(response) {
  let enteredCity = document.querySelector("#entered-current-city");
  enteredCity.innerHTML = response.data.name;
}

function showTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#current-degrees");
  degrees.innerHTML = celsiusTemperature;

  timeFor(celsiusTemperature);

  function timeFor(celsiusTemperature) {
    let offer = document.querySelector("#offer");
    let offerImage = document.querySelector("#offer-image");
    if (celsiusTemperature <= 10) {
      offer.innerHTML = "a hot herbal tea";
      offerImage.src = "media/tea.svg";
    } else if (celsiusTemperature > 10 && celsiusTemperature <= 20) {
      offer.innerHTML = "a refreshing drink";
      offerImage.src = "media/drink.svg";
    } else {
      offer.innerHTML = "an ice-cream";
      offerImage.src = "media/ice_cream.svg";
    }
  }
}

function showWindSpeed(response) {
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = wind;
}

function showPerceivedTemperature(response) {
  let feeling = Math.round(response.data.main.feels_like);
  let temperatureFeeling = document.querySelector("#feels-like");
  temperatureFeeling.innerHTML = feeling;
}

function showWeatherDescription(response) {
  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = description;
}

function showWeatherIcon(response) {
  let icon = document.querySelector("#current-weather-icon");
  let iconCode = response.data.weather[0].icon;
  icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function showFahrenheitValue(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureValue = document.querySelector("#current-degrees");
  temperatureValue.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;
let fahrenheitValue = document.querySelector("#fahrenheit");
fahrenheitValue.addEventListener("click", showFahrenheitValue);

function showCelsiusValue(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("#current-degrees");
  temperatureValue.innerHTML = Math.round(celsiusTemperature);
}

let celsiusValue = document.querySelector("#celsius");
celsiusValue.addEventListener("click", showCelsiusValue);

function getCoordinates(coordinates) {
  let apiKey = "c9e949520b33b479d97265ad4b8693ed";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let iconCode = response.data.current.weather[0].icon;
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-sm">
       <div id="forecast-day">${formatDay(forecastDay.dt)}</div>
       <img src=https://openweathermap.org/img/wn/${iconCode}.png alt="weather icon">
       <div class="forecast-temperature">
          <span id="max-temperature"><strong>${Math.round(
            forecastDay.temp.max
          )}°</strong></span>
          <span id="mim-temperature">${Math.round(forecastDay.temp.min)}°</span>
       </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
