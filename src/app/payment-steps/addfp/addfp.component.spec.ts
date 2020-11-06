import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfpComponent } from './addfp.component';

describe('AddfpComponent', () => {
  let component: AddfpComponent;
  let fixture: ComponentFixture<AddfpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
