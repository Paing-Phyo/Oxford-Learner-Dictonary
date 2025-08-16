document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search__input");
    const searchButton = document.querySelector(".search__button");
    const wordDisplay = document.querySelector(".about__word span:first-child");
    const wordTypeDisplay = document.querySelector(".about__word span:last-child");
    const wordDefinitionDisplay = document.querySelector(".about__right p:last-child");

    searchButton.addEventListener("click", async () => {
        const word = searchInput.value.trim();
        if (word) {
            const definition = await fetchDefinition(word);
            if (definition) {
                wordDisplay.textContent = word;
                wordTypeDisplay.textContent = definition.type;
                wordDefinitionDisplay.textContent = definition.definition;
            } else {
                wordDefinitionDisplay.textContent = "Definition not found.";
            }
        }
    });

    async function fetchDefinition(word) {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();
            if (data && Array.isArray(data) && data.length > 0) {
                return {
                    type: data[0].meanings[0].partOfSpeech,
                    definition: data[0].meanings[0].definitions[0].definition,
                };
            }
        } catch (error) {
            console.error("Error fetching definition:", error);
        }
        return null;
    }
});