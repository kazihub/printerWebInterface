import { TestBed } from '@angular/core/testing';

import { SpoiltService } from './spoilt.service';

describe('SpoiltService', () => {
  let service: SpoiltService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpoiltService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
