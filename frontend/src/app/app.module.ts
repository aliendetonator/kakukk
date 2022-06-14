import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './views/app/app.component';

import {HttpClientModule} from '@angular/common/http'
import { ApiService } from './services/apiservice/apiservice.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginPanelComponent } from './views/popup-panels/login-panel/login-panel.component';
import { RegisterPanelComponent } from './views/popup-panels/register-panel/register-panel.component';
import { LeaderboardComponent } from './views/popup-panels/leaderboard/leaderboard.component';
import { MenuComponent } from './views/menu/menu.component';
import { StatisticsComponent } from './views/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent,
    RegisterPanelComponent,
    LeaderboardComponent,
    MenuComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
