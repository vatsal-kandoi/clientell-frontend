import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../shared/_services/projects.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DisplaySizeService } from 'src/app/shared/_services/display-size.service';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDesktopComponent } from '../../components/add-item/add-item-desktop/add-item-desktop.component';
import { AddItemMobileComponent } from '../../components/add-item/add-item-mobile/add-item-mobile.component';
import {ActiveProjectService} from '../../shared/_services/active-project.service';

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
  constructor(private router: Router, private projectsService: ProjectsService,
    private bottomSheet: MatBottomSheet, private displaySize: DisplaySizeService, private dialog: MatDialog, private activeProject: ActiveProjectService, private route: ActivatedRoute
    ) {
      this.loadingContent = true;
  }

  ngOnInit(): void {
    this.activeProject.dashboardFetched.subscribe((val) => {
      console.log(this.activeProject.closed);
      if (val == true) {
        this.name = this.activeProject.name;
        this.users = this.activeProject.users;
        this.usersToShow = JSON.parse(JSON.stringify(this.users)).splice(0,2);
        this.access = this.activeProject.access;
        this.closed = this.activeProject.closed;
        this.loadingContent = false;
      } else {
        const projectId: string = this.route.snapshot.queryParamMap.get('projectId');
        this.activeProject.activeProjectID = projectId;
        this.activeProject.fetchProjectDashboard();
      }
    })
    this.activeProject.usersUpdated.subscribe((val) => {
      if (val) {
        this.users = this.activeProject.users;
      }
    });
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
    this.activeProject.closeProject();
    if (this.access == 'admin') this.closed.admin.value = true;
    if (this.access == 'client') this.closed.client.value = true;
  }
  deleteProject() {
    this.activeProject.deleteProject();
  }
}
