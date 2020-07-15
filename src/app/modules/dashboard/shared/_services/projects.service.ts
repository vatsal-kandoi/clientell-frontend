import { Injectable, SkipSelf } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/_services/url.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardBackendService } from './backend.service';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  activeProjectID: string;
  projects: any[];
  
  constructor(private backend: DashboardBackendService, private router: Router, private snackBar: MatSnackBar, private _store: Store<any>) {
    this._store.select('UserStateData').subscribe((data) => {
      if (data.activeProjectId != null && data.activeProjectId != this.activeProjectID){
        this.activeProjectID = data.activeProjectId;
      }
    })
  }
  setActiveProject(id) {
    this._store.dispatch({
      type: 'SET_ACTIVE_PROJECT',
      payload: {id},
    });
    this.router.navigate(['/dashboard/project'], {queryParams: {projectId: id}});
  }
  addProject(name: string) {
    this.backend.addProject(name).subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'ADD_PROJECT',
          payload: {
            id: val.id,
            name
          }
        });
        this._store.dispatch({
          type: 'SET_ACTIVE_PROJECT',
          payload: {
            id: val.id,
          }
        });      
        this.router.navigate(['/dashboard/project'], {queryParams: {projectId: this.activeProjectID}});
      } else {
        let snackBarRef = this.snackBar.open("Error adding the project", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.addProject(name);
        });
      }
    });
  }

  fetchAllProjects() {
    this.backend.getAllProjects().subscribe((val: any) => {
      if (val.code == 200) {
        this._store.dispatch({
          type: 'SET_USER',
          payload: {
            name: val.name,
            email: val.email
          }
        })
        this._store.dispatch({
          type: 'SET_ALL_PROJECTS',
          payload: {
            projects: val.projects,
          }
        });
      } else {
        let snackBarRef = this.snackBar.open("Error fetching the projects", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.fetchAllProjects();
        });
      }
    });
  }
}
