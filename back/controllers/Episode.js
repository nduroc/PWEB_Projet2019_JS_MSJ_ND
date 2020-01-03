const Episode = require('../service/EpisodeService');

module.exports.markEpisode = function markEpisode (req, res) {
  const serieId = req.query.serieId;
  const userId = req.query.userId;
  const seasonNumber = req.query.seasonNumber
  const episodeNumber = req.query.episodeNumber

  Episode.markEpisode(serieId, userId, seasonNumber, episodeNumber)
    .then(result => {
      console.log(result + 'records updated')
      console.log('Episode marked')
    })
    .catch(err => {
      console.log(err)
    });
};

module.exports.unmarkEpisode = function unmarkEpisode (req, res) {
  const serieId = req.query.serieId;
  const userId = req.query.userId;
  const seasonNumber = req.query.seasonNumber
  const episodeNumber = req.query.episodeNumber
  
  Episode.unmarkEpisode(serieId, userId, seasonNumber, episodeNumber)
    .then(result => {
      console.log(result + 'records updated')
      console.log('Episode unmarked')
    })
    .catch(err => {
      console.log(err)
    });
};
