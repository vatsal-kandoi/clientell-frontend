import { Injectable, SkipSelf } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/_services/url.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projectAdded: Subject<boolean>;
  projectFetched: Subject<boolean>;
  activeProject: Subject<string>;
  activeProjectID: string;
  projects: any[];

  constructor(private http: HttpClient, private url: UrlService) {
    this.projectAdded = new Subject();
    this.activeProject = new Subject();
    this.projectFetched = new Subject();
  }

  setActiveProject(id: string) {
    this.activeProjectID = id;
    this.activeProject.next(this.activeProjectID);
  }
  addProject(name: string) {
    this.http.post(this.url.addProjectUrl, {'name': name}).subscribe((val: any) => {
      if (val.code == 200) {
        this.projects.push({
          name: name,
          letter: name[0],
          _id: val.id
        });
        this.projectAdded.next(true);
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
        this.projectFetched.next(true);
      }
    });

  }
}
