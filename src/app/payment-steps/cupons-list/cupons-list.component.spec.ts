import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponsListComponent } from './cupons-list.component';

describe('CuponsListComponent', () => {
  let component: CuponsListComponent;
  let fixture: ComponentFixture<CuponsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuponsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
