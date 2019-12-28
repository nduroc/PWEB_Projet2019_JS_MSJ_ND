import { Component, OnInit } from '@angular/core';//core
import { HomeSeries, TvShow } from '../services/homeSeries.service';//service
import { Router, ActivatedRoute, Params } from '@angular/router';//routeur 
import { faStar } from '@fortawesome/free-solid-svg-icons';// fafa icon


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public faStar = faStar;
  public series;
  public howManyShowsByPageApi: Map<Number, Number>;
  public allGetShows: TvShow[];
  public toDisplay = new Array<TvShow>();
  public actualPage: number;
  public genres: string[];
  public types: string[];
  public statusTab: string[];
  public params: Params;

  public genre;
  public status;
  public type;


  constructor(private homeSeries: HomeSeries, private router: Router, private activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe((val) => {
      this.actualPage = this.activeRoute.snapshot.params["page"];
      this.getAnotherWebApiPage(0).then(() => {
        activeRoute.queryParams.subscribe(
          params => {
            this.params = params
            this.preparePageToDisplay(this.actualPage);
          }
        );


      })

    })

  }

  ngOnInit() {
    this.genres = this.homeSeries.genres;
    this.types = this.homeSeries.types;
    this.statusTab = this.homeSeries.status;

  }

  preparePageToDisplay(page: number) {

    
    let maxToDisplay = page * 25;
    let apiPage = Math.floor((maxToDisplay - 1) / 250);
    let temp = this.allGetShows.filter(show => this.filterPrepare(show)).slice(maxToDisplay - 25, maxToDisplay)
    console.log(temp.length);
    if (25 > temp.length || this.allGetShows.length< maxToDisplay ) 
   {
      
      let apiPageToRequest = Math.floor((this.allGetShows[this.allGetShows.length - 1].id / 250) + 1)
      
      this.getAnotherWebApiPage(apiPageToRequest).then(() => this.preparePageToDisplay(page));
    } else {
      
      this.toDisplay = temp
    }
  }

  getAnotherWebApiPage(page: number) {
    console.log("test")
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

  filterPrepare(show: TvShow): boolean {
    let ok = true;
    if (this.params.genre != null) {
      ok = ok && show.genre.includes("" + this.params.genre);
    }
    if (this.params.status != null) {
      ok = ok && show.status == "" + this.params.status;
    }
    if (this.params.type != null) {
      ok = ok && show.type == "" + this.params.type;
    }
    return ok;
  }

  clearFilter() {
    this.router.navigate([])
  }

  onFilterClick() {
    this.router.navigate([], { queryParams: { genre: this.genre, 'status': this.status, 'type': this.type }}).then(()=>{this.preparePageToDisplay(1);});
  }

  onPageClick(page: number) {
    this.router.navigate(['../' + page], { queryParamsHandling: "preserve", relativeTo: this.activeRoute });
  }
}