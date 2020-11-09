import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateOrderComponent } from './evaluate-order.component';

describe('EvaluateOrderComponent', () => {
  let component: EvaluateOrderComponent;
  let fixture: ComponentFixture<EvaluateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluateOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
