import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  baseUrl: string;
  signupUrl: string;
  loginUrl: string;
  
  constructor() {
    this.baseUrl = `http://localhost:3000/api`;
    this.signupUrl = `${this.baseUrl}/auth/signup`;
    this.loginUrl = `${this.baseUrl}/auth/login`;
  }
}
