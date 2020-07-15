import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardBackendService } from './backend.service';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSearchCompleted: Subject<boolean>;
  searchResults: any[];
  constructor(private backend: DashboardBackendService, private snackBar: MatSnackBar, private _store: Store<any>) {
    this.userSearchCompleted = new Subject();
  }

  deleteUser(email) {
    this.backend.deleteUser(email).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'REMOVE_USER',
          payload: email
        });
      } else {
        let snackBarRef = this.snackBar.open("Error removing the user from the projects", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.deleteUser(email);
        });
      }
    });
  }

  addUserToProject(role, name ,email) {
    this.backend.addUser(role, email, name).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'ADD_USER',
          payload: {
            name: name, 
            email: email,
            id: val.id, 
            role: role
          }
        })
      } else {
        let snackBarRef = this.snackBar.open("Error adding the user to the projects", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.addUserToProject(role, name, email);
        });
      }
    })
  }

  searchForUser(query) {
    this.backend.searchUser(query).subscribe((val: any) => {
      if (val.code == 200) {
        this.searchResults = val.users;
        this.userSearchCompleted.next(true);
      }
    });
  }
}
