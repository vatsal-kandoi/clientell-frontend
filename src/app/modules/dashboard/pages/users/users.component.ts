import { Component, OnInit } from '@angular/core';
import { ActiveProjectService } from '../../shared/_services/active-project.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[]
  usersSearched: any[];
  access: string;
  constructor(private activeProject: ActiveProjectService ) {
    this.usersSearched = []
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
  }
  addAs(role) {

  }
}
