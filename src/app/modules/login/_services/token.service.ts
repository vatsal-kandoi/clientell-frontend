import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/_services/url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  accessToken: string;
  refreshTokenUsed: boolean;
  constructor(private url: UrlService, private http: HttpClient) {
    this.accessToken = '';
    this.refreshTokenUsed = false;
  }

  fetchToken() {  
    console.log(this.accessToken);
    if ((this.accessToken == undefined || this.accessToken == null || this.accessToken == '') && !this.refreshTokenUsed) {
      let response:any = this.getRefeshToken();
      if (!response) {
        return null;
      }
    }
    return this.accessToken;
  }

  setToken(access: string) {
    this.refreshTokenUsed = false;
    this.accessToken = access;
  }

  getRefeshToken() {
    this.refreshTokenUsed = true
    this.http.post(this.url.refreshTokenUrl, {}, {withCredentials: true}).toPromise().then((result: any) => {
      if (result.success == true) {
        this.setToken(result.access_token);
        return true;
      }
      return false;
    });
  }

  async deleteTokens() {
    delete this.accessToken;
  }

  isAuthenticated() {
    if (this.accessToken != '' && this.accessToken != undefined && this.accessToken != null) return true;
    this.getRefeshToken();
    if (this.accessToken != '' && this.accessToken != undefined && this.accessToken != null) return true;
    return false;
  }
}
