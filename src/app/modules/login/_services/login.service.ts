import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {AuthBackendService} from './backend.service';
import {TokenService} from './token.service';
import {AuthFetchedResponse} from '../../../shared/_interfaces/auth-response.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  error: Subject<string>;
  completedAuthRequest: Subject<boolean>;
  
  constructor(private backend: AuthBackendService, private router: Router, private token: TokenService, private snackBar: MatSnackBar) {
    this.error = new Subject();
    this.completedAuthRequest = new Subject();
  }

  signup(name, email, password) {    
    this.backend.signup(name, email, password).subscribe((data: AuthFetchedResponse) => {
      this.completedAuthRequest.next(true);

      if (data.success == true) {
        this.token.setToken(data.access_token);
        this.router.navigate(['/dashboard']);
      } else {
        this.error.next(data.message);
        setTimeout(() => {
          this.error.next('');
        }, 4000);
      }
    });
  }
  login(email, password) {
    this.backend.login(email, password).subscribe((data: AuthFetchedResponse) => {
      this.completedAuthRequest.next(true);
      if (data.success == true) {
        this.token.setToken(data.access_token);
        this.router.navigate(['/dashboard']);
      } else {
        if (data.code == 404) {
          this.error.next('Email and password combination is incorrect.');
          setTimeout(() => {
            this.error.next('');
          }, 4000);
        } else {
          this.error.next('Something bad happened. Please try again');
          setTimeout(() => {
            this.error.next('');
          }, 4000);
        }
      }
    });
  }
  forgotPassword(email: string) {
    this.backend.forgotPassword(email).subscribe((data: any) =>{ 
      if (data.success == true) {
        this.completedAuthRequest.next(true);
        let snackBarRef = this.snackBar.open("Email with recovery link sent");
      } else {
        this.error = data.message;
        this.completedAuthRequest.next(true);
      }
    })
  }
  resetPassword(token, email) {
    this.backend.resetPassword(token, email).subscribe((data: any) =>{ 
      if (data.success == true) {
        this.completedAuthRequest.next(true);
        let snackBarRef = this.snackBar.open("Password was successfully changed. Please login.");
      } else {
        this.error = data.message;
        this.completedAuthRequest.next(true);
      }
    })
  }
  async logout() {
    await this.backend.logout();
    this.token.deleteTokens();
    this.router.navigate(['/auth/login']);
  }
}
