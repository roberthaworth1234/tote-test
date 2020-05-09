exports.formatDates = arg => {
  let date = arg.getDate();
  let month = arg.getMonth() + 1;
  let year = arg.getFullYear();
  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;
  return `${year}-${month}-${date}`;
};

exports.validateSearch = keywords => {
  const regex = /[A-Za-z0-9\s_]/;
  let foundSpecialChar;
  keywords.split("").forEach(letter => {
    !regex.test(letter) ? (foundSpecialChar = true) : false;
  });
  return foundSpecialChar ? false : true;
};

exports.formatText = keywords => {
  return keywords
    .split(" ")
    .filter(word => {
      return word;
    })
    .join("%20");
};
