import { TestBed } from '@angular/core/testing';

import { HospitalesService } from './hospitales.service';

describe('HospitalesService', () => {
  let service: HospitalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
