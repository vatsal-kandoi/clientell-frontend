import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddProjectDesktopComponent } from '../../add-project/add-project-desktop/add-project-desktop.component';
import { ProjectsService } from '../../../shared/_services/projects.service';
import { ActiveProjectService } from '../../../shared/_services/active-project.service';

@Component({
  selector: 'app-add-item-desktop',
  templateUrl: './add-item-desktop.component.html',
  styleUrls: ['./add-item-desktop.component.css']
})
export class AddItemDesktopComponent implements OnInit {
  value: FormControl;
  type: FormControl;
  dueDate: FormControl;
  error: string;
  showCalender: boolean;

  constructor(public dialogRef: MatDialogRef<AddProjectDesktopComponent>, private projectsService: ProjectsService, private activeProject: ActiveProjectService) {
    this.value = new FormControl('');
    this.type = new FormControl('');
    this.dueDate = new FormControl('');
    this.showCalender = false;
  }

  ngOnInit(): void {
  }

  toggle() {
    if (this.type.value == 'feature') {
      this.showCalender = true;
    } else {
      this.showCalender = false;
    }
  }
  add() {
    if (this.value.value == '' || this.type.value == undefined) {
      this.error = 'Input fields cannot be empty'
      return;
    }
    if (this.type.value == 'feature') {
      this.activeProject.addFeature(this.value.value, this.dueDate.value);
    }
    else if (this.type.value == 'issue') {
      this.activeProject.addIssue(this.value.value);
    }
    this.dialogRef.close();
  }

}
