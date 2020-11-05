import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagStepsComponent } from './bag-steps.component';

describe('BagStepsComponent', () => {
  let component: BagStepsComponent;
  let fixture: ComponentFixture<BagStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BagStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BagStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
