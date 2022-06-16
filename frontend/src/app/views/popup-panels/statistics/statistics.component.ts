import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css',
  '../popup-panel.css',]
})
export class StatisticsComponent implements OnInit {

  constructor(
    public datepipe: DatePipe,
    private service: ApiService
    ) { }

  readData:any;

  statistics = new Statistics();
  data={
    user: "userame",
    id:"ossz",
    offset:0
  };


  ngOnInit(): void {
  }

  getIdOfBtn(event: Event): void {
    let elementId: string = (event.target as Element).id;
    this.data.id = elementId;
    console.log(this.data.id);
    this.checkTables();
    this.getData();

    const name = document.getElementById("name");
    if(name != null) {
      name.innerHTML = this.data.id;
    }
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
  getData(): void
  {

    this.service.statistics(this.data).subscribe((result) => {
      this.statistics.set(result);
      if(result.data.length != 0) {
        for(let i = 0; i < result.data.length; i++) {
          console.log(result.data[i].datum);
          result.data[i].datum = this.datepipe.transform(result.data[i].datum, 'yyyy-MM-dd HH:mm');
          console.log(result.data[i].datum);
          this.readData = result.data;
        }
      }
      else {
        this.readData = result.data;
      }
    })
  }

  getUser(): void {
    this.service.getUser().subscribe(res => {
      this.data.user = res;
    });
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
