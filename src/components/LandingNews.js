import React, { useEffect, useState } from 'react'
import { handleNewsContent, getCountryArticleIndexArray, fetchLandingNewsArticle } from '../Functions';
import indiaAllData from '../indiaAllSample';
import usAllData from '../usAllSample';
import chinaAllData from '../chinaAllSample';
import {countryButtonStyle, newsLinkStyle, articleTitleStyle} from "../Style"
import { Link } from 'react-router-dom';

export default function LandingNews(props) {
    const { mode } = props;

    // Set the information to show in the news item card
    const [newsRowInfo, setnewsRowInfo] = useState({
        countryName: "India",
        articles: null
    });

    // Change the state of the news item card information
    const handleCountry = async (country) => {
        // Change the state of articles to null to show the loader
        setnewsRowInfo({
            countryName: country,
            articles: null,
        });
        
        // Set the expanded article idex to inital value  so that only 1st article is expanded upon country change
        if(country==="India" || country==="US" || country==="China")
        {
            setExpandedIndexes({
                indiaExpandedIds: [0],
                usExpandedIds: [0],
                chinaExpandedIds: [0],
                country: country
            })
        }          
    };

    useEffect(() => {
        // Only run when articles is null (i.e., loading state)
        if (newsRowInfo.articles === null) {
            const loadArticles = async () => {
                const data = await fetchLandingNewsArticle(newsRowInfo.countryName, indiaAllData, usAllData, chinaAllData);
                setnewsRowInfo(prev => ({
                    ...prev,
                    articles: data
                }));
            };
            loadArticles();
        }
    }, [newsRowInfo.countryName, newsRowInfo.articles]); // Trigger fetch whenever country changes

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
    //

    //State to determine news lik is hovered
    const [isNewsLinkMouseOver, setIsNewLinkMouseOver] = useState(false);

    // State to determine highlighted article title of each country
    const [expandedIndexes, setExpandedIndexes] = useState({
        indiaExpandedIds: [0],
        usExpandedIds: [0],
        chinaExpandedIds: [0],
        country: "India"
    });
    // State to determine element is expanded when clicked
    const [clickToExpand, setClickToExpand] = useState(true);
    // Fucntiont handle expanded elements
    const handleAccordion = (idx, country) => {
        let idxArray=[...getCountryArticleIndexArray(country, expandedIndexes)];

        if (idxArray.includes(idx)) {
            idxArray = idxArray.filter(i => i !== idx);
            setClickToExpand(false);
        } else {
            idxArray.push(idx);
        }

        setExpandedIndexes(prev => {
            if (country === "India") {
                return {
                    ...prev,
                    indiaExpandedIds: idxArray,
                    country: "India"
                };
            } else if (country === "US") {
                return {
                    ...prev,
                    usExpandedIds: idxArray,
                    country: "US"
                };
            } else if (country === "China") {
                return {
                    ...prev,
                    chinaExpandedIds: idxArray,
                    country: "China"
                };
            } else {
                return prev;
            }
        });
    };
    // Use useEffect to check if element is cliked to expand
    useEffect(() => {
        // Run the useEffect hook if the clickToExpand is true
        if (clickToExpand) {
            const elements = document.querySelectorAll(".accordion-button");

            let expanded=[...getCountryArticleIndexArray(expandedIndexes.country, expandedIndexes)];

            elements.forEach((element) => {
                const controlId = element.getAttribute("aria-controls");
                const isExpanded = element.getAttribute("aria-expanded") === "true";


                if (controlId && isExpanded) {
                    const idx = parseInt(controlId.replace("collapse", ""), 10);
                    if (expanded.includes(idx)) {
                        expanded = expanded.filter(i => i !== idx);
                        
                        // Set to false because an element is collapsed
                        setClickToExpand(false);
                    } 
                    else {
                        expanded.push(idx);
                    }
                }
            });
            // Add the expanded index in the list
            setExpandedIndexes(prev => {
            if (expandedIndexes.country === "India") {
                return {
                    ...prev,
                    indiaExpandedIds: expanded,
                    country: "India"
                };
            } else if (expandedIndexes.country === "US") {
                return {
                    ...prev,
                    usExpandedIds: expanded,
                    country: "US"
                };
            } else if (expandedIndexes.country === "China") {
                return {
                    ...prev,
                    chinaExpandedIds: expanded,
                    country: "China"
                };
            } else {
                return prev;
            }
        });
            // Set to false as element added in list
            setClickToExpand(false);
        }
    }, [newsRowInfo, expandedIndexes, clickToExpand]); // rerun when articles change

    return (
        <>
            <h1 className='my-3'>Top Headlines</h1>
            <hr className='my-3' style={{...(mode.theme==="light"?{border:"none", height:"3px", backgroundColor:"black", opacity:"0.8"}:{border:"none", height:"3px", backgroundColor:"white", opacity:"08"} )}}/>

            {/*   Country Tabs  */}
            <div className="container mb-3">
                <ul className="nav nav-tabs" htmlFor="nav-tabContent" id='nav-countryTabs' aria-controls='nav-India' style={{border: "none"}}>
                    <li className="nav-item mx-1">
                        <button type="button" className={`btn btn-light ${newsRowInfo.countryName === "India" ? "show active" : ""}`} aria-current="page" role="tab" id='tab-India' onClick={() => handleCountry("India")} onMouseOver={() => handleMouseOver("India")} onMouseOut={() => handleMouseOut()} onFocus={() => handleFocus("India")} style={countryButtonStyle("India", isMouseOver, isFocus, mode)}>India</button>
                    </li>
                    <li className="nav-item mx-1">
                        <button type="button" className={`btn btn-light ${newsRowInfo.countryName === "US" ? "show active" : ""}`} aria-current="page" role="tab" id='tab-US' onClick={() => handleCountry("US")} onMouseOver={() => handleMouseOver("US")} onMouseOut={() => handleMouseOut()} onFocus={() => handleFocus("US")} style={countryButtonStyle("US", isMouseOver, isFocus, mode)}>USA</button>
                    </li>
                    <li className="nav-item mx-1">
                        <button type="button" className={`btn btn-light ${newsRowInfo.countryName === "China" ? "show active" : ""}`} aria-current="page" role="tab" id='tab-China' onClick={() => handleCountry("China")} onMouseOver={() => handleMouseOver("China")} onMouseOut={() => handleMouseOut()} onFocus={() => handleFocus("China")} style={countryButtonStyle("China", isMouseOver, isFocus, mode)}>China</button>
                    </li>
                </ul>
            </div>

            {/*   Display news in accrodian logic   */}
            {newsRowInfo.articles !== null ? (<div className="container tab-content" id="nav-tabContent">
                <div className="accordion" id={`nav-${newsRowInfo.countryName}`}
                    role="tabpanel" aria-labelledby={`tab-${newsRowInfo.countryName}`}>
                    {newsRowInfo.articles.slice(0, 4).map((article, idx) => (
                        <div className="accordion-item" key={idx}>
                            <h2 className="accordion-header" onClick={() => handleAccordion(idx, newsRowInfo.countryName)}>
                                <button className={`accordion-button ${idx !== 0 ? "collapsed" : ""}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`} aria-expanded={idx !== 0 ? "false" : "true"} aria-controls={`collapse${idx}`} style={articleTitleStyle(idx, getCountryArticleIndexArray(newsRowInfo.countryName, expandedIndexes))}>
                                    {article.title}
                                </button>
                            </h2>
                            <div id={`collapse${idx}`} className={`accordion-collapse collapse ${idx !== 0 ? "" : "show"}`} data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <Link to={article.url} target="_blank" rel="noopener noreferrer" onMouseOver={() => setIsNewLinkMouseOver(true)} onMouseOut={() => setIsNewLinkMouseOver(false)} style={newsLinkStyle(isNewsLinkMouseOver, mode)}>{handleNewsContent(article.content)}</Link>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>) : (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border my-5" style={{ width: "3rem", height: "3rem" }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </>
    )
}