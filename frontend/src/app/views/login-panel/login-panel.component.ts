import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/apiservice/apiservice.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css'],
})
export class LoginPanelComponent implements OnInit {
  @ViewChild('loginPanel') loginPanel: ElementRef;

  constructor(private service: ApiService) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(320),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  onSubmit() {
    const data = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.service.login(data).subscribe((res) => {
      console.log(res);
    });
  }
}
