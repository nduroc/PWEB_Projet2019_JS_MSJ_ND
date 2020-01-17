import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Injectable()
export class FollowedShowsService {
  constructor(private httpClient: HttpClient, @Inject(SESSION_STORAGE) private storage: StorageService) { }


  getFollowedShows(userId: number) {

    let promise = new Promise((resolve, reject) => {

      this.httpClient.get(environment.apiPath + 'series/followedSeries?userId=' + userId)
        .toPromise()
        .then(
          (result) => {
            console.log(result)
            resolve()
          },
          (error) => {
            console.log(error)
            reject()
          }
        )


    });
    return promise;

  }

  markAnEpisode(episodeId: number, userId: number,showId:number) {
    let promise = new Promise((resolve, reject) => {

      this.httpClient.get(environment.apiPath + 'episode/mark?userId=' + userId)
        .toPromise()
        .then(
          (result) => {
            console.log(result)
            resolve()
          },
          (error) => {
            console.log(error)
            reject()
          }
        )
    });
    return promise;

  }

  unMarkEpisode(episodeId: number, userId: number,showId:number) {
    let promise = new Promise((resolve, reject) => {

      this.httpClient.get(environment.apiPath + 'episode/unmark?userId=' + userId)
        .toPromise()
        .then(
          (result) => {
            console.log(result)
            resolve()
          },
          (error) => {
            console.log(error)
            reject()
          }
        )
    });
    return promise;
  }

}