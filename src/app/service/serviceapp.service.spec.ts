import { TestBed } from '@angular/core/testing';

import { ServiceappService } from './serviceapp.service';

describe('ServiceappService', () => {
  let service: ServiceappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
