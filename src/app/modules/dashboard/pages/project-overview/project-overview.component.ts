import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../shared/_services/projects.service';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { DisplaySizeService } from 'src/app/shared/_services/display-size.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddItemDesktopComponent } from '../../components/add-item/add-item-desktop/add-item-desktop.component';
import { AddItemMobileComponent } from '../../components/add-item/add-item-mobile/add-item-mobile.component';
import {ActiveProjectService} from '../../shared/_services/active-project.service';
import { ConfirmMobileComponent } from '../../components/confirm/confirm-mobile/confirm-mobile.component';
import { ConfirmDesktopComponent } from '../../components/confirm/confirm-desktop/confirm-desktop.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
  loadingContent: boolean;

  name: string;
  access: string;
  users: any[];
  closed: any;

  usersToShow: any[];
  errorGettingParam: any;
  showReload: boolean;
  constructor(private router: Router, private projectsService: ProjectsService,
    private bottomSheet: MatBottomSheet, private displaySize: DisplaySizeService, private dialog: MatDialog, private activeProject: ActiveProjectService, private route: ActivatedRoute, private _store: Store<any>) {
      this.loadingContent = true;
      this._store.select('UserData').subscribe(data => {
        this.users = data.storeData.users;
        this.usersToShow = JSON.parse(JSON.stringify(this.users)).splice(0,2)
        this.access =  data.activeState.activeProjectState.access;
        this.closed = data.activeState.activeProjectState.closed;
        this.name = data.activeState.activeProjectState.name;
        this.loadingContent = false;
      });

      this.errorGettingParam = false;
      this.showReload = false;
      if (this.activeProject.activeProjectID == undefined) {
        const projectId: string = this.route.snapshot.queryParamMap.get('projectId');
        this.activeProject.activeProjectID = projectId;
        this.activeProject.fetchProjectDashboard();
      }
  }

  ngOnInit(): void {
  }

  navigate(direction: string) {
    if (direction == 'overview') {
      this.router.navigate(['/dashboard/project'], {queryParams: {projectId: this.projectsService.activeProjectID}});
    } else {
      this.router.navigate(['/dashboard/project/users'], {queryParams: {projectId: this.projectsService.activeProjectID}});
    }
  }

  addLink() {
    if (this.displaySize.displayType == 'desktop') {
      this.dialog.open(AddItemDesktopComponent, {
        width: '350px'
      });      
    } else {
      this.bottomSheet.open(AddItemMobileComponent);
    }
  }
  closeProject() {
    if (this.displaySize.displayType == 'desktop') {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.data = {type: 'close', access: this.access};
      dialogConfig.width = '350px';
      dialogConfig.autoFocus = false;
      const dialog = this.dialog.open(ConfirmDesktopComponent, dialogConfig);      
      dialog.afterClosed().subscribe(
        data => {
          if (data) {
            this.activeProject.closeProject();
            if (this.access == 'admin') this.closed.admin.value = true;
            if (this.access == 'client') this.closed.client.value = true;
          }
        }
      );      
    } else {
      const sheetConfig = new MatBottomSheetConfig();      
      sheetConfig.data = {type: 'close', access: this.access};
      sheetConfig.autoFocus = false;

      const sheet = this.bottomSheet.open(ConfirmMobileComponent, sheetConfig);
      sheet.afterDismissed().subscribe(
        data => {
          if (data) {
            this.activeProject.closeProject();
            if (this.access == 'admin') this.closed.admin.value = true;
            if (this.access == 'client') this.closed.client.value = true;
          }
        }
      );      
    }
  }
  deleteProject() {
    if (this.displaySize.displayType == 'desktop') {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.data = {type: 'delete', access: this.access};
      dialogConfig.width = '350px';
      dialogConfig.autoFocus = false;
      const dialog = this.dialog.open(ConfirmDesktopComponent, dialogConfig);      
      dialog.afterClosed().subscribe(
        data => {
          if (data) {
            this.activeProject.deleteProject();
          }
        }
      );    
    } else {
      const sheetConfig = new MatBottomSheetConfig();      
      sheetConfig.data = {type: 'delete', access: this.access};
      sheetConfig.autoFocus = false;
      const sheet = this.bottomSheet.open(ConfirmMobileComponent, sheetConfig);
      sheet.afterDismissed().subscribe(
        data => {
          if (data) {
            this.activeProject.closeProject();
          }
        }
      );
    }
  }
}
