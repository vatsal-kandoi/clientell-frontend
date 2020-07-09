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
    });
    this.activeProject.featuresUpdated.subscribe((val) => {
      if (val) {
        this.features = this.activeProject.features;
      }
    });
    this.activeProject.issuesUpdated.subscribe((val) => {
      if (val) {
        this.issues = this.activeProject.issues;
      }
    });
    this.activeProject.linksUpdated.subscribe((val) => {
      if (val) {
        this.links = this.activeProject.links;
      }
    })
  }

  delete(type: string, id: string) {
    if (type == 'feature') this.activeProject.removeFeature(id);
    else if (type == 'link') this.activeProject.removeLink(id);
    else if (type == 'issue') this.activeProject.removeIssue(id);
  }

}
