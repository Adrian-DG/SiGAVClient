import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamycChartComponent } from './dinamyc-chart.component';

describe('DinamycChartComponent', () => {
  let component: DinamycChartComponent;
  let fixture: ComponentFixture<DinamycChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DinamycChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinamycChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
