import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPanelComponent } from './views/popup-panels/login-panel/login-panel.component';
import { RegisterPanelComponent } from './views/popup-panels/register-panel/register-panel.component';
import { LeaderboardComponent } from './views/popup-panels/leaderboard/leaderboard.component';
import { StatisticsComponent } from './views/statistics/statistics.component';
import { MenuComponent } from './views/menu/menu.component';

const routes: Routes = [
  { path: 'register', component: RegisterPanelComponent },
  { path: 'login', component: LoginPanelComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
