import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
})
export class LobbyComponent implements OnInit, OnDestroy {
  public id: string;
  public users: any[] = [];
  private getDataFromServer: any;
  private errorNum: number = 0;
  @ViewChild('container') userContainer: ElementRef;

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.gameService.getLobby().subscribe(
      (res) => {
        console.log(res.data);
        this.id = res.data[0].lobby;
      },
      (err) => {
        if (err.error.code) {
          this.router.navigate(['/']);
        }
      }
    );

    this.getDataFromServer = interval(1000).subscribe(() => {
      this.gameService
        .getChanges({ lobby: this.id, playerCount: this.users.length })
        .subscribe((res) => {
          this.errorNum = 0;
          console.log(res);
          if (res.code === 'no_changes') return;
          if (res.code === 'lobby_updated') {
            if (res.data.length === 0) {
              this.leaveLobby();
            }
            this.users = res.data;
            this.updateUsers();
          }
        }, (err) => {
          this.errorNum++;
          if (this.errorNum > 5) {
            this.leaveLobby();
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.leaveLobby();
  }

  leaveLobby(): void {
    this.gameService.leaveLobby().subscribe((res) => {
      console.log(res);

      this.getDataFromServer.unsubscribe();
      this.router.navigate(['/']);
    }, (err) => {
      console.log(err);
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
