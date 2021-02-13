const ghpages = require("gh-pages");

ghpages.publish('build', (err) => {
  console.log(err);
})