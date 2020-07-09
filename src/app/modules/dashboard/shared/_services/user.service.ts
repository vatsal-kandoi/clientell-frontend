import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../../shared/_services/url.service';
import { Subject } from 'rxjs';
import { ActiveProjectService } from './active-project.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSearchCompleted: Subject<boolean>;
  searchResults: any[];
  constructor(private http: HttpClient, private url: UrlService, private activeProject: ActiveProjectService) {
    this.userSearchCompleted = new Subject();
  }

  deleteUser(email) {
    this.http.post(this.url.removeUserToProjectUrl, {'projectId': this.activeProject.activeProjectID, 'emailToRemove': email}).subscribe((val: any) => {
      if (val.code == 200) {
        this.activeProject.removeUser(email);
      }
    });
  }

  addUserToProject(role, name ,email) {
    this.http.post(this.url.addUserToProjectUrl, {'projectId': this.activeProject.activeProjectID, 'emailToAdd': email, mode: role}).subscribe((val: any) => {
      if (val.code == 200) {
        this.activeProject.addUser(name, email, role, val.id);
      }
    })
  }

  searchForUser(query) {
    this.http.post(this.url.userSearchUrl, {'query': query}).subscribe((val: any) => {
      if (val.code == 200) {
        this.searchResults = val.users;
        this.userSearchCompleted.next(true);
      }
    });
  }
}
