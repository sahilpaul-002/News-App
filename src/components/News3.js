import React, { useEffect, useState } from 'react'
import NewsItem from "./NewsItem"
import indiaData from '../indiaSample';
import usData from '../usSample';
import chinaData from '../chinaSample';

export default function News3() {

    // Function to fetch the articles based on country
    const fetchArticle = (country) => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (country === "India") {
                    resolve(indiaData.articles);
                } else if (country === "US") {
                    resolve(usData.articles);
                } else {
                    resolve(chinaData.articles);
                }
            }, 2000); // 2 seconds delay
        });
    };

    // Set the information to show in the news item card
    const [newsCardInfo, setnewsCardInfo] = useState({
        countryName: "India",
        articles: null
    });

    // Change the state of the news item card information
    const handleCountry = async (country) => {
        // Change the state of articles to null to show the loader
        setnewsCardInfo({
            countryName: country,
            articles: null,
        });
    };

    useEffect(() => {
        // Only run when articles is null (i.e., loading state)
        if (newsCardInfo.articles === null) {
            const loadArticles = async () => {
                const data = await fetchArticle(newsCardInfo.countryName);
                setnewsCardInfo(prev => ({
                    ...prev,
                    articles: data
                }));
            };
            loadArticles();
        }
    }, [newsCardInfo.countryName, newsCardInfo.articles]); // Trigger fetch whenever country changes

    return (
        <div className='container px-2 py-3'>
            <h1>Top Headlines</h1>
            <hr className='border border-2 border-secondary my-3' />

            {/*   Country Tabs   */}
            <div className="container">
                <ul className="nav nav-tabs" htmlFor="nav-tabContent" id='nav-countryTabs' aria-controls='nav-India'>
                    <li className="nav-item">
                        <button type="button" className={`btn btn-light ${newsCardInfo.countryName === "India" ? "show active" : ""}`} aria-current="page" role="tab" id='tab-India' onClick={() => handleCountry("India")}>India</button>
                    </li>
                    <li className="nav-item">
                        <button type="button" className={`btn btn-light ${newsCardInfo.countryName === "US" ? "show active" : ""}`} aria-current="page" role="tab" id='tab-US' onClick={() => handleCountry("US")}>USA</button>
                    </li>
                    <li className="nav-item">
                        <button type="button" className={`btn btn-light ${newsCardInfo.countryName === "China" ? "show active" : ""}`} aria-current="page" role="tab" id='tab-China' onClick={() => handleCountry("China")}>China</button>
                    </li>
                </ul>
            </div>

            {/*   Dynamic display of news items cards   */}
            <div className="container tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-India" role="tabpanel" aria-labelledby="tab-India">
                    {/*   News cards display   */}
                    {newsCardInfo.articles !== null ? <div className="container row">
                        {newsCardInfo.articles.slice(0, 4).map((article, idx) => (
                            <div className="col-md-3 mb-3" key={idx}>
                                <NewsItem
                                    urlToImage={article.urlToImage}
                                    title={article.title}
                                    description={article.description}
                                    category="business"
                                    url={article.url}
                                    publishedAt={article.publishedAt}
                                />
                            </div>
                        ))}
                        <div className="container d-flex flex-row-reverse my-3">
                            <a className="btn btn-outline-secondary p-2"
                                href="/category" role="button">View More</a>
                        </div>
                        <hr className='border border-dark' />
                    </div> : <div className="d-flex justify-content-center">
                        <div className="spinner-border my-5" style={{ width: "3rem", height: "3rem" }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                </div> 
            </div >
        </div >
    )
}