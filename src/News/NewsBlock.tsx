import React from "react";
import NewsLayout from "./NewsLayout";
import { TNewsData } from "./News";
import { fetchData } from "../helpers/fetchData";
import "./Index.scss";

const NewsBlock: React.FC = () => {
  const [randNews, setRandNews] = React.useState<string[]>([]);
  const [currentNews, setCurrentNews] = React.useState<TNewsData[]>([]);
  const [asc, setSort] = React.useState<boolean>(true);

  const NEWS_LIMIT = 10;

  const getNews = React.useCallback(async () => {
    const data = await fetchData(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
      (response) => {
        getRandomNews(response);
      }
    );
  }, []);

  const getNewsData = React.useCallback(
    (newsId) => {
      fetchData(
        `https://hacker-news.firebaseio.com/v0/item/${newsId}.json`,
        (data) => {
          console.log("1");
          setCurrentNews((prev) => [...prev, ...[data]]);
        }
      );
    },
    [randNews]
  );

  const getRandomNews = (news: any[]) => {
    const data = [];
    if (news.length !== 0)
      for (let i = 0; i < NEWS_LIMIT; i++) {
        data.push(news[Math.floor(Math.random() * news.length)]);
      }
    setRandNews(data);
  };

  const sortingByScore = React.useCallback(
    (currentNews: TNewsData[], asc: boolean = true) => {
      return currentNews.sort((a, b) => {
        return asc ? a.score - b.score : b.score - a.score;
      });
    },
    [currentNews]
  );

  React.useEffect(() => {
    getNews();
  }, []);

  React.useEffect(() => {
    randNews.forEach(getNewsData);
  }, [randNews]);

  return (
    <div className="news-block__container">
      <div className="news-block__layout">
        <div className="news-block__description">
          <p>
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
              <li>User: https://hacker-news.firebaseio.com/v0/user/$id.json</li>
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
          </p>
        </div>
        <div className="news-elements__container">
          <div className="news-elements__header">
            <button className="sort-button" onClick={() => setSort(!asc)}>
              sort {!asc ? "asc" : "desc"}
            </button>
          </div>
          <div>
            <NewsLayout currentNews={sortingByScore(currentNews, asc)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsBlock;
