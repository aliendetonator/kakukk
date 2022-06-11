import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/apiservice/apiservice.service';

@Component({
  selector: 'app-register-panel',
  templateUrl: './register-panel.component.html',
  styleUrls: ['./register-panel.component.css'],
})
export class RegisterPanelComponent implements OnInit {
  ngOnInit(): void {}
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
      Validators.maxLength(320)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    passwordRepeat: new FormControl('', [Validators.required]),
  });

  constructor(private service: ApiService) {
    this.registerForm.valueChanges.subscribe((x) => {
      if (x.password !== x.passwordRepeat) {
        this.registerForm.controls.passwordRepeat.setErrors({ password: true });
        return;
      }
      this.registerForm.controls.passwordRepeat.setErrors(null);
    });
  }

  onSubmit() {
    const data = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      passwordRepeat: this.registerForm.value.passwordRepeat,
    };
    this.service.register(data).subscribe((res) => {
      console.log(res);
    });
  }
}
