import { Injectable } from '@angular/core';
import { ActiveProjectService } from './active-project.service';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/_services/url.service';
import { Subject } from 'rxjs';
import { ProjectsService } from './projects.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DashboardBackendService } from './backend.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  activeType: any;
  activeID: any;
  activeProjectId: string;
  commentsFetched: Subject<boolean>;
  userEmail: string;
  data: any;

  constructor(private backend: DashboardBackendService, private snackBar: MatSnackBar, private _store: Store<any>,private router: Router) {
    this._store.select('UserStateData').subscribe((data) => {
      if (data.user.email != null && data.user.email != this.userEmail){
        this.userEmail = data.user.email;
      }
      if (data.activeProjectId != null && data.activeProjectId != this.activeProjectId) {
        this.activeProjectId = data.activeProjectId;
      }
    })
  }

  setActive(type: string, id: string) {
    this._store.dispatch({
      type: 'SET_COMMENT',
      payload: {
        type: type,
        componentId: id
      }
    });
    if (type == 'feature') {
      this.router.navigate(['/dashboard/project/comments'], {queryParams: {projectId: this.activeProjectId, featureId: id}})
      return;
    }
    this.router.navigate(['/dashboard/project/comments'], {queryParams: {projectId: this.activeProjectId, issueId: id}})
  }

  deleteComment(id) {
    this.backend.deleteComment(id).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'DELETE_COMMENT',
          payload: id
        })
      } else {
        let snackBarRef = this.snackBar.open("Error fetching the comments", "Reload");
        snackBarRef.onAction().subscribe(() => {
          this.deleteComment(id);      
        });
      }
    });
  }

  addComment(comment) {
    this.backend.addComment(comment).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'ADD_COMMENT',
          payload: {
            comment, id: val.id
          }
        })
      } else {
        let snackBarRef = this.snackBar.open("Error adding the comment", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.addComment(comment);      
        });
      }
    });
  }

  getComments() {
    this.backend.getAllComments().subscribe((val: any) => {
      if (val.code == 200) {
        if (this.activeType == 'feature'){
          this._store.dispatch({
            type: 'GET_COMMENT',
            payload: {
              comments:val.comments,
              commentDescription: {
                description: val.description,
                addedOn: new Date(val.addedOn).toLocaleDateString(),
                accepted: val.accepted.value,
                completed: val.completed.value,
              }
            }
          });
        } else {
          this._store.dispatch({
            type: 'GET_COMMENT',
            payload: {
              comments:val.comments,
              commentDescription: {
                description: val.description,
                addedOn: new Date(val.addedOn).toLocaleDateString(),
                closed: val.closed.value
              }
            }
          });
        }
      } else {
        let snackBarRef = this.snackBar.open("Error fetching the comments", "Reload");
        snackBarRef.onAction().subscribe(() => {
          this.getComments();      
        });
        this.commentsFetched.next(false);
      }
    })
  }
}
