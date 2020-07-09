import { Component, OnInit } from '@angular/core';
import { FormControl, Form } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddProjectMobileComponent } from '../../add-project/add-project-mobile/add-project-mobile.component';
import { ProjectsService } from '../../../shared/_services/projects.service';
import { ActiveProjectService } from '../../../shared/_services/active-project.service';

@Component({
  selector: 'app-add-item-mobile',
  templateUrl: './add-item-mobile.component.html',
  styleUrls: ['./add-item-mobile.component.css']
})
export class AddItemMobileComponent implements OnInit {
  value: FormControl;
  type: FormControl;
  dueDate: FormControl;
  error: string;
  selectedVal: any;
  linkName: FormControl;
  link: FormControl;
  access: string;

  constructor(private bottomSheetRef: MatBottomSheetRef<AddProjectMobileComponent>, private projectsService: ProjectsService, private activeProject: ActiveProjectService) {
    this.value = new FormControl('');
    this.type = new FormControl('');
    this.dueDate = new FormControl('');
    this.linkName = new FormControl('');
    this.link = new FormControl('');
  }

  ngOnInit(): void {
    this.access = this.activeProject.access;
  }

  toggle() {
    this.selectedVal = this.type.value;
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
    } else if (this.type.value == 'link') {
      this.activeProject.addLink(this.linkName.value, this.link.value)
    }

    this.bottomSheetRef.dismiss();
  }

}
