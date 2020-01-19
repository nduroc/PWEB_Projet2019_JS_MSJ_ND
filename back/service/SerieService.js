const db = require('../utils/db_connect');
const fetch = require('node-fetch');

addEpisodes = function(episodesList, seasonsIdList, episodesListTVMaze, seasonsIdListTVMaze) {
  return new Promise(function(resolve, reject) {
    let begin = true
    SQLqueryINSERTepisode = "INSERT into episode(id, name, outDate, seasonNumber, episodeNumber, urlMediumImage, urlOriginalImage, summary, runtime, seasonId) VALUES"
    for(let i=0; i<episodesList.length; ++i){
      let episodes = episodesList[i];
      let seasonId = seasonsIdList[i];

      for(let episode of episodes){
        if(episode.episodeNumber!=null){
          if(!begin){
            SQLqueryINSERTepisode = SQLqueryINSERTepisode.concat(",")
          } else {
            begin = false;
          }
          const stringEpisode = "('" + episode.id + "', '" + episode.name.replace(/'/g, "`") + "', '" + episode.outDate + "', '" + episode.seasonNumber + "', '" + episode.episodeNumber + "', '"
                          + episode.urlMediumImage + "', '" + episode.urlOriginalImage + "', '" + episode.summary.replace(/'/g, "`") + "', '" + episode.runtime + "', '" + seasonId + "')";
          SQLqueryINSERTepisode = SQLqueryINSERTepisode.concat(stringEpisode);
        }
      }

    }
    for(let i=0; i<episodesListTVMaze.length; ++i){
      let episodes = episodesListTVMaze[i];
      let seasonId = seasonsIdListTVMaze[i];
      
      for(let episode of episodes){
        if(episode.number!=null){
          if(!begin){
            SQLqueryINSERTepisode = SQLqueryINSERTepisode.concat(",");
          } else {
            begin = false;
          }
          let mediumImage
          let originalImage
          if (episode.image === null) {
            mediumImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
            originalImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
          } else {
            if (episode.image.medium === null) {
              mediumImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
            } else {
              mediumImage = episode.image.medium;
            }
            if (episode.image.original === null) {
              originalImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
            } else {
              originalImage = episode.image.original
            }
          }
          if (episode.name === null) {
            episode.name = "";
          } 
          if (episode.summary === null) {
            episode.summary = "";
          }
          const stringEpisode = "('" + episode.id + "', '" + episode.name.replace(/'/g, "`") + "', '" + episode.airdate + "', '" + episode.season + "', '" + episode.number + "', '"
                               + mediumImage + "', '" + originalImage + "', '" + episode.summary.replace(/'/g, "`") + "', '" + episode.runtime + "', '" + seasonId + "')"
          SQLqueryINSERTepisode = SQLqueryINSERTepisode.concat(stringEpisode)
        }
      }

    }
    db.querySqlInsert(SQLqueryINSERTepisode)
    .then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
}

addSeasons = function(seasons, serieId) {
  return new Promise(function(resolve, reject) {
    let begin = true
    let episodesTVMaze = null
    SQLqueryINSERTseason = "INSERT into season(id, numberSeasonInshow, name, nbEpisode, urlMediumImage, urlOriginalImage, summary, serieId) VALUES"

    let episodesList = [];
    let episodesListTVMaze = [];
    let seasonsIdList = [];
    let seasonsIdListTVMaze = [];
    let indexOfList = 0;
    let indexOfListTVMaze = 0;
    let episodesPromises = [];
    for(let season of seasons){
      if(!begin){
        SQLqueryINSERTseason = SQLqueryINSERTseason.concat(",");
      } else {
        begin = false;
      }
      episodesPromises.push(new Promise(function(resolve, reject) {
        if(season.episodes.length === 0){
          let episodesForSeason = [];
          let promiseFetch = new Promise(function(resolve, reject) {
            if(episodesTVMaze === null){
              const reqTvMazeEpisodes="https://api.tvmaze.com/shows/" + serieId + "/episodes";
              fetch(reqTvMazeEpisodes).then((resp)=>resp.json()).then((json)=>{
                episodesTVMaze = JSON.parse(JSON.stringify(json));
                for(let episodeTVMaze of episodesTVMaze){
                  if(episodeTVMaze.season === season.numberSeasonInshow){
                    episodesForSeason.push(episodeTVMaze);
                  }
                }
                resolve(true);
              }).catch(err=>reject(err));
            
            } else {
                for(let episodeTVMaze of episodesTVMaze){
                  if(episodeTVMaze.season === season.numberSeasonInshow){
                    episodesForSeason.push(episodeTVMaze);
                  }
                }
                resolve(true);
            }
          }).catch(err=>reject(err));
          Promise.all([promiseFetch]).then(() => {
            episodesListTVMaze[indexOfListTVMaze] = episodesForSeason;
            seasonsIdListTVMaze[indexOfListTVMaze] = season.id;
            ++indexOfListTVMaze;
            resolve(true)
          }).catch(err=>reject(err));
        } else {
          episodesList[indexOfList] = season.episodes;
          seasonsIdList[indexOfList] = season.id;
          ++indexOfList;
          resolve(true);
        }
      }).catch(err=>reject(err)));
      let name;
      let summary;
      
      if(season.name === null) {
        name = "";
      } else {
        name = season.name;
      }

      if(season.summary === null) {
        summary = "";
      } else {
        summary = season.summary;
      }

      let stringSeason = "('" + season.id + "', '" + season.numberSeasonInshow + "', '" + name.replace(/'/g, "`") + "', '" + season.nbEpisode + "', '"
                       + season.urlMediumImage + "', '" + season.urlOriginalImage + "', '" + summary.replace(/'/g, "`") + "', '" + serieId + "')";
      SQLqueryINSERTseason = SQLqueryINSERTseason.concat(stringSeason)
    }
    Promise.all(episodesPromises).then(() => {
      db.querySqlInsert(SQLqueryINSERTseason)
      .then(result => {
        this.addEpisodes(episodesList, seasonsIdList, episodesListTVMaze, seasonsIdListTVMaze)
        .then(() => {
          resolve(result);
        }).catch(err => {
          reject(err);
        })
      }).catch(err => {
        reject(err);
      })
    }).catch(err=>reject(err));
  });
}

addActors = function(actors, serieId) {
  return new Promise(function(resolve, reject) {
    let stringActorsId = "(";
    let begin = true;
    for(let actor of actors) {
      if(!begin){
        stringActorsId = stringActorsId.concat(",");
      } else {
        begin = false;
      }
      stringActorsId = stringActorsId.concat(actor.actorId);
    }
    stringActorsId = stringActorsId.concat(")");
    SQLquerySELECTpresentActors = "SELECT actorId FROM actors WHERE actorId IN " + stringActorsId;

    begin = true;
    let actorsAdded = false;
    SQLqueryINSERTactors = "INSERT into actors(actorId, actorName, actorCountryName, actorCountryCode, actorSexe, actorUrlMediumImage, actorUrlOriginalImage) VALUES";
    SQLqueryINSERTactors_serie = "INSERT into actors_serie(actorId, serieId, characterId, characterName, characterUrlMediumImage, characterUrlOriginalImage) VALUES";

    db.querySqlSelect(SQLquerySELECTpresentActors)
    .then(result => {
      
      let presentActorsId = [];
      
      for(let res of result) {
        presentActorsId.push(res['actorId']);
      }
      
      for(let actor of actors) {
        if(!presentActorsId.includes(actor.actorId)){
          if(actorsAdded){
            SQLqueryINSERTactors = SQLqueryINSERTactors.concat(",");
          } else {
            actorsAdded = true;
          }
          const stringActor = "('"+ actor.actorId + "', '" + actor.actorName.replace(/'/g, "`") + "', '" + actor.actorCountryName + "', '" + actor.actorCountryCode + "', '"
                            + actor.actorSexe + "', '"+ actor.actorUrlMediumImage + "', '" + actor.actorUrlOriginalImage + "')";
          SQLqueryINSERTactors = SQLqueryINSERTactors.concat(stringActor);
          presentActorsId.push(actor.actorId);
        }
        if(!begin){
          SQLqueryINSERTactors_serie = SQLqueryINSERTactors_serie.concat(",");
        } else {
          begin = false;
        }
        const stringActor_serie = "('" + actor.actorId + "', '" + serieId + "', '" + actor.characterId + "', '" + actor.characterName.replace(/'/g, "`") + "', '"
                                + actor.characterUrlMediumImage + "', '" + actor.characterUrlOriginalImage + "')";
        SQLqueryINSERTactors_serie = SQLqueryINSERTactors_serie.concat(stringActor_serie);
      }

      if(actorsAdded) {
        db.querySqlInsert(SQLqueryINSERTactors)
        .then(() => {
          db.querySqlInsert(SQLqueryINSERTactors_serie)
          .then(() => {
            resolve(result);
          }).catch(err => {
            reject(err);
          })
        }).catch(err => {
          reject(err);
        })
      } else {
        db.querySqlInsert(SQLqueryINSERTactors_serie)
        .then(() => {
          resolve(result);
        }).catch(err => {
          reject(err);
        })
      }
    })
  });
}

addSerie = function(serieId, information) {
  return new Promise(function(resolve, reject) {
    let genres = null;
    let begin = true;
    
    for(let g of information.genre){
      if(begin){
        genres = g;
        begin = false;
      } else {
        genres = genres.concat("/", g);
      }
    }

    SQLqueryINSERTserie = "INSERT into serie(id, name, type, genre, status, start, officialSite, urlMediumImage, urlOriginalImage, rate, summary, network, countryName, countryCode) VALUES('" + serieId + "', '" + information.name.replace(/'/g, "`") + "', '" + information.type + "', '" + genres + "', '" + information.status + "', '"
    + information.start + "', '" + information.officialSite + "', '" + information.urlMediumImage + "', '" + information.urlOriginalImage + "', '"
    + information.rate + "', '" + information.summary.replace(/'/g, "`") + "', '" + information.network + "', '" + information.countryName + "', '" + information.countryCode + "')";

    db.querySqlInsert(SQLqueryINSERTserie)
    .then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
}

updateSerie = function(serieId, information, seasons, cast) {
  return new Promise(function(resolve, reject) {
    SQLquerySeasons = "SELECT id FROM season WHERE serieId = " + serieId
    SQLqueryCast = "SELECT characterId FROM actors_serie WHERE serieId = " + serieId
    SQLquerySerie = "SELECT * FROM serie WHERE id = " + serieId
    let newSeasons = [];
    let newCharacter = [];
    db.querySqlSelect(SQLquerySeasons)
    .then(resultSeasons => {
      for(let season of seasons) {
        let seasonIsNew = true;
        for(let seasonsId of resultSeasons) {
          if(season.id === seasonsId['id']) {
            seasonIsNew = false;
          }
        }
        if(seasonIsNew) {
          newSeasons.push(season);
        }
      }

      db.querySqlSelect(SQLqueryCast)
      .then(resultCast => {
        for(let character of cast) {
          let characterIsNew = true;
          for(let charactersId of resultCast) {
            if(character.characterId === charactersId['characterId']) {
              characterIsNew = false;
            }
          }
          if(characterIsNew) {
            newCharacter.push(character);
          }
        }

        let promises = []
        let indexPromises = 0;

        if(newSeasons.length>0) {
          promises[indexPromises] = this.addSeasons(newSeasons, serieId);
          ++indexPromises
        }

        if(newCharacter.length>0) {
          promises[indexPromises] = this.addActors(newCharacter, serieId);
          ++indexPromises
        }

        promises[indexPromises] = db.querySqlSelect(SQLquerySerie)
        let indexResultSerie = indexPromises;
        ++indexPromises

        Promise.all(promises).then(results => {
          let result = results[indexResultSerie];
          let genres = null;
          let replacedSummary = null;
          let haveChanged = false;

          for(let obj in result[0]) {
            if(obj!=='id' && obj!=='name') {
              if(obj === 'summary') {
                replacedSummary = information[obj].replace(/'/g, "`")
                if(result[0][obj] != replacedSummary && information[obj]!==null) {
                  haveChanged = true;
                }
              } else if(obj === 'genre') {
                let begin = true;
                for(let g of information[obj]){
                  if(begin){
                    genres = g;
                    begin = false;
                  } else {
                    genres = genres.concat("/", g);
                  }
                }
                if(result[0][obj] != genres && information[obj]!==null) {
                  haveChanged = true;
                }
              } else if(obj === 'rate' && information[obj] !== parseFloat(result[0][obj])){
                haveChanged = true;
              } else if(information[obj] !== result[0][obj] && information[obj]!==null) {
                haveChanged = true;
              }
            }
          }
          if(haveChanged){
            SQLqueryUPDATEserie = "UPDATE serie SET type = '" + information.type + "', genre = '" + genres + "', status = '" + information.status + "', start = '" + information.start + "', officialSite = '" + information.officialSite + "', urlMediumImage = '" + information.urlMediumImage + "', urlOriginalImage = '"
                                   + information.urlOriginalImage + "', rate = '" + information.rate + "', summary = '" + replacedSummary + "', network = '" + information.network + "', countryName = '" + information.countryName + "', countryCode = '" + information.countryCode + "'";
            
            db.querySqlDelete(SQLqueryUPDATEserie)
            .then(() => {
              resolve(true)
            }).catch(err => {
              reject(err);
            })

          } else {
            resolve(true);
          }

        }).catch(err => {
          reject(err);
        })

      }).catch(err => {
        reject(err);
      })
       
    }).catch(err => {
      reject(err);
    })    
  });
}

/**
 * Return the available episodes of a serie
 * Return the available episodes of a serie
 *
 * serieId Integer Id of the serie we want to return a list of episode
 * no response value expected for this operation
 **/
exports.displaySerieEpisode = function(serieId) {
  return new Promise(function(resolve, reject) {
    SQLquery = "SELECT episodes FROM serie WHERE id = " + serieId;
    db.querySqlSelect(SQLquery)
    .then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
}

/**
 * Verify if a user follow a serie
 * Verify if the user, corresponding to the user id given in parameter, follow the serie, corresponding to the serie id given in parameter.
 *
 * serieId Integer Id of the serie
 * userId Integer Id of the user
 * no response value expected for this operation
 **/
exports.isFollowedSerie = function(serieId,userId) {
  return new Promise(function(resolve, reject) {
    SQLquery = "SELECT IF (EXISTS(SELECT * FROM user_serie WHERE userId = '" + userId + "' AND serieId = '" + serieId + "'), true, false) as exist";
    db.querySqlSelect(SQLquery)
    .then(result => {
      resolve(result[0].exist);
    }).catch(err => {
      reject(err);
    })
  });
}

/**
 * Return the number of user who follow a serie
 * Return the number of user who follow the serie, corresponding to the serie id given in parameter.
 *
 * serieId Integer Id of the serie
 * no response value expected for this operation
 **/
exports.countFollowersSerie = function(serieId) {
  return new Promise(function(resolve, reject) {
    SQLquery = "SELECT COUNT(*) as count FROM user_serie WHERE serieId = " + serieId;
    db.querySqlSelect(SQLquery)
    .then(result => {
      resolve(result[0]['count']);
    }).catch(err => {
      reject(err);
    })
  });
}


/**
 * Add a followed serie
 * Add a serie to the series followed by a user
 *
 * serieId Integer Id of the serie the user want to follow
 * userId Integer Id of the user who want to follow a serie
 * body Serie Created user account object
 * no response value expected for this operation
 **/
exports.followSerie = function(showToFollow, userId) {
  return new Promise(function(resolve, reject) {
    const information = showToFollow.information;
    const seasons = showToFollow.seasons;
    const cast = showToFollow.cast;
    const serieId = information.id;
    
    SQLqueryIF = "SELECT IF (EXISTS(SELECT * FROM serie WHERE id = '" + serieId  + "'), true, false) as exist"    
    SQLqueryINSERTuser_serie = "INSERT into user_serie(userId, serieId, current_saison, current_episode) VALUES("
                      + userId + ", " + serieId + ", 1, -1)";
    db.querySqlSelect(SQLqueryIF)
    .then(resultIF => {
      if(resultIF[0].exist){
        this.updateSerie(serieId, information, seasons, cast)
        .then(() => {
          db.querySqlInsert(SQLqueryINSERTuser_serie)
          .then(resultINSERTuser_serie => {
            resolve(resultINSERTuser_serie);
          }).catch(err => {
            if(err.number !== 1062){
              reject(err);
            }
            resolve(true);
          })
        }).catch(err => {
          reject(err);
        })
      } else {
        this.addSerie(serieId, information)
        .then(() => {
          this.addActors(cast, serieId)
          .then(() => {
            this.addSeasons(seasons, serieId)
            .then(() => {
              db.querySqlInsert(SQLqueryINSERTuser_serie)
              .then(resultINSERTuser_serie => {
                resolve(resultINSERTuser_serie);
              }).catch(err => {
                if(err.number !== 1062){
                  reject(err);
                }
                resolve(true);
              })
            }).catch(err => reject(err));
          }).catch(err => reject(err));
        }).catch(err => reject(err));
      }
    }).catch(err => {
      console.log("error");
      reject(err);
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
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
}

