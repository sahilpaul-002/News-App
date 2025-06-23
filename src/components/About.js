import React, { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom";
import { outerCardStyle } from "../Style";
import { innerCardStyle } from "../Style";
import { bodyCardStyle } from "../Style";
import PropTypes from 'prop-types';

export default function About() {
    const { mode } = useOutletContext();

    const aboutInfo = [
        {
            title: "📢 Unified News Dashboard",
            description: "The homepage aggregates top stories from multiple categories like General, Business, Science, and more — giving users a quick snapshot of global happenings."
        },
        {
            title: "🌍 Country-Specific News Tabs",
            description: "Browse news tailored for India, the US, and China. The categorized tabs offer users localized content in a seamless tabbed interface."
        },
        {
            title: "🗂️ News Categories at a Glance",
            description: "Users can explore 7 major categories: Business, Entertainment, General, Health, Science, Sports, and Technology — ensuring a diverse news experience."
        },
        {
            title: "🔗 Direct Access to Sources",
            description: "Each news card includes a 'Read More' button that redirects users to the original article source for full, trusted coverage."
        },
        {
            title: "📈 Progressive News Loading",
            description: "The 'View More' button allows users to progressively load additional news without page refreshes, improving performance and experience."
        },
        {
            title: "📦 Clean & Organized Card Layout",
            description: "News articles are displayed using responsive card layouts and accordions — making it easy to scan headlines and dive deeper when interested."
        },
        {
            title: "🎯 Targeted Category Pages",
            description: "Clicking on a category (e.g., 'US - Business') navigates users to a dedicated page with only relevant articles, supporting focused reading."
        },
        {
            title: "🌗 Light/Dark Mode Toggle",
            description: "Users can switch between light and dark modes, providing a visually comfortable experience across various lighting conditions."
        },
        {
            title: "🔍 Instant Search Bar",
            description: "The search bar allows users to quickly find specific headlines or stories, enhancing navigability and efficiency."
        },
        {
            title: "📱 Responsive & Accessible Design",
            description: "The app is optimized for multiple screen sizes, ensuring accessibility across desktops, tablets, and mobile devices."
        }
    ];


    // State to track expansion of all cards at once
    const [expandAll, setExpandAll] = useState(false);

    // State for individual cards
    const [expandedCards, setExpandedCards] = useState(
        Object.fromEntries(aboutInfo.map((_, index) => [`card${index}`, false]))
    );

    // Toggle all cards
    const handleExpandAll = () => {
        const newExpandState = !expandAll;
        const updatedStates = Object.fromEntries(
            aboutInfo.map((_, index) => [`card${index}`, newExpandState])
        );
        setExpandAll(newExpandState);
        // setExpandAll(prev => !prev);
        setExpandedCards(updatedStates);
    };

    // Toggle individual cards
    const handleExpandCard = (cardKey) => {
        setExpandedCards(prev => ({
            ...prev,
            [cardKey]: !prev[cardKey]
        }));
    };

    //Logic for smooth transition of expanding / collapsing of the cards
    const btnStyleCheck = () => {
        if (expandAll && (Object.values(expandedCards).every(Boolean)===false)) {
            return "btn btn-danger";
        }
        else if (expandAll || (Object.values(expandedCards).every(Boolean))) {
            return "btn btn-success";
        }
        else if (expandAll === false || (Object.values(expandedCards).every(Boolean)===false)) {
            return "btn btn-danger";
        }
    }
    //Logic for text of the button on expanding / collapsing of the cards
    const btnTextCheck = () => {
        if (expandAll === true && (Object.values(expandedCards).every(Boolean)===false)) {
            return "Expand All";
        }
        else if (expandAll || (Object.values(expandedCards).every(Boolean))) {
            return "Collapse All";
        }
        else if (expandAll === false || (Object.values(expandedCards).every(Boolean)===false)) {
            return "Expand All";
        }
    }

    // Change of state of expandAll in effect of the respective conditions
    useEffect(() => {
        const allExpanded = Object.values(expandedCards).every(Boolean);
        setExpandAll(allExpanded);
    }, [expandedCards]);

    return (
        <div className="container py-5 px-5 rounded" style={outerCardStyle(mode)}>
            <h2 className="my-3">About Us</h2>
            <div className="accordion" id="accordionExample">

                {/* Card 1 */}
                {aboutInfo.map((item, index) => {
                    const cardKey = `card${index}`;
                    return (
                        <div key={cardKey} className="card my-1" style={innerCardStyle(mode)}>
                            <div className="card-header">
                                <h2 className="mb-1">
                                    <button
                                        className="btn btn-light"
                                        type="button"
                                        onClick={() => handleExpandCard(cardKey)}
                                        style={innerCardStyle(mode)}
                                    >
                                        {item.title}
                                    </button>
                                </h2>
                            </div>
                            {expandedCards[cardKey] && (
                                <div className="collapse show" style={bodyCardStyle(mode)}>
                                    <div className="card-body">
                                        {item.description}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Expand All Button */}
            <div className="container my-3">
                <button
                    type="button"
                    // className={expandAll || (expandedCards.card1 && expandedCards.card2 && expandedCards.card3) ? "btn btn-success" : "btn btn-warning"}
                    className={btnStyleCheck()}
                    onClick={handleExpandAll} >
                    {/* {expandAll || (expandedCards.card1 && expandedCards.card2 && expandedCards.card3) ? "Collapse All" : "Expand All"} */}
                    {btnTextCheck()}
                </button>
            </div>
        </div>
    );
}

About.propTypes = {
    mode: PropTypes.shape({
        theme: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        classNameAttribute: PropTypes.string.isRequired
    }).isRequired
}

About.defaultProps = {
    mode: {
        theme: 'light',
        text: 'Dark Mode',
        classNameAttribute: 'text-black'
    }
}