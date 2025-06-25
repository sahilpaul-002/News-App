import React, {useEffect} from 'react'
import LandingNews from './LandingNews'
import { useOutletContext } from 'react-router-dom'

export default function Home() {
    const { mode, progress, setProgress } = useOutletContext();

    // useEffect with empty dependency to ensure that the useEffect runs when the UI is rendered but only once
    useEffect(() => {
        if (progress > 0 && progress < 100) {
            setProgress(prev => prev + 50)
        }
    }, [progress, setProgress])

    return (
        <>
            {/*   Carpousel   */}
            <div id="carouselExampleInterval" className="carousel slide carousel carousel-dark slide mt-5 mb-2 p-2 border border-dark-subtle" data-bs-ride="carousel" style={{ ...(mode.theme === "light" ? { boxShadow: "0 10px 50px rgba(0, 0, 0, 0.9)" } : { boxShadow: "0 10px 50px rgba(167, 163, 163, 0.6)" }) }}>
                <div className="carousel-inner">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="4" aria-label="Slide 5"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="5" aria-label="Slide 6"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="6" aria-label="Slide 7"></button>
                    </div>
                    <div className="carousel-item active" data-bs-interval="3000" style={{ height: '70vh', overflow: 'hidden', }}>
                        <img src="/Images/businessNews.jpeg" className="d-block w-100 opacity-75" alt="Business News" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Business</h3>
                            <p className=" fw-medium fs-5">Stay updated on global markets and big deals.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="5000" style={{ height: '70vh', overflow: 'hidden', }}>
                        <img src="/Images/entertainmentNews.jpeg" className="d-block w-100 opacity-75" alt="Entertainment News" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Entertainment</h3>
                            <p className=" fw-medium fs-5">Catch the latest movies, shows, and celebrity buzz.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="5000" style={{ height: '70vh', overflow: 'hidden', }}>
                        <img src="/Images/generalNews.jpeg" className="d-block w-100 opacity-75" alt="General News" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>General</h3>
                            <p className=" fw-medium fs-5">Top stories and headlines from around the world.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="5000" style={{ height: '70vh', overflow: 'hidden', }}>
                        <img src="/Images/healthNews.jpeg" className="d-block w-100 opacity-75" alt="Health News" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Health</h3>
                            <p className=" fw-medium fs-5">Wellness tips, medical updates, and health trends.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="5000" style={{ height: '70vh', overflow: 'hidden', }}>
                        <img src="/Images/scienceNews.jpg" className="d-block w-100 opacity-75" alt="Science News" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Science</h3>
                            <p className=" fw-medium fs-5">New discoveries, space, and science explained.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="5000" style={{ height: '70vh', overflow: 'hidden', }}>
                        <img src="/Images/sportsNews.jpeg" className="d-block w-100 opacity-75" alt="Sports News" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Sports</h3>
                            <p className=" fw-medium fs-5">Live scores, match results, and game highlights.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="5000" style={{ height: '70vh', overflow: 'hidden', }}>
                        <img src="/Images/technologyNews.jpeg" className="d-block w-100 opacity-75" alt="Technology News" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Technology</h3>
                            <p className=" fw-medium fs-5">Latest gadgets, tech trends, and innovations.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*   NEWS SECTION */}
            < div className="container px-2 py-3" >
                <LandingNews mode={mode} />
            </div >
        </>
    )
}
