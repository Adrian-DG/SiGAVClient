import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaCalidadDialogComponent } from './asistencia-calidad-dialog.component';

describe('AsistenciaCalidadDialogComponent', () => {
  let component: AsistenciaCalidadDialogComponent;
  let fixture: ComponentFixture<AsistenciaCalidadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciaCalidadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaCalidadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
