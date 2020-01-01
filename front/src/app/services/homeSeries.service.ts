import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { TvShowInformation } from './oneShow.service';




@Injectable()
export class HomeSeries {
 

   private actualPage: number = -1
   public lastPage: boolean = false;
   types = [
      "Scripted",
      "Animation",
      "Reality",
      "Talk Show",
      "Documentary",
      "Game Show",
      "News",
      "Sports",
      "Variety",
      "Award Show",
      "Panel Show",];

   status = ["Running", "Ended", "To Be Determined", "In Development"];


   genres = ["Action",
      "Adult",
      "Adventure",
      "Anime",
      "Children",
      "Comedy",
      "Crime",
      "DIY",
      "Drama",
      "Espionage",
      "Family",
      "Fantasy",
      "Food",
      "History",
      "Horror",
      "Legal",
      "Medical",
      "Music",
      "Mystery",
      "Nature",
      "Romance",
      "Science-Fiction",
      "Sports",
      "Supernatural",
      "Thriller",
      "Travel",
      "War",
      "Western"]

   shows = new Array<TvShowInformation>();

   showsMap = new Map<Number, Number>();
   constructor(private httpClient: HttpClient, @Inject(SESSION_STORAGE) private storage: StorageService) { this.store() }
   store() {
      this.storage.set("actualPage", this.actualPage)
      this.storage.set("lastPage", this.actualPage)
   }
   getSeries(page: number) {
      let promise;
      if (!this.showsMap.has(page)) {
         promise = new Promise((resolve, reject) => {
            this.httpClient
               .get<any[]>('http://api.tvmaze.com/shows?page=' + page)
               .toPromise()
               .then((res) => {
                  let oldSize = this.shows.length;
                  this.shows = this.shows.concat(res.map(response => { return new TvShowInformation(response); }));
                  let size = this.shows.length - oldSize;
                  this.showsMap.set(page, size);
                  // console.log(this.showsMap);
                  resolve();
               },
                  (error) => {
                     this.lastPage = true;
                     console.log("plus rien a recuperer")
                     this.store();
                     reject();
                  }
               )
         });
      }
      else {
         promise = new Promise((resolve, reject) => {
            resolve();
         })
      }
      return promise;
   }

   getNextPage() {
      this.actualPage = +this.storage.get("actualPage") + 1;
      this.store();
      return this.getSeries(this.actualPage);

   }
   keepCurrentLocalShowInformation(actualLocalShow:TvShowInformation) {
    this.storage.set("actualShow",JSON.stringify(actualLocalShow));
   }
}