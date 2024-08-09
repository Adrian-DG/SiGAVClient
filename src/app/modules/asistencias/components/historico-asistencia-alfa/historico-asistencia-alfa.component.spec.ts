import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAsistenciaAlfaComponent } from './historico-asistencia-alfa.component';

describe('HistoricoAsistenciaAlfaComponent', () => {
  let component: HistoricoAsistenciaAlfaComponent;
  let fixture: ComponentFixture<HistoricoAsistenciaAlfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoAsistenciaAlfaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoAsistenciaAlfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
