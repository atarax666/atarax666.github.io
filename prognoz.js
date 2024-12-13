const APIKey = '7d1bf44229fe282f526e52c301ba6864';

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        getWeather(city);
    } else {
        displayError("Введите название города!");
    }
});

async function getWeather(city) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric&lang=ru`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric&lang=ru`;

    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherURL),
            fetch(forecastURL)
        ]);

        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error('Ничего не найдено');
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(weatherData);
        displayForecast(forecastData);
    } catch (error) {
        displayError('Ничего не найдено');
    }
}

function displayCurrentWeather(data) {
    const weatherElement = document.getElementById('current-weather');
    const { name, weather, main, wind } = data;

    const weatherHTML = `
        <h2>${name}</h2>
        <p>${new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
        <h3>${Math.round(main.temp)}°C</h3>
        <p>${weather[0].description}</p>
        <p>💧 Влажность: ${main.humidity}%</p>
        <p>🌬️ Ветер: ${wind.speed} м/с</p>
    `;

    weatherElement.innerHTML = weatherHTML;
    document.getElementById('forecast').innerHTML = '';
}

function displayForecast(data) {
    const forecastElement = document.getElementById('forecast');
    const dailyForecasts = data.list.filter((item) =>
        item.dt_txt.endsWith('12:00:00')
    );

    const forecastHTML = dailyForecasts.map((forecast) => {
        const date = new Date(forecast.dt * 1000);
        return `
            <div class="forecast-day">
                <p>${date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</p>
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}">
                <p>${Math.round(forecast.main.temp)}°C</p>
            </div>
        `;
    }).join('');

    forecastElement.innerHTML = forecastHTML;
}

function displayError(message) {
    const weatherElement = document.getElementById('current-weather');
    weatherElement.innerHTML = `
        <p class="default-message">${message}</p>
        <img src="images/not-found.png" alt="Error image" class="default-image">
    `;
    document.getElementById('forecast').innerHTML = '';
}
