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

  name: string;
  access: string;
  users: any[];
  closed: any;

  usersToShow: any[];
  errorGettingParam: any;
  constructor(private router: Router, private projectsService: ProjectsService,
    private bottomSheet: MatBottomSheet, private displaySize: DisplaySizeService, private dialog: MatDialog, private activeProject: ActiveProjectService, private route: ActivatedRoute, private _store: Store<any>) {
      this._store.select('UserDataStore').subscribe(data => {
        this.users = data.users;
        this.usersToShow = JSON.parse(JSON.stringify(this.users)).splice(0,2)
      });
  
      this._store.select('UserStateData').subscribe(data => {        
        this.access =  data.activeProjectState.access;
        this.closed = data.activeProjectState.closed;
        this.name = data.activeProjectState.name;
      });

      this.errorGettingParam = false;
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

  addItem() {
    if (this.displaySize.displayType == 'desktop') {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '350px';
      dialogConfig.data = {access: this.access};
      dialogConfig.autoFocus = false;
      let ref = this.dialog.open(AddItemDesktopComponent, dialogConfig);      
      ref.afterClosed().subscribe((data) => {
        if (data) {
          if (data.type == 'link') this.activeProject.addLink(data.for, data.link);
          else if (data.type == 'issue') this.activeProject.addIssue(data.description);
          else if (data.type == 'feature') this.activeProject.addFeature(data.description, data.dueDate)
        }
      })
    } else {
      const config = new MatBottomSheetConfig();
      config.data = {access: this.access};
      config.autoFocus = false;
      let ref = this.bottomSheet.open(AddItemMobileComponent, config);
      ref.afterDismissed().subscribe((data) => {
        if (data) {
          if (data.type == 'link') this.activeProject.addLink(data.for, data.link);
          else if (data.type == 'issue') this.activeProject.addIssue(data.description);
          else if (data.type == 'feature') this.activeProject.addFeature(data.description, data.dueDate)
        }
      })

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
