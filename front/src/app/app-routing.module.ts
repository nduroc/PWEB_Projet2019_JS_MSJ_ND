import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './auth/log-in/log-in.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SingleShowViewComponent } from './single-show-view/single-show-view.component';
import { FollowedShowsComponent } from './followed-shows/followed-shows.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'homePage/1' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homePage/:page', component: HomePageComponent },
  { path: 'oneShow/:showId', component: SingleShowViewComponent },
  { path: 'myShow', component: FollowedShowsComponent},
  { path: 'load', component: LoadingScreenComponent},
  { path: '**', redirectTo: "/homePage/1" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
