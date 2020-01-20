const db = require('../utils/db_connect');

/**
 * Mark an episode
 * Mark an episode of a serie followed by a user as seen
 *
 * serieId Integer Id of the serie the user want to mark an episode of
 * userId Integer Id of the user who want to mark an episode
 * episodeId Integer Id of the episode the user want to mark
 * no response value expected for this operation
 **/
exports.markEpisode = function(userId, episodeId, serieId) {
  return new Promise(function(resolve, reject) {
    SQLqueryForUserSerieId = "SELECT id FROM user_serie WHERE userId='" + userId + "' and serieId='" + serieId + "'";
    db.querySqlSelect(SQLqueryForUserSerieId)
    .then(result => {
      if (!Array.isArray(result) && result.length == 0) {
        resolve(-1);
      }
      else {
        SQLqueryInsert = "INSERT INTO user_serie_episode (user_serie_id, episode_id) VALUES ('" + result[0]['id'] + "', '" + episodeId + "') ";
        db.querySqlInsert(SQLqueryInsert).then((res) => {
          resolve(res);
        }).catch(err => reject(err));
      }
    }).catch(err => reject(err));
  });
}


/**
 * Unmark an episode
 * Unmark an episode of a serie followed by a user
 *
 * serieId Integer Id of the serie the user want to unmark an episode of
 * userId Integer Id of the user who want to unmark an episode
 * episodeId Integer Id of the episode the user want to unmark
 * no response value expected for this operation
 **/
exports.unmarkEpisode = function(userId, episodeId, serieId) {
  return new Promise(function(resolve, reject) {
    SQLqueryForUserSerieId = "SELECT id FROM user_serie WHERE userId='" + userId + "' and serieId='" + serieId + "'";
    db.querySqlSelect(SQLqueryForUserSerieId)
    .then(result => {
      if (!Array.isArray(result) && result.length == 0) {
        resolve(-1);
      }
      else {
        SQLqueryDelete = "DELETE FROM user_serie_episode WHERE user_serie_id='" + result[0]['id'] + "' and episode_id='" + episodeId + "'";
        db.querySqlDelete(SQLqueryDelete).then((res) => {
          resolve(res);
        }).catch(err => reject(err));
      }
    }).catch(err => reject(err));
  });
}
