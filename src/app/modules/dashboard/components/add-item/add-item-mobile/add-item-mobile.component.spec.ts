import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemMobileComponent } from './add-item-mobile.component';

describe('AddItemMobileComponent', () => {
  let component: AddItemMobileComponent;
  let fixture: ComponentFixture<AddItemMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
