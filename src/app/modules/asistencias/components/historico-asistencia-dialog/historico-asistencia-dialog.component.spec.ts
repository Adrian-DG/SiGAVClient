import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAsistenciaDialogComponent } from './historico-asistencia-dialog.component';

describe('HistoricoAsistenciaDialogComponent', () => {
  let component: HistoricoAsistenciaDialogComponent;
  let fixture: ComponentFixture<HistoricoAsistenciaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoAsistenciaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoAsistenciaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
