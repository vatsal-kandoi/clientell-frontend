import { Injectable, SkipSelf } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/_services/url.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projectAdded: Subject<boolean>;
  projectFetched: Subject<boolean>;
  activeProject: Subject<string>;
  activeProjectID: string;
  projects: any[];
  
  userName: string;
  userEmail: any;

  constructor(private http: HttpClient, private url: UrlService, private router: Router) {
    this.projectAdded = new Subject();
    this.activeProject = new Subject();
    this.projectFetched = new Subject();
  }

  switchStatus(id) {
    this.projects.forEach((element) => {
      if (element._id == id) {
        element.closed.admin.value = true;
      }
    });
    this.projectFetched.next(true);
  }

  setActiveProject(id: string) {
    this.activeProjectID = id;
    this.activeProject.next(this.activeProjectID);
  }

  removeProject(id) {
    let temp = [];
    this.projects.forEach((element) => {
      if (element._id != id) {
        temp.push(element);
      } 
    });
    this.projects = JSON.parse(JSON.stringify(temp));
    this.projectAdded.next(true);
  }

  addProject(name: string) {
    this.http.post(this.url.addProjectUrl, {'name': name}).subscribe((val: any) => {
      if (val.code == 200) {
        this.projects.push({
          name: name,
          closed: {
            admin: {value: false, by: null},
            client: {value: false, by: null},
          },
          letter: name[0],
          _id: val.id
        });
        this.projectAdded.next(true);
        this.activeProjectID = val.id;
        this.activeProject.next(this.activeProjectID);
        this.router.navigate(['/dashboard/project'], {queryParams: {projectId: this.activeProjectID}});
      }
    });
  }

  fetchAllProjects() {
    return this.http.get(this.url.allProjectsUrl).subscribe((val: any) => {
      if (val.code == 200) {
        this.projects = [];
        val.projects.forEach(element => {
          this.projects.push({...element, letter: element.name[0]});
        });
        this.userName = val.name;
        this.userEmail = val.email;
        this.projectFetched.next(true);
      }
    });
  }
}
