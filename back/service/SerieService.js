const db = require('../utils/db_connect');
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

        this.addSeasonsFromTVMaze(seasons, episodes, result, serieId)
        .then(resultAddSeasons => {
          resolve(resultAddSeasons)
        }).catch(err => {
          reject(err)
        })
      }
    }).catch(err => {
      reject(err)
    })
  });
}

addEpisodes = function(episodesList, seasonsIdList, episodesListTVMaze, seasonsIdListTVMaze) {
  return new Promise(function(resolve, reject) {
    let begin = true
    SQLqueryINSERTepisode = "INSERT into episode(id, name, outDate, seasonNumber, episodeNumber, urlMediumImage, urlOriginalImage, summary, runtime, seasonId) VALUES"
    for(let i=0; i<episodesList.length; ++i){
      let episodes = episodesList[i]
      let seasonId = seasonsIdList[i]
      
      for(let episode of episodes){
        if(episode.episodeNumber!=null){
          if(!begin){
            SQLqueryINSERTepisode = SQLqueryINSERTepisode.concat(",")
          } else {
            begin = false
          }
          const stringEpisode = "('" + episode.id + "', '" + episode.name.replace(/'/g, "`") + "', '" + episode.outDate + "', '" + episode.seasonNumber + "', '" + episode.episodeNumber + "', '"
                          + episode.urlMediumImage + "', '" + episode.urlOriginalImage + "', '" + episode.summary.replace(/'/g, "`") + "', '" + episode.runtime + "', '" + seasonId + "')"
          SQLqueryINSERTepisode = SQLqueryINSERTepisode.concat(stringEpisode)
        }
      }

    }
    for(let i=0; i<episodesListTVMaze.length; ++i){
      let episodes = episodesListTVMaze[i]
      let seasonId = seasonsIdListTVMaze[i]
      
      for(let episode of episodes){
        if(episode.number!=null){
          if(!begin){
            SQLqueryINSERTepisode = SQLqueryINSERTepisode.concat(",")
          } else {
            begin = false
          }
          const stringEpisode = "('" + episode.id + "', '" + episode.name.replace(/'/g, "`") + "', '" + episode.airdate + "', '" + episode.season + "', '" + episode.number + "', '"
                               + episode.image.medium + "', '" + episode.image.original + "', '" + episode.summary.replace(/'/g, "`") + "', '" + episode.runtime + "', '" + seasonId + "')"
          SQLqueryINSERTepisode = SQLqueryINSERTepisode.concat(stringEpisode)
          console.log(SQLqueryINSERTepisode)
        }
      }

    }
    console.log(SQLqueryINSERTepisode)
    db.querySqlInsert(SQLqueryINSERTepisode)
    .then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}

addSeasons = function(seasons, serieId) {
  return new Promise(function(resolve, reject) {
    let begin = true
    let episodesTVMaze = null
    SQLqueryINSERTseason = "INSERT into season(id, numberSeasonInshow, name, nbEpisode, urlMediumImage, urlOriginalImage, summary, serieId) VALUES"

    let episodesList = []
    let episodesListTVMaze = []
    let seasonsIdList = []
    let seasonsIdListTVMaze = []
    let indexOfList = 0
    let indexOfListTVMaze = 0
    for(let season of seasons){
      if(!begin){
        SQLqueryINSERTseason = SQLqueryINSERTseason.concat(",")
      } else {
        begin = false
      }
      if(season.episodes.length === 0){
        let episodesForSeason = []
        if(episodesTVMaze === null){
          
          const reqTvMazeEpisodes="http://api.tvmaze.com/shows/" + serieId + "/episodes";
          fetch(reqTvMazeEpisodes).then((resp)=>resp.json()).then((json)=>{
            episodesTVMaze = json

            for(let episodeTVMaze of episodesTVMaze){
              if(episodeTVMaze.season === season.numberSeasonInshow){
                episodesForSeason.push(episodeTVMaze)
              }
            }
          
          }).catch(err=>reject(err));
        
        } else {
          
          for(let episodeTVMaze of episodesTVMaze){
            if(episodeTVMaze.season === season.numberSeasonInshow){
              episodesForSeason.push(episodeTVMaze)
            }
          }
        }
        episodesListTVMaze[indexOfListTVMaze] = episodesForSeason
        seasonsIdListTVMaze[indexOfListTVMaze] = season.id
        ++indexOfListTVMaze
      } else {
        episodesList[indexOfList] = season.episodes
        seasonsIdList[indexOfList] = season.id
        ++indexOfList
      }
      let stringSeason = "('" + season.id + "', '" + season.numberSeasonInshow + "', '" + season.name.replace(/'/g, "`") + "', '" + season.nbEpisode + "', '"
                       + season.urlMediumImage + "', '" + season.urlOriginalImage + "', '" + season.summary.replace(/'/g, "`") + "', '" + serieId + "')"
      SQLqueryINSERTseason = SQLqueryINSERTseason.concat(stringSeason)
    }
    db.querySqlInsert(SQLqueryINSERTseason)
    .then(result => {
      this.addEpisodes(episodesList, seasonsIdList, episodesListTVMaze, seasonsIdListTVMaze)
      .then(() => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    }).catch(err => {
      reject(err)
    })
  });
}

addSeasonsFromTVMaze = function(seasons, episodes, indexForSeasons, serieId) {
  return new Promise(function(resolve, reject) {
    let begin = true
    SQLqueryINSERTseason = "INSERT into season(id, numberSeasonInshow, name, nbEpisode, urlMediumImage, urlMediumImage, summary, serieId) VALUES"

    let episodesListTVMaze = []
    let seasonsIdListTVMaze = []
    let indexOfListTVMaze = 0

    for(let i=indexForSeasons; i<seasons.length; ++i){
     let season = seasons[i]
     if(!begin){
        SQLqueryINSERTseason = SQLqueryINSERTseason.concat(",")
    } else {
      begin = false
    }
      let episodesForSeason = []
        
        for(let episodeTVMaze of episodes){
          if(episodeTVMaze.season === season.number){
            episodesForSeason.push(episodeTVMaze)
          }
        }

      episodesListTVMaze[indexOfListTVMaze] = episodesForSeason
      seasonsIdListTVMaze[indexOfListTVMaze] = season.id
      ++indexOfListTVMaze

      let stringSeason = "('" + season.id + "', '" + season.number + "', '" + season.name.replace(/'/g, "`") + "', '" + season.episodeOrder + "', '"
                          + season.image.medium + "', '" + season.image.original + "', '" + season.summary.replace(/'/g, "`") + "', '" + serieId + "')"
      SQLqueryINSERTseason = SQLqueryINSERTseason.concat(stringSeason)
    }
    db.querySqlInsert(SQLqueryINSERTseason)
    .then(result => {
      this.addEpisodes([], [], episodesListTVMaze, seasonsIdListTVMaze)
      .then(() => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    }).catch(err => {
      reject(err)
    })
  });
}

addActors = function(actors, serieId) {
  return new Promise(function(resolve, reject) {
    let stringActorsId = "("
    let begin = true
    for(let actor of actors) {
      if(!begin){
        stringActorsId = stringActorsId.concat(",")
      } else {
        begin = false
      }
      stringActorsId = stringActorsId.concat(actor.actorId)
    }
    stringActorsId = stringActorsId.concat(")")
    SQLquerySELECTpresentActors = "SELECT actorId FROM actors WHERE actorId IN " + stringActorsId

    begin = true
    let actorsAdded = false
    SQLqueryINSERTactors = "INSERT into actors(actorId, actorName, actorCountryName, actorCountryCode, actorSexe, actorUrlMediumImage, actorUrlOriginalImage) VALUES"
    SQLqueryINSERTactors_serie = "INSERT into actors_serie(actorId, serieId, characterId, characterName, characterUrlMediumImage, characterUrlOriginalImage) VALUES"

    db.querySqlSelect(SQLquerySELECTpresentActors)
    .then(result => {
      
      let presentActorsId = []
      
      for(let res of result) {
        presentActorsId.push(res['actorId'])
      }
      
      for(let actor of actors) {
        if(!presentActorsId.includes(actor.actorId)){
          if(actorsAdded){
            SQLqueryINSERTactors = SQLqueryINSERTactors.concat(",")
          } else {
            actorsAdded = true
          }
          const stringActor = "('"+ actor.actorId + "', '" + actor.actorName.replace(/'/g, "`") + "', '" + actor.actorCountryName + "', '" + actor.actorCountryCode + "', '"
                            + actor.actorSexe + "', '"+ actor.actorUrlMediumImage + "', '" + actor.actorUrlOriginalImage + "')"
          SQLqueryINSERTactors = SQLqueryINSERTactors.concat(stringActor)
        }
        if(!begin){
          SQLqueryINSERTactors_serie = SQLqueryINSERTactors_serie.concat(",")
        } else {
          begin = false
        }
        const stringActor_serie = "('" + actor.actorId + "', '" + serieId + "', '" + actor.characterId + "', '" + actor.characterName.replace(/'/g, "`") + "', '"
                                + actor.characterUrlMediumImage + "', '" + actor.characterUrlOriginalImage + "')"
        SQLqueryINSERTactors_serie = SQLqueryINSERTactors_serie.concat(stringActor_serie)
      }

      db.querySqlInsert(SQLqueryINSERTactors_serie)
      .then(result => {
        if(actorsAdded){
          db.querySqlInsert(SQLqueryINSERTactors)
          .then(() => {
            resolve(result)
          }).catch(err => {
            reject(err)
          })
        } else {
          resolve(result)
        }
      }).catch(err => {
        reject(err)
      })
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
        genres = genres.concat("/", g)
      }
    }

    SQLqueryINSERTserie = "INSERT into serie(id, name, type, genre, status, start, officialSite, urlMediumImage, urlOriginalImage, rate, summary, network, countryName, countryCode) VALUES('" + serieId + "', '" + information.name + "', '" + information.type + "', '" + genres + "', '" + information.status + "', '"
    + information.start + "', '" + information.officialSite + "', '" + information.urlMediumImage + "', '" + information.urlOriginalImage + "', '"
    + information.rate + "', '" + information.summary.replace(/'/g, "`") + "', '" + information.network + "', '" + information.countryName + "', '" + information.countryCode + "')"

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
exports.followSerie = function(showToFollow, userId) {
  return new Promise(function(resolve, reject) {
    const information = showToFollow.information
    const seasons = showToFollow.seasons
    const cast = showToFollow.cast
    const serieId = information.id
    
    SQLqueryCOUNTforIf = "SELECT COUNT(*) FROM serie WHERE id = " + serieId    
    SQLqueryINSERTuser_serie = "INSERT into user_serie(userId, serieId, current_saison, current_episode) VALUES("
                      + userId + ", " + serieId + ", 1, -1)"
    db.querySqlSelect(SQLqueryCOUNTforIf)
    .then(resultCOUNTforIf => {
      if(resultCOUNTforIf.count>0){
        console.log("succés");
        const reqTvMazeSeasons="http://api.tvmaze.com/shows/" + serieId + "/seasons";
        fetch(reqTvMazeSeasons).then((resp)=>resp.json()).then((json)=>{
          this.updateSerie(serieId, json)
        }).catch(err=>reject(err));
      } else {
        this.addSerie(serieId, information)
        .then(() => {
          this.addActors(cast, serieId)
          .then(() => {
            this.addSeasons(seasons, serieId)
            .then(() => {
              db.querySqlInsert(SQLqueryINSERTuser_serie)
              .then(resultINSERTuser_serie => {
                resolve(resultINSERTuser_serie)
              }).catch(err => {
                if(err.number !== 1062){
                  reject(err)
                }
              })
            })
          })
        })
      }
    }).catch(err => {
      console.log("error");
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

