import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAsistenciaDialogComponent } from './update-asistencia-dialog.component';

describe('UpdateAsistenciaDialogComponent', () => {
  let component: UpdateAsistenciaDialogComponent;
  let fixture: ComponentFixture<UpdateAsistenciaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAsistenciaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAsistenciaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
