import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegrasCupomComponent } from './regras-cupom.component';

describe('RegrasCupomComponent', () => {
  let component: RegrasCupomComponent;
  let fixture: ComponentFixture<RegrasCupomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegrasCupomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegrasCupomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
