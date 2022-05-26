import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../apiservice.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  template:`<button id="farkas" (click)="getIdOfBtn($event)" type="button" class="btn btn-secondary">Farkas</button>`
})
export class LeaderboardComponent implements OnInit {
  constructor(private service: ApiService) {}

  leaderboard = new Leaderboard();
  readData:any;
  data = {
    table: 'farkas',
    limit: 10,
    offset: 0,
  };

  ngOnInit(): void {

    this.getData()
  }


  scrollOffset(event: Event): void{

  }

  getIdOfBtn(event: Event): void {
    let elementId: string = (event.target as Element).id;
    console.log(elementId);
    this.data.table = elementId;
    this.getData()
    console.log(this.data.table)
  }


  getData() {
    /*
    var data = {
      table: 'farkas',
      limit: 10,
      offset: 0,
    };
    */


    this.service.leaderboard(this.data).subscribe((res) => {
      this.leaderboard.set(res);
      for(let i = 0; i < res.data.length; i++) {
        res.data[i].index = i+1;
        this.readData = res.data;
      }
      console.log(res, "res=>");
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
