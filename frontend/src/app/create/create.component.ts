import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../apiservice.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service: ApiService) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z0-9_.]*')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  })

  onSubmit() {
    var data = {
      username: this.createForm.value.username,
      email: this.createForm.value.email,
      password: this.createForm.value.password
    }
    this.service.createData(data).subscribe((res) => {
      console.log(res);
    });
  }

}
