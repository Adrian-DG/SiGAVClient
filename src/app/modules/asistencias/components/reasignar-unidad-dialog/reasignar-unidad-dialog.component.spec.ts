import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasignarUnidadDialogComponent } from './reasignar-unidad-dialog.component';

describe('ReasignarUnidadDialogComponent', () => {
  let component: ReasignarUnidadDialogComponent;
  let fixture: ComponentFixture<ReasignarUnidadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasignarUnidadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReasignarUnidadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
