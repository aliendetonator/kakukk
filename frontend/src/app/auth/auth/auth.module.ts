import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    NavbarComponent
  ]
})
export class AuthModule { }
