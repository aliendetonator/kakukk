import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './views/popup-panels/leaderboard/leaderboard.component';
import { StatisticsComponent } from './views/popup-panels/statistics/statistics.component';
import { NavbarComponent } from './auth/components/navbar/navbar.component';
import { StartMenuComponent } from './views/start-menu/start-menu.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LobbyComponent } from './lobby/lobby.component';
import { JoinLobbyComponent } from './views/popup-panels/join-lobby/join-lobby.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  {
    path: 'statistics',
    canActivate: [AuthGuardService],
    component: StatisticsComponent,
  },
  {
    path: 'menu',
    canActivate: [AuthGuardService],
    component: StartMenuComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    component: ProfileComponent,
  },
  { path: 'lobby', canActivate: [AuthGuardService], component: LobbyComponent },
  {
    path: 'joinLobby',
    canActivate: [AuthGuardService],
    component: JoinLobbyComponent,
  },
  { path: '**', component: NavbarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
