import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css',
  '../popup-panel.css',]
})
export class StatisticsComponent implements OnInit {

  constructor(
    public datepipe: DatePipe,
    private service: ApiService,
    private auth: AuthService
    ) { }

  readData:any;

  statistics = new Statistics();
  data={
    user: this.auth.getUserDetails().felhasznalonev,
    id:"farkas",
    offset:0
  };


  ngOnInit(): void {
    console.log(this.data.user)
    this.getData()
  }

  getIdOfBtn(event: Event): void {
    let elementId: string = (event.target as Element).id;
    this.data.id = elementId;
    this.getData();

    const name = document.getElementById("name");
    if(name != null) {
      name.innerHTML = this.data.id;
    }
  }

  getData(): void
  {
    this.service.statistics(this.data).subscribe((result) => {
      this.statistics.set(result);
      if(result.data.length != 0) {
        for(let i = 0; i < result.data.length; i++) {

          result.data[i].datum = this.datepipe.transform(result.data[i].datum, 'yyyy-MM-dd HH:mm');

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
      console.log(this.data.user)
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
