import { Component, OnInit, Input } from '@angular/core';
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
  @Input('access') access;

  value: FormControl;
  type: FormControl;
  dueDate: FormControl;
  error: string;
  selectedVal: any;
  linkName: FormControl;
  link: FormControl;
  constructor(private bottomSheetRef: MatBottomSheetRef<AddProjectMobileComponent>) {
    this.value = new FormControl('');
    this.type = new FormControl('');
    this.dueDate = new FormControl('');
    this.linkName = new FormControl('');
    this.link = new FormControl('');
  }

  ngOnInit(): void {
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
      this.bottomSheetRef.dismiss({type: 'feature', description: this.value.value, dueDate: this.dueDate.value});
    }
    else if (this.type.value == 'issue') {
      if (this.value.value == '') {
        this.error = 'Input fields cannot be empty'
        return;
      }
      this.bottomSheetRef.dismiss({type: 'issue', description: this.value.value});
    } else if (this.type.value == 'link') {
      this.bottomSheetRef.dismiss({type: 'link', for:this.linkName.value, link: this.link.value});
    }
  }

}
