import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Injectable()
export class FollowedShowsService {
  constructor(private httpClient: HttpClient, @Inject(SESSION_STORAGE) private storage: StorageService) { }


  getFollowedShows(userId: number) {

    let promise = new Promise<any[]>((resolve, reject) => {

      this.httpClient.get<any[]>(environment.apiPath + 'series/followedSeries?userId=' + userId)
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

  markAnEpisode(episodeId: number, userId: number,showId:number) {
    let promise = new Promise((resolve, reject) => {

      this.httpClient.post(environment.apiPath + 'episode/mark?userId=' + 1 + '&episodeId=' + 1 +'&serieId=' + 1 ,{})
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

      this.httpClient.post(environment.apiPath + 'episode/unmark?userId=' + 1 + '&episodeId=' + 1 +'&serieId=' + 1 ,{})
        .toPromise()
        .then(
          (result) => {
            console.log(result)
            resolve(result)
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