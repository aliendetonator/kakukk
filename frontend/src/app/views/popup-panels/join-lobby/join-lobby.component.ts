import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.css'],
})
export class JoinLobbyComponent implements OnInit {
  constructor(private service: ApiService, private router: Router, private gameService: GameService) {}

  joinForm = new FormGroup({
    join: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

  ngOnInit(): void {}

  onSubmit() {
    const lobby = this.joinForm.value.join;
    this.gameService.joinLobby(lobby).subscribe(res => {
      console.log(res);
      if (res.code === "joined") {
        return this.router.navigate(['/lobby']);
      }
      return alert(res.message);
    }, err => {
      console.log(err)
      return alert(err.error.message);
    }
    );

  }
}
