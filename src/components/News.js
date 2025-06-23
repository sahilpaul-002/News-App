import React, { useEffect, useState } from 'react'
import { fetchAllCategoryNewsData } from "../fetchData"
import { countryButtonStyle } from "../Style"
import { NavLink, useOutletContext } from 'react-router-dom';
import NewsItem from "./NewsItem";

export default function News() {
    const { mode } = useOutletContext();

    // Set the information to show in the news item card
    const [newsCardInfo, setnewsCardInfo] = useState({
        countryName: "India",
        newsArticles: null
    });

    // Change the state of the news item card information
    const handleCountry = async (country) => {
        // Change the state of articles to null to show the loader
        setnewsCardInfo({
            countryName: country,
            newsArticles: null,
        });
    };

    // Hover effect styling
    const [isMouseOver, setIsMouseOver] = useState(null); // State to determine hover on country
    // Function to set stylecountry for mouse over
    const handleMouseOver = (country) => {
        setIsMouseOver(country);
    };
    // Focus (active element) effect styling
    const [isFocus, setIsFocus] = useState("India");
    // Fucntion to set country for focus element
    const handleFocus = (country) => {
        setIsFocus(country);
    }
    // Function to set style for movew out
    const handleMouseOut = () => {
        setIsMouseOver(null)
    };

    useEffect(() => {
        // Only run when articles is null (i.e., loading state)
        if (newsCardInfo.newsArticles === null) {
            const loadArticles = async () => {
                const data = await fetchAllCategoryNewsData(newsCardInfo.countryName, 5);
                const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"]
                for (let category of categories) {

                    if (data[category].status === "error") {
                        console.log(`Erroer section - All news page ${newsCardInfo.countryName} articles ; Status : ${data[category].status}`);
                        console.log(`Error code: ${data.code}`)
                        console.log(`Error message - ${data.message}`);
                        // setNoNews(true);
                        setTimeout(() => setNoNews(true), 3000);
                    }
                    else if (data[category].status === "ok" && data[category].totalResults > 0) {
                        setnewsCardInfo(prev => ({
                            ...prev,
                            newsArticles: data
                        }));
                        setTimeout(() => setNoNews(true), 2000);
                        setnoNewsCountry(null);

                    }
                    else if (data[category].status === "ok" && data[category].totalResults === 0) {
                        console.log(`no news ${newsCardInfo.countryName}`)
                        // setnoNewsCountry(newsCardInfo.countryName);
                        setTimeout(() => setNoNews(true), 2000);
                    }
                };
            }
            loadArticles();
        }
    }, [newsCardInfo.countryName, newsCardInfo.newsArticles]); // Trigger fetch whenever country changes

    // State to determine the no news
    const [noNews, setNoNews] = useState(false);

    // State to determine news available for country
    const [noNewsCountry, setnoNewsCountry] = useState(null);

    useEffect(() => {
        if (noNews) {
            setTimeout(() => {
                setnoNewsCountry(newsCardInfo.countryName);
            }, 2000);
        }
        setNoNews(false);
    }, [noNews, newsCardInfo.countryName])

    return (
        <div className='container px-2 py-3'>
            <h1>Top Headlines</h1>
            <hr className='my-3' style={{ ...(mode.theme === "light" ? { border: "none", height: "3px", backgroundColor: "black", opacity: "0.8" } : { border: "none", height: "3px", backgroundColor: "white", opacity: "08" }) }} />

            {/*   Country Tabs   */}
            <div className="container">
                <ul className="nav nav-tabs" htmlFor="nav-tabContent" id='nav-countryTabs' aria-controls='nav-India' style={{ border: "none" }}>
                    <li className="nav-item">
                        <button type="button" className={`btn btn-light ${newsCardInfo.countryName === "India" ? "show active" : ""}`} aria-current="page" role="tab" id='tab-India' onClick={() => handleCountry("India")} onMouseOver={() => handleMouseOver("India")} onMouseOut={() => handleMouseOut()} onFocus={() => handleFocus("India")} style={countryButtonStyle("India", isMouseOver, isFocus, mode)}>India</button>
                    </li>
                    <li className="nav-item">
                        <button type="button" className={`btn btn-light ${newsCardInfo.countryName === "US" ? "show active" : ""}`} aria-current="page" role="tab" id='tab-US' onClick={() => handleCountry("US")} onMouseOver={() => handleMouseOver("US")} onMouseOut={() => handleMouseOut()} onFocus={() => handleFocus("US")} style={countryButtonStyle("US", isMouseOver, isFocus, mode)}>USA</button>
                    </li>
                    <li className="nav-item">
                        <button type="button" className={`btn btn-light ${newsCardInfo.countryName === "China" ? "show active" : ""}`} aria-current="page" role="tab" id='tab-China' onClick={() => handleCountry("China")} onMouseOver={() => handleMouseOver("China")} onMouseOut={() => handleMouseOut()} onFocus={() => handleFocus("China")} style={countryButtonStyle("China", isMouseOver, isFocus, mode)}>China</button>
                    </li>
                </ul>
            </div>

            {newsCardInfo.newsArticles !== null ? (
                Object.entries(newsCardInfo.newsArticles).map(([category, ObjectArticles], i, arr) => (
                    <div className="container tab-content" id="nav-tabContent" key={category}>
                        <div className="tab-pane fade show active" id={`nav-${newsCardInfo.countryName}`}
                            role="tabpanel" aria-labelledby={`tab-${newsCardInfo.countryName}-${category}`}>
                            {/*   News cards display   */}
                            {ObjectArticles !== null ? (
                                <div className="container row d-flex justify-content-center">
                                    <div className="row w-auto">
                                        {ObjectArticles.articles.slice(0, 3).map((article, idx) => (
                                            <div className="col-md-4 mb-3" key={idx}>
                                                <NewsItem
                                                    urlToImage={article.urlToImage}
                                                    title={article.title}
                                                    description={article.description}
                                                    category={category}
                                                    url={article.url}
                                                    publishedAt={article.publishedAt}
                                                    mode={mode}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="container d-flex justify-content-center my-3">
                                        <NavLink className={`btn ${mode.theme === "light" ? "btn btn-success" : "btn-outline-success"} p-2`}
                                            to={`category/${newsCardInfo.countryName}/${category}`} role="button" style={{ color: "white", borderColor: "white" }}>View More</NavLink>
                                    </div>
                                    {i !== arr.length - 1 && (<hr className='my-3' style={{ ...(mode.theme === "light" ? { border: "none", margin: "auto", height: "1px", width: "80%", backgroundColor: "black", opacity: "0.8" } : { border: "none", margin: "auto", height: "1px", width: "80%", backgroundColor: "white", opacity: "08" }) }} />)}
                                </div>
                            ) : (
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border my-5" style={{ width: "3rem", height: "3rem" }} role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) :
                (
                    noNewsCountry === newsCardInfo.countryName) ?
                    (
                        <p className="text-center mt-5">No news found</p>
                    ) :
                    (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border my-5" style={{ width: "3rem", height: "3rem" }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
        </div >
    )
}