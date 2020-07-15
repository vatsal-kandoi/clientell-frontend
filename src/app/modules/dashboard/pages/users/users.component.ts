import { Component, OnInit } from '@angular/core';
import { ActiveProjectService } from '../../shared/_services/active-project.service';
import { FormControl } from '@angular/forms';
import {UserService} from '../../shared/_services/user.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[]
  usersSearched: any[];
  access: string;

  userQuery: FormControl;
  constructor(private activeProject: ActiveProjectService, private userService: UserService, private _store: Store<any>) {
    this._store.select('UserDataStore').subscribe(data => {
      console.log(data);
      this.users = data.users;
    });

    this._store.select('UserStateData').subscribe(data => {        
      this.access =  data.activeProjectState.access;
    });

    this.usersSearched = []
    this.userQuery = new FormControl('');
  }

  ngOnInit(): void {
    this.userService.userSearchCompleted.subscribe((val) => {
      if (val) {
        this.usersSearched = [];
        this.userService.searchResults.forEach((element) => {
          this.usersSearched.push({
            ...element,
            added: (this.users.filter((elem) => elem.user._id == element._id).length > 0) ? true : false,
            access: (this.users.filter((elem) => elem.user._id == element._id).length > 0) ? this.users.filter((elem) => elem.user._id == element._id)[0].access : ''
          });
        });
      }
    })
  }
  addAs(role: string, name: string, email: string) {
    this.userService.addUserToProject(role, name, email);
    this.usersSearched = [];
    this.userQuery.reset();
  }
  
  deleteUser(email: string) {
    this.userService.deleteUser(email);
  }

  search() {
    if (this.userQuery.value == undefined) return;
    this.userService.searchForUser(this.userQuery.value);
  }
}
