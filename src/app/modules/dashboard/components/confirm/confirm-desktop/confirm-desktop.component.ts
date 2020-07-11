import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from '../../../shared/_services/projects.service';
import { ActiveProjectService } from '../../../shared/_services/active-project.service';

@Component({
  selector: 'confirm-desktop',
  templateUrl: './confirm-desktop.component.html',
  styleUrls: ['./confirm-desktop.component.css']
})
export class ConfirmDesktopComponent implements OnInit {
  type: any;
  access: any;

  constructor(public dialogRef: MatDialogRef<ConfirmDesktopComponent>, @Inject(MAT_DIALOG_DATA) data, private projectsService: ProjectsService, private activeProject: ActiveProjectService) {
    this.type = data.type;
    this.access = data.access;
  }

  ngOnInit(): void {
    console.log(this.type);
    console.log(this.access);
  }

  tick() {
    this.dialogRef.close(true);
  }
  cross() {
    this.dialogRef.close(false);
  }

}
