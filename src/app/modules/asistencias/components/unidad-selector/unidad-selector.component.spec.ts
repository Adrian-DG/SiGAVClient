import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadSelectorComponent } from './unidad-selector.component';

describe('UnidadSelectorComponent', () => {
  let component: UnidadSelectorComponent;
  let fixture: ComponentFixture<UnidadSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
