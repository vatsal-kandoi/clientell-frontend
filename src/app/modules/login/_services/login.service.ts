import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {UrlService} from '../../../shared/_services/url.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import {TokenService} from './token.service';
import {AuthFetchedResponse} from '../../../shared/_interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  error: Subject<string>;
  cachedRequests: Array<HttpRequest<any>> = [];

  
  constructor(private url: UrlService, private http: HttpClient, private router: Router, private token: TokenService) {
    this.error = new Subject();
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  signup(name, email, password) {
    this.http.post(this.url.signupUrl, {name: name, email: email, password: password}).subscribe((data: AuthFetchedResponse) => {
      if (data.success == true) {
        this.token.setTokens(data.access_token, data.refresh_token);
        this.router.navigate(['/dashboard']);
      } else {
        console.log(data);
        this.error.next(data.message);
        setTimeout(() => {
          this.error.next('');
        }, 4000);
      }
    });
  }
  login(email, password) {
    this.http.post(this.url.loginUrl, {email, password}).subscribe((data: AuthFetchedResponse) => {
      if (data.success == true) {
        this.token.setTokens(data.access_token, data.refresh_token);
        this.router.navigate(['/dashboard']);
      } else {
        console.log(data);
        this.error.next(data.message);
        setTimeout(() => {
          this.error.next('');
        }, 4000);
      }
    });
  }
  logout() {
    this.token.deleteTokens();
    this.router.navigate(['/auth/login']);
  }
}
