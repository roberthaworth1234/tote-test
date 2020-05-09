import apiKey from "../../api-key";

const baseURL = "https://content.guardianapis.com/search?";

export const getArticlesBySearch = (keywords, topic, date, page) => {
  console.log(page);
  let datePageURL = `to-date=${date}&page=${page}`;
  if (keywords) {
    datePageURL = datePageURL + "&q=" + keywords;
  }
  if (topic) {
    datePageURL = datePageURL + "&section=" + topic.toLowerCase();
  }
  console.log(`${baseURL}${datePageURL}&api-key=${apiKey || "test"}`);
  return fetch(`${baseURL}${datePageURL}&api-key=${apiKey || "test"}`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};
