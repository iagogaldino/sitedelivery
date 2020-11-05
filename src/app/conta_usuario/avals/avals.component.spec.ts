import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvalsComponent } from './avals.component';

describe('AvalsComponent', () => {
  let component: AvalsComponent;
  let fixture: ComponentFixture<AvalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
