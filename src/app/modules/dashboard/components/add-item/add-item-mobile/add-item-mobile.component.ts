import { Component, OnInit } from '@angular/core';
import { FormControl, Form } from '@angular/forms';
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
  type: FormControl;
  showCalender: boolean;

  constructor(private bottomSheetRef: MatBottomSheetRef<AddProjectMobileComponent>, private projectsService: ProjectsService) {
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
    this.bottomSheetRef.dismiss();
  }

}
