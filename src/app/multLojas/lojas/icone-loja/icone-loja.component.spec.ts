import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconeLojaComponent } from './icone-loja.component';

describe('IconeLojaComponent', () => {
  let component: IconeLojaComponent;
  let fixture: ComponentFixture<IconeLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconeLojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconeLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
