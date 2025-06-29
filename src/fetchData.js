// const apiKey = process.env.REACT_APP_NEWS_API;

const fetchAllNewsData = async (country, pageSize) => {
    let response = null;
    try {
        response = await fetch(`/.netlify/functions/fetchAllNews?country=${country}&pageSize=${pageSize}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching news:", error);
        return { status: "error", code: response.status, message: response.statusText };
    }
};

const fetchAllCategoryNewsData = async (country, pageSize) => {
    const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

    let formatedData = {}
    let response = null;
    for (let category of categories) {
        try {
            // response = await fetch(`/.netlify/functions/fetchAllCategoryNews?country=${countryCode[country]}&category=${category}&pageSize=${pageSize}`);
            response = await fetch(`/.netlify/functions/fetchAllCategoryNews?country=${country}&category=${category}&pageSize=${pageSize}`);
            let parseData = await response.json();
            formatedData[category] = parseData;
        } catch (error) {
            console.error("Error fetching news:", error);
            return { status: "error", code: response.status, message: response.statusText };
        }
    }
    return formatedData
};

const fetchCategoryCountryData = async ({ params }) => {
    let response = null;
    try {
        response = await fetch(`/.netlify/functions/fetchCategoryCountryNews?country=${params.country}&category=${params.category}&pageSize=6`);
        const data = await response.json();
        return { data: data };
    } catch (error) {
        console.error("Error fetching news:", error);
        return { data : {status: "error", code: response.status, message: response.statusText} };
    }
}

const fetchMoreCategoryCountryData = async (country, category, pageSize) => {
    let response=null;
    try {
        response = await fetch(`/.netlify/functions/fetchMoreCategoryCountryNews?country=${country}&category=${category}&pageSize=${[pageSize]}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching news:", error);
        return { status: "error", code: response.status, message: response.statusText };
    }
}

const fetchSearchData = async(queryString, pageSize) => {
    let response=null;
    try {
        response = await fetch(`/.netlify/functions/fetchSearchNews?q=${queryString}&pageSize=${pageSize}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching news:", error);
        return { status: "error", code: response.status, message: response.statusText };
    } 
}

export { fetchAllNewsData, fetchAllCategoryNewsData, fetchCategoryCountryData, fetchMoreCategoryCountryData, fetchSearchData };