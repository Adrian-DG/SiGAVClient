import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaFilterByDateDialogComponent } from './asistencia-filter-by-date-dialog.component';

describe('AsistenciaFilterByDateDialogComponent', () => {
  let component: AsistenciaFilterByDateDialogComponent;
  let fixture: ComponentFixture<AsistenciaFilterByDateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciaFilterByDateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaFilterByDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
