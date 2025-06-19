import React from 'react'
import { capitalize, calculatePublishTime } from '../Functions';
import { useParams, useLoaderData} from "react-router-dom";

export default function Category() {
  const { country, category } = useParams(); // For URL info
  const { categoryArticles } = useLoaderData(); // This gets the returned articles
  console.log(categoryArticles);
  console.log(categoryArticles[0].title);
  categoryArticles.slice(0,3).map((article,idx) => (console.log(article.title)));

  return (
    <>
      <h1>News : {country}-{capitalize(category)}</h1>
      <hr className='border border-2 border-secondary my-3' />

      {/*   Category news display logic   */}
      {categoryArticles.slice(0,3).map((article,idx) => (
        <div className="container px-3 py-2" key={idx}>
        <div className="card mb-3" style={{ maxWidth: "100rem" }}>
          <div className="row g-0">
            <div className="col-md-3">
              <img src={article.urlToImage} className="img-fluid rounded-start" alt="News" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.content}</p>
                <p className="card-text"><small className="text-body-secondary"><i>{calculatePublishTime(article.publishedAt)}</i></small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      ))};
    </>
  )
}
