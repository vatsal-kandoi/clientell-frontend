import { Injectable } from '@angular/core';
import { ActiveProjectService } from './active-project.service';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/_services/url.service';
import { Subject } from 'rxjs';
import { ProjectsService } from './projects.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DashboardBackendService } from './backend.service';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  activeType: any;
  activeID: any;
  commentsFetched: Subject<boolean>;
  userEmail: string;
  data: any;

  constructor(private backend: DashboardBackendService, private activeProject: ActiveProjectService, private allProjects: ProjectsService, private snackBar: MatSnackBar, private _store: Store<any>) {
    this.userEmail = this.allProjects.userEmail;
  }

  setActive(type: string, id: string) {
    this._store.dispatch({
      type: 'SET_COMMENT',
      payload: {
        type: type,
        componentId: id
      }
    })
  }

  deleteComment(id) {
    this.backend.deleteComment(id, this.activeType, this.activeProject.activeProjectID, this.activeID).subscribe((val: any) => {
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
    this.backend.addComment(comment, this.activeType, this.activeProject.activeProjectID, this.activeID).subscribe((val: any) => {
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
    this.backend.getAllComments(this.activeType, this.activeProject.activeProjectID,this.activeID).subscribe((val: any) => {
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
