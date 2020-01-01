import { Component, OnInit, Input } from '@angular/core';
import { Season } from '../services/oneShow.service';

@Component({
  selector: 'app-season-view',
  templateUrl: './season-view.component.html',
  styleUrls: ['./season-view.component.scss']
})
export class SeasonViewComponent implements OnInit {
@Input() seasonToShow : Season
  constructor() { 
    
  }

  ngOnInit() {
    console.log(this.seasonToShow)
  }


}
