import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstadisticoDialogComponent } from './reporte-estadistico-dialog.component';

describe('ReporteEstadisticoDialogComponent', () => {
  let component: ReporteEstadisticoDialogComponent;
  let fixture: ComponentFixture<ReporteEstadisticoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteEstadisticoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteEstadisticoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
