import React from 'react'

export default function Footer(props) {
    // Destructuring props
    const { mode } = props;
    return (
        <div className="card mt-5 pt-2" style={{ ...(mode.theme === "light" ? { backgroundColor: "#b7e4c7", color: "black" } : { backgroundColor: "#212529", color: "white" }) }}>
            <div className="card-header text-center fw-bold">
                Stay Informed. Stay Ahead.
            </div>
            <div className="card-body">
                <figure className="text-center">
                    <blockquote className="blockquote">
                        <p>"In a world of noise, facts matter. Trust NewsScope for accurate, timely, and curated headlines."</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        Brought to you by <cite title="NewsScope Team">NewsScope Team</cite>
                    </figcaption>
                </figure>
            </div>
        </div>
    )
}