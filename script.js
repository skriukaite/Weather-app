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
}
function showEnteredCity(response) {
  let enteredCity = document.querySelector("#entered-current-city");
  enteredCity.innerHTML = response.data.name;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#current-degrees");
  degrees.innerHTML = temperature;

  timeFor(temperature);

  function timeFor(temperature) {
    let offer = document.querySelector("#offer");
    let offerImage = document.querySelector("#offer-image");
    if (temperature <= 10) {
      offer.innerHTML = "hot herbal tea";
      offerImage.src = "media/tea.svg";
    } else if (temperature > 10 && temperature <= 20) {
      offer.innerHTML = "refreshing drink";
      offerImage.src = "media/drink.svg";
    } else {
      offer.innerHTML = "ice-cream";
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
