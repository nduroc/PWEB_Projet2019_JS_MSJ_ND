import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './auth/log-in/log-in.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'homePage/1' },
{ path: 'login', component: LogInComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'homePage/:page', component: HomePageComponent },
{ path: 'homePage/:page/filter', component: HomePageComponent },
{ path: '**', redirectTo: "/homePage/1" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
