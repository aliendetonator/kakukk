import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.css', '../main.css']
})
export class StartMenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
  }

  createLobby() {
    this.gameService.createLobby().subscribe(res => {
      console.log(res);
      if (res.code === "joined") {
        return this.router.navigate(['/lobby']);
      }
      return alert(res.message);
    });
  }

  goToLobby() {
    this.router.navigate(['/lobby']);
  }

  logout() {
    this.authService.clearStorage();
    this.router.navigate(['']);
  }
}
