const db = require('../utils/db_connect')

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
    SQLquery = "UPDATE user_serie SET current_saison = "+ seasonNumber + ", current_episode = "
                      + episodeNumber + " WHERE user_id = " + userId + " AND serie_id = " + serieId
    db.querySqlUpdate(SQLquery)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
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
    let newEpisodeToMark
    if(episodeNumber<=1){
      newEpisodeToMark = -1
    } else {
      newEpisodeToMark = episodeNumber - 1
    }
    SQLquery = "UPDATE user_serie SET current_saison = " + seasonNumber + ", current_episode = "
                + newEpisodeToMark + " WHERE user_id = " + userId + " AND serie_id = " + serieId
    db.querySqlUpdate(SQLquery)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}

