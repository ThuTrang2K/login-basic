import React from 'react';

const useCapitalizeFirstLetter = (input) => {
    const words = input.split(' ');
    const titleWords = []; // The array of title words
    for (const word of words) {
        const firstLetter = word.slice(0, 1).toLocaleUpperCase(); // Capitalize the first letter
        const rest = word.slice(1); // Not modify this part
        titleWords.push(`${firstLetter}${rest}`);
    }
    const result = titleWords.join(' ');
    return {result};
};

export default useCapitalizeFirstLetter;