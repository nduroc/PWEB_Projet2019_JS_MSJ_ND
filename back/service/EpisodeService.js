var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pweb"
});

/**
 * Mark an episode
 * Mark an episode of a serie followed by a user as seen
 *
 * episodeId Integer Id of the episode the user want to mark
 * userId Integer Id of the user who want to mark an episode
 * no response value expected for this operation
 **/
exports.markEpisode = function(serieId, userId, seasonNumber, episodeNumber) {
  return new Promise(function(resolve, reject) {
    try {
      db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        SQLquery = "IF EXISTS(SELECT * FROM user_serie WHERE user_id = "
                    + userId + " AND serie_id = "
                    + serieId + ") BEGIN UPDATE user_serie SET current_saison = "
                    + seasonNumber + ", current_episode = " + episodeNumber + " WHERE user_id = "
                    + userId + " AND serie_id = " + serieId + " END ELSE BEGIN INSERT into user_serie(user_id, serie_id, current_saison, current_episode) VALUES("
                    + userId + ", " + serieId + ", " + seasonNumber + ", " + episodeNumber + ") END"
        db.query(SQLquery, function (err, result) {
          if (err) throw err;
          resolve(true)
        });
      });
    } catch (err) {
        reject(false);
    }
  });
}


/**
 * Unmark an episode
 * Unmark an episode of a serie followed by a user
 *
 * episodeId Integer Id of the episode the user want to unmark
 * userId Integer Id of the user who want to unmark an episode
 * no response value expected for this operation
 **/
exports.unmarkEpisode = function(serieId, userId, seasonNumber, episodeNumber) {
  return new Promise(function(resolve, reject) {
    try {
      let newEpisodeToMark
      if(episodeNumber<=1){
        newEpisodeToMark = -1
      } else {
        newEpisodeToMark = episodeNumber - 1
      }
      db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        SQLquery = "UPDATE user_serie SET current_saison = " + seasonNumber + ", current_episode = "
                    + newEpisodeToMark + " WHERE user_id = " + userId + " AND serie_id = " + serieId
        db.query(SQLquery, function (err, result) {
          if (err) throw err;
          resolve(true)
        });
      });
    } catch (err) {
        reject(false);
    }
  });
}

