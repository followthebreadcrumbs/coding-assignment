import React from "react";
import NewsLayout from "./NewsLayout";
import { TNewsData } from "./News";
import { useFetchData } from "../helpers/fetchData";
import Spinner from "../Spinner";

import "./Index.scss";

const NewsBlock: React.FC = () => {
  const [randNews, setRandNews] = React.useState<string[]>([]);
  const [asc, setSort] = React.useState<boolean>(true);

  const NEWS_LIMIT = 10;

  const {
    isLoading: newsIsLoading,
    data: newsData,
    error: newsLoadingError, //TODO error handling
  } = useFetchData(["https://hacker-news.firebaseio.com/v0/topstories.json"]);

  const getRandomNews = (news: any[]) => {
    const data = [];
    if (news.length !== 0)
      for (let i = 0; i < NEWS_LIMIT; i++) {
        data.push(news[Math.floor(Math.random() * news.length)]);
      }
    return data;
  };

  //get random 10 news
  React.useEffect(() => {
    if (newsData) setRandNews(getRandomNews(newsData));
  }, [newsData, newsIsLoading]);

  //get data for each of 10 news
  const {
    isLoading: persentageLoading,
    data: currentNews,
    error: currentNewsErrors, //TODO
  } = useFetchData(
    randNews.map(
      (item) => `https://hacker-news.firebaseio.com/v0/item/${item}.json`
    ),
    []
  );

  const sortingByScore = React.useCallback(
    (currentNews: TNewsData[], asc: boolean = true) => {
      return currentNews.sort((a, b) => {
        return asc ? a.score - b.score : b.score - a.score;
      });
    },
    [currentNews]
  );

  return (
    <>
      {persentageLoading < 100 ? (
        <Spinner persent={persentageLoading} />
      ) : (
        <div className="news-block__container">
          <div className="news-block__layout">
            <div className="news-block__description">
              <h1>Coding Assignment</h1>
              Create a webpage that displays 10 random Hacker News stories using
              the Hacker News API. The stories must be listed in ascending order
              based on the stories score. <h3>The UI must include:</h3>
              <ul>
                <li>Story title</li>
                <li>Story URL</li> <li>Story timestamp </li>
                <li>Story score </li>
                <li>Author id </li>
                <li>Author karma score </li>
                <li>A dummy image (not from API – just a static asset)</li>
              </ul>
              <h3>Hint: You’ll be needing the following endpoints: </h3>
              <ul>
                <li>
                  Top stories:
                  https://hacker-news.firebaseio.com/v0/topstories.json
                </li>
                <li>
                  Story item:https://hacker-news.firebaseio.com/v0/item/$id.json
                </li>
                <li>
                  User: https://hacker-news.firebaseio.com/v0/user/$id.json
                </li>
                <li>API documentation: https://github.com/HackerNews/API</li>
              </ul>
              <h3>Requirements: </h3>
              <ul>
                <li>UI must be responsive</li>
                <li> CSS must be compiled with a preprocessor</li>
                <li> Do not use a UI library or CSS framework</li>
              </ul>
              <h3>Bonus Points: </h3>
              <ul>
                <li>• Visual eye-candy and user experience </li>
                <li>Use a modern Javascript framework </li>
                <li>Use Typescript</li>
              </ul>
            </div>
            <div className="news-elements__container">
              <div className="news-elements__header">
                <button className="sort-button" onClick={() => setSort(!asc)}>
                  sort {!asc ? "asc" : "desc"}
                </button>
              </div>
              <div>
                {currentNews && (
                  <NewsLayout currentNews={sortingByScore(currentNews, asc)} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsBlock;
