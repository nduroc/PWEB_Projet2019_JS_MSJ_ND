const Series = require('../service/SeriesService');

module.exports.followedSeries = function followedSeries (req, res) {
  const userId = req.params.userId;
  return Series.displayFollowedSeries(userId)
    .then(followedSeriesList => {
      return followedSeriesList
    })
    .catch(err => {
      throw err
    });
};
