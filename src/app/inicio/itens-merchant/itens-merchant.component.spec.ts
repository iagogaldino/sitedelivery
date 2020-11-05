import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensMerchantComponent } from './itens-merchant.component';

describe('ItensMerchantComponent', () => {
  let component: ItensMerchantComponent;
  let fixture: ComponentFixture<ItensMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItensMerchantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
