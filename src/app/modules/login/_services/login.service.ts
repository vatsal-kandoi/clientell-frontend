import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {UrlService} from '../../../shared/_services/url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  error: Subject<string>;
  constructor(private url: UrlService, private http: HttpClient) {
    this.error = new Subject();
  }

  signup(name, email, password) {
    this.http.post(this.url.signup, {name, email, password}).subscribe((data) => {
      // if (data.success == true) {

      // } else {

      // }
      console.log(data);
    });
  }
  login(email, password) {
    this.http.post(this.url.login, {email, password}).subscribe((data) => {
      // if (data.success == true) {

      // } else {

      // }
      console.log(data);
    });
  }
}
