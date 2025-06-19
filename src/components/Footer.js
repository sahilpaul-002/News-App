import React from 'react'

export default function Footer(props) {
    // Destructuring props
    const {mode} = props;
    return (
        <div className="card mt-5 pt-2" style={{...(mode.theme==="light"?{backgroundColor: "#b7e4c7", color: "black"}:{backgroundColor: "#212529", color: "white"}) }}>
            <div className="card-header">
                Quote
            </div>
            <div className="card-body">
                <figure>
                    <blockquote className="blockquote">
                        <p>A well-known quote, contained in a blockquote element.</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </figcaption>
                </figure>
            </div>
        </div>
    )
}