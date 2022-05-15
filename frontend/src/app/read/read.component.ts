import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service: ApiService) { }

  readData: any;

  ngOnInit(): void {
    this.service.getAllData().subscribe((res) => {
      console.log(res);

      this.readData = res.data;
    })
  }

}
