const Serie = require('../service/SerieService');

module.addSerie = function addSerie (req, res) {
  const serieId = req.params.serieId;
  Serie.addSerie(serieId, req.body)
    .then(() => {
      console.log('Serie added')
    })
    .catch(err => {
      console.log(err)
    });
};

module.updateSerie = function updateSerie (req, res) {
  const serieId = req.params.serieId;
  Serie.updateSerie(serieId, req.body)
    .then(() => {
      console.log('Serie updated')
    })
    .catch(err => {
      console.log(err)
    });
};

module.exports.displaySerieEpisode = function displaySerieEpisode (req, res) {
  const serieId = req.params.serieId;
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
  const serieId = req.params.serieId;
  const userId = req.params.userId;
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
  const serieId = req.params.serieId;
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
  const serieId = req.params.serieId;
  const userId = req.params.userId;
  Serie.followSerie(serieId,userId)
    .then(() => {
      console.log('Serie followed')
    })
    .catch(err => {
      console.log(err)
    });
};

module.exports.unfollowSerie = function unfollowSerie (req, res) {
  const serieId = req.params.serieId;
  const userId = req.params.userId;
  Serie.unfollowSerie(serieId,userId)
    .then(() => {
      console.log('Serie unfollowed')
    })
    .catch(err => {
      console.log(err)
    });
};
