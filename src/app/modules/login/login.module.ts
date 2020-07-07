import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginRoutingModule } from './login.routing';

import {CookieService} from './_services/cookie.service';
import {LoginService} from './_services/login.service';
import {TokenInterceptor} from './_interceptors/token.interceptor';


@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  exports: [
    CookieService,
    LoginService,
    TokenInterceptor
  ]
})
export class LoginModule { }
