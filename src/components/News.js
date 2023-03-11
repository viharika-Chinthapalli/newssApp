import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0)
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/everything?q=${props.category}&from=2023-03-02&to=2023-03-02&sortBy=popularity&apiKey=80daf3f9cca54f09a598ccf4bc147d5e&page=${page}&&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonk`;
    updateNews();
    // eslint-disable-next-line
  }, [])
  
  // const handlePrevious = async () => {
  //   setPage(page-1);
  //  updateNews();
  // };

  // const handleNext = async () => {
  //   console.log("Next");
  //   setPage(page+1);
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/everything?q=${props.category}&from=2023-03-02&to=2023-03-02&sortBy=popularity&apiKey=80daf3f9cca54f09a598ccf4bc147d5e&page=${page+1}&&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
          NewsMonk - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >

          <div className="container">

          
          <div className="row">
            {articles?.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevious}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              state.page + 1 >
              Math.ceil(state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div> */}


      </>
    );
}

News.defaultProps = {
  pageSize: 8,
};

News.propTypes = {
  pageSize: PropTypes.number,
};

export default News;
