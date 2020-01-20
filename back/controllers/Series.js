const Series = require('../service/SeriesService');

module.exports.displayFollowedSeries = function displayFollowedSeries (req, res) {
  const userId = req.query.userId;
  tmp = "";
  Series.displayFollowedSeries(userId)
    .then(followedSeriesList => {
      tmp = JSON.stringify(followedSeriesList);
    })
    .catch(err => {
      tmp += "-1";
      console.log(err);
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};

module.exports.displayEpisodesSeen = function displayEpisodesSeen (req, res) {
  const userId = req.query.userId;
  tmp = "";
  Series.displayEpisodesSeen(userId)
    .then(episodesSeenList => {
      tmp = JSON.stringify(episodesSeenList);
    })
    .catch(err => {
      tmp += "-1";
      console.log(err);
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};