import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) { }

  checkAuth()
  {
    return this.authService.isAuth;
  }

  onLogOut() {
    
    this.authService.signOut()
    this.router.navigate(["login"])
  }
}
