import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../apiservice.service';

@Component({
  selector: 'app-register-panel',
  templateUrl: './register-panel.component.html',
  styleUrls: ['./register-panel.component.css']
})
export class RegisterPanelComponent implements OnInit {

  constructor(private service: ApiService) { }

  ngOnInit(): void {
  }
  registerForm = new FormGroup({
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
    ]),
    passwordRepeat: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });
  onSubmit() { 
    const data = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      passwordRepeat: this.registerForm.value.passwordRepeat
    }
    this.service.register(data).subscribe(res => {
      console.log(res);
    });
  }

}
