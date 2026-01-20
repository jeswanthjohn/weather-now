// TEMP: API key inlined for frontend-only static deployment
// In production, this should be handled via a backend proxy
const OPENWEATHER_API_KEY = "3597f18c75ed19a425bf9a753cdcf8f3";

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const messageBox = document.getElementById("message");
const loader = document.getElementById("loader");
const searchBtn = document.getElementById("searchBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  getWeather(city);
});

async function getWeather(city) {
  clearUI();

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  toggleLoading(true);

  try {
    const url = buildWeatherURL(city);
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found");
      }
      if (response.status === 401) {
        throw new Error("Service unavailable");
      }
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    const weatherModel = mapWeatherData(data);
    displayWeather(weatherModel);

  } catch (error) {
    showError(error.message);
  } finally {
    toggleLoading(false);
  }
}

function buildWeatherURL(city) {
  const baseURL = "https://api.openweathermap.org/data/2.5/weather";
  return `${baseURL}?q=${encodeURIComponent(city)}&units=metric&appid=${OPENWEATHER_API_KEY}`;
}

function mapWeatherData(data) {
  return {
    city: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    windSpeed: data.wind.speed,
  };
}

function displayWeather(weather) {
  messageBox.textContent = "";
  weatherCard.innerHTML = `
    <h2>${weather.city}, ${weather.country}</h2>
    <p><strong>Temperature:</strong> ${weather.temperature} °C</p>
    <p><strong>Feels like:</strong> ${weather.feelsLike} °C</p>
    <p><strong>Humidity:</strong> ${weather.humidity}%</p>
    <p><strong>Wind:</strong> ${weather.windSpeed} m/s</p>
    <p><em>${weather.description}</em></p>
  `;
  weatherCard.classList.remove("hidden");
}

function toggleLoading(isLoading) {
  loader.classList.toggle("hidden", !isLoading);
  cityInput.disabled = isLoading;
  searchBtn.disabled = isLoading;
}

function showError(message) {
  messageBox.textContent = message;
}

function clearUI() {
  messageBox.textContent = "";
  weatherCard.classList.add("hidden");
}
