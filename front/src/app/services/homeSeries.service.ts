import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error, promise } from 'protractor';


@Injectable()
export class TvShow {

   id: number;
   name: string;
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
      /* let errorGet;
 
         if(this.showsMap.has(page))
         {
            return this.showsMap;
         }
         this.httpClient
         .get<any[]>('http://api.tvmaze.com/shows?page='+page).to(
            (response)=>{
                this.shows = response.map(response=>new TvShow(response));
                this.showsMap.set(page,this.shows);
 
            },
            (error) => {errorGet=console.error();
            }
 
 
 
         );
         if(!errorGet)
         return this.showsMap;
 
         return errorGet;*/
   }
}