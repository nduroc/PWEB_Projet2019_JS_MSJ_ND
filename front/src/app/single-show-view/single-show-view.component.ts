import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';// fafa icon
import { SingleShow } from '../services/singleShow.service';
import { ActivatedRoute } from '@angular/router';
import { OneShow, Season, ActorCharacter, Episode, TvShowInformation } from '../services/oneShow.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-single-show-view',
  templateUrl: './single-show-view.component.html',
  styleUrls: ['./single-show-view.component.scss']
})
export class SingleShowViewComponent implements OnInit {
  public chevronLeft = faChevronLeft;
  public chevronRight = faChevronRight;
  public actualShow: OneShow = new OneShow();
  public seasonSlice: Season[] = new Array<Season>();
  public minSlice: number = 0;
  public maxSlice: number = 4;

  public seasonClicked: Season = null;


  constructor(private singleShowService: SingleShow, private activeRoute: ActivatedRoute) {

    this.singleShowService.getActualShow(this.activeRoute.snapshot.params["showId"])
      .then(
        (oneShow) => {
          this.actualShow = <OneShow>oneShow;
          this.seasonSlice = this.actualShow.seasons.slice(this.minSlice, this.maxSlice);
          console.log(JSON.stringify(this.actualShow));
        })


  }

  ngOnInit() {
  }
  onChevronClick(offset: number) {
    if (this.minSlice + offset > -1 && this.maxSlice + offset < this.actualShow.seasons.length) {
      this.minSlice = this.minSlice + offset;
      this.maxSlice = this.maxSlice + offset;
      this.seasonSlice = this.actualShow.seasons.slice(this.minSlice, this.maxSlice);
    }
  }

  seasonClick(seasonId: number,indexOfSeason:number) {
    let episodesRdyPromise
    if (this.actualShow.seasons[indexOfSeason].episodes.length==0) {
      episodesRdyPromise=this.singleShowService.getEpisodeForASeason(seasonId)
    }
    else
    {
      episodesRdyPromise=this.actualShow.seasons[indexOfSeason].episodes
    }

    Promise.all([episodesRdyPromise]).then(episodes =>
      {
        this.actualShow.seasons[indexOfSeason].addEpisodes(<Episode[]>episodes[0])
        this.seasonClicked= this.actualShow.seasons[indexOfSeason];
      }
      
      );
  }

}
