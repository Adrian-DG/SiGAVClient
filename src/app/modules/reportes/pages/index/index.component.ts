import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { ReportsService } from '../../services/reports.service';
import { IStatsFilterDTO } from '../../interfaces/istats-filter-dto';
import { IReportData } from '../../interfaces/ireport-data';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements AfterViewInit {
	filters: IStatsFilterDTO = {
		estatus: 3,
		initial: new Date('2023-05-01'),
		final: new Date(),
	};

	constructor(private _reportes: ReportsService) {}

	public barChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true,
	};

	// Bar chart regiones

	public barChartLabels!: string[];
	public barChartType: ChartType = 'bar';
	public barChartLegend: boolean = true;
	public barChartData!: { label: string; data: number[] }[];

	ngAfterViewInit(): void {
		this.getStadisticasRegiones();
	}

	onFilterChange(): void {
		this.getStadisticasRegiones();
	}

	getStadisticasRegiones(): void {
		this._reportes
			.getStatsRegiones(this.filters)
			.subscribe((response: IReportData[]) => {
				this.barChartLabels = response.map((x) => x.nombre);
				this.barChartData = response.map((x) => {
					return { data: [x.value], label: x.nombre };
				});
			});
	}
}
