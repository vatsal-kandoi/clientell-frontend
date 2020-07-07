import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  baseUrl = `http://localhost:3000/api`;
  signupUrl = `${this.baseUrl}/auth/signup`;
  loginUrl = `${this.baseUrl}/auth/login`;
  constructor() { }
}
