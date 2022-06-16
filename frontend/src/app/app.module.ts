import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './views/app/app.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { ApiService } from './services/api.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LeaderboardComponent } from './views/popup-panels/leaderboard/leaderboard.component';
import { StatisticsComponent } from './views/popup-panels/statistics/statistics.component';
import { StartMenuComponent } from './views/start-menu/start-menu.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AuthModule } from './auth/auth/auth.module';
import { InterceptorServiceService } from './services/interceptor-service.service';
import { LobbyprofileComponent } from './lobbyprofile/lobbyprofile.component';
import { LobbyComponent } from './lobby/lobby.component';
import { JoinLobbyComponent } from './views/popup-panels/join-lobby/join-lobby.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    StatisticsComponent,
    StartMenuComponent,
    ProfileComponent,
    LobbyComponent,
    LobbyprofileComponent,
    JoinLobbyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule
  ],
  providers: [ApiService, DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorServiceService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
