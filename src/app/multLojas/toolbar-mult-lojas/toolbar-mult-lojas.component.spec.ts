import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarMultLojasComponent } from './toolbar-mult-lojas.component';

describe('ToolbarMultLojasComponent', () => {
  let component: ToolbarMultLojasComponent;
  let fixture: ComponentFixture<ToolbarMultLojasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarMultLojasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarMultLojasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
