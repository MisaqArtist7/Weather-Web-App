const form = document.querySelector('#myForm');
const cityInput = document.querySelector('#city');
let latitude = "";
let longitude = "";
let hourly = ""

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    let result = cityInput.value;

    console.log(result)

    cityInput.value = '';

    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${result}&count=1&language=en&format=json`
    );
    try {
        const data = await response.json();
        console.log(data.results[0]);
        latitude = data.results[0].latitude;
        longitude = data.results[0].longitude;
        console.log(`${latitude} ${longitude}`)
        
    } catch (error) {
        console.log(error)
    }

})
