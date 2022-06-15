import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css',
  '../popup-panel.css',]
})
export class StatisticsComponent implements OnInit {

  constructor(private service: ApiService) { }

  readData:any;

  statistics = new Statistics();
  data={
    id:"ossz",
    summaryTable: document.getElementById("summary"),
    roleTable: document.getElementById("role"),
    limit: 10,
    offset:0
  };


  ngOnInit(): void {
  }

  getIdOfBtn(event: Event): void {
    let elementId: string = (event.target as Element).id;
    this.data.id = elementId;
    console.log(this.data.id);
    this.checkTables();

  }

  checkTables(): void {
    const summaryTable = document.getElementById("summary")
    const roleTable = document.getElementById("role")

    if(roleTable != null && summaryTable != null)
    {
      if(this.data.id == "ossz")
      {
        roleTable.style.display = 'none'
        summaryTable.style.display = 'block'
      }
      else
      {
        roleTable.style.display = 'block'
        summaryTable.style.display = 'none'
      }
    }
  }



}


class Statistics {
  statistics = [];
  get() {
    return this.statistics;
  }
  set(statistics: any) {
    this.statistics = statistics;
  }
}
