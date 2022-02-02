import React from "react";
import News, { TNewsData } from "./News";
import "./Index.scss";

const NewsLayout: React.FC<{ currentNews: TNewsData[] }> = ({
  currentNews,
}) => {
  return (
    <div className="layout__container">
      {
        !!currentNews &&
          currentNews.map((item, index) => (
            <News newsData={item} key={index} />
          )) /** better way to use nanoid */
      }
    </div>
  );
};

export default NewsLayout;
