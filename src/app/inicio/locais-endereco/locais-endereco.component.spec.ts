import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaisEnderecoComponent } from './locais-endereco.component';

describe('LocaisEnderecoComponent', () => {
  let component: LocaisEnderecoComponent;
  let fixture: ComponentFixture<LocaisEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocaisEnderecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaisEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
