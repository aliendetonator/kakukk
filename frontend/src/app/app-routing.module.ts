import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { RegisterPanelComponent } from './register-panel/register-panel.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MenuComponent } from './menu/menu.component';
import { LobbyComponent } from './lobby/lobby.component';
=======
import { LeaderboardComponent } from './views/popup-panels/leaderboard/leaderboard.component';
import { StatisticsComponent } from './views/popup-panels/statistics/statistics.component';
import { NavbarComponent } from './auth/components/navbar/navbar.component';
import { StartMenuComponent } from './views/start-menu/start-menu.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
>>>>>>> 7f8cbd7aed0d39f2996efb9dd5452725279d6cdc

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
<<<<<<< HEAD
  { path: 'lobby', component: LobbyComponent },
  { path: '**', redirectTo: '/' },
=======
  { path: 'statistics', canActivate: [AuthGuardService], component: StatisticsComponent },
  { path: 'menu', canActivate: [AuthGuardService],component: StartMenuComponent},
  { path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent},
  { path: '**', component: NavbarComponent},
>>>>>>> 7f8cbd7aed0d39f2996efb9dd5452725279d6cdc
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
