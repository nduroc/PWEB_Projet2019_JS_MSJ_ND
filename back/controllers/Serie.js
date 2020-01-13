const Serie = require('../service/SerieService');

module.exports.displaySerieEpisode = function displaySerieEpisode (req, res) {
  const serieId = req.query.serieId;
  Serie.displaySerieEpisode(serieId, req.body)
    .then(result => {
      console.log('Episodes displayed')
      return result
    })
    .catch(err => {
      console.log(err)
    });
};

module.exports.isFollowedSerie = function isFollowedSerie (req, res) {
  const serieId = req.query.serieId;
  const userId = req.query.userId;
  Serie.isFollowedSerie(serieId,userId)
    .then(result => {
      if(result){
        console.log('This users follow this serie')
      } else {
        console.log('This users doesn\'t follow this serie')
      }
      return result
    })
    .catch(err => {
      console.log(err)
    });
};

module.exports.countFollowersSerie = function countFollowersSerie (req, res) {
  const serieId = req.query.serieId;
  Serie.countFollowersSerie(serieId)
    .then(result => {
      console.log(result + 'users follow this serie')
      return result
    })
    .catch(err => {
      console.log(err)
    });
};

module.exports.followSerie = function followSerie (req, res) {
  const showToFollow = JSON.parse(req.body.serieJson);
  const userId = req.query.userId;
  Serie.followSerie(showToFollow, userId)
    .then(() => {
      console.log('Serie followed')
    })
    .catch(err => {
      console.log(err)
    });
};

module.exports.unfollowSerie = function unfollowSerie (req, res) {
  const serieId = req.query.serieId;
  const userId = req.query.userId;
  Serie.unfollowSerie(serieId,userId)
    .then(() => {
      console.log('Serie unfollowed')
    })
    .catch(err => {
      console.log(err)
    });
};
