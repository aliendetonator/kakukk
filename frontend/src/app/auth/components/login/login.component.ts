import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginPanel') loginPanel: ElementRef;

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(['/menu']);
    }
  }

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
    this.apiService.login(data).subscribe((res) => {
      console.log(res);
      this.authService.setUserData(res);
      this.router.navigate(['../menu']);
    });
  }

}
