// ===============================
// Configuration
// ===============================

// TEMP: API key inlined for frontend-only static deployment
// In production, this should be handled via environment variables
const API_KEY = "3597f18c75ed19a425bf9a753cdcf8f3";
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
// State Control
// ===============================

let isFetching = false;

// ===============================
// UI State Helpers
// ===============================

function showLoader() {
  loader.style.display = "block";
  cityInput.disabled = true;
}

function hideLoader() {
  loader.style.display = "none";
  cityInput.disabled = false;
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
  weatherCard.classList.add("hidden");
}

// ===============================
// Validation
// ===============================

function validateCity(city) {
  const trimmed = city.trim();

  if (!trimmed) {
    return "Please enter a city name";
  }

  if (trimmed.length < 2) {
    return "City name must be at least 2 characters";
  }

  const regex = /^[a-zA-Z\s]+$/;
  if (!regex.test(trimmed)) {
    return "City name can only contain letters and spaces";
  }

  return null;
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

  weatherCard.classList.remove("hidden");
}

// ===============================
// API Layer
// ===============================

async function fetchWeatherForCity(city) {
  const requestUrl = `${BASE_URL}?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  let response;

  try {
    response = await fetch(requestUrl);
  } catch {
    throw new Error("Network error. Please check your connection.");
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid response from weather service");
  }

  if (response.status === 404 || data.cod === "404") {
    throw new Error("City not found");
  }

  if (response.status === 401) {
    throw new Error("Invalid API key");
  }

  if (response.status >= 500) {
    throw new Error("Weather service is currently unavailable");
  }

  if (!response.ok) {
    throw new Error(data?.message || "Unable to fetch weather data");
  }

  return data;
}

// ===============================
// Application Flow
// ===============================

async function loadWeather(city) {
  if (isFetching) return;

  isFetching = true;

  resetWeatherCard();
  clearMessage();
  showLoader();

  try {
    const weatherData = await fetchWeatherForCity(city);
    renderWeather(weatherData);
  } catch (error) {
    const message =
      error?.message || "Something went wrong. Please try again.";

    showMessage(message, "error");

    // ✅ Accessibility: return focus to input on error
    cityInput.focus();
  } finally {
    hideLoader();
    isFetching = false;
  }
}

// ===============================
// Event Handlers
// ===============================

function handleFormSubmit(event) {
  event.preventDefault();

  clearMessage();

  if (isFetching) return;

  const city = cityInput.value;

  const validationError = validateCity(city);

  if (validationError) {
    showMessage(validationError, "warning");

    // ✅ Accessibility: focus input for correction
    cityInput.focus();
    return;
  }

  loadWeather(city.trim());
}

// ===============================
// Event Listeners
// ===============================

form.addEventListener("submit", handleFormSubmit);

// ===============================
// Initial UI State
// ===============================

resetWeatherCard();
clearMessage();
hideLoader();

// ✅ Accessibility: focus input on page load
cityInput.focus();