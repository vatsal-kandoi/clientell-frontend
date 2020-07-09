import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [
    {
      name: 'Vatsal Kandoi',
      letter: 'V',
      email: 'vatsalkandoi1998@gmail.com',
      access: 'client'
    }
  ]
  usersSearched = [
    {
      name: 'Vatsal Kandoi',
      letter: 'V',
      email: 'vatsalkandoi1998@gmail.com',
      added: false,
    }
  ]
  access = 'admin'
  constructor() { }

  ngOnInit(): void {
  }
  addAs(role) {

  }
}
