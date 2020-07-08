import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectDesktopComponent } from './add-project-desktop.component';

describe('AddProjectDesktopComponent', () => {
  let component: AddProjectDesktopComponent;
  let fixture: ComponentFixture<AddProjectDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
