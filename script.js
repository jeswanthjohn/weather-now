// ===============================
// Configuration
// ===============================

// TEMP: API key inlined for frontend-only static deployment
// In production, this should be handled via environment variables
const API_KEY = "YOUR_OPENWEATHER_API_KEY";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// ===============================
// DOM References
// ===============================

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const messageBox = document.getElementById("message");
const loader = document.getElementById("loader");

// ===============================
// UI State Helpers
// ===============================

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showMessage(text, type = "info") {
  messageBox.textContent = text;
  messageBox.className = `message ${type}`;
}

function clearMessage() {
  messageBox.textContent = "";
  messageBox.className = "message";
}

function resetWeatherCard() {
  weatherCard.innerHTML = "";
}

// ===============================
// Weather Rendering
// ===============================

function renderWeather(weatherData) {
  const { name } = weatherData;
  const { temp, humidity } = weatherData.main;
  const description = weatherData.weather[0].description;

  weatherCard.innerHTML = `
    <h2>${name}</h2>
    <p>🌡️ Temperature: ${temp}°C</p>
    <p>💧 Humidity: ${humidity}%</p>
    <p>☁️ ${description}</p>
  `;
}

// ===============================
// API Layer
// ===============================

async function fetchWeatherForCity(city) {
  const requestUrl = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

  const response = await fetch(requestUrl);

  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
}

// ===============================
// Application Flow
// ===============================

async function loadWeather(city) {
  resetWeatherCard();
  clearMessage();
  showLoader();

  try {
    const weatherData = await fetchWeatherForCity(city);
    renderWeather(weatherData);
  } catch (error) {
    showMessage(error.message, "error");
  } finally {
    hideLoader();
  }
}

// ===============================
// Event Handlers
// ===============================

function handleFormSubmit(event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    showMessage("Please enter a city name", "warning");
    return;
  }

  loadWeather(city);
}

// ===============================
// Event Listeners
// ===============================

form.addEventListener("submit", handleFormSubmit);
