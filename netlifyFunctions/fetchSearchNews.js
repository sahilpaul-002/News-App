export async function handler(event, context) {
  const apiKey = process.env.REACT_APP_NEWS_API;
  
  const { queryString, pageSize } = event.queryStringParameters;

  const url = `https://newsapi.org/v2/everything?q=${queryString}&pageSize=${pageSize}`;

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
