const Series = require('../service/SeriesService');

module.exports.displayFollowedSeries = function displayFollowedSeries (req, res) {
  const userId = req.query.userId;
  tmp = "";
  return Series.displayFollowedSeries(userId, req.body)
    .then(followedSeriesList => {
      tmp = JSON.stringify(followedSeriesList);
      //tmp = followedSeriesList.toString();
      //console.log(tmp)
    })
    .catch(err => {
      tmp += "-1";
      console.log(err);
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
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