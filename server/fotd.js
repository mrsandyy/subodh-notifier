import fetch from 'node-fetch';

const fetchCSJoke = async () => {
    const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
    const data = await response.json();
    if (data.error) throw new Error(`Joke API Error: ${data.message}`);
    return data.joke;
};

const fetchCSFact = async () => {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = await response.json();
    if (!data.text) throw new Error('Fact API Error: No fact returned');
    return `Fun Fact: ${data.text}`;
};

const formatText = (text, characterLimit) => {
    const formattedText = text.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s+/g, " ").trim();
    return formattedText.length <= characterLimit ? formattedText : null;
};

const fetchRandomCSContent = async (characterLimit = 200, maxAttempts = 5) => {
    const fetchFunctions = [fetchCSFact, fetchCSJoke];

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            const randomFunction = fetchFunctions[Math.floor(Math.random() * fetchFunctions.length)];
            const content = await randomFunction();
            const formattedContent = formatText(content, characterLimit);

            if (formattedContent) {
                return formattedContent;
            }
            // If content is too long, continue to next attempt
        } catch (error) {
            console.error(`Error fetching content (Attempt ${attempt + 1}):`, error.message);
        }
    }
    return 'Failed to fetch suitable content within the character limit. Our quote-generating AI must be pondering the meaning of life!';
};

fetchRandomCSContent(120).then(content => console.log(content));

// TODO: modify func to take arg which we can use to speficy which funtions to call, and set default call value to use all randomly 