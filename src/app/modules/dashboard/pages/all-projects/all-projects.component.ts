import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../shared/_services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  projects: any[];

  constructor(private projectsService: ProjectsService, private router: Router) { }

  ngOnInit(): void {
    this.projectsService.getAllProjects().subscribe((val) => {
      this.projects = val;
    });
  }
  openProject(id: string) {
    this.projectsService.setActiveProject(id);
    this.router.navigate(['/dashboard/project'], {queryParams: {projectId: id}});
  }
}
