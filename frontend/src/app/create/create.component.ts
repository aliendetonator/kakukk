import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
/*
  userForm = new FormGroup(
    {
      
      'username': new FormControl(''),
      'email': new FormControl(''),
      'password': new FormControl('')
    })
  
  usersubmit()
  {

  }
*/
}
