const Series = require('../service/SeriesService');

module.exports.displayFollowedSeries = function displayFollowedSeries (req, res) {
  const userId = req.params.userId;
  return Series.displayFollowedSeries(userId, req.body)
    .then(followedSeriesList => {
      return followedSeriesList
    })
    .catch(err => {
      throw err
    });
};

module.exports.displaySeries = function displaySeries (req, res) {
  return Series.displaySeries(req.params.pageNumber, req.body, req.params.search)
    .then(seriesList => {
      return seriesList
    })
    .catch(err => {
      throw err
    });
};
