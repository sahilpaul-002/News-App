import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { newsLinkStyle } from "../Style";
import { calculatePublishTime } from '../Functions';
import { fetchSearchData } from '../fetchData';

export default function EverythingNewsSearch(props) {
    const {
        text,
        searchResults,
        setSearchResults,
        isSubmit,
        setIsSubmit,
        totalResults,
        noSearchNews,
        setNoSearchNews,
        totalArticlesFetched,
        setTotalArticlesFetched,
        hasMore,
        setHasMore,
        mode
    } = props;

    const resultBoxRef = useRef(null);
    const [searchResultIndex, setSearchResultIndex] = useState(null);
    const [loading, setLoading] = useState(false);

    // Reset on submit
    useEffect(() => {
        if (isSubmit) {
            setLoading(true);
            setNoSearchNews(false);
        }
    }, [isSubmit]);

    // Handle search results change
    useEffect(() => {
        if (isSubmit) {
            if (searchResults.length > 0) {
                setLoading(false);
                setNoSearchNews(false);
            } else {
                setLoading(true);
                const timer = setTimeout(() => {
                    setLoading(false);
                    setNoSearchNews(true);
                }, 2000);
                return () => clearTimeout(timer); // cleanup timeout
            }
        }
    }, [searchResults, isSubmit]);

    // Close result box when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (resultBoxRef.current && !resultBoxRef.current.contains(event.target)) {
                setSearchResults([]);
                setIsSubmit(false);
                setLoading(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [resultBoxRef, setSearchResults, setIsSubmit]);

    // Reference for scroll element
    const scrollRef = useRef(null);
    // State for page size
    const [pageSize, setPageSize] = useState(5);
    // State for loader when fetching more articles
    const [hasMoreLoader, setHasMoreLoader] = useState(false);
    // Function to handle scroll event
    const handleOnScroll = () => {
        const scrollElement = scrollRef.current

        if (!scrollElement || loading) return;
        
        const nearBottom = scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight - 5;
        if (totalArticlesFetched >= totalResults || totalArticlesFetched >= 20) {
            setHasMore(false);
            return
        }
        else if (nearBottom && hasMore ) {
            // Load more when reached bottom
            setHasMoreLoader(true);
            const loadArticles = async () => {
                const newPageSize = pageSize + 5;
                if (newPageSize > totalResults || newPageSize > 20)
                {
                    setHasMore(false);
                    setHasMoreLoader(false);
                    return;
                }
                const data = await fetchSearchData(text, newPageSize);

                if (data.status === "error") {
                    console.log(`Error section - Search News Articles ; Status : ${data.status}`);
                    console.log(`Error code: ${data.code}`);
                    console.log(`Error message - ${data.message}`);
                    setTimeout(() => {
                        setNoSearchNews(true);
                    }, 2000);
                }
                else if (data.status === "ok" && data.totalResults > 0) {
                    setTotalArticlesFetched(prev => prev + data.articles.slice(pageSize, newPageSize).length)
                    setSearchResults(prev => [...prev, ...data.articles.slice(pageSize, newPageSize)]);
                    setHasMoreLoader(false);
                }
                else if (data.status === "ok" && data.totalResults === 0) {
                    setTimeout(() => {
                        setNoSearchNews(true);
                        setHasMoreLoader(false);
                    }, 2000);
                }
                setHasMoreLoader(false);
                setPageSize(newPageSize);
            };
            loadArticles();
        }
    }
    useEffect(() => {
        console.log("Search Results:", searchResults);
    })

    if (!text || !isSubmit) return null;

    return (
        <div
            ref={resultBoxRef}
            className="position-absolute end-0 mt-2 me-2"
            style={{ zIndex: 999, width: "450px", top: "60px" }}
        >
            <div className="card p-3 shadow">
                {loading ? (
                    <div className="d-flex justify-content-center my-4">
                        <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : noSearchNews ? (
                    <p className="text-center mb-0">No news found for "{text}"</p>
                ) : (
                    <>
                        <h5 className="mb-3">{`Search Results For "${text}"`}</h5>
                        <div className="list-group"
                            ref={scrollRef}
                            onScroll={handleOnScroll}
                            style={{
                                maxHeight: "300px",
                                overflowY: "auto",
                                // scrollbarWidth: "none",  // Firefox
                                // msOverflowStyle: "none", // IE
                            }}>
                            {searchResults.map((article, index) => (
                                <ul className="list-group" key={index}>
                                    <li className="list-group-item mb-2 rounded shadow-sm">
                                        <h6 className="mb-1">{article.title || "No Title"}</h6>
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <p className="mb-0 fs-6 fst-italic">
                                                {calculatePublishTime(article.publishedAt)}
                                            </p>
                                            {article.url && (
                                                <Link
                                                    to="/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onMouseOver={() => setSearchResultIndex(index)}
                                                    onMouseOut={() => setSearchResultIndex(null)}
                                                    style={newsLinkStyle(searchResultIndex === index, mode)}
                                                >
                                                    Read Full News →
                                                </Link>
                                            )}
                                        </div>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </>
                )}

                {hasMoreLoader && (
                    <div className="d-flex justify-content-center my-4">
                        <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                            <span className="visually-hidden">Loading more...</span>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}
