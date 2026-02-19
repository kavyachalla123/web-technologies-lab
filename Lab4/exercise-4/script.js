const apiKey = "d5de466288dbf1b2a2c479d893f9dbc5"; 
let cachedCity = "";
let cachedData = null;

function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const resultDiv = document.getElementById("weatherResult");
    const message = document.getElementById("message");
    const loader = document.getElementById("loader");

    if (city === "") {
        message.textContent = "Please enter a city name.";
        message.className = "error";
        return;
    }

    // Check cache
    if (city.toLowerCase() === cachedCity.toLowerCase() && cachedData) {
        displayWeather(cachedData);
        message.textContent = "Loaded from cache (200 OK)";
        message.className = "success";
        return;
    }

    loader.classList.remove("hidden");
    resultDiv.innerHTML = "";
    message.textContent = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("City not found (404)");
                } else {
                    throw new Error("Server error (500)");
                }
            }
            return response.json();
        })
        .then(data => {
            loader.classList.add("hidden");

            cachedCity = city;
            cachedData = data;

            displayWeather(data);
            message.textContent = "Weather fetched successfully (200 OK)";
            message.className = "success";
        })
        .catch(error => {
            loader.classList.add("hidden");
            message.textContent = error.message;
            message.className = "error";
        });
}

function displayWeather(data) {

    const resultDiv = document.getElementById("weatherResult");

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].description;

    resultDiv.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Condition:</strong> ${condition}</p>
    `;
}
