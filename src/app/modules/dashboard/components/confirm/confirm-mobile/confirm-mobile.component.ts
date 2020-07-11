import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProjectsService } from '../../../shared/_services/projects.service';
import { ActiveProjectService } from '../../../shared/_services/active-project.service';

@Component({
  selector: 'confirm-mobile',
  templateUrl: './confirm-mobile.component.html',
  styleUrls: ['./confirm-mobile.component.css']
})
export class ConfirmMobileComponent implements OnInit {
  @Input('type') type;
  @Input('access') access;

  constructor(private bottomSheetRef: MatBottomSheetRef<ConfirmMobileComponent>, private projectsService: ProjectsService, private activeProject: ActiveProjectService) {  
  }
  ngOnInit(): void {
  }
  tick() {
    this.bottomSheetRef.dismiss(true);
  }
  cross() {
    this.bottomSheetRef.dismiss(false);
  }
}
