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
  isLoaded: boolean;
  constructor(private commentService: CommentService, private route: ActivatedRoute, private _store: Store<any>) {
    this._store.select('UserData').subscribe(data => {
      this.comments = data.storeData.comments;
      this.description = data.storeData.commentDescription.description;
      this.type = data.activeState.activeComponentType;
      this.accepted = data.storeData.commentDescription.accepted;
      this.addedOn = data.storeData.commentDescription.addedOn;
      this.completed = data.storeData.commentDescription.completed;
      this.closed = data.storeData.commentDescription.closed;
      this.isLoaded = true;
    })
    this.isLoaded = false;
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
