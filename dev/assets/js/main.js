// API Key
const apiKey = '7c7e36ef01d94161bc2222432252905';

// Selecting Placeholder + Dropdown
const placeholder = document.querySelector('#weatherInfo');
const dropdown = document.querySelector('#locations');

// When dropdown changes, get weather
dropdown.addEventListener('change', () => {
    const location = dropdown.value;
    getCurrentWeather(location);
});

// On page load, get weather of default value
getCurrentWeather(dropdown.value);


async function getCurrentWeather(location) {
    // API URL
    const apiUrl = `http://api.weatherapi.com/v1/current.json?q="${location}"&key=${apiKey}`


    // If error, then display error
    try {
        // Get response from API
        const apiRes = await fetch(apiUrl)

        // Parse response into JSON
        const result = await apiRes.json();

        // Testing if the API has an error
        console.log('API response: ', result)

        if (result.error) {
            throw new Error(result.error.message);
        }
        
        // Initializing variables for weather card
        const city = result.location.name;
        const country = result.location.country;

        const currentTempInCelcius = result.current.temp_c;

        const icon = result.current.condition.icon;
        const conditionText = result.current.condition.text;

        console.log(currentTempInCelcius)

        // HTML Placeholder for API response
        placeholder.innerHTML = `
        <h3>${city}, ${country}</h3>
        <img src="${icon}" alt="${conditionText}">
        <h2>${currentTempInCelcius}°C</h2>
        <p>${conditionText}</p>
        
    `
    } catch (error) {
        // If there's an error, display popup
        console.error(`Something's wrong... `, error);
        alert(`Failed to fetch the weather...\n\n${error}`);
    }
}