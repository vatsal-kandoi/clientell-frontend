import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {ProjectsService} from '../../shared/_services/projects.service';
import { Router } from '@angular/router';
import { DisplaySizeService } from 'src/app/shared/_services/display-size.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectDesktopComponent } from '../add-project/add-project-desktop/add-project-desktop.component';
import { AddProjectMobileComponent } from '../add-project/add-project-mobile/add-project-mobile.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  projects: any[] 
  projectsToShow: any[];
  projectName: FormControl;
  name: string;
  
  showProject = false;
  constructor(private projectsService: ProjectsService, private bottomSheet: MatBottomSheet, private router: Router, private displaySize: DisplaySizeService, private dialog: MatDialog) {
    this.projectName = new FormControl('');
    if (this.projectsService.projects == undefined) this.projectsService.fetchAllProjects();
    else {
      this.projects = this.projectsService.projects;
      this.name = this.projectsService.userName.split(" ")[0];
      this.projectsToShow = JSON.parse(JSON.stringify(this.projects)).splice(0,5);
      this.showProject = true;
    }
  }

  ngOnInit(): void {
    this.projectsService.projectFetched.subscribe((val) => {
      if (val == true) {
        this.projects = this.projectsService.projects;
        this.name = this.projectsService.userName.split(" ")[0];
        this.projectsToShow = JSON.parse(JSON.stringify(this.projects)).splice(0,5);
        this.showProject = true;
      }
    });

    this.projectsService.projectAdded.subscribe((val) => {
      if (val == true) {
        this.projects = this.projectsService.projects;
        this.projectsToShow = JSON.parse(JSON.stringify(this.projects)).splice(0,5);
      } else {

      }
    });
  }

  filter() {
    let regExp = new RegExp(this.projectName.value);
    let temp = JSON.parse(JSON.stringify(this.projects));
    this.projectsToShow = temp.filter((project) => regExp.test(project.name)).splice(0,5);
  }

  viewAll() {
    this.router.navigate(['/dashboard/projects']);
  }

  addProject() {
    if (this.displaySize.displayType == 'desktop') {
      this.dialog.open(AddProjectDesktopComponent, {
        width: '350px'
      });      
    } else {
      this.bottomSheet.open(AddProjectMobileComponent);
    }
  }

  openProject(id: string) {
    this.projectsService.setActiveProject(id);
    this.router.navigate(['/dashboard/project'], {queryParams: {projectId: id}});
  }

}
