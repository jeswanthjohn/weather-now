// TEMP: API key inlined for frontend-only static deployment
// In production, this should be handled via a backend proxy
const OPENWEATHER_API_KEY = "3597f18c75ed19a425bf9a753cdcf8f3";

/* -------------------------
   DOM REFERENCES
-------------------------- */
const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const messageBox = document.getElementById("message");
const loader = document.getElementById("loader");
const searchBtn = document.getElementById("searchBtn");

/* -------------------------
  | UI STATE MANAGEMENT 
-------------------------- */
function setUIState({ loading = false, error = "", weather = null }) {
  loader.classList.toggle("hidden", !loading);
  cityInput.disabled = loading;
  searchBtn.disabled = loading;

  if (error) {
    messageBox.textContent = error;
    messageBox.classList.add("error");
    weatherCard.classList.add("hidden");
    return;
  }

  messageBox.textContent = "";
  messageBox.classList.remove("error");

  if (weather) {
    weatherCard.innerHTML = `
      <h2>${weather.city}, ${weather.country}</h2>
      <p><strong>Temperature:</strong> ${weather.temperature} °C</p>
      <p><strong>Feels like:</strong> ${weather.feelsLike} °C</p>
      <p><strong>Humidity:</strong> ${weather.humidity}%</p>
      <p><strong>Wind:</strong> ${weather.wind} m/s</p>
      <p><em>${weather.description}</em></p>
    `;
    weatherCard.classList.remove("hidden");
  } else {
    weatherCard.classList.add("hidden");
  }
}

/* -------------------------
   EVENT HANDLER
-------------------------- */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  fetchWeather(city);
});

/* -------------------------
   CORE LOGIC
-------------------------- */
async function fetchWeather(city) {
  setUIState({});

  if (!city) {
    setUIState({ error: "Please enter a city name" });
    return;
  }

  setUIState({ loading: true });

  try {
    const response = await fetch(buildWeatherURL(city));

    if (!response.ok) {
      if (response.status === 404) throw new Error("City not found");
      if (response.status === 401) throw new Error("Service unavailable");
      throw new Error("Failed to fetch weather data");
    }

    const rawData = await response.json();
    const weather = mapWeatherData(rawData);

    setUIState({ weather });

  } catch (error) {
    setUIState({ error: error.message });
  } finally {
    setUIState({ loading: false });
  }
}

/* -------------------------
   HELPERS
-------------------------- */
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
    wind: data.wind.speed,
    description: data.weather[0].description,
  };
}
