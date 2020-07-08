import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {ProjectsService} from '../../shared/_services/projects.service';
import { Router } from '@angular/router';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  projects: any[] 
  projectsToShow: any[];
  projectName: FormControl;

  showProject = false;
  constructor(private projectsService: ProjectsService, private router: Router) {
    this.projectName = new FormControl('');
  }

  ngOnInit(): void {
    this.projectsService.getAllProjects().subscribe((val) => {
      this.projects = val;
      this.projectsToShow = JSON.parse(JSON.stringify(this.projects)).splice(0,5);
      this.showProject = true;
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

  }

  openProject(id: string) {
    this.projectsService.setActiveProject(id);
    this.router.navigate(['/dashboard/project'], {queryParams: {projectId: id}});
  }

}
