import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/_services/url.service';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { AuthBackendService } from './backend.service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  refreshTokenUsed: boolean;
  accessToken: string;

  constructor(private _store: Store<any>, private backend: AuthBackendService) {
    this._store.select('AccessToken').subscribe(token => {
      this.accessToken = token;
    });
    this.refreshTokenUsed = false;
  }

  fetchToken() {  
    if ((this.accessToken == undefined || this.accessToken == null || this.accessToken == '') && !this.refreshTokenUsed) {
      let response:any = this.getRefeshToken();
      if (!response) {
        return null;
      }
    }
    return this.accessToken;
  }

  setToken(token: string) {
    this.refreshTokenUsed = false;
    this._store.dispatch({
      type: 'SET_TOKEN',
      payload: token,
    });
  }

  getRefeshToken() {
    this.refreshTokenUsed = true
    this.backend.refresh().toPromise().then((result: any) => {
      if (result.success == true) {
        this.setToken(result.access_token);
        return true;
      }
      return false;
    });
  }

  async deleteTokens() {
    this._store.dispatch({
      type: 'RESET_USER_DATA',
      payload: {}
    });
    this._store.dispatch({
      type: 'RESET_STORE_DATA',
      payload: {}
    });
    this._store.dispatch({
      type: 'RESET_TOKEN',
      payload: null,
    });
    delete this.accessToken
  }

  isAuthenticated() {
    if (this.accessToken != '' && this.accessToken != undefined && this.accessToken != null) return true;
    this.getRefeshToken();
    if (this.accessToken != '' && this.accessToken != undefined && this.accessToken != null) return true;
    return false;
  }
}
