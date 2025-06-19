import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
    // Destructuring props
    const { title, mode, switchMode } = props

    // State for collapsed navbar (mobile version)
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Function to change the state for collapsed navbar
    const collapsedNavbar = () => {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <nav className="navbar navbar-expand-lg p-2" style={{...(mode.theme==="light"?{backgroundColor: "#b7e4c7", color: "black", boxShadow: "0 10px 50px rgba(0, 0, 0, 0.9)"}:{backgroundColor: "#212529", color: "white", boxShadow: "0 10px 50px rgba(167, 163, 163, 0.6)"}) }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{...(mode.theme==="light"?{color: "black"}:{color: "white"}) }}>{title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={collapsedNavbar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mx-2" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className={`nav-item  ${isCollapsed ? "" : "mx-2"}`}>
                            <Link className="nav-link link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" aria-current="page" to="/news" style={{...(mode.theme==="light"?{color: "black"}:{color: "white"}) }}>All News</Link>
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
                                        ...(mode.theme==="light"?{color: "black"}:{color: "white"})
                                    }}>
                                    Categories
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/">Business</Link></li>
                                    <li><Link className="dropdown-item" to="/">Entertainment</Link></li>
                                    <li><Link className="dropdown-item" to="/">Genereal</Link></li>
                                    <li><Link className="dropdown-item" to="/">Health</Link></li>
                                    <li><Link className="dropdown-item" to="/">Science</Link></li>
                                    <li><Link className="dropdown-item" to="/">Sports</Link></li>
                                    <li><Link className="dropdown-item" to="/">Technology</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li className={`nav-item  ${isCollapsed ? "" : "mx-2"}`}>
                            <Link className="nav-link" to="/about" style={{...(mode.theme==="light"?{color: "black"}:{color: "white"}) }}>About</Link>
                        </li>
                    </ul>
                    <form className={`d-flex ${isCollapsed ? "" : "mx-2"}`} role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className={`btn btn-outline-${mode.theme==="light"?"dark":"success"}`} type="submit">Search</button>
                    </form>
                    <div className={`form-check form-switch ${mode.theme==="light"?"form-check-reverse":""} ${isCollapsed ? "my-2" : "mx-2"}`}>
                        <input className="form-check-input" type="checkbox" role="switch" 
                        id={`${mode.theme==="light"?"switchCheckReverse":"switchCheckChecked"}`} onClick={switchMode}/>
                        <label className="form-check-label" htmlFor={`${mode.theme==="light"?"switchCheckReverse":"switchCheckChecked"}`}>{mode.text}</label>
                    </div>
                </div>
            </div>
        </nav>
    )
}
