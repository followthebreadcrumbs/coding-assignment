export const fetchData = (
  url: string,
  callback: (data: any) => void,
  options?: RequestInit
) => {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      callback && callback(data);
    })
    .catch((err) => {
      throw new Error(err);
    });
};
