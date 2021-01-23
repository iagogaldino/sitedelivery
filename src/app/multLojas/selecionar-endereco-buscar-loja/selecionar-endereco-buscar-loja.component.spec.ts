import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarEnderecoBuscarLojaComponent } from './selecionar-endereco-buscar-loja.component';

describe('SelecionarEnderecoBuscarLojaComponent', () => {
  let component: SelecionarEnderecoBuscarLojaComponent;
  let fixture: ComponentFixture<SelecionarEnderecoBuscarLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecionarEnderecoBuscarLojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarEnderecoBuscarLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
