import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { TokenService } from '../_services/token.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(public auth: TokenService, public router: Router, private token: TokenService) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
  canActivateChild() {
    if (!this.auth.isAuthenticated()) {
      this.token.deleteTokens();
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}