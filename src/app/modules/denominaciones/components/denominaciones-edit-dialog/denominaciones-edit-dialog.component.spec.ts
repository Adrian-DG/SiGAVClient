import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenominacionesEditDialogComponent } from './denominaciones-edit-dialog.component';

describe('DenominacionesEditDialogComponent', () => {
  let component: DenominacionesEditDialogComponent;
  let fixture: ComponentFixture<DenominacionesEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenominacionesEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenominacionesEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
