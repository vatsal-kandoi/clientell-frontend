import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectMobileComponent } from './add-project-mobile.component';

describe('AddProjectMobileComponent', () => {
  let component: AddProjectMobileComponent;
  let fixture: ComponentFixture<AddProjectMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
