import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUserDataComponent } from './input-user-data.component';

describe('InputUserDataComponent', () => {
  let component: InputUserDataComponent;
  let fixture: ComponentFixture<InputUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputUserDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
