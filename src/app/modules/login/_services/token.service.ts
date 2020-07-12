import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  accessToken: string;
  refreshToken: string;

  constructor(private cookie: CookieService) {
    this.accessToken = '';
    this.refreshToken = '';
    this.fetchTokens();
  }

  fetchTokens() {
    if (this.cookie.get('ClientellToken') != undefined || this.cookie.get('ClientellToken') != null) {
      try {
        let data = JSON.parse(this.cookie.get('ClientellToken'));
        this.accessToken = data.access;
        this.refreshToken = data.refresh;
      } catch (err) {
        this.accessToken = '';
        this.refreshToken = '';
      }
    }
  }

  setTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;
    this.cookie.set('ClientellToken', JSON.stringify({access: this.accessToken, refresh: this.refreshToken}), 30000000000, '/');
  }

  getAccessToken() {
    return this.accessToken;
  }

  getRefeshToken() {
    return this.refreshToken;
  }

  async deleteTokens() {
    delete this.accessToken;
    delete this.refreshToken;
    this.cookie.delete('ClientellToken');
    return true;
  }

  isAuthenticated() {
    if (this.accessToken != '' && this.accessToken != undefined && this.accessToken != null) return true;
    this.fetchTokens();
    if (this.accessToken != '' && this.accessToken != undefined && this.accessToken != null) return true;
    return false;
  }
}
