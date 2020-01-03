const db = require('../utils/db_connect');
const test = require('../../test.json')
const fetch = require('node-fetch');

updateSerie = function(serieId, seasons) {
  return new Promise(function(resolve, reject) {
    SQLqueryCOUNT = "SELECT COUNT(*) FROM season WHERE serieId = " + serieId
    db.querySqlSelect(SQLqueryCOUNT)
    .then(result => {
      if(result<seasons.length){
        let episodes = null
        
        const reqTvMazeEpisodes="http://api.tvmaze.com/shows/" + serieId + "/episodes";
        fetch(reqTvMazeEpisodes).then((resp)=>resp.json()).then((json)=>{
          episodes = json
        }).catch(err=>reject(err));

        for (let i = result; i < seasons.length; ++i) {
          this.addSeasonFromTVMaze(seasons[i], serieId)
          for(let episode of episodes){
            if(episode.season === season[i].number){
              this.addEpisodeFromTVMaze(episode, season[i].id)
            }
          }
        }
        resolve(true)
      }
      resolve(false)
    }).catch(err => {
      reject(err)
    })
  });
}

addEpisode = function(episode, seasonId) {
  return new Promise(function(resolve, reject) {
    SQLqueryINSERTepisode = "INSERT into episode(id, name, outDate, seasonNumber, episodeNumber, urlMediumImage, urlOriginalImage, summary, runtime, seasonId) VALUES("
                             + episode.id + ", " + episode.name + ", " + episode.outDate + ", " + episode.seasonNumber + ", " + episode.episodeNumber + ", "
                             + episode.urlMediumImage + ", " + episode.urlOriginalImage + ", " + episode.summary + ", " + episode.runtime + ", " + seasonId + ")"
    db.querySqlInsert(SQLqueryINSERTepisode)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}

addEpisodeFromTVMaze = function(episode, seasonId) {
  return new Promise(function(resolve, reject) {
    SQLqueryINSERTepisode = "INSERT into episode(id, name, outDate, seasonNumber, episodeNumber, urlMediumImage, urlOriginalImage, summary, runtime, seasonId) VALUES("
                             + episode.id + ", " + episode.name + ", " + episode.airdate + ", " + episode.season + ", " + episode.number + ", "
                             + episode.image.medium + ", " + episode.image.original + ", " + episode.summary + ", " + episode.runtime + ", " + seasonId + ")"
    db.querySqlInsert(SQLqueryINSERTepisode)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}

addSeason = function(season, serieId) {
  return new Promise(function(resolve, reject) {
    SQLqueryINSERTseason = "INSERT into season(id, numberSeasonInshow, name, nbEpisode, urlMediumImage, urlMediumImage, summary, serieId) VALUES("
                            + season.id + ", " + season.numberSeasonInshow + ", " + season.name + ", " + season.nbEpisode + ", " + season.urlMediumImage + ", "
                            + season.urlOriginalImage + ", " + season.summary + ", " + serieId + ")"
    db.querySqlInsert(SQLqueryINSERTseason)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}

addSeasonFromTVMaze = function(season, serieId) {
  return new Promise(function(resolve, reject) {
    SQLqueryINSERTseason = "INSERT into season(id, numberSeasonInshow, name, nbEpisode, urlMediumImage, urlMediumImage, summary, serieId) VALUES("
                            + season.id + ", " + season.number + ", " + season.name + ", " + season.episodeOrder + ", " + season.image.medium + ", "
                            + season.image.original + ", " + season.summary + ", " + serieId + ")"
    db.querySqlInsert(SQLqueryINSERTseason)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}

addActor = function(actor, serieId) {
  return new Promise(function(resolve, reject) {
    SQLqueryINSERTactors = "INSERT into actors(actorId, actorName, actorCountryName, actorCountryCode, actorSexe, actorUrlMediumImage, actorUrlOriginalImage) VALUES("
                            + actor.actorId + ", " + actor.actorName + ", " + actor.actorCountryName + ", " + actor.actorCountryCode + ", " + actor.actorSexe + ", "
                            + actor.actorUrlMediumImage + ", " + actor.actorUrlOriginalImage + ")"
    SQLqueryINSERTactors_serie = "INSERT into actors_serie(actorId, serieId, characterId, characterName, characterUrlMediumImage, characterUrlOriginalImage) VALUES("
                                  + actor.actorId + ", " + serieId + ", " + actor.characterId + ", " + actor.characterName + ", " + actor.characterUrlMediumImage + ", "
                                  + actor.characterUrlOriginalImage + ")"
    
    db.querySqlInsert(SQLqueryINSERTactors)
    .then(() => {
      
      db.querySqlInsert(SQLqueryINSERTactors_serie)
      .then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    
    }).catch(err => {
      if(err.number !== 1062){
        reject(err)
      }
    })
  });
}

addSerie = function(serieId, information) {
  return new Promise(function(resolve, reject) {
    let genres = null
    let begin = true
    
    for(let g of information.genre){
      if(begin){
        genres = g
        begin = false
      } else {
        genres.concat("/", g)
      }
    }

    SQLqueryINSERTserie = "INSERT into serie(id, name, type, genre, status, start, officialSite, urlMediumImage, urlOriginalImage, rate, summary, network, countryName, countryCode) VALUES(" + serieId + ", " + information.name + ", " + information.type + ", " + genres + ", " + information.status + ", "
    + information.start + ", " + information.officialSite + ", " + information.urlMediumImage + ", " + information.urlOriginalImage + ", "
    + information.rate + ", " + information.summary + ", " + information.countryName + ", " + information.countryCode + ")"

    db.querySqlInsert(SQLqueryINSERTserie)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
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
    SQLquery = "SELECT IF (EXISTS(SELECT * FROM user_serie WHERE userId = " + userId + " AND serieId = " + serieId + "), true, false)"
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
    SQLquery = "SELECT COUNT(*) FROM user_serie WHERE serieId = " + serieId
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
exports.followSerie = function(/*showToFollow,*/ userId) {
  return new Promise(function(resolve, reject) {
    const showToFollow = JSON.parse(JSON.stringify(test));
    const information = showToFollow.information
    const seasons = showToFollow.seasons
    const cast = showToFollow.cast
    const serieId = information.id
    
    SQLqueryIF = "SELECT IF(EXISTS(SELECT * FROM serie WHERE id = " + serieId + "), true, false)"    
    SQLqueryINSERTuser_serie = "INSERT into user_serie(userId, serieId, current_saison, current_episode) VALUES("
                      + userId + ", " + serieId + ", 1, -1)"
    db.querySqlSelect(SQLqueryIF)
    .then(resultIF => {
      if(resultIF){
        const reqTvMazeSeasons="http://api.tvmaze.com/shows/" + serieId + "/seasons";
        fetch(reqTvMazeSeasons).then((resp)=>resp.json()).then((json)=>{
          this.updateSerie(serieId, json)
        }).catch(err=>reject(err));
      } else {
        this.addSerie(serieId, information)

        for(let actor of cast){
          this.addActor(actor, serieId)
        }
        for(let season of seasons){
          let episodes = null
          this.addSeason(season, serieId)
          if(season.episodes.length === 0){
            
            if(episodes === null){
              
              const reqTvMazeEpisodes="http://api.tvmaze.com/shows/" + serieId + "/episodes";
              fetch(reqTvMazeEpisodes).then((resp)=>resp.json()).then((json)=>{
                episodes = json

                for(let episode of episodes){
                  if(episode.season === season.numberSeasonInshow){
                    this.addEpisodeFromTVMaze(episode, season.id)
                  }
                }
              
              }).catch(err=>reject(err));
            
            } else {
              
              for(let episode of episodes){
                if(episode.season === season.numberSeasonInshow){
                  this.addEpisodeFromTVMaze(episode, season.id)
                }
              }
            
            }
          } else {
            for(let episode of season.episodes){
              this.addEpisode(episode, season.id)
            }
          }
        }
      }
      db.querySqlInsert(SQLqueryINSERTuser_serie)
      .then(resultINSERTuser_serie => {
        resolve(resultINSERTuser_serie)
      }).catch(err => {
        if(err.number !== 1062){
          reject(err)
        }
      })
    }).catch(err => {
      reject(err)
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
    SQLquery = "DELETE FROM user_serie WHERE userId = " + userId + " AND serieId = " + serieId
    db.querySqlSelect(SQLquery)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}

