import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  baseUrl: string;
  signupUrl: string;
  loginUrl: string;
  allProjectsUrl: string;
  addProjectUrl: string;
  projectDashboardUrl: string;
  constructor() {
    this.baseUrl = `http://localhost:3000/api`;
    this.signupUrl = `${this.baseUrl}/auth/signup`;
    this.loginUrl = `${this.baseUrl}/auth/login`;
    this.allProjectsUrl = `${this.baseUrl}/user/project`;
    this.addProjectUrl = `${this.baseUrl}/project/create`;
    this.projectDashboardUrl = `${this.baseUrl}/user/project`
  }
}
