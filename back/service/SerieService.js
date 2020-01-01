const db = require('../utils/db_connect')

exports.addSerie = function(serieId, body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

exports.updateSerie = function(serieId, body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

/**
 * Return the available episodes of a serie
 * Return the available episodes of a serie
 *
 * serieId Integer Id of the serie we want to return a list of episode
 * body Serie Created serie object
 * no response value expected for this operation
 **/
exports.displaySerieEpisode = function(serieId,body) {
  return new Promise(function(resolve, reject) {
    SQLquery = "SELECT episodes FROM serie WHERE id = " + serieId
    db.querySqlSelect(SQLquery)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}

exports.isFollowedSerie = function(serieId,userId) {
  return new Promise(function(resolve, reject) {
    SQLquery = "SELECT IF (EXISTS(SELECT * FROM user_serie WHERE user_id = " + userId + " AND serie_id = " + serieId + "), true, false)"
    db.querySqlSelect(SQLquery)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}

exports.countFollowersSerie = function(serieId) {
  return new Promise(function(resolve, reject) {
    SQLquery = "SELECT COUNT(*) FROM user_serie WHERE serie_id = " + serieId
    db.querySqlSelect(SQLquery)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}


/**
 * Add a followed serie
 * Add a serie to the series followed by a user
 *
 * serieId Integer Id of the serie the user want to follow
 * userId Integer Id of the user who want to follow a serie
 * no response value expected for this operation
 **/
exports.followSerie = function(serieId,userId) {
  return new Promise(function(resolve, reject) {
    SQLquery = "INSERT into user_serie(user_id, serie_id, current_saison, current_episode) VALUES("
                      + userId + ", " + serieId + ", 1, -1)"
    db.querySqlInsert(SQLquery)
    .then(result => {
      resolve(result);
    }).catch(err => {
      if (err.number !== 1062){
        reject(err)
      }
    })
  });
}


/**
 * Remove from followed series
 * Remove a serie of the series followed by a user
 *
 * serieId Integer Id of the serie the user want to unfollow
 * userId Integer Id of the user who want to unfollow a serie
 * no response value expected for this operation
 **/
exports.unfollowSerie = function(serieId,userId) {
  return new Promise(function(resolve, reject) {
    SQLquery = "DELETE FROM user_serie WHERE user_id = " + userId + " AND serie_id = " + serieId
    db.querySqlSelect(SQLquery)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}

