'use strict';


/**
 * Mark an episode
 * Mark an episode of a serie followed by a user as seen
 *
 * episodeId Integer Id of the episode the user want to mark
 * userId Integer Id of the user who want to mark an episode
 * no response value expected for this operation
 **/
exports.markEpisode = function(episodeId,userId) {
  return new Promise(function(resolve, reject) {
    resolve();
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
exports.unmarkEpisode = function(episodeId,userId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

