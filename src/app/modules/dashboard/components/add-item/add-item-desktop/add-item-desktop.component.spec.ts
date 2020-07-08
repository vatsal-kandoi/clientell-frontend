import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemDesktopComponent } from './add-item-desktop.component';

describe('AddItemDesktopComponent', () => {
  let component: AddItemDesktopComponent;
  let fixture: ComponentFixture<AddItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
