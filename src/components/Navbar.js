import React, {useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navbarDropdownStyle } from "../Style"
import EverythingNewsSearch from './EverythingNewsSearch'
import { fetchSearchData } from '../fetchData';

export default function Navbar(props) {
    // Destructuring props
    const { title, mode, switchMode, setProgress } = props

    // State for collapsed navbar (mobile version)
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Function to change the state for collapsed navbar
    const collapsedNavbar = () => {
        setIsCollapsed(!isCollapsed);
    }

    // State to hold the text input
    const [text, setText] = useState(null);
    // Function to handle text input change
    const handleOnChange = (event) => {
        setText(event.target.value);
        if (event.target.value.trim() === "") {
            setText(null); // Clear the text if input is empty
        }
        else {
            setText(event.target.value); // Update the text state with the current input value
        }
    }
    // State to hold search results
    const [searchResults, setSearchResults] = useState([]);
    //
    const [totalResults, setTotalResults] = useState(0);
    //
    const [noSearchNews, setNoSearchNews] = useState(null);
    // 
    const [totalArticlesFetched, setTotalArticlesFetched] = useState(0);
    // State to handle search submission
    const [isSubmit, setIsSubmit] = useState(false);
    // State for pagination and scroll handling
    const [hasMore, setHasMore] = useState(true);
    // Function to handle search submission
    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (!text || text.trim() === "") {
            setSearchResults([]); // Just to be safe — hide any old results
            setText(null); // Clear the text if input is empty
            return;
        }
        else {
            setIsSubmit(true);
            const loadArticles = async () => {
                const data = await fetchSearchData(text, 5);
                setTotalResults(data.totalResults);
                if (data.status === "error") {
                    console.log(`Error section - Search News Articles ; Status : ${data.status}`);
                    console.log(`Error code: ${data.code}`);
                    console.log(`Error message - ${data.message}`);
                    setTimeout(() => {
                        setNoSearchNews(true);
                    }, 2000);
                }
                else if (data.status === "ok" && data.totalResults > 0) {
                    setTotalArticlesFetched(data.articles.length)
                    setSearchResults([...data.articles])
                    if(totalResults > 5) 
                    {
                        setHasMore(true);
                    }
                }
                else if (data.status === "ok" && data.totalResults === 0) {
                    setTimeout(() => {
                        setNoSearchNews(true);
                    }, 2000);
                }
            };
            loadArticles();
        }
    }

    return (
        <div className="container mt-4">
            <nav className="navbar navbar-expand-lg p-2 fixed-top d-flex" style={{ ...(mode.theme === "light" ? { backgroundColor: "#b7e4c7", color: "black", boxShadow: "0 10px 50px rgba(0, 0, 0, 0.6)" } : { backgroundColor: "#212529", color: "white", boxShadow: "0 10px 50px rgba(167, 163, 163, 0.6)" }) }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" onClick={() => setProgress(prev => prev + 50)}
                        style={{ ...(mode.theme === "light" ? { color: "black" } : { color: "white" }) }}>{title}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={collapsedNavbar}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse mx-2" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className={`nav-item  ${isCollapsed ? "" : "mx-2"}`}>
                                <Link className="nav-link link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" aria-current="page" to="/news" onClick={() => setProgress(prev => prev + 50)} style={{ ...(mode.theme === "light" ? { color: "black" } : { color: "white" }) }}>All News</Link>
                            </li>
                            <li className={`nav-item  ${isCollapsed ? "" : "mx-2"}`}>
                                <div className="dropdown">
                                    <button className="btn btn-light dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{
                                            background: "transparent",
                                            border: "transparent",
                                            ...(isCollapsed ? { paddingLeft: "0" } : {}),
                                            ...(mode.theme === "light" ? { color: "black" } : { color: "white" })
                                        }}>
                                        Category General
                                    </button>
                                    <ul className="dropdown-menu" style={{ ...(mode.theme === "light" ? { backgroundColor: "white", color: "black" } : { backgroundColor: "#212529", color: "white" }) }}>
                                        <li>
                                            <NavLink
                                                className={({ isActive }) => isActive ? "active dropdown-item" : "dropdown-item"}
                                                to="/news/category/US/general" onClick={() => setProgress(prev => prev + 50)}
                                                style={({ isActive }) =>
                                                    navbarDropdownStyle(isActive, mode)
                                                }
                                            >
                                                General US
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className={({ isActive }) => isActive ? "active dropdown-item" : "dropdown-item"}
                                                to="/news/category/China/general" onClick={() => setProgress(prev => prev + 50)}
                                                style={({ isActive }) =>
                                                    navbarDropdownStyle(isActive, mode)
                                                }
                                            >
                                                General China
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className={`nav-item  ${isCollapsed ? "" : "mx-2"}`}>
                                <div className="dropdown">
                                    <button className="btn btn-light dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{
                                            background: "transparent",
                                            border: "transparent",
                                            ...(isCollapsed ? { paddingLeft: "0" } : {}),
                                            ...(mode.theme === "light" ? { color: "black" } : { color: "white" })
                                        }}>
                                        Category Business
                                    </button>
                                    <ul className="dropdown-menu" style={{ ...(mode.theme === "light" ? { backgroundColor: "white", color: "black" } : { backgroundColor: "#212529", color: "white" }) }}>
                                        <li>
                                            <NavLink
                                                className={({ isActive }) => isActive ? "active dropdown-item" : "dropdown-item"}
                                                to="/news/category/US/business" onClick={() => setProgress(prev => prev + 50)}
                                                style={({ isActive }) =>
                                                    navbarDropdownStyle(isActive, mode)
                                                }
                                            >
                                                Business US
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className={({ isActive }) => isActive ? "active dropdown-item" : "dropdown-item"}
                                                to="/news/category/China/business" onClick={() => setProgress(prev => prev + 50)}
                                                style={({ isActive }) =>
                                                    navbarDropdownStyle(isActive, mode)
                                                }
                                            >
                                                Business China
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className={`nav-item  ${isCollapsed ? "" : "mx-2"}`}>
                                <Link className="nav-link" to="/about" onClick={() => setProgress(prev => prev + 50)} style={{ ...(mode.theme === "light" ? { color: "black" } : { color: "white" }) }}>About</Link>
                            </li>
                        </ul>

                        {/*   Search Form   */}
                        <form className={`d-flex ${isCollapsed ? "" : "mx-2"}`} role="search" onSubmit={handleOnSubmit}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleOnChange} />
                            <button className={`btn btn-outline-${mode.theme === "light" ? "dark" : "success"}`} type="submit">Search</button>
                        </form>

                        <div className={`form-check form-switch ${mode.theme === "light" ? "form-check-reverse" : ""} ${isCollapsed ? "my-2" : "mx-2"}`}>
                            <input className="form-check-input" type="checkbox" role="switch"
                                id={`${mode.theme === "light" ? "switchCheckReverse" : "switchCheckChecked"}`} onClick={switchMode} />
                            <label className="form-check-label" htmlFor={`${mode.theme === "light" ? "switchCheckReverse" : "switchCheckChecked"}`}>{mode.text}</label>
                        </div>
                    </div>
                </div>
            </nav>

            {/*   Search Results   */}
            <EverythingNewsSearch
                text={text}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                isSubmit={isSubmit}
                setIsSubmit={setIsSubmit}
                totalResults={totalResults}
                noSearchNews={noSearchNews}
                setNoSearchNews={setNoSearchNews}
                totalArticlesFetched={totalArticlesFetched}
                setTotalArticlesFetched={setTotalArticlesFetched}
                hasMore={hasMore}
                setHasMore={setHasMore}
                mode={mode} />

        </div>
    )
}
