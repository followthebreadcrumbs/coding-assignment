import React from "react";
import { fetchData } from "../helpers/fetchData";
import "./Index.scss";

export type TNewsData = {
  by: string;
  descendants: number;
  id: number;
  score: 4;
  time: number;
  title: string;
  type: string;
  url: string;
};

type TAuthorData = {
  about: string;
  created: number;
  id: string;
  karma: number;
  submitted: number[];
};

const News: React.FC<{ newsData: TNewsData }> = ({ newsData }) => {
  const STATIC_IMAGE =
    "https://static.life.ru/posts/2017/08/1032478/87e1775cb79a22c13156b0db12db8256.jpg";

  const [authorDetails, setAuthorDetails] = React.useState<
    TAuthorData | undefined
  >();

  const getAuthorDetails = React.useCallback(() => {
    fetchData(
      `https://hacker-news.firebaseio.com/v0/user/${newsData.by}.json`,
      (authorData) => setAuthorDetails(authorData)
    );
  }, [newsData]);

  React.useEffect(() => {
    getAuthorDetails();
  }, []);
  return (
    <>
      {newsData && (
        <div
          className="news-item__container"
          style={{
            backgroundImage: `url(${STATIC_IMAGE})`,
          }}
        >
          <div className="layout">
            <div className="header">
              <div className="title__container">
                <div className="title">{newsData?.title}</div>
                <time className="date">
                  {new Date(newsData.time * 1000).toLocaleDateString("en-US")}
                </time>
              </div>
              <div className="score">{newsData.score}</div>
            </div>
            <div className="body">
              {newsData.url && (
                <a className="link" href={newsData.url}>
                  Follow
                </a>
              )}
              {authorDetails && (
                <div className="author">
                  by: {newsData.by}
                  <span className="karma-score"> ({authorDetails?.karma})</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default News;
