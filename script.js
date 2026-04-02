// ===============================
// Configuration
// ===============================

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

let controller = null;

// ===============================
// UI State Helpers
// ===============================

function showLoader() {
  loader.classList.remove("hidden");
  loader.setAttribute("aria-busy", "true");
  cityInput.disabled = true;
}

function hideLoader() {
  loader.classList.add("hidden");
  loader.setAttribute("aria-busy", "false");
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

// ✅ NEW: Centralized UI reset
function resetUI() {
  resetWeatherCard();
  clearMessage();
}

// ===============================
// Validation + Normalization
// ===============================

// ✅ NEW: single normalization point
function normalizeCity(city) {
  return city.trim();
}

function validateCity(city) {
  if (!city) return "Please enter a city name";

  if (city.length < 2)
    return "City name must be at least 2 characters";

  const regex = /^[a-zA-Z\s]+$/;
  if (!regex.test(city))
    return "City name can only contain letters and spaces";

  return null;
}

// ===============================
// Weather Rendering
// ===============================

function renderWeather(weatherData) {
  const name = weatherData?.name;
  const temp = weatherData?.main?.temp;
  const humidity = weatherData?.main?.humidity;
  const description = weatherData?.weather?.[0]?.description;

  if (!name || temp == null || humidity == null || !description) {
    throw new Error("Incomplete data received from weather service");
  }

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

async function fetchWeatherForCity(city, signal) {
  const requestUrl = `${BASE_URL}?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  let response;

  try {
    response = await fetch(requestUrl, { signal });
  } catch (error) {
    if (error.name === "AbortError") throw error;
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
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();
  const signal = controller.signal;

  resetUI();
  showLoader();

  try {
    const weatherData = await fetchWeatherForCity(city, signal);
    renderWeather(weatherData);
  } catch (error) {
    if (error.name === "AbortError") return;

    const message =
      error?.message || "Something went wrong. Please try again.";

    showMessage(message, "error");
    cityInput.focus();
  } finally {
    if (!signal.aborted) {
      hideLoader();
    }
  }
}

// ===============================
// Event Handlers
// ===============================

function handleFormSubmit(event) {
  event.preventDefault();

  clearMessage();

  const rawCity = cityInput.value;

  // ✅ Normalize once
  const city = normalizeCity(rawCity);

  const validationError = validateCity(city);

  if (validationError) {
    showMessage(validationError, "warning");
    cityInput.focus();
    return;
  }

  loadWeather(city);
}

// ===============================
// Event Listeners
// ===============================

form.addEventListener("submit", handleFormSubmit);

// ===============================
// Initial UI State
// ===============================

resetUI();
hideLoader();

cityInput.focus();