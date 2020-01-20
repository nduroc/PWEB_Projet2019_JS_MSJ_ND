const Episode = require('../service/EpisodeService');

module.exports.markEpisode = function markEpisode (req, res) {
  const serieId = req.query.serieId;
  const userId = req.query.userId;
  const episodeId = req.query.episodeId;
  tmp = "";
  Episode.markEpisode(userId, episodeId, serieId)
    .then(result => {
      if (result === -1) {
        tmp += "-1";
      } else {
        tmp += result;
        console.log('Episode marked');
      }
    })
    .catch(err => {
      tmp += "-1";
      console.log(err);
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};

module.exports.unmarkEpisode = function unmarkEpisode (req, res) {
  const serieId = req.query.serieId;
  const userId = req.query.userId;
  const episodeId = req.query.episodeId;
  tmp = "";
  Episode.unmarkEpisode(userId, episodeId, serieId)
    .then(result => {
      if (result === -1) {
        tmp += "-1";
      } else {
        tmp += "1";
        console.log('Episode unmarked');
      }
    })
    .catch(err => {
      tmp += "-1";
      console.log(err);
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};
