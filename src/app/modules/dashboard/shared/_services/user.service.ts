import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../../shared/_services/url.service';
import { Subject } from 'rxjs';
import { ActiveProjectService } from './active-project.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSearchCompleted: Subject<boolean>;
  searchResults: any[];
  constructor(private http: HttpClient, private url: UrlService, private activeProject: ActiveProjectService, private snackBar: MatSnackBar) {
    this.userSearchCompleted = new Subject();
  }

  deleteUser(email) {
    this.http.post(this.url.removeUserToProjectUrl, {'projectId': this.activeProject.activeProjectID, 'emailToRemove': email}).subscribe((val: any) => {
      if (val.code == 200) {
        this.activeProject.removeUser(email);
      } else {
        let snackBarRef = this.snackBar.open("Error removing the user from the projects", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.deleteUser(email);
        });
      }
    });
  }

  addUserToProject(role, name ,email) {
    this.http.post(this.url.addUserToProjectUrl, {'projectId': this.activeProject.activeProjectID, 'emailToAdd': email, mode: role}).subscribe((val: any) => {
      if (val.code == 200) {
        this.activeProject.addUser(name, email, role, val.id);
      } else {
        let snackBarRef = this.snackBar.open("Error adding the user to the projects", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.addUserToProject(role, name, email);
        });
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
