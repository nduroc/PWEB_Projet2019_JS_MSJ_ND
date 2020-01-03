import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm }   from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  authStatus: boolean
  notValide:boolean=false;

  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSubmitLogIn(form: NgForm) {
    
    this.authService.signIn(form.value["username"],form.value["password"]).then(
      () => {
        this.authStatus = this.authService.isAuth;
        this.router.navigate(["homePage"]);
      },
      (error) => {console.log(error),this.notValide=true} 
    )
  }
  close()
  {
    this.notValide=false;
  }

}
