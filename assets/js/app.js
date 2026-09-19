const form = document.querySelector('#myForm');
const cityInput = document.querySelector('#city');

const weatherResult = document.querySelector('#weatherResult');

const cityName = document.querySelector('#cityName');
const countryName = document.querySelector('#countryName');
const temperatureElement = document.querySelector('#temperature');
const windSpeedElement = document.querySelector('#windSpeed');
const weatherCodeElement = document.querySelector('#weatherCode');
const timeZoneElement = document.querySelector('#timeZone');

let latitude = "";
let longitude = "";
let country = "";
let city = "";
let timeZone = "";

let temperature = "";
let windSpeed = "";
let weatherCode = "";

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const result = cityInput.value;

    console.log(result);

    cityInput.value = '';

    try {

        // Get city information
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${result}&count=1&language=en&format=json`
        );

        const data = await response.json();

        country = data.results[0].country;
        city = data.results[0].name;
        timeZone = data.results[0].timezone;
        latitude = data.results[0].latitude;
        longitude = data.results[0].longitude;


        // Get weather information
        const getWeather = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,precipitation_probability,wind_speed_10m,weather_code`
        );

        const weatherData = await getWeather.json();

        temperature = weatherData.current.temperature_2m;
        windSpeed = weatherData.current.wind_speed_10m;
        weatherCode = weatherData.current.weather_code;


        // Show data in UI
        cityName.textContent = city;
        countryName.textContent = country;
        temperatureElement.textContent = temperature;
        windSpeedElement.textContent = windSpeed;
        weatherCodeElement.textContent = weatherCode;
        timeZoneElement.textContent = timeZone;

        weatherResult.classList.remove('hidden');

    } catch (error) {

        console.log(error);

    }

});