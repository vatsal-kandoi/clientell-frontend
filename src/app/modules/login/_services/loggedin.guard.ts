import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { TokenService } from './token.service';

@Injectable()
export class LoggedinGuardService implements CanActivate {
  constructor(public auth: TokenService, public router: Router, private token: TokenService) {}
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}