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
  error: string;
  constructor(public dialogRef: MatDialogRef<AddProjectDesktopComponent>, private projectsService: ProjectsService) {
    this.value = new FormControl('');
  }

  ngOnInit(): void {
  }

  add() {
    if (this.value.value == '') {
      this.error = 'Project name cannot be empty'
      return;
    }
    this.projectsService.addProject(this.value.value);
    this.dialogRef.close();
  }

}
