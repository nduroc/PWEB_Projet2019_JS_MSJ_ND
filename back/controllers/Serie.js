const Serie = require('../service/SerieService');

module.exports.followSerie = function followSerie (req, res,) {
  const serieId = req.params.serieId;
  const userId = req.params.userId;
  Serie.followSerie(serieId,userId)
    .then(() => {
      console.log('Serie followed')
    })
    .catch(err => {
      throw err
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
      throw err
    });
};
