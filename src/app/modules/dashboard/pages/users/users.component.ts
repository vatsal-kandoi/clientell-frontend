import { Component, OnInit } from '@angular/core';
import { ActiveProjectService } from '../../shared/_services/active-project.service';
import { FormControl } from '@angular/forms';
import {UserService} from '../../shared/_services/user.service';

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
  constructor(private activeProject: ActiveProjectService, private userService: UserService ) {
    this.usersSearched = []
    this.userQuery = new FormControl('');
  }

  ngOnInit(): void {
    this.access = this.activeProject.access;
    this.users = this.activeProject.users;
    this.activeProject.dashboardFetched.subscribe((val) => {
      if (val) {
        this.users = this.activeProject.users;
        this.access = this.activeProject.access;
      }
    })
    this.activeProject.usersUpdated.subscribe((val) => {
      if (val) {
        this.users = this.activeProject.users;
      }
    });
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
