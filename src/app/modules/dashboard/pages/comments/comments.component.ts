import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../shared/_services/comment.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

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
  constructor(private commentService: CommentService, private route: ActivatedRoute, private _store: Store<any>) {
    this._store.select('UserDataStore').subscribe(data => {
      this.description = data.commentDescription.description;
      this.addedOn = data.commentDescription.addedOn;
      this.type = data.commentDescription.type;
      this.accepted = data.commentDescription.accepted;
      this.comments = data.comments;
      if (this.type == 'feature') {
        this.completed = data.commentDescription.completed;
      } else {
        this.closed = data.commentDescription.closed;
      }
      console.log(data);
    });
    this.commentService.getComments();
    this.userComment = new FormControl('');
  }
  ngOnInit(): void {
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
