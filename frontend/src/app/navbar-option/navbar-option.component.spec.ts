import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOptionComponent } from './navbar-option.component';

describe('NavbarOptionComponent', () => {
  let component: NavbarOptionComponent;
  let fixture: ComponentFixture<NavbarOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarOptionComponent]
    });
    fixture = TestBed.createComponent(NavbarOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
