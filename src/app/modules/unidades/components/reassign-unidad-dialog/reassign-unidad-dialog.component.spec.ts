import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignUnidadDialogComponent } from './reassign-unidad-dialog.component';

describe('ReassignUnidadDialogComponent', () => {
  let component: ReassignUnidadDialogComponent;
  let fixture: ComponentFixture<ReassignUnidadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReassignUnidadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReassignUnidadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
