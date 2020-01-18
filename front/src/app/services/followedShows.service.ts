import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Injectable()
export class FollowedShowsService {
  constructor(private httpClient: HttpClient, @Inject(SESSION_STORAGE) private storage: StorageService) { }


  getFollowedShows(userId: number) {

    let promise = new Promise((resolve, reject) => {

      this.httpClient.get(environment.apiPath + 'series/followedSeries?userId=' + userId, { responseType: 'json' })
        .toPromise()
        .then(
          (result) => {

            resolve(result)
          },
          (error) => {
            console.log(error)
            reject(error)
          }
        )


    });
    return promise;

  }
  getShowedEpisode(userId: number) {

    let promise = new Promise<Set<string>>((resolve, reject) => {

      this.httpClient.get<any[]>(environment.apiPath + 'series/episodesSeen?userId=' + userId, { responseType: 'json' })
        .toPromise()
        .then(
          (result) => {
            let mySet:Set<string> = new Set()
              let tmp =(result.map(value => {return <string>value["id"]}))
              for(let episode of tmp)
              {
                mySet.add(episode);
              }
            resolve(mySet);
          },
          (error) => {
            reject(error)
          }
        )


    });
    return promise;

  }

  markAnEpisode(episodeId: number, userId: number, showId: number) {
    let promise = new Promise((resolve, reject) => {

      this.httpClient.post(environment.apiPath + 'episode/mark?userId=' + userId + '&episodeId=' + episodeId + '&serieId=' + showId, {})
        .toPromise()
        .then(
          (result) => {
            resolve(result)
          },
          (error) => {
            reject(error)
          }
        )
    });
    return promise;

  }

  unMarkEpisode(episodeId: number, userId: number, showId: number) {
    let promise = new Promise((resolve, reject) => {

      this.httpClient.post(environment.apiPath + 'episode/unmark?userId=' + userId + '&episodeId=' + episodeId + '&serieId=' + showId, {})
        .toPromise()
        .then(
          (result) => {
            resolve(result)
          },
          (error) => {
            reject(error)
          }
        )
    });
    return promise;
  }

}