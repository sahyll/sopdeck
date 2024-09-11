const isCompanyName = (part: string): boolean => {
   
    return /^[a-zA-Z\s]+$/.test(part);
};



const extractCompanyNames = (parts: string[]): (string | number)[] => {
    const result: (string | number)[] = [];
    let companyName = '';
    let i = 0;

    while (i < parts.length) {
        
        if (isCompanyName(parts[i])) {
            companyName += (companyName ? ' ' : '') + parts[i];
            
        } else {
            
            if (companyName) {
                result.push(companyName); 
                console.log("Company Name is: ", companyName)
                companyName = ''; 
            }

            
            const value = parts[i];
            const numericValue = value.replace(/,/g, '');
            result.push(isNaN(Number(numericValue)) ? value : Number(numericValue));
        }
        i++;
    }

   
    console.log("Output from extractcompany names is, this result is passed on to another function where we create company arrays: "+result)
    return result;
};

const createCompanyArrays = (data: (string | number)[]): (string | number)[][] => {
    const result: (string | number)[][] = [];
    let currentCompanyArray: (string | number)[] = [];

    data.forEach(item => {
        if (typeof item === 'string' && /^[a-zA-Z\s]+$/.test(item)) {
            // If a company name is found and we already have a company array, push the current one to result
            if (currentCompanyArray.length > 0) {
                result.push(currentCompanyArray);
            }
            // Start a new company array with the company name
            currentCompanyArray = [item];
        } else {
            // Otherwise, push the current item (date/number) to the current company's array
            currentCompanyArray.push(item);
        }
    });

    // After the loop, push the last company array to the result if it exists
    if (currentCompanyArray.length > 0) {
        result.push(currentCompanyArray);
    }
    console.log("Result from create company array is "+result)
    return result;
};

export const sopdecker = (text: string[]): (string | number)[][] => {
    console.log("Recieved texts from page.tsx in sopdecker.ts: "+text)

    const result: (string | number)[][] = [];

    // Process each line of the input
    text.forEach(line => {
        const lineParts = line.trim().split(/\s+/);
        console.log("Line parts from the sopdecker function is: "+lineParts)
        const processedLine = createCompanyArrays(extractCompanyNames(lineParts));
        result.push(...processedLine);
    });

    console.log('Result of sopdecker function at the final stage is: ', result);
    return result;
};
