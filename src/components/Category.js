import React, { useEffect, useState } from 'react'
import { capitalize, calculatePublishTime, handleNewsContent } from '../Functions';
import { Link, useOutletContext, useParams, useLoaderData } from "react-router-dom";
import { newsLinkStyle } from "../Style"
import { fetchMoreCategoryCountryData } from "../fetchData"

export default function Category() {
  const { mode, progress, setProgress } = useOutletContext();
  const { country, category } = useParams(); // For URL info
  const { data } = useLoaderData(); // This gets the returned articles

  useEffect(() => {
    if (progress > 0 && progress < 100) {
      setProgress(prev => prev + 50)
    }
  }, [progress, setProgress])

  // State to store the data of api
  const [categoryData, setCategoryData] = useState(data);

  //State to determine news lik is hovered
  const [hoveredLinkIndex, sethoveredLinkIndex] = useState(null);

  // State to determine news available for country
  const [noNewsCategory, setNoNewsCategory] = useState(false);

  // Change state for no articles of category
  useEffect(() => {
    if (data.totalResults === 0) {
      setTimeout(() => {
        setNoNewsCategory(true);
      }, 2000);
    }
  })

  //State to detemine the pagesize
  const [pageSize, setPageSize] = useState(6);

  // State to deterine the load more country
  const [loadMore, setLoadMore] = useState(false);

  //Change state for load more action
  useEffect(() => {
    if (loadMore) {
      const loadArticles = async () => {
        const newPageSize = pageSize + 5;
        const categoryData = await fetchMoreCategoryCountryData(country, category, newPageSize);
        if (categoryData.status === "error") {
          console.log(`Error section - ${country} ${category} news page; Status : ${data.status}`);
          console.log(`Error code:  ${categoryData.code}`)
          console.log(`Error message - ${categoryData.message}`);
          setTimeout(() => setNoNewsCategory(true), 2000);
        } else if (categoryData.status === "ok" && categoryData.totalResults > 0 && Array.isArray(categoryData.articles)) {
          setTotalArticlesFetched(prev => prev + categoryData.articles.length)
          setCategoryData(categoryData)
          setPageSize(newPageSize); // Only update after data is added
        } else if (categoryData.totalResults === 0) {
          setTimeout(() => setNoNewsCategory(true), 2000);
        }
        setLoadMore(false);
      };
      loadArticles();
    }
  }, [loadMore, categoryData, category, country, data, pageSize]);

  // Store the total noumber of articles for the category
  const totalArticles = data.totalResults;
  // State to store the total results fetched from the api
  const [totalArticlesFetched, setTotalArticlesFetched] = useState(0);

  return (
    <div className="container mt-5">
      <h1>News : {country}-{capitalize(category)}</h1>
      <hr className='my-3' style={{ ...(mode.theme === "light" ? { border: "none", height: "3px", backgroundColor: "black", opacity: "0.8" } : { border: "none", height: "3px", backgroundColor: "white", opacity: "08" }) }} />

      {/*   Category news display logic   */}
      {categoryData.articles.length !== 0 ? (
        categoryData.articles.map((article, idx) => (
          <div className="container px-3 py-2" key={idx}>
            <div className="card mb-3" style={{ maxWidth: "100rem"}}>
              <div className="row g-0">
                <div className="col-md-3">
                  <img src={article.urlToImage !== null ? article.urlToImage : "/Images/generalNews.jpeg"} className="img-fluid rounded-start" alt="News" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <Link to={article.url} target="_blank" rel="noopener noreferrer" onMouseOver={() => sethoveredLinkIndex(idx)} onMouseOut={() => sethoveredLinkIndex(null)} style={newsLinkStyle(hoveredLinkIndex === idx, mode)}><h5 className="card-title">{article.title}</h5></Link>
                    <p className="card-text">{handleNewsContent(article.content)}</p>
                    <p className="card-text"><small className="text-body-secondary"><i>{calculatePublishTime(article.publishedAt)}</i></small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) :
        (noNewsCategory) ?
          (
            <p className="text-center mt-5">No news found</p>
          ) :
          (
            <div className="d-flex justify-content-center">
              <div className="spinner-border my-5" style={{ width: "3rem", height: "3rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

      {categoryData.articles.length !== 0 ? (
        loadMore ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border my-5" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="container d-flex justify-content-center my-3">
            <button
              className={`btn ${mode.theme === "light" ? "btn btn-danger" : "btn-outline-danger"} p-2`}
              disabled={totalArticlesFetched > totalArticles ? true : false}
              onClick={() => setLoadMore(true)}
              style={{ color: "white", borderColor: "white" }}
            >
              View More
            </button>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  )
}
