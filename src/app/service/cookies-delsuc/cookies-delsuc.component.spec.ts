import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesDelsucComponent } from './cookies-delsuc.component';

describe('CookiesDelsucComponent', () => {
  let component: CookiesDelsucComponent;
  let fixture: ComponentFixture<CookiesDelsucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesDelsucComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesDelsucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
