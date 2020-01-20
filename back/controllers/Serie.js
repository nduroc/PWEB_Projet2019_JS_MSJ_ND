const Serie = require("../service/SerieService");

module.exports.displaySerieEpisode = function displaySerieEpisode (req, res) {
  const serieId = req.query.serieId;
  let tmp = "";
  Serie.displaySerieEpisode(serieId)
    .then((result) => {
      tmp = JSON.stringify(result);
    })
    .catch((err) => {
      tmp += err;
      console.log(err);
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};

module.exports.isFollowedSerie = function isFollowedSerie (req, res) {
  const serieId = req.query.serieId;
  const userId = req.query.userId;
  let tmp = "";
  Serie.isFollowedSerie(serieId,userId)
    .then((result) => {
      if(result){
        console.log("This users follow this serie");
      } else {
        console.log("This users doesn\'t follow this serie");
      }
      tmp += result;
    })
    .catch((err) => {
      tmp += err;
      console.log(err);
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};

module.exports.countFollowersSerie = function countFollowersSerie (req, res) {
  const serieId = req.query.serieId;
  let tmp = "";
  Serie.countFollowersSerie(serieId)
    .then((result) => {
      console.log(result + " users follow this serie");
      tmp += result;
    })
    .catch((err) => {
      tmp =+ "-1";
      console.log(err);
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};

module.exports.followSerie = function followSerie (req, res) {
  const showToFollow = JSON.parse(req.body.serieJson);
  const userId = req.query.userId;
  let tmp = "";
  Serie.followSerie(showToFollow, userId)
    .then(() => {
      tmp = "1";
      console.log("Serie followed");
    })
    .catch((err) => {
      tmp = "-1";
      console.log(err);
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};

module.exports.unfollowSerie = function unfollowSerie (req, res) {
  const serieId = req.query.serieId;
  const userId = req.query.userId;
  let tmp = "";
  Serie.unfollowSerie(serieId,userId)
    .then(() => {
      tmp = "1";
      console.log("Serie unfollowed");
    })
    .catch((err) => {
      tmp = "-1";
      console.log(err);
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};
