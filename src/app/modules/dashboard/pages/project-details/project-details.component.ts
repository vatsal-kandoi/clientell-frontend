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
      this._store.select('UserDataStore').subscribe(data => {
        this.links = data.links;
        this.features = data.features;
        this.issues = data.issues; 
      });
  
      this._store.select('UserStateData').subscribe(data => {        
        this.access =  data.activeProjectState.access;
        this.closed = data.activeProjectState.closed;
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
    this.commentService.setActive(type, id);
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
