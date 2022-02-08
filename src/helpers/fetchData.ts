import React from "react";

export const useFetchData = (
  url: string[],
  initialState?: any,
  callback?: (data: any) => void,
  options?: RequestInit
) => {
  const [isLoading, setIsLoading] = React.useState<number>(0);
  const [data, setData] = React.useState<any>(initialState);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const fetchData = (
    url: string,
    persentageLoad: number,
    options?: RequestInit
  ) => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        callback && callback(data);
        setData((prev: any) => (prev ? [...prev, ...[data]] : data));
        setIsLoading((prev) => prev + persentageLoad);
      })
      .catch((err) => {
        setError(err);
      });
  };

  React.useEffect(() => {
    if (url && url.length > 0) {
      url.forEach((urlStr) => fetchData(urlStr, 100 / url.length, options));
    }
  }, [url.length]);
  return { isLoading, data, error };
};
