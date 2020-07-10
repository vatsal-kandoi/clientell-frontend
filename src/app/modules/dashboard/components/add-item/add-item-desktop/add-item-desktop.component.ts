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
  selectedVal: any;
  linkName: FormControl;
  link: FormControl;
  access: string;
  constructor(public dialogRef: MatDialogRef<AddProjectDesktopComponent>, private projectsService: ProjectsService, private activeProject: ActiveProjectService) {
    this.value = new FormControl('');
    this.type = new FormControl('');
    this.dueDate = new FormControl('');
    this.linkName = new FormControl('');
    this.link = new FormControl('');
  }

  ngOnInit(): void {
    this.access = this.activeProject.access;
    console.log(this.access)
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
      this.activeProject.addFeature(this.value.value, this.dueDate.value);
    }
    else if (this.type.value == 'issue') {
      if (this.value.value == '') {
        this.error = 'Input fields cannot be empty'
        return;
      }
      this.activeProject.addIssue(this.value.value);
    } else if (this.type.value == 'link') {
      this.activeProject.addLink(this.linkName.value, this.link.value)
    }
    this.dialogRef.close();
  }

}
