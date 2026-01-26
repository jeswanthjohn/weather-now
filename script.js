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
   UI HELPERS
-------------------------- */
function showLoading(isLoading) {
  loader.classList.toggle("hidden", !isLoading);
  cityInput.disabled = isLoading;
  searchBtn.disabled = isLoading;
}

function showError(message) {
  messageBox.textContent = message;
  messageBox.classList.add("error");
  weatherCard.classList.add("hidden");
}

function clearError() {
  messageBox.textContent = "";
  messageBox.classList.remove("error");
}

function renderWeather(data) {
  weatherCard.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Feels like:</strong> ${data.main.feels_like} °C</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
    <p><em>${data.weather[0].description}</em></p>
  `;
  weatherCard.classList.remove("hidden");
}

/* -------------------------
   EVENT
-------------------------- */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  fetchWeather(city);
});

/* -------------------------
   CORE LOGIC
-------------------------- */
async function fetchWeather(city) {
  clearError();
  weatherCard.classList.add("hidden");

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  showLoading(true);

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${OPENWEATHER_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message || "City not found");
    }

    renderWeather(data);

  } catch (err) {
    showError(err.message);
  } finally {
    showLoading(false);
  }
}

/* -------------------------
   INITIAL UI STATE (CRITICAL)
-------------------------- */
showLoading(false);
clearError();
weatherCard.classList.add("hidden");
