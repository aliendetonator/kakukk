import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  public id: string;
  public users: any[] = [];
  private getDataFromServer: any;
  @ViewChild('container') userContainer: ElementRef;

  constructor(private gameService: GameService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.gameService.getLobby().subscribe(res => {
      console.log(res.data)
      this.id = res.data[0].lobby;
    }, err => {
      if (err.error.code) {
        this.router.navigate(['/']);
      }
    });

    this.getDataFromServer = interval(1000).subscribe(() => {
      this.gameService.getChanges({ lobby: this.id, playerCount: this.users.length }).subscribe(res => {
        console.log(res)
        if (res.code === "no_changes") return;
        if (res.code === "lobby_updated") {
          this.users = res.data;
          this.updateUsers();
        }
      });
    })
  }

  ngOnDestroy(): void{
    this.gameService.leaveLobby().subscribe(res => { 
      console.log(res);
      this.getDataFromServer.unsubscribe();
      this.router.navigate(['/']);
    });
  }

  updateUsers() {
    console.log(this.users);
    // this.userContainer.nativeElement.innerHTML = "";
    // this.users.forEach(user => {
    //   const userElement = document.createElement(`<app-lobbyprofile username="Valaki"></app-lobbyprofile>`);
    //   this.userContainer.nativeElement.appendChild(userElement);
    // });
  }

}
