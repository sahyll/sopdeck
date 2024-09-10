const isCompanyName = (part: string): boolean => {
    // Check if the part contains only alphabetic characters or spaces
    return /^[a-zA-Z\s]+$/.test(part);
};

const extractCompanyNames = (parts: string[]): (string | number)[] => {
    const result: (string | number)[] = [];
    let companyName = '';
    let i = 0;

    while (i < parts.length) {
        // If the current part is a valid company name, accumulate it
        if (isCompanyName(parts[i])) {
            companyName += (companyName ? ' ' : '') + parts[i];
        } else {
            // If companyName is not empty, push it to result
            if (companyName) {
                result.push(companyName);
                companyName = ''; // Reset company name for potential next name
            }

            // Process the current part as a number or date
            const value = parts[i];
            const numericValue = value.replace(/,/g, '');
            result.push(isNaN(Number(numericValue)) ? value : Number(numericValue));
        }
        i++;
    }

    // If there's any remaining company name after the loop, add it to the result

    return result;
};

export const sopdecker = (text: string[]): (string | number)[] => {
    console.log('Input text:', text);

    const result: (string | number)[] = [];

    // Process each line of the input
    text.forEach(line => {
        const lineParts = line.trim().split(/\s+/);
        const processedLine = extractCompanyNames(lineParts);
        result.push(...processedLine);
    });

    console.log('Processed values:', result);
    return result;
};
