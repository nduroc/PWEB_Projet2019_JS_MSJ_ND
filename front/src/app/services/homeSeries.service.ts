import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TvShow {

   id: number;
   name: string;
   type: string;
   genre: string[];
   status: string;
   start: string;
   officialSite: string;
   urlMediumImage: string;
   urlOriginalImage: string;
   rate: number;
   summary: string;

   constructor(private show: any[]) {
      this.id = show["id"];
      this.name = show["name"];
      this.type = show["type"];
      this.genre = show["genres"];
      this.status = show["status"];
      this.start = show["premiered"];
      this.officialSite = show["officialSite"];
      if (show["image"] != null) {
         this.urlMediumImage = show["image"]["medium"];
         this.urlOriginalImage = show["image"]["original"];
      }
      else {
         this.urlMediumImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
         this.urlOriginalImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
      }
      this.rate = show["rating"]["average"];
      this.summary = show["summary"];
   }
}

@Injectable()
export class HomeSeries {
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

   shows = new Array<TvShow>();

   showsMap = new Map<Number, Number>();
   constructor(private httpClient: HttpClient) { }

   getSeries(page: number) {
      let promise;
      if (!this.showsMap.has(page)) {
         promise = new Promise((resolve, reject) => {
            this.httpClient
               .get<any[]>('http://api.tvmaze.com/shows?page=' + page)
               .toPromise()
               .then((res) => {
                  let oldSize = this.shows.length;
                  this.shows = this.shows.concat(res.map(response => { return new TvShow(response); }));
                  let size = this.shows.length - oldSize;
                  this.showsMap.set(page, size);
                  // console.log(this.showsMap);
                  resolve();
               },
                  (msg) => {
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
}