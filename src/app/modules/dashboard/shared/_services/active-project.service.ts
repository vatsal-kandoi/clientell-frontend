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
  usersUpdated: Subject<boolean>;
  featuresUpdated: Subject<boolean>;
  issuesUpdated: Subject<boolean>;
  constructor(private projectsService: ProjectsService, private http: HttpClient, private url: UrlService) {
    this.activeProjectID = this.projectsService.activeProjectID;    
    this.fetchProjectDashboard();
    this.projectsService.activeProject.subscribe((val) => {
      this.activeProjectID = this.projectsService.activeProjectID;    
      this.fetchProjectDashboard();
    });
    this.dashboardFetched = new Subject();
    this.usersUpdated = new Subject();
    this.featuresUpdated = new Subject();
    this.issuesUpdated = new Subject();
  }

  removeUser(email: string) {
    let temp = [];
    this.users.forEach((element) => {
      if (element.user.email != email) {
        temp.push(element);
      }
    })
    this.users = JSON.parse(JSON.stringify(temp));
    this.usersUpdated.next(true);
  }

  addUser(name, email, role, id) {
    this.users.push({
      access: role, 
      user: {
        name, 
        email,
        _id: id
      }
    });
    this.usersUpdated.next(true);
  }

  addFeature(description: string, dueDate: Date) {
    this.http.post(this.url.addFeatureToProjectUrl, {'description': description, 'deadline': new Date(dueDate), 'projectId': this.activeProjectID}).subscribe((val: any) => {
      if (val.code == 200) {
        this.features.push({
          _id: val.id,
          accepted: {value: false, by: null},
          completed: {value: false, by: null},
          deadline: new Date(dueDate),
          description,
          status: 'incomplete',
        })

        this.featuresUpdated.next(true);
      }
    });
  }

  removeFeature(id) {
    this.http.post(this.url.removeFeatureToProjectUrl, {'featureId': id, 'projectId': this.activeProjectID}).subscribe((val: any) => {
      if (val.code == 200) {
        let temp = [];
        this.features.forEach((element) => {
          if (element._id != id) {
            temp.push(element);
          }
        })
        this.features = JSON.parse(JSON.stringify(temp));
        this.featuresUpdated.next(true);
      }
    });
  }

  addIssue(description: string) {

  }

  removeIssue(id) {

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
