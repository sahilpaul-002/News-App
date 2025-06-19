import React, { useEffect, useState } from 'react'
import { handleNewsContent } from '../Functions';
import indiaAllData from '../indiaAllSample';
import usAllData from '../usAllSample';
import chinaAllData from '../chinaAllSample';
import { Link } from 'react-router-dom';

export default function LandingNews(props) {
    const { mode } = props;

    // Function to fetch the articles based on country
    const fetchArticle = (country) => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (country === "India") {
                    resolve(indiaAllData.articles);
                } else if (country === "US") {
                    resolve(usAllData.articles);
                } else {
                    resolve(chinaAllData.articles);
                }
            }, 2000); // 2 seconds delay
        });
    };

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
    };

    useEffect(() => {
        // Only run when articles is null (i.e., loading state)
        if (newsRowInfo.articles === null) {
            const loadArticles = async () => {
                const data = await fetchArticle(newsRowInfo.countryName);
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
    // Set style for by returning the style object to the respective element
    const getStyle = (country, mode) => {
        if (isMouseOver === country) {
            if (mode.theme === "light")
            {
                return {
                    backgroundColor: 'red',
                    color: "white",
                    transition: "all 0.3s ease"
                };
            }
            else if(mode.theme === "dark")
            {
                return {
                    backgroundColor: '#fefee3',
                    color: "black",
                    transition: "all 0.3s ease"
                };
            }
        }
        else if (isFocus === country) {
            if(mode.theme==="light")
            {
                return {
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: '2px solid red'
                }
            }
            else if(mode.theme==="dark")
            {
                return {
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: '2px solid white',
                    color: "white"
                }
            }
        }
        else {
            if(mode.theme==="light")
            {
                return {
                    border: "none",
                    borderBottom: "2px solid transparent", // Reserve space to avoid shifting
                    borderRadius: 0,
                    backgroundColor: "transparent", // Optional
                    color: "black"
                };
            }
            else if(mode.theme==="dark")
            {
                return {
                    border: "none",
                    borderBottom: "2px solid transparent", // Reserve space to avoid shifting
                    borderRadius: 0,
                    backgroundColor: "transparent", // Optional
                    color: "white"
                };
            }
        }
    }

    //State to determine news lik is hovered
    const [isNewsLinkMouseOver, setIsNewLinkMouseOver] = useState(false);
    //Set the sytle for news link on hover
    const newsLinkStyle = (mode) => {
        if (isNewsLinkMouseOver) {
            return {
                color: "blue",
                textDecoration: "none",
            }
        }
        else {
            return {
                color: "black",
                textDecoration: "none",
            }
        }
    }

    // State to determine the article title highlighting
    const [expandedIndexes, setExpandedIndexes] = useState([0]);
    // State to determine element is expanded when clicked
    const [clickToExpand, setClickToExpand] = useState(true);
    // Fucntiont handle expanded elements
    const handleAccordion = (idx) => {
        let idxArray = [...expandedIndexes];

        if (idxArray.includes(idx)) {
            idxArray = idxArray.filter(i => i !== idx);
            setClickToExpand(false);
        } else {
            idxArray.push(idx);
        }

        setExpandedIndexes(idxArray);
    };
    // Use useEffect to check if element is cliked to expand
    useEffect(() => {
        // Run the useEffect hook if the clickToExpand is true
        if (clickToExpand) {
            const elements = document.querySelectorAll(".accordion-button");
            // let  expanded = [];
            let expanded = [...expandedIndexes]; // shallow copy

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
            setExpandedIndexes(expanded);
            // Set to false as element added in list
            setClickToExpand(false);
        }
    }, [newsRowInfo, expandedIndexes, clickToExpand]); // rerun when articles change
    // Set style for article title
    const articleTitleStyle = (idx, mode) => {
        if (expandedIndexes.includes(idx)) {
            return {
                backgroundColor: "red",
                color: "white",
                otline: "none",
                boxShadow: "none"
            };
        }
        else {
            return {
                outline: "none",
                boxShadow: "none"
            };
        }
    }

    return (
        <>
            <h1 className='my-3'>Top Headlines</h1>
            <hr className='my-3' style={{...(mode.theme==="light"?{border:"none", height:"3px", backgroundColor:"black", opacity:"0.8"}:{border:"none", height:"3px", backgroundColor:"white", opacity:"08"} )}}/>

            {/*   Country Tabs  */}
            <div className="container mb-3">
                <ul className="nav nav-tabs" htmlFor="nav-tabContent" id='nav-countryTabs' aria-controls='nav-India' style={{border: "none"}}>
                    <li className="nav-item mx-1">
                        <button type="button" className={`btn btn-light ${newsRowInfo.countryName === "India" ? "show active" : ""}`} aria-current="page" role="tab" id='tab-India' onClick={() => handleCountry("India")} onMouseOver={() => handleMouseOver("India")} onMouseOut={() => handleMouseOut()} onFocus={() => handleFocus("India")} onBlur={() => handleMouseOut()} style={getStyle("India", mode)}>India</button>
                    </li>
                    <li className="nav-item mx-1">
                        <button type="button" className={`btn btn-light ${newsRowInfo.countryName === "US" ? "show active" : ""}`} aria-current="page" role="tab" id='tab-US' onClick={() => handleCountry("US")} onMouseOver={() => handleMouseOver("US")} onMouseOut={() => handleMouseOut()} onFocus={() => handleFocus("US")} onBlur={() => handleMouseOut()} style={getStyle("US", mode)}>USA</button>
                    </li>
                    <li className="nav-item mx-1">
                        <button type="button" className={`btn btn-light ${newsRowInfo.countryName === "China" ? "show active" : ""}`} aria-current="page" role="tab" id='tab-China' onClick={() => handleCountry("China")} onMouseOver={() => handleMouseOver("China")} onMouseOut={() => handleMouseOut()} onFocus={() => handleFocus("China")} onBlur={() => handleMouseOut()} style={getStyle("China", mode)}>China</button>
                    </li>
                </ul>
            </div>

            {/*   Display news in accrodian logic   */}
            {newsRowInfo.articles !== null ? (<div className="container tab-content" id="nav-tabContent">
                <div className="accordion" id={`nav-${newsRowInfo.countryName}`}
                    role="tabpanel" aria-labelledby={`tab-${newsRowInfo.countryName}`}>
                    {newsRowInfo.articles.slice(0, 4).map((article, idx) => (
                        <div className="accordion-item" key={idx}>
                            <h2 className="accordion-header" onClick={() => handleAccordion(idx)}>
                                <button className={`accordion-button ${idx !== 0 ? "collapsed" : ""}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`} aria-expanded={idx !== 0 ? "false" : "true"} aria-controls={`collapse${idx}`} style={articleTitleStyle(idx, mode)}>
                                    {article.title}
                                </button>
                            </h2>
                            <div id={`collapse${idx}`} className={`accordion-collapse collapse ${idx !== 0 ? "" : "show"}`} data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <Link to={article.url} target="_blank" rel="noopener noreferrer" style={newsLinkStyle(mode)} onMouseOver={() => setIsNewLinkMouseOver(true)} onMouseOut={() => setIsNewLinkMouseOver(false)}>{handleNewsContent(article.content)}</Link>
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
