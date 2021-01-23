import { TestBed } from '@angular/core/testing';

import { SGuard } from './s.guard';

describe('SGuard', () => {
  let guard: SGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
