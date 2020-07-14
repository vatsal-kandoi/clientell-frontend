import { Component, OnInit } from '@angular/core';
import { ActiveProjectService } from '../../shared/_services/active-project.service';
import {CommentService} from '../../shared/_services/comment.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  links: any[]
  access: string;
  features: any[]
  issues: any[];
  closed: any;

  constructor(private activeProject: ActiveProjectService, private commentService: CommentService,
    private router: Router, private _store: Store<any>) {
      this._store.select('UserData').subscribe(data => {
        this.links = data.storeData.links;
        this.features = data.storeData.features;
        this.issues = data.storeData.issues;        
        this.access =  data.activeState.activeProjectState.access;
        this.closed = data.activeState.activeProjectState.closed;
      });
    this.activeProject.fetchProjectDashboard();
  }

  ngOnInit(): void {
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

  toggleFeatureStatus(id, status) {
    this.activeProject.acceptFeature(id, !status);
  }

  toggleStatus(type: string, id: string, current: boolean) {
    if (type == 'feature') {
      this.activeProject.markCompleteFeature(id, !current);
    } else {
      this.activeProject.closeIssue(id, !current)
    }
  }
}
