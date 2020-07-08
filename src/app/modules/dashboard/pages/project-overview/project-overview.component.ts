import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../../shared/_services/projects.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DisplaySizeService } from 'src/app/shared/_services/display-size.service';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDesktopComponent } from '../../components/add-item/add-item-desktop/add-item-desktop.component';
import { AddItemMobileComponent } from '../../components/add-item/add-item-mobile/add-item-mobile.component';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {

  constructor(private router: Router, private projectsService: ProjectsService,
    private bottomSheet: MatBottomSheet, private displaySize: DisplaySizeService, private dialog: MatDialog) { }

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
}
