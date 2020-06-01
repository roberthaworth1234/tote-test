const apiKey = require("../../api-key");

const baseURL = "https://content.guardianapis.com/search?";

export const getArticlesBySearch = (keywords, topic, date, page) => {
  let datePageURL = `to-date=${date}&page=${page}`;
  if (keywords) {
    datePageURL = datePageURL + "&q=" + keywords;
  }
  if (topic) {
    datePageURL = datePageURL + "&section=" + topic.toLowerCase();
  }
  return fetch(
    `${baseURL}${datePageURL}&api-key=${
      typeof apiKey !== "string" ? "test" : apiKey
    }`
  )
    .then(response => response.json())
    .then(data => {
      return data;
    });
};
