import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  links = [
    {
      name: 'Website link',
      link: 'https://vatsalkandoi.tech'
    }
  ]
  access = 'admin';
  features = [
    {
      description: 'Help me out',
      completed: true,
      status: 'Incomplete'
    }
  ]
  issues = [
    {
      description: 'Help me out',
      completed: true,
      status: 'Completed'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
