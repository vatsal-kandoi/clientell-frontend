import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProjectsService } from '../../../shared/_services/projects.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-project-mobile',
  templateUrl: './add-project-mobile.component.html',
  styleUrls: ['./add-project-mobile.component.css']
})
export class AddProjectMobileComponent implements OnInit {
  error: string;
  value: FormControl;
  constructor(private bottomSheetRef: MatBottomSheetRef<AddProjectMobileComponent>, private projectsService: ProjectsService) {
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
    this.bottomSheetRef.dismiss();
  }

}
