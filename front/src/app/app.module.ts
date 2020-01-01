import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthService } from './services/auth.service';
import { HomeSeries } from './services/homeSeries.service';
import { HttpClientModule } from '@angular/common/http';
import { TvShowInformation,ActorCharacter,Episode,OneShow,Season } from './services/oneShow.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StorageServiceModule } from 'angular-webstorage-service';
import { SingleShowViewComponent } from './single-show-view/single-show-view.component';
import { SingleShow } from './services/singleShow.service';
import { SeasonViewComponent } from './season-view/season-view.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    HomePageComponent,
    SingleShowViewComponent,
    SeasonViewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    StorageServiceModule,
    NgbModule
  ],
  providers: [AuthService, HomeSeries, TvShowInformation,Season,OneShow,ActorCharacter,Episode,SingleShow],
  bootstrap: [AppComponent],
})
export class AppModule { }
