'use strict';


/**
 * Return the followed series
 * Return the series followed by a user
 *
 * userId Integer Id of the user who want to see th series that he/she follow
 * body Series Created series object
 * no response value expected for this operation
 **/
exports.displayFollowedSeries = function(userId,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Return the available series
 * Return the available series to permit users to select series they want to follow (X series displayed per page)
 *
 * pageNumber Integer The number of the page we want to return
 * body Series Created series object
 * search String The name (or part of the name) of a serie searched by a user (optional)
 * no response value expected for this operation
 **/
exports.displaySeries = function(pageNumber,body,search) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

