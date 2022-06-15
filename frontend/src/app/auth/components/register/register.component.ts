import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private service: ApiService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(['/menu']);
    }
    
    this.registerForm.valueChanges.subscribe((x) => {
      if (x.password !== x.passwordRepeat) {
        this.registerForm.controls.passwordRepeat.setErrors({ password: true });
        return;
      }
      this.registerForm.controls.passwordRepeat.setErrors(null);
    });
  }

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z0-9_.]*'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(320),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    passwordRepeat: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const data = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      passwordRepeat: this.registerForm.value.passwordRepeat,
    };
    this.service.register(data).subscribe((res) => {
      console.log(res);
      this.authService.setUserData(res);
      this.router.navigate(['../menu']);
    });
  }
}
