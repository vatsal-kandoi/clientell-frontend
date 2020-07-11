import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
  @Input('open') open;
  @Output('toggle') toggle: EventEmitter<boolean>;
  altSection: boolean;
  constructor(private router: Router, private loc: Location) {
    this.toggle = new EventEmitter();
    this.check();
  }

  toggleMenu() {
    this.toggle.emit(true);
  }
  ngOnInit(): void {
    this.loc.onUrlChange(() => {
      this.check()
    });
  }

  back() {
    this.loc.back();
  }

  check() {
    let url = this.loc.path(false).split('?')[0];
    if (url == '/dashboard/project/comments') this.altSection = true;
    else this.altSection = false;
  }

}
