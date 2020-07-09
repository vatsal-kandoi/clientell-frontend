import { Injectable } from '@angular/core';
import {ProjectsService} from './projects.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/_services/url.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveProjectService {
  activeProjectID: string;
  access: string;
  name: string;
  features: any[];
  users: any[];
  issues: any[];
  links: any[];

  dashboardFetched: Subject<boolean>;

  constructor(private projectsService: ProjectsService, private http: HttpClient, private url: UrlService) {
    this.activeProjectID = this.projectsService.activeProjectID;    
    this.fetchProjectDashboard();
    this.projectsService.activeProject.subscribe((val) => {
      this.activeProjectID = this.projectsService.activeProjectID;    
      this.fetchProjectDashboard();
    });
    this.dashboardFetched = new Subject();
  }

  fetchProjectDashboard() {
    return this.http.post(this.url.allProjectsUrl, {'projectId': this.activeProjectID}).subscribe((val: any) => {
      if (val.code == 200) {
        this.access = val.access;
        this.name = val.name;
        this.features = val.features;
        this.issues = val.issue;
        this.links = val.links;
        this.users = val.users;
        this.dashboardFetched.next(true);
      }

      console.log(val);
    });
  }
}
