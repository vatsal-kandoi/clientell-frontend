import { Injectable } from '@angular/core';
import {ProjectsService} from './projects.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/_services/url.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {DashboardBackendService} from './backend.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ActiveProjectService {
  activeProjectID: string;
  access: string;
  constructor(private backend: DashboardBackendService, private projectsService: ProjectsService, private http: HttpClient, private url: UrlService, private router: Router, private snackBar: MatSnackBar, private _store: Store<any>) {
    this._store.select('UserData').subscribe(data => {
      if ( data.activeState.activeProjectId != null && data.activeState.activeProjectId != this.activeProjectID) {
        this.activeProjectID = data.activeState.activeProjectId;          
        this.fetchProjectDashboard();
        this.access = data.activeState.activeProjectState.access;
      }       
    });
  }

  /******************LINKS ******************************/
  addLink(description, link) {
    this.backend.addLink(description, link, this.activeProjectID).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'ADD_LINK',
          payload: {
            for: description,
            link,
          }
        })
      } else {
        let snackBarRef = this.snackBar.open("Error adding the link", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.addLink(description, link);
        });
      }
    })
  }

  removeLink(link_id) {
    this.backend.deleteLink(link_id, this.activeProjectID).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'REMOVE LINK',
          payload: link_id
        })
      } else {
        let snackBarRef = this.snackBar.open("Error removing the link", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.removeLink(link_id);
        });
      }
    })
  }

  /****************************ISSUES **********************************/
  addIssue(description: string) {
    this.backend.addIssue(description, this.activeProjectID).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'ADD_ISSUE',
          payload: {
            id: val.id, description
          }
        })

      } else {
        let snackBarRef = this.snackBar.open("Error adding the issue", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.addIssue(description);
        });
      }
    });
  }

  removeIssue(id) {
    this.backend.deleteIssue(id, this.activeProjectID).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'REMOVE_ISSUE',
          payload: id
        })
      } else {
        let snackBarRef = this.snackBar.open("Error removing the issue", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.removeIssue(id);
        });
      }
    });
  }

  changeStatusIssue(status, id) {
   this.backend.changeStatusIssue(status, id, this.activeProjectID).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'CHANGE_ACCEPTANCE_ISSUE',
          payload: {
            status, id
          }
        })
      }
    });
  }

  closeIssue(id, status) {
    this.backend.closeIssue(id, status, this.activeProjectID).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'CHANGE_COMPLETE_ISSUE',
          payload: {
            id, status
          }
        })
      }
    });
  }

  /****************************PROJECT OPTIONS* **************************/
  closeProject() {
    this.backend.closeProject(this.activeProjectID, this.access).subscribe((val: any) => {
      if (val.code == 200) {
        if (this.access == 'admin') {
          this._store.dispatch({
            type: 'CLOSE_PROJECT_ADMIN',
            payload: {}
          })
        } else {
          this._store.dispatch({
            type: 'CLOSE_PROJECT_CLIENT',
            payload: {}
          })
        }
      } else {
        let snackBarRef = this.snackBar.open("Error closing the project", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.closeProject();
        });
      }
    })
  }

  deleteProject() {
    this.backend.deleteProject(this.activeProjectID).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'DELETE_PROJECT',
          payload: {}
        })
        this.router.navigate(['/dashboard/projects']);
      } else {
        let snackBarRef = this.snackBar.open("Error deleting the project", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.deleteProject();
        });
      }
    })
  }

  /*******************FEATURES **************************************/
  acceptFeature(id, status) {
    this.backend.acceptFeature(id, status, this.activeProjectID).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'CHANGE_ACCEPTANCE_FEATURE',
          payload: {
            id, status
          }
        });
      } else {

      }
    })    
  }

  markCompleteFeature(id, status) {
    this.backend.markFeature(id, status, this.activeProjectID).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'CHANGE_COMPLETE_FEATURE',
          payload: {
            id,
            status,
          }
        })
       } else {

      }
    })
  }

  addFeature(description: string, dueDate: Date) {
    this.backend.addFeature(description, dueDate, this.activeProjectID).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'ADD_FEATURE',
          payload: {
            id: val.id,
            dueDate,
            description
          }
        })
      } else {
        let snackBarRef = this.snackBar.open("Error adding the feature", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.addFeature(description, dueDate);
        });
      }
    });
  }

  removeFeature(id) {
    this.backend.deleteFeature(id, this.activeProjectID).subscribe((val: any) => {
      if (val.code == 200) {
        let temp = [];
        this._store.dispatch({
          type: 'REMOVE_FEATURE',
          payload: id
        });
      } else {
        let snackBarRef = this.snackBar.open("Error removing the feature", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.removeFeature(id);
        });
      }
    });
  }

  /****************FETCHING ALL DETAILS *********************/
  fetchProjectDashboard() {
    if (this.activeProjectID == undefined || this.activeProjectID == null) return;
    this.backend.fetchProjectDashboard(this.activeProjectID).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'SET_PROJECT_OVERVIEW',
          payload: {
            access: val.access,
            name: val.name,
            features: val.features,
            issues: val.issues,
            links: val.links,
            users: val.users,
            closed: val.closed
          }
        });
      } else {
        let snackBarRef = this.snackBar.open("Error fetching the project dashboard", "Reload");
        snackBarRef.onAction().subscribe(() => {
          this.fetchProjectDashboard();      
        });
      }
    });
  }
}
