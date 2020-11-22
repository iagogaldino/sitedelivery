import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterInbagComponent } from './router-inbag.component';

describe('RouterInbagComponent', () => {
  let component: RouterInbagComponent;
  let fixture: ComponentFixture<RouterInbagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouterInbagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterInbagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
