const Episode = require('../service/EpisodeService');

module.exports.markEpisode = function markEpisode (req, res) {
  const serieId = req.params.serieId;
  const userId = req.params.userId;
  const seasonNumber = req.params.seasonNumber
  const episodeNumber = req.params.episodeNumber

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
  const serieId = req.params.serieId;
  const userId = req.params.userId;
  const seasonNumber = req.params.seasonNumber
  const episodeNumber = req.params.episodeNumber
  
  Episode.unmarkEpisode(serieId, userId, seasonNumber, episodeNumber)
    .then(result => {
      console.log(result + 'records updated')
      console.log('Episode unmarked')
    })
    .catch(err => {
      console.log(err)
    });
};
