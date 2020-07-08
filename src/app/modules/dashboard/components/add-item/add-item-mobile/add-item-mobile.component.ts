import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddProjectMobileComponent } from '../../add-project/add-project-mobile/add-project-mobile.component';
import { ProjectsService } from '../../../shared/_services/projects.service';

@Component({
  selector: 'app-add-item-mobile',
  templateUrl: './add-item-mobile.component.html',
  styleUrls: ['./add-item-mobile.component.css']
})
export class AddItemMobileComponent implements OnInit {
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
