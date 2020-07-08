import { Component, OnInit } from '@angular/core';
import {DisplaySizeService} from '../../shared/_services/display-size.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayType: string;
  constructor(private size: DisplaySizeService) {
    this.displayType = this.size.displayType;
  }

  ngOnInit(): void {
  }

}
