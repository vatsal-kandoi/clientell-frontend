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
  userSearchUrl: string;
  addUserToProjectUrl: string;
  removeUserToProjectUrl: string;
  constructor() {
    this.baseUrl = `http://localhost:3000/api`;
    this.signupUrl = `${this.baseUrl}/auth/signup`;
    this.loginUrl = `${this.baseUrl}/auth/login`;
    this.allProjectsUrl = `${this.baseUrl}/user/project`;
    this.addProjectUrl = `${this.baseUrl}/project/create`;
    this.projectDashboardUrl = `${this.baseUrl}/user/project`
    this.userSearchUrl = `${this.baseUrl}/user/search`;
    this.addUserToProjectUrl = `${this.baseUrl}/project/user/add`;
    this.removeUserToProjectUrl = `${this.baseUrl}/project/user/remove`;
  }
}
