import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProjectsService } from '../../../shared/_services/projects.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-project-desktop',
  templateUrl: './add-project-desktop.component.html',
  styleUrls: ['./add-project-desktop.component.css']
})
export class AddProjectDesktopComponent implements OnInit {
  value: FormControl;
  error: string;
  constructor(public dialogRef: MatDialogRef<AddProjectDesktopComponent>) {
    this.value = new FormControl('');
  }

  ngOnInit(): void {
  }

  add() {
    if (this.value.value == '') {
      this.error = 'Project name cannot be empty'
      return;
    }
    this.dialogRef.close(this.value.value);
  }

}
