import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';// fafa icon
import { SingleShow } from '../services/singleShow.service';
import { ActivatedRoute } from '@angular/router';
import { OneShow, Season, ActorCharacter, Episode, TvShowInformation } from '../services/oneShow.service';
import { AuthService } from '../services/auth.service';

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
  public heFollow: boolean = null;
  public seasonClicked: Season = null;
  public load: boolean = false;


  constructor(private singleShowService: SingleShow, private activeRoute: ActivatedRoute, private authService: AuthService) {
    this.load = true;
    this.singleShowService.getActualShow(this.activeRoute.snapshot.params["showId"])
      .then(
        (oneShow) => {
          this.load = false;
          this.actualShow = <OneShow>oneShow;
          this.seasonSlice = this.actualShow.seasons.slice(this.minSlice, this.maxSlice);
          this.isFollowed();
          //console.log(this.actualShow);
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

  seasonClick(seasonId: number, indexOfSeason: number) {
    //console.log(JSON.stringify(this.actualShow));
    this.load == true;
    let episodesRdyPromise
    if (this.actualShow.seasons[indexOfSeason].episodes.length == 0) {
      episodesRdyPromise = this.singleShowService.getEpisodeForASeason(seasonId)
    }
    else {
      episodesRdyPromise = this.actualShow.seasons[indexOfSeason].episodes
    }
    
    Promise.all([episodesRdyPromise]).then(episodes => {
      console.log(this.actualShow);
      this.actualShow.seasons[indexOfSeason].episodes=(<Episode[]>episodes[0]);;
      this.seasonClicked = this.actualShow.seasons[indexOfSeason];
      this.load = false;
    }

    );
  }
  isFollowed() {
    this.singleShowService.checkFollow(this.authService.getUserId(), this.actualShow.information.id)
      .then(
        (result) => {
          console.log(result);
          this.heFollow = <boolean>result
        }

      )

  }
  followShow() {
    this.singleShowService.followAShow(this.authService.getUserId(), this.actualShow).then( 
      
      (result) => {

        console.log("chibre miel");
        if (<boolean>result == true) {
          console.log("ca a follow")
          this.heFollow = true;
        }
        else {
          console.log("y'a eu un probleme")
        }
      }
      )
   
  }

  unFollow() {
    this.singleShowService.unFollow(this.authService.getUserId(), this.actualShow.information.id).then(

      (result) => {

        console.log("chibre miel");
        if (<boolean>result == true) {
          console.log("ca a unfollow")
          this.heFollow = false;
        }
        else {
          console.log("y'a eu un probleme")
        }

      }).catch( (result) => console.log("bite"))

  }

}
