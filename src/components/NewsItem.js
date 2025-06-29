import React, {useEffect} from 'react';
import {capitalize, handleNewsTitle, handelNewsDescription} from "../Functions";


export default function NewsItem(props) {
    // Handle tootips
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].forEach(tooltipTriggerEl => {
            new window.bootstrap.Tooltip(tooltipTriggerEl); // or bootstrap.Tooltip depending on how it's loaded
        });
    }, []);

    // Destructuring the props
    const { urlToImage, title, description, category, url, publishedAt, mode } = props;
    return (
        <>
            <div className="my3 pt-3">
                <div className="card" style={{ ...(mode.theme==="light"?{width: "18rem", height: "26rem"}:{border:"none", width: "18rem", height: "26rem"}) }}>
                    <img src={urlToImage} className="card-img-top" alt={`${category}-Image`} style={{ objectFit: 'cover', height: '180px' }} />
                    <div className="card-body">
                        <h6 className="card-title" style={{height: "3rem"}}>{handleNewsTitle(title)}</h6>
                        <h6 className="card-subtitle my-2 text-body-secondary pt-2"><u>{capitalize(category)}</u></h6>
                        <p className="card-text mb-4" data-bs-toggle="tooltip" data-bs-placement="bottom" 
                            data-bs-title={description} style={{height: "3rem"}}>{handelNewsDescription(description)}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem"}}>
                            <a href={url} className="btn btn-danger" target="_blank" rel="noopener noreferrer">Read More</a>
                            <p className="mb-0 fs-6">{publishedAt.slice(0, 10).split("").join("").split("-").reverse().join("-")}</p>
                        </div>
                    </div>
            </div>
            </div>
        </>
    )
}
