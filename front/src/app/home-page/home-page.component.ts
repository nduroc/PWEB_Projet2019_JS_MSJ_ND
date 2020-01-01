import { Component, OnInit } from '@angular/core';//core
import { HomeSeries } from '../services/homeSeries.service';//service
import { Router, ActivatedRoute, Params } from '@angular/router';//routeur 
import { faStar } from '@fortawesome/free-solid-svg-icons';// fafa icon
import { TvShowInformation } from '../services/oneShow.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public faStar = faStar;
  public series;
  public howManyShowsByPageApi: Map<Number, Number>;
  public allGetShows: TvShowInformation[];
  public toDisplay = new Array<TvShowInformation>();
  public actualPage: number;
  public genres: string[];
  public types: string[];
  public statusTab: string[];
  public params: Params;
  public search: string;
  public genre: string;
  public status: string;
  public type: string;


  constructor(private homeSeries: HomeSeries, private router: Router, private activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe((val) => {
      this.actualPage = this.activeRoute.snapshot.params["page"];
      this.getAnotherWebApiPage("constructor").then(() => {
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
    let temp = this.allGetShows.filter(show => this.filterPrepare(show)).slice(maxToDisplay - 25, maxToDisplay)
    //console.log(maxToDisplay);
    if ((25 > temp.length || this.allGetShows.length < maxToDisplay) && this.homeSeries.lastPage!=true) {
      this.getAnotherWebApiPage("if de preparePageToDisplay").then(() => this.preparePageToDisplay(page));
    } else {

      this.toDisplay = temp
    }
  }

  getAnotherWebApiPage(where: string) {

    console.log(where)
    let promise = new Promise((resolve, reject) => {
      this.homeSeries.getNextPage().then(
        res => {

          this.allGetShows = this.homeSeries.shows;
          console.log(this.allGetShows.length);
          resolve();
        },
        error => {
          //console.log("error");
          reject();
        }
      );
    }
    );
    return promise;
  }

  filterPrepare(show: TvShowInformation): boolean {
    let ok = true;

    if (this.params.genre != null && this.params.genre != "") {

      ok = ok && show.genre.includes("" + this.params.genre);
    }
    if (this.params.status != null && this.params.status != "") {
      ok = ok && show.status == "" + this.params.status;
    }
    if (this.params.type != null && this.params.type != "") {
      ok = ok && show.type == "" + this.params.type;
    }
    if (this.params.search != null && this.params.search != "") {
      ok = ok && show.name.toLowerCase().includes(("" + this.params.search).toLowerCase())
    }
    return ok;
  }

  clearFilter() {
    this.router.navigate([])
  }

  onFilterClick() {
    this.router.navigate([],
      { queryParams: { genre: this.genre, 'status': this.status, 'type': this.type, 'search': this.search } }).then(() => { this.preparePageToDisplay(this.actualPage); });
  }

  onPageClick(page: number) {
    this.router.navigate(['../' + page], { queryParamsHandling: "preserve", relativeTo: this.activeRoute });
  }

  oneShowClick(localShow :TvShowInformation)
  {
    this.homeSeries.keepCurrentLocalShowInformation(localShow)
    this.router.navigate(['/oneShow/'+localShow.id]);
  }
}