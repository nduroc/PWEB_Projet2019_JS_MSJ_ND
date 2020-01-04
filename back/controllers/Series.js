const Series = require('../service/SeriesService');

module.exports.displayFollowedSeries = function displayFollowedSeries (req, res) {
  const userId = req.query.userId;
  return Series.displayFollowedSeries(userId, req.body)
    .then(followedSeriesList => {
      return JSON.stringify(followedSeriesList)
    })
    .catch(err => {
      console.log(err)
    });
};

/* module.exports.displaySeries = function displaySeries (req, res) {
  return Series.displaySeries(req.query.pageNumber, req.body, req.query.search)
    .then(seriesList => {
      return seriesList
    })
    .catch(err => {
      console.log(err)
    });
};
 */