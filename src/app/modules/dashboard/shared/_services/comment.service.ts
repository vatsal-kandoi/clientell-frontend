import { Injectable } from '@angular/core';
import { ActiveProjectService } from './active-project.service';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/_services/url.service';
import { Subject } from 'rxjs';
import { ProjectsService } from './projects.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  activeType: any;
  activeID: any;
  commentsFetched: Subject<boolean>;
  userEmail: string;
  data: any;

  constructor(private http: HttpClient, private url: UrlService, private activeProject: ActiveProjectService, private allProjects: ProjectsService, private snackBar: MatSnackBar ) {
    this.commentsFetched = new Subject();
    this.userEmail = this.allProjects.userEmail;
  }

  setActive(type: string, id: string) {
    this.activeType = type;
    this.activeID = id;
  }

  deleteComment(id) {
    this.http.post(this.url.deleteCommentsUrl, { 'commentId': id, 'type': this.activeType, 'projectId': this.activeProject.activeProjectID, 'componentId': this.activeID }).subscribe((val: any) => {
      if (val.code == 200) {
        let temp = [];
        this.data.comments.forEach(element => {
          if (element._id != id) {
            temp.push(element);
          }
        });
        this.data.comments = JSON.parse(JSON.stringify(temp));
        this.commentsFetched.next(true);
      } else {
        let snackBarRef = this.snackBar.open("Error fetching the comments", "Reload");
        snackBarRef.onAction().subscribe(() => {
          this.deleteComment(id);      
        });
      }
    });
  }

  addComment(comment) {
    this.http.post(this.url.addCommentsUrl, { 'description': comment, 'type': this.activeType, 'projectId': this.activeProject.activeProjectID, 'componentId': this.activeID }).subscribe((val: any) => {
      if (val.code == 200) {
        this.data.comments.push({
          by: {
            name: this.allProjects.userName,
            email: this.allProjects.userEmail,
          },
          createdAt: new Date(),
          description: comment,
          _id: val.id
        })        
        this.commentsFetched.next(true);
      } else {
        let snackBarRef = this.snackBar.open("Error adding the comment", "Try again");
        snackBarRef.onAction().subscribe(() => {
          this.addComment(comment);      
        });
      }
    });
  }

  getComments() {
    this.http.post(this.url.getCommentsUrl, { 'projectId': this.activeProject.activeProjectID, 'componentId': this.activeID, 'type': this.activeType }).subscribe((val: any) => {
      if (val.code == 200) {
        console.log(val);
        this.data = {...val};
        this.userEmail = this.allProjects.userEmail;
        this.commentsFetched.next(true);
      } else {
        let snackBarRef = this.snackBar.open("Error fetching the comments", "Reload");
        snackBarRef.onAction().subscribe(() => {
          this.getComments();      
        });
        this.commentsFetched.next(false);
      }
    })
  }
}
