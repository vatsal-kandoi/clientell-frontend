import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from './token.service';

@Injectable()
export class LoggedinGuardService implements CanActivate {
  constructor(public auth: TokenService, public router: Router) {}
  canActivate(): boolean {
    if (this.auth.isAuthenticated() == true) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}