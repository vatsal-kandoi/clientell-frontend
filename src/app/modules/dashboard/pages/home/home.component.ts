import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/_services/url.service';
import { ProjectsService } from '../../shared/_services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoaded: boolean;
  projects: any[];
  constructor(private http: HttpClient, private url: UrlService, private projectsService: ProjectsService, private router: Router) {
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.http.get(this.url.getOverview).subscribe((val: any) => {
      if (val.code == 200) {
        this.projects = val.projects;
        console.log(this.projects);
      }
      this.isLoaded = true;
    })
  }
  openProject(id: string) {
    this.projectsService.setActiveProject(id);
    this.router.navigate(['/dashboard/project'], {queryParams: {projectId: id}});
  }
}
