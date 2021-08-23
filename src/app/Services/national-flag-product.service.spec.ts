import { TestBed } from '@angular/core/testing';

import { NationalFlagProductService } from './national-flag-product.service';

describe('NationalFlagProductService', () => {
  let service: NationalFlagProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalFlagProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
