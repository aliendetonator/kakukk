import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPanelComponent } from './views/login-panel/login-panel.component';
import { RegisterPanelComponent } from './views/register-panel/register-panel.component';
import { LeaderboardComponent } from './views/leaderboard/leaderboard.component';
import { MenuComponent } from './views/menu/menu.component';

const routes: Routes = [
  { path: 'register', component: RegisterPanelComponent },
  { path: 'login', component: LoginPanelComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
