import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProjectDesktopComponent } from '../../add-project/add-project-desktop/add-project-desktop.component';
import { ProjectsService } from '../../../shared/_services/projects.service';
import { ActiveProjectService } from '../../../shared/_services/active-project.service';

@Component({
  selector: 'app-add-item-desktop',
  templateUrl: './add-item-desktop.component.html',
  styleUrls: ['./add-item-desktop.component.css']
})
export class AddItemDesktopComponent implements OnInit {
  @Input('access') access;

  value: FormControl;
  type: FormControl;
  dueDate: FormControl;
  error: string;
  selectedVal: any;
  linkName: FormControl;
  link: FormControl;
  constructor(public dialogRef: MatDialogRef<AddProjectDesktopComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.access = data.access;
    this.value = new FormControl('');
    this.type = new FormControl('');
    this.dueDate = new FormControl('');
    this.linkName = new FormControl('');
    this.link = new FormControl('');
   
  }

  ngOnInit(): void {
  }

  toggle() {
    this.selectedVal = this.type.value;
  }
  add() {
    if (this.type.value == 'feature') {
      if (this.value.value == '') {
        this.error = 'Input fields cannot be empty'
        return;
      }
      this.dialogRef.close({type: 'feature', description: this.value.value, dueDate: this.dueDate.value});
    }
    else if (this.type.value == 'issue') {
      if (this.value.value == '') {
        this.error = 'Input fields cannot be empty'
        return;
      }
      this.dialogRef.close({type: 'issue', description: this.value.value});
    } else if (this.type.value == 'link') {
      this.dialogRef.close({type: 'link', for:this.linkName.value, link: this.link.value});
    }
  }

}
