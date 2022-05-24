import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiservice.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  constructor(private service: ApiService) {}

  leaderboard = new Leaderboard();
  

  ngOnInit(): void {}

  getData() {
    const data = {
      table: 'farkas',
      limit: 10,
      offset: 0,
    };

    this.service.leaderboard(data).subscribe((res) => {
      this.leaderboard.set(res);
    });
  }
}

class Leaderboard{
  leaderboard = [];
  get() {
    return this.leaderboard;
  }
  set(leaderboard: any) {
    this.leaderboard = leaderboard;
  }
}