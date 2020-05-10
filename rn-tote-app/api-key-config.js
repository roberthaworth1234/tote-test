const fs = require("fs");

fs.writeFile(
  "api-key.js",
  'const apiKey="test"; module.exports = apiKey;',
  "utf8",
  err => {
    if (err) {
      console.log(err);
    }
  }
);
