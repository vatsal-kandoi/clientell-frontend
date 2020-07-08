import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  accessToken: string;
  refreshToken: string;

  constructor(private cookie: CookieService) {
    this.accessToken = '';
    this.refreshToken = '';
    if (this.cookie.get('ClientellToken') != undefined || this.cookie.get('ClientellToken') != null) {
      try {
        let data = JSON.parse(this.cookie.get('ClientellToken'));
        this.accessToken = data.access;
        this.refreshToken = data.refresh;
      } catch (err) {

      }
    }
  }

  setTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;
    this.cookie.set('ClientellToken', JSON.stringify({access: this.accessToken, refresh: this.refreshToken}));
  }

  getAccessToken() {
    return this.accessToken;
  }

  getRefeshToken() {
    return this.refreshToken;
  }

  deleteTokens() {
    this.accessToken = '';
    this.refreshToken = '';
    this.cookie.delete('ClientellToken');
  }
}
