import { Component, OnInit } from '@angular/core';
import { ActiveProjectService } from '../../shared/_services/active-project.service';
import {CommentService} from '../../shared/_services/comment.service';
import { Router } from '@angular/router';

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
  constructor(private activeProject: ActiveProjectService, private commentService: CommentService,
    private router: Router ) {
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

  comment(type, id) {
    if (type == 'feature') {
      this.commentService.setActive(type, id);
      this.router.navigate(['/dashboard/project/comments'], {queryParams: {projectId: this.activeProject.activeProjectID, featureId: id}})
    } else if(type == 'issue') {
      this.commentService.setActive(type, id);
      this.router.navigate(['/dashboard/project/comments'], {queryParams: {projectId: this.activeProject.activeProjectID, issueId: id}})
    }
  }

  acceptIssue(id) {
    this.activeProject.changeStatusIssue('accept', id);
  }

  rejectIssue(id) {
    this.activeProject.changeStatusIssue('reject', id);
  }
}
