import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddProjectDesktopComponent } from '../../add-project/add-project-desktop/add-project-desktop.component';
import { ProjectsService } from '../../../shared/_services/projects.service';

@Component({
  selector: 'app-add-item-desktop',
  templateUrl: './add-item-desktop.component.html',
  styleUrls: ['./add-item-desktop.component.css']
})
export class AddItemDesktopComponent implements OnInit {
  value: FormControl;
  type: FormControl;
  error: string;
  showCalender: boolean;

  constructor(public dialogRef: MatDialogRef<AddProjectDesktopComponent>, private projectsService: ProjectsService) {
    this.value = new FormControl('');
    this.type = new FormControl('');
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
    this.dialogRef.close();
  }

}
