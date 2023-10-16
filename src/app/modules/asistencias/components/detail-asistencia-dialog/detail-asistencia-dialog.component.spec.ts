import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAsistenciaDialogComponent } from './detail-asistencia-dialog.component';

describe('DetailAsistenciaDialogComponent', () => {
  let component: DetailAsistenciaDialogComponent;
  let fixture: ComponentFixture<DetailAsistenciaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAsistenciaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAsistenciaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
