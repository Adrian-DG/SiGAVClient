import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartType, ChartData, ChartOptions, ChartDataset } from 'chart.js';
import { ReportsService } from '../../services/reports.service';
import { IStatsFilterDTO } from '../../interfaces/istats-filter-dto';
import { IReportData } from '../../interfaces/ireport-data';
import {
	IChartDataSet,
	IChartDataSetValues,
} from '../../interfaces/ichart-data-set';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, AfterViewInit {
	private readonly chartOptions: ChartOptions = {
		responsive: true,
		scales: {
			y: { beginAtZero: true },
		},
		borderColor: '#838584',
		plugins: {
			title: {
				display: true,
				align: 'center',
				color: '#838584',
				fullSize: true,
				position: 'top',
			},
			legend: {
				display: true,
				align: 'start',
				fullSize: true,
				position: 'bottom',
			},
		},
	};

	// Region
	private regionChartOptionsSource = new BehaviorSubject<ChartOptions | null>(
		null
	);
	public regionChartOptions$ = this.regionChartOptionsSource.asObservable();
	private regionChartDataSource = new BehaviorSubject<ChartData | null>(null);
	public regionChartData$ = this.regionChartDataSource.asObservable();

	// Provincias
	private provinciasChartOptionsSource =
		new BehaviorSubject<ChartOptions | null>(null);
	public provinciasChartOptions$ =
		this.provinciasChartOptionsSource.asObservable();
	private provinciaChartDataSource = new BehaviorSubject<ChartData | null>(
		null
	);
	public provinciaChartData$ = this.provinciaChartDataSource.asObservable();

	// Tramo
	private tramosChartOptionsSource = new BehaviorSubject<ChartOptions | null>(
		null
	);
	public tramosChartOptions$ = this.tramosChartOptionsSource.asObservable();
	private tramoChartDataSource = new BehaviorSubject<ChartData | null>(null);
	public tramoChartData$ = this.tramoChartDataSource.asObservable();

	// Tipo Vehiculos
	private tipoVehiculosChartOptionsSource =
		new BehaviorSubject<ChartOptions | null>(null);
	public tipoVehiculosChartOptions$ =
		this.tipoVehiculosChartOptionsSource.asObservable();
	private tipoVehiculoChartDataSource = new BehaviorSubject<ChartData | null>(
		null
	);
	public tipoVehiculoChartData$ =
		this.tipoVehiculoChartDataSource.asObservable();

	filters: IStatsFilterDTO = {
		estatus: 3,
		initial: new Date(),
		final: new Date(),
	};

	constructor(private _reportes: ReportsService) {}

	ngOnInit(): void {
		this.onFilterChange();
	}

	ngAfterViewInit(): void {}

	onFilterChange(): void {
		this.getStadisticasRegiones();
		this.getStadisticasTramos();
		this.getStadisticasProvincias();
		this.getStadisticasTipoVehiculo();
	}

	getStadisticasRegiones(): void {
		this._reportes
			.getStatsRegiones(this.filters)
			.subscribe((response: IReportData[]) => {
				this.regionChartOptionsSource.next({
					plugins: { title: { text: 'Asistencias por Región' } },
					...this.chartOptions,
				});
				const xValues = response.map((x) => x.nombre);
				const yValues = response.map((x) => x.value);
				this.regionChartDataSource.next({
					datasets: [{ data: yValues }],
					labels: xValues,
				});
			});
	}

	getStadisticasProvincias(): void {
		this._reportes
			.getStatsProvincia(this.filters)
			.subscribe((response: IReportData[]) => {
				this.provinciasChartOptionsSource.next({
					plugins: { title: { text: 'Asistencias por Provincia' } },
					...this.chartOptions,
				});
				const xValues: string[] = response.map((x) => x.nombre);
				const yValues: number[] = response.map((x) => x.value);

				this.provinciaChartDataSource.next({
					labels: xValues,
					datasets: [{ data: yValues }],
				});
			});
	}

	getStadisticasTramos(): void {
		this._reportes
			.getStatsTramo(this.filters)
			.subscribe((response: IReportData[]) => {
				this.tramosChartOptionsSource.next({
					plugins: { title: { text: 'Asistencias por Tramo' } },
					...this.chartOptions,
				});
				const xValues: string[] = response.map((x) => x.nombre);
				const yValues: number[] = response.map((x) => x.value);
				this.tramoChartDataSource.next({
					labels: xValues,
					datasets: [{ data: yValues }],
				});
			});
	}

	getStadisticasTipoVehiculo(): void {
		this._reportes
			.getStatsTipoVehiculo(this.filters)
			.subscribe((response: IReportData[]) => {
				this.tipoVehiculosChartOptionsSource.next({
					plugins: {
						title: {
							text: 'Asistencias por Tipo de Vehículo',
							display: true,
						},
					},
					...this.chartOptions,
				});
				const xValues = response.map((x) => x.nombre);
				const yValues = response.map((x) => x.value);
				this.tipoVehiculoChartDataSource.next({
					datasets: [{ data: yValues }],
					labels: xValues,
				});
			});
	}
}
