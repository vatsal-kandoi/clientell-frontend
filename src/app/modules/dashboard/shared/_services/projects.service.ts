import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  activeProject: Subject<string>;
  activeProjectID: string;
  projects = [
    {
      name: 'Lorem Ipsum',
      _id: 'nina3nifn',
      letter: 'L',
      active: false,
    },
    {
      name: 'Lorem Ipsum',
      _id: 'nina3nifn',
      letter: 'L',
      active: true,
    },
    {
      name: 'Lorem Ipsum',
      _id: 'nina3nifn',
      letter: 'L',
      active: true,
    },
    {
      name: 'Lorem Ipsum',
      _id: 'nina3nifn',
      letter: 'L',
      active: true,
    },
    {
      name: 'Lorem Ipsum',
      _id: 'nina3nifn',
      letter: 'L',
      active: true,
    },
    {
      name: 'Lorem Ipsum',
      _id: 'nina3nifn',
      letter: 'L',
      active: true,
    },
    {
      name: 'Lorem Ipsum',
      _id: 'nina3nifn',
      letter: 'L',
      active: true,
    },
    {
      name: 'Aorem Ipsum',
      _id: 'nina3nifn',
      letter: 'A',
      active: true,
    }
  ];
  constructor() {
    this.activeProject = new Subject();
  }
  setActiveProject(id: string) {
    this.activeProjectID = id;
    this.activeProject.next(this.activeProjectID);
  }
  addProject(name: string) {
    this.projects.push(    {
      name,
      _id: 'nina3nifn',
      letter: name[0],
      active: true,
    });
  }
  getAllProjects() {
    return of(this.projects);
  }
}
