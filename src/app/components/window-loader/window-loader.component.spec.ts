import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowLoaderComponent } from './window-loader.component';

describe('WindowLoaderComponent', () => {
  let component: WindowLoaderComponent;
  let fixture: ComponentFixture<WindowLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
