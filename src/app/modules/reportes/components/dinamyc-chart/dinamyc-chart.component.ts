import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import {
	IChartDataSet,
	IChartDataSetValues,
} from '../../interfaces/ichart-data-set';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-dinamyc-chart',
	templateUrl: './dinamyc-chart.component.html',
	styleUrls: ['./dinamyc-chart.component.scss'],
})
export class DinamycChartComponent {
	chartLegend: boolean = true;
	@Input() chartType!: ChartType;
	@Input() chartData!: Observable<ChartData | null>;
	@Input() chartOptions!: Observable<any>;
	constructor() {}
}
