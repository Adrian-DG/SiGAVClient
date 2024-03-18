import { TestBed } from '@angular/core/testing';

import { AsistenciPreHospitalariaService } from './asistenci-pre-hospitalaria.service';

describe('AsistenciPreHospitalariaService', () => {
  let service: AsistenciPreHospitalariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenciPreHospitalariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
