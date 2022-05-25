import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { RegisterPanelComponent } from './register-panel/register-panel.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes =
[
  {path:'register', component:RegisterPanelComponent},
  {path:'login', component:LoginPanelComponent},
  {path:'leaderboard', component:LeaderboardComponent},
  {path:'menu', component:MenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
