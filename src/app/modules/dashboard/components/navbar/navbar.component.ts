import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  projects: any[] 
  projectsToShow: any[];
  projectName: FormControl;
  constructor() {
    this.projects = [
      {
        name: 'Lorem Ipsum',
        _id: 'nina3nifn',
        letter: 'L',
        active: false,
      },
      {
        name: 'Lorem Ipsum',
        _id: 'nina3nifn',
        letter: 'L',
        active: true,
      },
      {
        name: 'Lorem Ipsum',
        _id: 'nina3nifn',
        letter: 'L',
        active: true,
      },
      {
        name: 'Lorem Ipsum',
        _id: 'nina3nifn',
        letter: 'L',
        active: true,
      },
      {
        name: 'Lorem Ipsum',
        _id: 'nina3nifn',
        letter: 'L',
        active: true,
      },
      {
        name: 'Lorem Ipsum',
        _id: 'nina3nifn',
        letter: 'L',
        active: true,
      },
      {
        name: 'Lorem Ipsum',
        _id: 'nina3nifn',
        letter: 'L',
        active: true,
      },
      {
        name: 'Aorem Ipsum',
        _id: 'nina3nifn',
        letter: 'A',
        active: true,
      }

    ];
    this.projectsToShow = JSON.parse(JSON.stringify(this.projects)).splice(0,5);
    this.projectName = new FormControl('');
  }

  ngOnInit(): void {
  }

  filter() {
    let regExp = new RegExp(this.projectName.value);
    let temp = JSON.parse(JSON.stringify(this.projects));
    this.projectsToShow = temp.filter((project) => regExp.test(project.name)).splice(0,5);
  }

}
