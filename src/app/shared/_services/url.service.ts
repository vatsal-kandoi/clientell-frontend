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
  removeUserToProjectUrl: string;0
  addFeatureToProjectUrl: string;
  removeFeatureToProjectUrl: string;
  removeIssueToProjectUrl: string;
  addIssueToProjectUrl: string;
  addLinkUrl: string;
  removeUrl: string;
  getCommentsUrl: string;
  addCommentsUrl: string;
  deleteCommentsUrl: string;
  closeProjectUrl: string;
  deleteProjectUrl: string;
  acceptIssueUrl: string;
  rejectIssueUrl: string;
  completeIssueUrl: string;
  issueIssueUrl: string;
  incompleteIssueUrl: string;
  markFeatureCompleteUrl: string;
  acceptFeatureUrl: string;
  getOverview: string;
  forgotPasswordUrl: string;
  resetPasswordUrl: string;
  refreshTokenUrl: string;
  logoutUrl: string;
  
  constructor() {
    this.baseUrl = `/api`;
    this.signupUrl = `${this.baseUrl}/auth/signup`;
    this.loginUrl = `${this.baseUrl}/auth/login`;
    this.allProjectsUrl = `${this.baseUrl}/user/project`;
    this.addProjectUrl = `${this.baseUrl}/project/create`;
    this.projectDashboardUrl = `${this.baseUrl}/user/project`
    this.userSearchUrl = `${this.baseUrl}/user/search`;
    this.addUserToProjectUrl = `${this.baseUrl}/project/user/add`;
    this.removeUserToProjectUrl = `${this.baseUrl}/project/user/remove`;
    this.addFeatureToProjectUrl = `${this.baseUrl}/project/feature/add`;
    this.removeFeatureToProjectUrl  = `${this.baseUrl}/project/feature/remove`
    this.addIssueToProjectUrl = `${this.baseUrl}/project/issue/add`;
    this.removeIssueToProjectUrl  = `${this.baseUrl}/project/issue/remove`
    this.addLinkUrl = `${this.baseUrl}/project/link/add`;
    this.removeUrl = `${this.baseUrl}/project/link/remove`;
    this.getCommentsUrl = `${this.baseUrl}/user/comments`;
    this.addCommentsUrl = `${this.baseUrl}/project/comment/add`;
    this.deleteCommentsUrl = `${this.baseUrl}/project/comment/delete`;
    this.closeProjectUrl = `${this.baseUrl}/project/close`;
    this.deleteProjectUrl = `${this.baseUrl}/project/delete`;

    this.acceptIssueUrl = `${this.baseUrl}/project/issue/accept`;
    this.rejectIssueUrl = `${this.baseUrl}/project/issue/reject`;
    this.completeIssueUrl = `${this.baseUrl}/project/issue/close`;
    this.incompleteIssueUrl = `${this.baseUrl}/project/issue/open`;

    this.markFeatureCompleteUrl = `${this.baseUrl}/project/feature/complete`;
    this.acceptFeatureUrl = `${this.baseUrl}/project/feature/accept`
    this.getOverview = `${this.baseUrl}/user/overview`;

    this.forgotPasswordUrl = `${this.baseUrl}/auth/forgotpassword`;
    this.resetPasswordUrl = `${this.baseUrl}/auth/resetpassword`;    
    this.refreshTokenUrl = `${this.baseUrl}/auth/refresh`;
    this.logoutUrl = `${this.baseUrl}/auth/logout`;
  }
}
