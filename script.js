const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityEl = document.querySelector(".city");
const tempEl = document.querySelector(".temperature");
const descEl = document.querySelector(".description");

// Placeholder – Day 5 will replace this
function displayMockWeather(city) {
  cityEl.textContent = city;
  tempEl.textContent = "28 °C";
  descEl.textContent = "Clear sky";
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (!city) {
    descEl.textContent = "Please enter a city name";
    return;
  }

  displayMockWeather(city);
});
