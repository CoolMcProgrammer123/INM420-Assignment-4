const apiKey = 'cd48236a-224e-4a07-99b5-090175021d1d';

const searchBtn = document.getElementById('searchBtn');
const wordInput = document.getElementById('wordInput');

const definitionBox = document.getElementById('definitionBox');

searchBtn.addEventListener('click', () => {

    // Clean up the text input (remove whitespaces)
    const word = wordInput.value.trim();

    // If there a word then search for it, if none then alert
    if (word) {
        fetchDefinition(word);
    } else {
        alert("Please enter a word.");
    }
});

// Function for getting definition
async function fetchDefinition(word) {
    // API URL
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;

    // If error, then display error
    try {
        // Get repsonse from API
        const res = await fetch(url);

        // Parse response as JSON
        const data = await res.json();
        
        // Log to see if API works
        console.log('API response:', data);

        // If API returns error then error
        if (!data.length || !data[0].shortdef) {
            throw new Error("No definition found.");
        }

        // Initialize vars for placeholders
        const firstDef = data[0].shortdef[0];
        const partOfSpeech = data[0].fl;

        definitionBox.innerHTML = `
            <h3>${word}</h3>
            <p><em>${partOfSpeech}</em></p>
            <p>${firstDef}</p>
        `;

    } catch (error) {
        // If there's an error log in console
        console.error("Fetch failed:", error);

        // Also alert user
        alert(`Failed to get definition:\n${error.message}`);
    }
}
