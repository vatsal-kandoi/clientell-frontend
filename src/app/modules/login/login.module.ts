import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginRoutingModule } from './login.routing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar} from '@angular/material/snack-bar';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,   
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
  ]
})
export class LoginModule { }
