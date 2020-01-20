import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  authStatus: boolean
  notValide: boolean = false;
  load: boolean = false;
  errorAllertMessage: string

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSubmitLogIn(form: NgForm) {
    this.load = true;
    this.authService.signIn(form.value["username"], form.value["password"]).then(
      (result) => {
        this.load = false;
        this.authStatus = this.authService.isAuth;
        this.router.navigate(["homePage"]);
      },
      (error) => {
        this.notValide = true
        this.load = false;
        if (error.toString() == "0") {
          this.errorAllertMessage = "login or password invalid"
        }
        else {
            this.errorAllertMessage = "an error occurred please try again later"
        }
      }
    )
  }
  close() {
    this.notValide = false;
  }

}
