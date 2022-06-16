import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobbyprofile',
  templateUrl: './lobbyprofile.component.html',
  styleUrls: ['./lobbyprofile.component.css']
})
export class LobbyprofileComponent implements OnInit {

  @Input() username: string = "Anaisz";

  constructor() { }

  ngOnInit(): void {
  }

}
