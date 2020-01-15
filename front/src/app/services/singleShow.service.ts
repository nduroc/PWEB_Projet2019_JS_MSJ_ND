import { Injectable, Inject } from '@angular/core';
import { TvShowInformation, OneShow, Season, Episode, ActorCharacter } from './oneShow.service';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SingleShow {


    actualShow: OneShow;

    constructor(private httpClient: HttpClient, @Inject(SESSION_STORAGE) private storage: StorageService) {

    }

    loadCurrentLocalshowInformation(): TvShowInformation {
        let currentShowInformation: TvShowInformation = <TvShowInformation>JSON.parse(this.storage.get("actualShow"));
        //console.log(currentShowInformation);
        return currentShowInformation;
    }
    getActualShow(id: number) {
        let show;
       // console.log(this.storage.get("show" + id));
        if ((show = <OneShow>this.storage.get("show" + id)) == null) {
            let currentShowInformation: TvShowInformation = this.loadCurrentLocalshowInformation();
            this.actualShow = new OneShow()
            let requestShowinformationPromise;
            if (currentShowInformation == null || currentShowInformation.id != id)
                requestShowinformationPromise = this.requestAcutalShowInformation(id).then((res) => currentShowInformation = <TvShowInformation>res);
            else
                requestShowinformationPromise = currentShowInformation;

            let requestShowSeasonPromise = this.requestShowSeason(id)
            let requestShowCastPromise = this.requestShowCast(id)
            let promise = new Promise((resolve, reject) => {
                Promise.all([requestShowinformationPromise, requestShowSeasonPromise, requestShowCastPromise])
                    .then(
                        (data) => {
                            this.actualShow.loadInformation(<TvShowInformation>(data[0]));
                            console.log(data[1]);
                            this.actualShow.addAllSeason(<Season[]>(data[1]));
                            this.actualShow.addCast(<ActorCharacter[]>(data[2]));
                            this.storage.set("show"+this.actualShow.information.id,JSON.stringify(this.actualShow))
                            resolve(this.actualShow)
                        },
                        (error) => {
                            console.log(error)
                            reject()
                        }
                    );

            })


            return promise;
        }
        else {
            let promise = new Promise((resolve, reject) => {
                
                let showObject : OneShow;
                showObject = <OneShow>(JSON.parse(show))
                resolve(showObject)
            })
            return promise;
        }

    }
    requestShowCast(id: number) {
        let promise = new Promise((resolve, reject) => {
            this.httpClient.get<any[]>('http://api.tvmaze.com/shows/' + id + "/cast")
                .toPromise()
                .then(
                    (result) => {
                        let cast: ActorCharacter[] = <ActorCharacter[]>(result.map(actorCharacter => {

                            let actor = new ActorCharacter();
                            actor.setValue(actorCharacter);
                            return actor

                        }))
                        //console.log(csi);
                        resolve(cast);
                    },
                    (error) => {
                        console.log(error);
                        reject();
                    }
                )


        });
        return promise;
    }

    requestAcutalShowInformation(id: number) {
        let promise = new Promise((resolve, reject) => {
            this.httpClient
                .get<any[]>('http://api.tvmaze.com/shows/' + id)
                .toPromise()
                .then(
                    (result) => {
                        let csi: TvShowInformation = new TvShowInformation();
                        csi.setValue(result);
                        resolve(csi);
                    },
                    (error) => {
                        console.log(error);
                        reject();
                    }
                )


        });
        return promise;
    }
    requestShowSeason(id: number) {
        let promise = new Promise((resolve, reject) => {
            this.httpClient.get<any[]>('http://api.tvmaze.com/shows/' + id + "/seasons")
                .toPromise()
                .then(
                    (result) => {
                        let seasons: Season[] = <Season[]>(result.map(season => {
                            let oneSeason = new Season()
                            oneSeason.setValue(season);
                            return oneSeason;
                        }))
                        //console.log(csi);
                        resolve(seasons);
                    },
                    (error) => {
                        console.log(error);
                        reject();
                    }
                )


        });
        return promise;
    }

    getEpisodeForASeason(seasonId: number) {
        let promise = new Promise((resolve, reject) => {
            this.httpClient.get<any[]>('http://api.tvmaze.com/seasons/' + seasonId + "/episodes")
                .toPromise()
                .then(
                    (result) => {
                        let episodes: Episode[] = <Episode[]>(result.map(episode => {
                            let anEpisode = new Episode()
                            anEpisode.setValue(episode)
                            return anEpisode
                        }))
                        //console.log(csi);
                        resolve(episodes);
                    },
                    (error) => {
                        console.log(error);
                        reject();
                    }
                )


        });
        return promise;
    }
    followAShow(userId: number, actualShow: OneShow) {
        let promise = new Promise((resolve, reject) => {

            this.httpClient.post('http://localhost:8080/serie/follow?userId=' + userId, { serieJson: JSON.stringify(actualShow) })
                .toPromise()
                .then(

                    (result) => {
                        console.log(result)

                    },
                    (error) => {
                        console.log("pasteque")
                        console.log(error)

                    }
                )


        });
        return promise;

    }

    checkFollow(userId: number, showId: number) {
        let promise = new Promise((resolve, reject) => {

            this.httpClient.get('http://localhost:8080/serie/isFollowed?userId=' + userId + '&serieId=' + showId)
                .toPromise()
                .then(
                    
                    (result) => {
                        if(<string>result=="1")
                        resolve(true);
                        else
                        resolve(false);

                    },
                    (error) => {
                        
                        console.log(error)
                        reject(false)
                    }
                )


        });
        return promise;

      }

      unFollow(userId: number, showId: number) {
        let promise = new Promise((resolve, reject) => {

            this.httpClient.delete('http://localhost:8080/serie/unfollow?userId=' + userId + '&serieId=' + showId)
                .toPromise()
                .then(
                    
                    (result) => {
                        if(<string>result=="1")
                        resolve(true);
                        else
                        resolve(false);

                    },
                    (error) => {
                        
                        console.log(error)
                        reject(false)
                    }
                )


        });
        return promise;

      }

}