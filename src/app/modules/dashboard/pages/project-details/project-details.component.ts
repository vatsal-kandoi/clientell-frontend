import { Component, OnInit } from '@angular/core';
import { ActiveProjectService } from '../../shared/_services/active-project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  links: any[]
  access: string;
  features: any[]
  issues: any[]
  constructor(private activeProject: ActiveProjectService ) {
  }

  ngOnInit(): void {
    this.access = this.activeProject.access;
    this.features = this.activeProject.features;
    this.issues = this.activeProject.issues;
    this.links = this.activeProject.links;
    this.activeProject.dashboardFetched.subscribe((val) => {
      if (val) {
        this.access = this.activeProject.access;
        this.features = this.activeProject.features;
        this.issues = this.activeProject.issues;
        this.links = this.activeProject.links;
      }
    })
  }

}
