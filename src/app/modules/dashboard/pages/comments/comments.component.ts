import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../shared/_services/comment.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  userComment: FormControl;
  userEmail: string;

  description: string;
  comments: [];
  completed: boolean;
  addedOn: any;
  accepted: string;
  type: string;
  closed: boolean;
  isLoaded: boolean;
  constructor(private commentService: CommentService, private route: ActivatedRoute) {
    this.isLoaded = false;
    this.userComment = new FormControl('');
  }
  ngOnInit(): void {
    this.commentService.getComments();
    this.commentService.commentsFetched.subscribe((val) => {
      if (val) {
        this.type = this.commentService.activeType;

        let data = this.commentService.data;
  
        this.description = data.description;
        this.addedOn = data.addedOn;
        this.addedOn = new Date(this.addedOn);
  
        this.addedOn = this.addedOn.toLocaleDateString();
  
        if (this.type == 'feature') {
          this.accepted = data.accepted.value;
          this.completed = data.completed.value;
        } else {
          this.closed = data.closed.value;
        }
        this.userEmail = this.commentService.userEmail;
        this.comments = data.comments;
        this.isLoaded = true;
      } else {
        const issueId: string = this.route.snapshot.queryParamMap.get('issueId');
        const featureId: string = this.route.snapshot.queryParamMap.get('featureId');
        if (issueId == null) {
          this.commentService.activeType = 'feature';
          this.commentService.activeID = featureId;
          this.commentService.getComments();
        } else {
          this.commentService.activeType = 'issue';
          this.commentService.activeID = issueId;
          this.commentService.getComments();
        }
      }
    });
  }
  addComment() {
    if (this.userComment.value == '') return;
    this.commentService.addComment(this.userComment.value);
    this.userComment.reset()
  }

  deleteComment(id) {
    this.commentService.deleteComment(id);
  }
}
