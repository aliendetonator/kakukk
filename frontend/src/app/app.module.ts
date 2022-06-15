import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './views/app/app.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { ApiService } from './services/api.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
<<<<<<< HEAD
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { RegisterPanelComponent } from './register-panel/register-panel.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MenuComponent } from './menu/menu.component';
import { LobbyComponent } from './lobby/lobby.component';

=======
import { LeaderboardComponent } from './views/popup-panels/leaderboard/leaderboard.component';
import { StatisticsComponent } from './views/popup-panels/statistics/statistics.component';
import { StartMenuComponent } from './views/start-menu/start-menu.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AuthModule } from './auth/auth/auth.module';
import { InterceptorServiceService } from './services/interceptor-service.service';
>>>>>>> 7f8cbd7aed0d39f2996efb9dd5452725279d6cdc
@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
<<<<<<< HEAD
    MenuComponent,
    LobbyComponent
=======
    StatisticsComponent,
    StartMenuComponent,
    ProfileComponent
>>>>>>> 7f8cbd7aed0d39f2996efb9dd5452725279d6cdc
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule
  ],
  providers: [ApiService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorServiceService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
