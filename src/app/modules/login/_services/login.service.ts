import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {UrlService} from '../../../shared/_services/url.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import {AuthFetchedResponse} from '../../../shared/_interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  error: Subject<string>;
  constructor(private url: UrlService, private http: HttpClient, private router: Router) {
    this.error = new Subject();
  }

  signup(name, email, password) {
    this.http.post(this.url.signupUrl, {name: name, email: email, password: password}).subscribe((data: AuthFetchedResponse) => {
      if (data.success == true) {
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
}
