import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDialogCalidadComponent } from './report-dialog-calidad.component';

describe('ReportDialogCalidadComponent', () => {
  let component: ReportDialogCalidadComponent;
  let fixture: ComponentFixture<ReportDialogCalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDialogCalidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDialogCalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
