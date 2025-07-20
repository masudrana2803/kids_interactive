document.addEventListener('DOMContentLoaded', () => {
    const numbersContainer = document.getElementById('numbers-container');
    const englishLettersContainer = document.getElementById('english-letters-container');
    const bengaliVowelsContainer = document.getElementById('bengali-vowels-container');
    const bengaliConsonantsContainer = document.getElementById('bengali-consonants-container');

    // Function to create and append an item
    const createItem = (value, container) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.textContent = value;
        itemDiv.addEventListener('click', () => {
            // In a real application, you would play a sound or show an animation here
            console.log(`Clicked: ${value}`);
            //alert(`You clicked ${value}!`); // For demonstration, show an alert
            // Example of how to integrate a simple text-to-speech (browser dependent)
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(value);
                utterance.lang = getLanguageForValue(value); // Set language based on content
                speechSynthesis.speak(utterance);
            }
        });
        container.appendChild(itemDiv);
    };

    // Helper to determine language for speech synthesis
    const getLanguageForValue = (value) => {
        if (value.match(/[0-9]/)) return 'en-US'; // Numbers
        if (value.match(/[A-Za-z]/)) return 'en-US'; // English Letters
        // Check if value is a Bengali character (Unicode range for Bengali is 0x980-0x9FF)
        // This is a simplified check and might need refinement for all Bengali characters
        if (value.charCodeAt(0) >= 0x980 && value.charCodeAt(0) <= 0x9FF) return 'bn-BD'; // Bengali
        return 'en-US'; // Default
    };

    // Generate Numbers (1-100)
    for (let i = 1; i <= 100; i++) {
        createItem(i.toString(), numbersContainer);
    }

    // Generate English Letters (A-Z)
    for (let i = 0; i < 26; i++) {
        const charCode = 'A'.charCodeAt(0) + i;
        createItem(String.fromCharCode(charCode), englishLettersContainer);
    }

    // Generate Bengali Vowels (অ-ঔ)
    // Unicode range for Bengali vowels (approximate, includes some related characters)
    // অ (U+0985) to ঔ (U+0994)
    const bengaliVowels = ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'ঌ', 'এ', 'ঐ', 'ও', 'ঔ'];
    bengaliVowels.forEach(vowel => {
        createItem(vowel, bengaliVowelsContainer);
    });

    // Generate Bengali Consonants (ক-ঁ)
    // Unicode range for Bengali consonants (approximate, includes some related characters)
    // ক (U+0995) to ঁ (U+0981 - Chandrabindu, often associated with consonants)
    const bengaliConsonants = [
        'ক', 'খ', 'গ', 'ঘ', 'ঙ',
        'চ', 'ছ', 'জ', 'ঝ', 'ঞ',
        'ট', 'ঠ', 'ড', 'ঢ', 'ণ',
        'ত', 'থ', 'দ', 'ধ', 'ন',
        'প', 'ফ', 'ব', 'ভ', 'ম',
        'য', 'র', 'ল', 'শ', 'ষ',
        'স', 'হ', 'ড়', 'ঢ়', 'য়',
        'ৎ', 'ং', 'ঃ', 'ঁ'
    ];
    bengaliConsonants.forEach(consonant => {
        createItem(consonant, bengaliConsonantsContainer);
    });
});
