import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';// fafa icon
import { SingleShow } from '../services/singleShow.service';
import { ActivatedRoute } from '@angular/router';
import { OneShow, Season, ActorCharacter, Episode, TvShowInformation } from '../services/oneShow.service';
import { AuthService } from '../services/auth.service';
import { faUsers } from '@fortawesome/free-solid-svg-icons';// fafa icon
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
  public howManyUsers:number=0;
  public faUsers=faUsers;


  constructor(private singleShowService: SingleShow, private activeRoute: ActivatedRoute, private authService: AuthService) {
    this.load = true;
    this.singleShowService.getActualShow(this.activeRoute.snapshot.params["showId"])
      .then(
        (oneShow) => {
          this.load = false;
          this.actualShow = <OneShow>oneShow;
          this.seasonSlice = this.actualShow.seasons.slice(this.minSlice, this.maxSlice);
          this.isFollowed();
          this.howMany();
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
    this.load == true;
    let episodesRdyPromise
    if (this.actualShow.seasons[indexOfSeason].episodes.length == 0) {
      episodesRdyPromise = this.singleShowService.getEpisodeForASeason(seasonId)
    }
    else {
      episodesRdyPromise = this.actualShow.seasons[indexOfSeason].episodes
    }
    
    Promise.all([episodesRdyPromise]).then(episodes => {
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
          this.heFollow = <boolean>result
        }

      )

  }
  followShow() {
    this.load=true;
    this.singleShowService.followAShow(this.authService.getUserId(), this.actualShow).then( 
      
      (result) => {

        if (<boolean>result == true) {
          this.heFollow = true;
          this.load=false;
          this.howManyUsers+=1;
        }
        else {
          this.load=false;
        }
      }
      )
   
  }

  unFollow() {
    this.load=true;
    this.singleShowService.unFollow(this.authService.getUserId(), this.actualShow.information.id).then(

      (result) => {

        if (<boolean>result == true) {
          this.heFollow = false;
          this.load=false;
          this.howManyUsers-=1;
        }
        else {
          this.load=false
        }

      })

  }
  howMany()
  {
    this.singleShowService.howManyUserFollow(this.actualShow.information.id).then( (result)=>
      {
        this.howManyUsers=<number>result;
      
      },
      error => console.log(error)
    )
    
  }

}
