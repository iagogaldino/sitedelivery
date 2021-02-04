import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefoneUsuarioComponent } from './telefone-usuario.component';

describe('TelefoneUsuarioComponent', () => {
  let component: TelefoneUsuarioComponent;
  let fixture: ComponentFixture<TelefoneUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelefoneUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefoneUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
