const db = require('../utils/db_connect')


/**
 * Return the followed series
 * Return the series followed by a user
 *
 * userId Integer Id of the user who want to see th series that he/she follow
 * body Series Created series object
 * no response value expected for this operation
 **/
exports.displayFollowedSeries = function(userId) {
  return new Promise(function(resolve, reject) {
    SQLquery = "SELECT * FROM serie WHERE id IN (SELECT serieId FROM user_serie WHERE userId = " + userId + ") "
    SQLqueryEpisodeSeen = "SELECT * FROM user_serie_episode WHERE user_serie_id IN (SELECT id FROM user_serie WHERE userId = " + userId + ") "
    db.querySqlSelect(SQLquery)
    .then(result => {
      this.searchOneSerie(result, 0)
      .then(followedSeriesTab => {
        let followedSeries = {}
        for(let i=0; i<followedSeriesTab.length; ++i){
          followedSeries[i] = followedSeriesTab[i]
        }
        resolve(followedSeries);
      }).catch(err => {
        reject(err);
      })
    }).catch(err => {
      reject(err);
    })
  });
}

exports.displayEpisodesSeen = function(userId) {
  return new Promise(function(resolve, reject) {
    SQLquery = "SELECT id,seasonId FROM episode WHERE id IN (SELECT episode_id FROM user_serie_episode WHERE user_serie_id IN (SELECT id FROM user_serie WHERE userId = " + userId + ")) "
    db.querySqlSelect(SQLquery)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err);
    })
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
searchOneSerie = function(res, indexRes){
  return new Promise(function(resolve, reject) {
    let series = [];
    let information = {}
    for(let obj in res[indexRes]){
      information[obj] = res[indexRes][obj]
    }
    this.searchSeasons(res[indexRes]['id'])
    .then(resultSeasons => {
      this.searchCast(res[indexRes]['id'])
      .then(resultCast => {
        let seasons = resultSeasons;
        let cast = resultCast;
        let serie = {seasons, cast, information};

        series.push(serie);
        
        if(indexRes >= (res.length - 1)){
          resolve(series);
        } else {
          ++indexRes;
          this.searchOneSerie(res, indexRes)
          .then(resultSerie => {
            series = series.concat(resultSerie);
            resolve(series);
          }).catch(err => {
            reject(err);
          })
        }

      }).catch(err => {
        reject(err);
      })

    }).catch(err => {
      reject(err);
    })
  });
}

searchSeasons = function(serieId) {
  return new Promise(function(resolve, reject) {
    SQLquerySELECTseasons = "SELECT * FROM season WHERE serieId = " + serieId
    db.querySqlSelect(SQLquerySELECTseasons)
    .then(resultSELECTseasons => {
      SQLquerySELECTepisodes = "SELECT * FROM episode WHERE seasonId IN (SELECT id FROM season WHERE serieId = " + serieId + ") ORDER BY id ASC"
      db.querySqlSelect(SQLquerySELECTepisodes)
      .then(resultSELECTepisodes => {
        let seasons = {}
        let indexSeasons = 0
        for(let resSeason of resultSELECTseasons) {
          let res ={}
          for(let obj in resSeason){
            res[obj] = resSeason[obj]
          }
          let episodesInfo = resultSELECTepisodes.filter(element => element['seasonId'] === resSeason['id'])
          let episodesTab = {}
          let indexEpisodesTab = 0
          for(let episode of episodesInfo) {
            let episodeTab = {}
            for(let obj in episode){
              episodeTab[obj] = episode[obj]
            }
            episodesTab[indexEpisodesTab] = episodeTab
            ++indexEpisodesTab
          }
          res["episodes"] = episodesTab
          seasons[indexSeasons] = res
          ++indexSeasons
        }
        resolve(seasons)
      }).catch(err => {
        reject(err)
      })
    }).catch(err => {
      reject(err)
    })
  });
}

searchCast = function(serieId) {
  return new Promise(function(resolve, reject) {
    SQLquerySELECTactors_serie = "SELECT actorId, characterId, characterName, characterUrlMediumImage, characterUrlOriginalImage FROM actors_serie WHERE serieId = " + serieId
    db.querySqlSelect(SQLquerySELECTactors_serie)
    .then(resultSELECTactors_serie => {
      SQLquerySELECTactors = "SELECT * FROM actors WHERE actorId IN (SELECT actorId FROM actors_serie WHERE serieId = " + serieId + ")"
      db.querySqlSelect(SQLquerySELECTactors)
      .then(resultSELECTactors => {
        let cast = {}
        let indexCast = 0
        for(let resActor of resultSELECTactors) {
          let characterInfo = resultSELECTactors_serie.find(element => element['actorId'] === resActor['actorId'])
          let res = {}
          for(let obj in resActor) {
            res[obj] = resActor[obj]
          }
          for(let obj in characterInfo) {
            if(obj !== "actorId" && obj !== "serieId"){
              res[obj] = characterInfo[obj]
            }
          }
          cast[indexCast] = res
          ++indexCast
        }
        resolve(cast)
      }).catch(err => {
        reject(err)
      })
    }).catch(err => {
      reject(err)
    })
  });
}