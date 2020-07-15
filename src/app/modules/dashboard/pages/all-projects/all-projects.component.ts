import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../shared/_services/projects.service';
import { Router } from '@angular/router';
import { DisplaySizeService } from 'src/app/shared/_services/display-size.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectDesktopComponent } from '../../components/add-project/add-project-desktop/add-project-desktop.component';
import { AddProjectMobileComponent } from '../../components/add-project/add-project-mobile/add-project-mobile.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';

@Component({
  selector: 'all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  projects: any[];
  isLoaded: boolean;
  constructor(private projectsService: ProjectsService, private router: Router, private bottomSheet: MatBottomSheet ,private displaySize: DisplaySizeService, private dialog: MatDialog, private _store: Store<any>) {
    this.isLoaded = false;
    this._store.select('UserDataStore').subscribe(data => {
      this.projects = data.allProjects;
      this.isLoaded = true;
    });

  }

  ngOnInit(): void {
  }
  openProject(id: string) {
    this._store.dispatch({
      type: 'SET_ACTIVE_PROJECT',
      payload: id,
    });
    this.router.navigate(['/dashboard/project'], {queryParams: {projectId: id}});
  }
  addProject() {
    if (this.displaySize.displayType == 'desktop') {
      let ref = this.dialog.open(AddProjectDesktopComponent, {
        width: '350px'
      }); 
      ref.afterClosed().subscribe(
        data => {
          if (data) {
            this.projectsService.addProject(data);
          }
        }
      );     
    } else {
      let ref = this.bottomSheet.open(AddProjectMobileComponent);
      ref.afterDismissed().subscribe(
        data => {
          if (data) {
            this.projectsService.addProject(data);
          }
        }
      );      
    }
  }
}
