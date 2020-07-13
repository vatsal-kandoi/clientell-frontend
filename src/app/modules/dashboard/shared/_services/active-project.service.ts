import { Injectable } from '@angular/core';
import {ProjectsService} from './projects.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/_services/url.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  closed: any;

  dashboardFetched: Subject<boolean>;
  usersUpdated: Subject<boolean>;
  featuresUpdated: Subject<boolean>;
  issuesUpdated: Subject<boolean>;
  linksUpdated: Subject<boolean>;

  constructor(private projectsService: ProjectsService, private http: HttpClient, private url: UrlService, private router: Router, private snackBar: MatSnackBar) {
    this.activeProjectID = this.projectsService.activeProjectID;    
    this.fetchProjectDashboard();
    this.projectsService.activeProject.subscribe((val) => {
      if (val) {
        this.activeProjectID = this.projectsService.activeProjectID;    
        this.fetchProjectDashboard();
      }
    });
    this.dashboardFetched = new Subject();
    this.usersUpdated = new Subject();
    this.featuresUpdated = new Subject();
    this.issuesUpdated = new Subject();
    this.linksUpdated = new Subject();
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
      } else {
        let snackBarRef = this.snackBar.open("Error adding the feature", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.addFeature(description, dueDate);
        });
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
      } else {
        let snackBarRef = this.snackBar.open("Error removing the feature", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.removeFeature(id);
        });
      }
    });
  }

  addLink(description, link) {
    this.http.post(this.url.addLinkUrl, {'linkFor': description, 'link': link, 'projectId': this.activeProjectID}).subscribe((val: any) => {
      if (val.code == 200) {
        this.links.push({
          for: description,
          link
        });
        this.linksUpdated.next(true);
      } else {
        let snackBarRef = this.snackBar.open("Error adding the link", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.addLink(description, link);
        });
      }
    })
  }

  removeLink(link_id) {
    this.http.post(this.url.removeUrl, {'linkFor': link_id, 'projectId': this.activeProjectID}).subscribe((val: any) => {
      if (val.code == 200) {
        let temp = [];
        this.links.forEach((element) => {
          if (element.for != link_id) {
            temp.push(element);
          }
        })
        this.links = JSON.parse(JSON.stringify(temp));
        this.linksUpdated.next(true);
      } else {
        let snackBarRef = this.snackBar.open("Error removing the link", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.removeLink(link_id);
        });
      }
    })
  }
  addIssue(description: string) {
    this.http.post(this.url.addIssueToProjectUrl, {'description': description, 'projectId': this.activeProjectID}).subscribe((val: any) => {
      if (val.code == 200) {
        this.issues.push({
          _id: val.id,
          closed: {value: false, by: null},
          accepted: {value: false, by: null},
          description,
          status: 'incomplete',
        });

        this.issuesUpdated.next(true);
      } else {
        let snackBarRef = this.snackBar.open("Error adding the issue", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.addIssue(description);
        });
      }
    });
  }

  removeIssue(id) {
    this.http.post(this.url.removeIssueToProjectUrl, {'issueId': id, 'projectId': this.activeProjectID}).subscribe((val: any) => {
      if (val.code == 200) {
        let temp = [];
        this.issues.forEach((element) => {
          if (element._id != id) {
            temp.push(element);
          }
        })
        this.issues = JSON.parse(JSON.stringify(temp));
        this.issuesUpdated.next(true);
      } else {
        let snackBarRef = this.snackBar.open("Error removing the issue", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.removeIssue(id);
        });
      }
    });
  }
  changeStatusIssue(status, id) {
    if (status == 'accept') {
      this.http.post(this.url.acceptIssueUrl, {'issueId': id, 'projectId': this.activeProjectID}).subscribe((val: any) => {
        if (val.code == 200) {
          this.issues.forEach((element) => {
            if (element._id == id) {
              element.accepted.value = true;
            }
          })
        }
        console.log(val);
      });
    } else if (status == 'reject') {
      this.http.post(this.url.rejectIssueUrl, {'issueId': id, 'projectId': this.activeProjectID}).subscribe((val: any) => {
        if (val.code == 200) {
          this.issues.forEach((element) => {
            if (element._id == id) {
              element.accepted.value = false;
              element.closed.value = false;
            }
          })
        }
      });
    }
  }
  fetchProjectDashboard() {
    if (this.activeProjectID == undefined) return;
    this.http.post(this.url.allProjectsUrl, {'projectId': this.activeProjectID}).subscribe((val: any) => {
      if (val.code == 200) {
        this.access = val.access;
        this.name = val.name;
        this.features = val.features;
        this.issues = val.issues;
        this.links = val.links;
        this.users = val.users;
        this.closed = val.closed;
        this.dashboardFetched.next(true);
      } else {
        let snackBarRef = this.snackBar.open("Error fetching the project dashboard", "Reload");
        snackBarRef.onAction().subscribe(() => {
          this.fetchProjectDashboard();      
        });
        this.dashboardFetched.next(false);
      }
    });
  }

  closeProject() {
    this.http.post(this.url.closeProjectUrl, {'projectId': this.activeProjectID, 'projectAccess': this.access}).subscribe((val: any) => {
      if (val.code == 200) {
        this.projectsService.switchStatus(this.activeProjectID);
      } else {
        let snackBarRef = this.snackBar.open("Error closing the project", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.closeProject();
        });
        this.dashboardFetched.next(false);
      }
    })
  }

  deleteProject() {
    this.http.post(this.url.deleteProjectUrl, {'projectId': this.activeProjectID}).subscribe((val: any) => {
      if (val.code == 200) {
        this.projectsService.removeProject(this.activeProjectID);
        this.router.navigate(['/dashboard/projects']);
      } else {
        let snackBarRef = this.snackBar.open("Error deleting the project", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.deleteProject();
        });
      }
    })
  }

  acceptFeature(id, status) {
    this.http.post(this.url.acceptFeatureUrl, {'status': status, 'projectId': this.activeProjectID, 'featureId': id}).subscribe((val: any) => {
      if (val.code == 200) {
        this.features.forEach((element) => {
          if (element._id == id) {
            element.accepted.value = status;
            if (!status) {
              element.completed.value = false;
            }
          }
        });
        this.featuresUpdated.next(true);
      } else {

      }
    })    
  }

  markCompleteFeature(id, status) {
    this.http.post(this.url.markFeatureCompleteUrl, {'status': status, 'projectId': this.activeProjectID, 'featureId': id}).subscribe((val: any) => {
      if (val.code == 200) {
        this.features.forEach((element) => {
          if (element._id == id) {
            element.completed.value = status;
          }
        });
        this.featuresUpdated.next(true);
      } else {

      }
    })
  }

  closeIssue(id, status) {
    if (status) {
      this.http.post(this.url.completeIssueUrl, {'projectId': this.activeProjectID, 'issueId': id}).subscribe((val: any) => {
        if (val.code == 200) {
          this.issues.forEach((element) => {
            if (element._id == id) {
              element.closed.value = status;
            }
          });
          this.issuesUpdated.next(true);
        } else {

        }
      });
    } else {
      this.http.post(this.url.incompleteIssueUrl, {'projectId': this.activeProjectID, 'issueId': id}).subscribe((val: any) => {
        if (val.code == 200) {
          this.issues.forEach((element) => {
            if (element._id == id) {
              element.closed.value = status;
            }
          });
          this.issuesUpdated.next(true);
        } else {

        }
      })      
    }

  }
}
