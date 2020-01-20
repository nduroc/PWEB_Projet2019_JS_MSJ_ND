import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FollowedShowsService } from '../services/followedShows.service';
import { ActivatedRoute } from '@angular/router';
import { faEye, faEyeSlash, faTrash, } from '@fortawesome/free-solid-svg-icons';// fafa icon
import { SingleShow } from '../services/singleShow.service';
import { KeyValue } from '@angular/common';


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
  public load = false;
  public followedShow;
  public showEpisode:Set<string>;
  constructor(private myShowService: FollowedShowsService, private activeRoute: ActivatedRoute, private authService: AuthService, private singleShow: SingleShow) {
  this.load = true;
  this.userId = this.authService.getUserId()

   let allFollowedShow=this.myShowService.getFollowedShows(this.userId)
    let allSeenEpisodes=this.myShowService.getShowedEpisode(this.userId)

    Promise.all([allFollowedShow,allSeenEpisodes]).then((result) => {
      this.followedShow = result[0]
      this.showEpisode=<Set<string>>result[1];
      this.load = false;



    });

  }


  ngOnInit() {
  }
  unFollowShow(showId: number) {
    this.load=true;
    this.singleShow.unFollow(this.userId, showId).then((result) => {
      
        if (<boolean>result == true) {
          this.load = false;
          document.getElementById("show"+showId).remove();
        }
        else {
          this.load = false
        }
      }
    )
  }
  markEpisode(episodeId: number, showId: number) {
    this.load=true;
    this.myShowService.markAnEpisode(episodeId, this.userId, showId).then( result => {
      if(<number>result>0)
      {
        this.load=false;
        this.showEpisode.add(episodeId.toString())
        let card=document.getElementById("card"+episodeId)
        card.classList.remove("card-episode-unseen")
        card.classList.add("card-episode-seen")
        let unmark = document.getElementById("unmark"+episodeId);
        unmark.hidden=false;
        let mark=document.getElementById("mark"+episodeId);
        mark.hidden=true;
      }
      else
      {
        this.load=false;
      }
    });
  }
  unMarkEpisode(episodeId: number, showId: number) {
    this.load=true
    this.myShowService.unMarkEpisode(episodeId, this.userId, showId).then( result => {
      if(result=="1")
      {
        this.load=false;
        this.showEpisode.delete((episodeId.toString()))
        let card=document.getElementById("card"+episodeId)
        card.classList.remove("card-episode-seen")
        card.classList.add("card-episode-unseen")
        let unmark = document.getElementById("unmark"+episodeId);
        unmark.hidden=true;
        let mark=document.getElementById("mark"+episodeId);
        mark.hidden=false;


      }
      else
      {
        this.load=false;
      };
    })
  }
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
  isSeen(id:string)
  {
    return this.showEpisode.has(id);
  }

}
