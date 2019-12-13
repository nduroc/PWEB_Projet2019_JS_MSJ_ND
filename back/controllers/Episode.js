const Episode = require('../service/EpisodeService');

module.exports.markEpisode = function markEpisode (req, res) {
  const serieId = req.params.serieId;
  const userId = req.params.userId;
  const seasonNumber = req.params.seasonNumber
  const episodeNumber = req.params.episodeNumber

  Episode.markEpisode(serieId, userId, seasonNumber, episodeNumber)
    .then(() => {
      console.log('Episode marked')
    })
    .catch(err => {
      throw err
    });
};

module.exports.unmarkEpisode = function unmarkEpisode (req, res) {
  const serieId = req.params.serieId;
  const userId = req.params.userId;
  const seasonNumber = req.params.seasonNumber
  const episodeNumber = req.params.episodeNumber
  
  Episode.unmarkEpisode(serieId, userId, seasonNumber, episodeNumber)
    .then(() => {
      console.log('Episode unmarked')
    })
    .catch(err => {
      throw err
    });
};
