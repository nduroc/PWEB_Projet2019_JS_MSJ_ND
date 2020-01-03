import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { resolve } from 'url';
import { error } from 'protractor';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  notValide: boolean = false;
  load:boolean=false;
  constructor(private authService: AuthService, private router: Router) { }
  errorAllertMessage: string;
  ngOnInit() {
  }

  onSubmitRegister(form: NgForm) {
    this.load=true;
    if (form.value["username"] && form.value["password"] && form.value["email"])
      this.authService.register(form.value["username"], form.value["password"], form.value["email"]).then(

        (response) => {
          this.load=false;
          if (response.toString() == "0") {
            this.errorAllertMessage = "this email address or username already exists choose another one!";
            this.notValide = true;
          }
          else {
            
            this.authService.signIn(form.value["username"], form.value["password"]).then(
              (result) => {
                this.load=false;
                this.router.navigate(["login"]);
              },
              (error) => {
                this.load=false;
                this.errorAllertMessage = "An error occurred. Please try again later. ";
                this.notValide = true;
              }
            )

          }
        },
        (error) => {
          this.load=false;
          this.errorAllertMessage = "An error occurred. Please try again later. ";
          this.notValide = true;
        }

      );
    else {
      this.load=false;
      this.errorAllertMessage = "please complete all fields correctly !";
      this.notValide = true;

    }
  }
  close() {
    this.notValide = false;
  }
}
