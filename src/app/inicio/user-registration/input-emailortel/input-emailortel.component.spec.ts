import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEmailortelComponent } from './input-emailortel.component';

describe('InputEmailortelComponent', () => {
  let component: InputEmailortelComponent;
  let fixture: ComponentFixture<InputEmailortelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputEmailortelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEmailortelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
