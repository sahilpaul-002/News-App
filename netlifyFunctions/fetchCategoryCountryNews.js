export async function handler(event, context) {
  const apiKey = process.env.REACT_APP_NEWS_API;

  const countryCode = {
    India: "IN",
    US: "US",
    China: "CN",
  };

  const { country, category } = event.queryStringParameters;

  const url = `https://newsapi.org/v2/top-headlines?country=${countryCode[country]}&category=${category}&pageSize=6`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // allow all domains
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // allow all domains
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      },
      body: JSON.stringify({ error: "Failed to fetch news data" }),
    };
  }
}