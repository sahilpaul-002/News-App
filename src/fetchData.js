const fetchAllNewsData = async (country, pageSize) => {
    const countryCode = { India: "IN", US: "US", China: "CN" };
    let rawData = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode[country]}&pageSize=${pageSize}`, {
        method: 'GET',
        headers: {
            // 'Authorization': 'Bearer 9ab76c5c8915413f9b2c84a22239ff4b'
            'Authorization': 'Bearer e5c4709fb81d44bbaac857c057d9ec0d' 
            // 'Authorization': 'Bearer 6632ff5df9cd4eeab4a11b639119c211'
            // 'Authorization': 'Bearer ef877b2cae9e4acf8555bc6404d50a79'
        }
    });
    let parseData = await rawData.json()
    return parseData;
};

const fetchAllCategoryNewsData = async (country, pageSize) => {
    const countryCode = { India: "IN", US: "US", China: "CN" };
    const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"]
    
    let formatedData = {}

    for (let category of categories) {
        let rawData = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode[country]}&category=${category}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
                // 'Authorization': 'Bearer 9ab76c5c8915413f9b2c84a22239ff4b'
                'Authorization': 'Bearer e5c4709fb81d44bbaac857c057d9ec0d' 
                // 'Authorization': 'Bearer 6632ff5df9cd4eeab4a11b639119c211'
                // 'Authorization': 'Bearer ef877b2cae9e4acf8555bc6404d50a79'
            }
        })
        let parseData = await rawData.json();
        formatedData[category] = parseData;
    }
    return formatedData
};

const fetchCategoryCountryData = async({params}) => {
  let rawData = await fetch(`https://newsapi.org/v2/top-headlines?country=${params.country}&category=${params.category}&pageSize=6`, {
        method: 'GET',
        headers: {
            // 'Authorization': 'Bearer 9ab76c5c8915413f9b2c84a22239ff4b'
            'Authorization': 'Bearer e5c4709fb81d44bbaac857c057d9ec0d' 
            // 'Authorization': 'Bearer 6632ff5df9cd4eeab4a11b639119c211'
            // 'Authorization': 'Bearer ef877b2cae9e4acf8555bc6404d50a79'
        }
    });
    let parseData = await rawData.json()
    return {data: parseData};
}

const fetchMoreCategoryCountryData = async(country, category, pageSize) => {
  let rawData = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${[pageSize]}`, {
        method: 'GET',
        headers: {
            // 'Authorization': 'Bearer 9ab76c5c8915413f9b2c84a22239ff4b'
            'Authorization': 'Bearer e5c4709fb81d44bbaac857c057d9ec0d' 
            // 'Authorization': 'Bearer 6632ff5df9cd4eeab4a11b639119c211'
            // 'Authorization': 'Bearer ef877b2cae9e4acf8555bc6404d50a79'
        }
    });
    let parseData = await rawData.json()
    return parseData;
}

export { fetchAllNewsData, fetchAllCategoryNewsData, fetchCategoryCountryData, fetchMoreCategoryCountryData };