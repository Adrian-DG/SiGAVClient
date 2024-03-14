import { TestBed } from '@angular/core/testing';

import { DenominacionesService } from './denominaciones.service';

describe('DenominacionesService', () => {
  let service: DenominacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenominacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
