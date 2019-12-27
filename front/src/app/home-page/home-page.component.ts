import { Component, OnInit } from '@angular/core';
import { HomeSeries, TvShow } from '../services/homeSeries.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public series;
  public howManyShowsByPageApi: Map<Number, Number>;
  public allGetShows: TvShow[];
  public toDisplay = new Array<TvShow>();
  public actualNbPage: number[];
  public actualPage: number;

  constructor(private homeSeries: HomeSeries, private router: Router, private activeRoute: ActivatedRoute) {activeRoute.params.subscribe( (val)=>{
    this.ngOnInit();
  }) }

  ngOnInit() {
    console.log("je passe par le ngonInit")
    this.actualPage = this.activeRoute.snapshot.params["page"];
    this.getAnotherWebApiPage(0).then(() => {
      this.preparePageToDisplay(this.actualPage);
    })


  }





  preparePageToDisplay(page: number) {


    let maxToDisplay = page * 25;
    let apiPage = Math.floor((maxToDisplay - 1) / 250);
    if (maxToDisplay > this.allGetShows.length) {
      let apiPageToRequest = Math.floor((this.allGetShows[this.allGetShows.length - 1].id / 250) + 1)
      console.log(apiPageToRequest);
      this.getAnotherWebApiPage(apiPageToRequest).then(() => this.preparePageToDisplay(page));
      // this.actualNbPage= new Array<number>(Math.floor(this.allGetShows.length/25)).fill(1);
      // console.log(this.actualNbPage);
    } else {
      this.toDisplay = this.allGetShows.slice(maxToDisplay - 25, maxToDisplay)
    }



  }

  getAnotherWebApiPage(page: number) {

    let promise = new Promise((resolve, reject) => {
      this.homeSeries.getSeries(page).then(
        res => {

          this.allGetShows = this.homeSeries.shows;
          resolve();
        },
        error => {
          console.log("error");
          reject();
        }
      );
    }
    );
    return promise;
  }
}