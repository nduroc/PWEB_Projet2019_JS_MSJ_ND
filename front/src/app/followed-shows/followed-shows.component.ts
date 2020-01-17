import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FollowedShowsService } from '../services/followedShows.service';
import { ActivatedRoute } from '@angular/router';
import { faEye, faEyeSlash, faTrash, } from '@fortawesome/free-solid-svg-icons';// fafa icon
import { SingleShow } from '../services/singleShow.service';


@Component({
  selector: 'app-followed-shows',
  templateUrl: './followed-shows.component.html',
  styleUrls: ['./followed-shows.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FollowedShowsComponent implements OnInit {
  public userId: number;
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  public faTrash = faTrash;
  public load=false;
  public followedShow
  constructor(private myShowService: FollowedShowsService, private activeRoute: ActivatedRoute, private authService: AuthService,private singleShow: SingleShow) {
    this.load=true;
    this.userId = this.authService.getUserId()

    this.myShowService.getFollowedShows(this.userId).then((result) => {
     this.followedShow=result
     console.log(this.followedShow);
      this.load=false;


    });

  }


  ngOnInit() {
  }
  unFollowShow(showId: number) {
    this.singleShow.unFollow(this.userId,showId).then( (result) => 
    (result) => {

      if (<boolean>result == true) {
        this.load=false;

      }
      else {
        this.load=false
      }
    }
    )
  }
  markEpisode(episodeId:number,showId:number)
  {
    this.myShowService.markAnEpisode(episodeId,this.userId,showId);
  }
  unMarkEpisode(episodeId:number,showId:number)
  {
    this.myShowService.unMarkEpisode(episodeId,this.userId,showId);
  }

}
