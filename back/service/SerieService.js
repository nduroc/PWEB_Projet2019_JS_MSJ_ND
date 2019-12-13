'use strict';


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
    resolve();
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
    resolve();
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
    resolve();
  });
}

