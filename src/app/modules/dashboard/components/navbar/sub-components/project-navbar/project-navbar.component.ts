import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'project-navbar',
  templateUrl: './project-navbar.component.html',
  styleUrls: ['./project-navbar.component.css']
})
export class ProjectNavbarComponent implements OnInit {
  @Input('name') name;
  @Input('letter') letter;
  @Input('active') active;
  constructor() { }

  ngOnInit(): void {
  }

}
