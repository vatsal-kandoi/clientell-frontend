import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginRoutingModule } from './login.routing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from './_services/login.service';
import { TokenService } from './_services/token.service';
import { TokenInterceptor } from './_interceptors/token.interceptor';



@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,   
    MatInputModule,
    MatButtonModule,
  ],
})
export class LoginModule { }
