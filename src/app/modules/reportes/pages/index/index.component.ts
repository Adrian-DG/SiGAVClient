import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartType, ChartData, ChartOptions, ChartDataset } from 'chart.js';
import { ReportsService } from '../../services/reports.service';
import { IStatsFilterDTO } from '../../interfaces/istats-filter-dto';
import { IReportData } from '../../interfaces/ireport-data';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, AfterViewInit {
	private readonly baseChartOptions: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					color: '#f0f0f0',
				},
			},
			x: {
				grid: {
					color: '#f0f0f0',
				},
			},
		},
		plugins: {
			title: {
				display: false,
				align: 'center',
				color: '#333',
				font: {
					size: 16,
					weight: 'bold',
				},
			},
			legend: {
				display: true,
				position: 'bottom',
				labels: {
					color: '#555',
					padding: 15,
					usePointStyle: true,
					font: {
						size: 12,
					},
				},
			},
			tooltip: {
				backgroundColor: 'rgba(0,0,0,0.8)',
				titleColor: '#fff',
				bodyColor: '#fff',
				cornerRadius: 6,
			},
		},
		animation: {
			duration: 1000,
			easing: 'easeInOutQuart',
		},
	};

	private readonly barChartOptions: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					color: '#f0f0f0',
				},
				ticks: {
					color: '#666',
				},
			},
			x: {
				grid: {
					display: false,
				},
				ticks: {
					color: '#666',
					maxRotation: 45,
				},
			},
		},
		plugins: {
			title: {
				display: false,
				align: 'center',
				color: '#333',
				font: {
					size: 16,
					weight: 'bold',
				},
			},
			legend: {
				display: false,
			},
			tooltip: {
				backgroundColor: 'rgba(0,0,0,0.8)',
				titleColor: '#fff',
				bodyColor: '#fff',
				cornerRadius: 6,
			},
		},
		animation: {
			duration: 1000,
			easing: 'easeInOutQuart',
		},
	};

	private readonly horizontalBarChartOptions: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: 'y',
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					display: false,
				},
				ticks: {
					color: '#666',
				},
			},
			x: {
				beginAtZero: true,
				grid: {
					color: '#f0f0f0',
				},
				ticks: {
					color: '#666',
				},
			},
		},
		plugins: {
			title: {
				display: false,
				align: 'center',
				color: '#333',
				font: {
					size: 16,
					weight: 'bold',
				},
			},
			legend: {
				display: false,
			},
			tooltip: {
				backgroundColor: 'rgba(0,0,0,0.8)',
				titleColor: '#fff',
				bodyColor: '#fff',
				cornerRadius: 6,
			},
		},
		animation: {
			duration: 1000,
			easing: 'easeInOutQuart',
		},
	};

	private readonly chartColors = [
		'#3498db',
		'#e74c3c',
		'#2ecc71',
		'#f39c12',
		'#9b59b6',
		'#1abc9c',
		'#e67e22',
		'#34495e',
		'#95a5a6',
		'#d35400',
		'#8e44ad',
		'#27ae60',
		'#2980b9',
		'#c0392b',
		'#16a085',
	];

	public isLoading = false;
	public hasError = false;
	public errorMessage = '';

	// Region
	private regionChartOptionsSource = new BehaviorSubject<ChartOptions | null>(
		null,
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
		null,
	);

	public provinciaChartData$ = this.provinciaChartDataSource.asObservable();

	// Tramo
	private tramosChartOptionsSource = new BehaviorSubject<ChartOptions | null>(
		null,
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
		null,
	);
	public tipoVehiculoChartData$ =
		this.tipoVehiculoChartDataSource.asObservable();

	// Estatus
	private estatusChartOptionsSource =
		new BehaviorSubject<ChartOptions | null>(null);
	public estatusChartOptions$ = this.estatusChartOptionsSource.asObservable();
	private estatusChartDataSource = new BehaviorSubject<ChartData | null>(
		null,
	);
	public estatusChartData$ = this.estatusChartDataSource.asObservable();

	// Reportado Por
	private reportadoPorChartOptionsSource =
		new BehaviorSubject<ChartOptions | null>(null);
	public reportadoPorChartOptions$ =
		this.reportadoPorChartOptionsSource.asObservable();

	private reportadoPorChartDataSource = new BehaviorSubject<ChartData | null>(
		null,
	);
	public reportadoPorChartData$ =
		this.reportadoPorChartDataSource.asObservable();

	// tipo categoria assistencias
	private tipoCategoriaChartOptionsSource =
		new BehaviorSubject<ChartOptions | null>(null);
	public tipoCategoriaChartOptions$ =
		this.tipoCategoriaChartOptionsSource.asObservable();
	private tipoCategoriaChartDataSource =
		new BehaviorSubject<ChartData | null>(null);
	public tipoCategoriaChartData$ =
		this.tipoCategoriaChartDataSource.asObservable();

	// Tipo Asistencia
	private tipoAsistenciaChartOptionsSource =
		new BehaviorSubject<ChartOptions | null>(null);
	public tipoAsistenciaChartOptions$ =
		this.tipoAsistenciaChartOptionsSource.asObservable();
	private tipoAsistenciaChartDataSource =
		new BehaviorSubject<ChartData | null>(null);
	public tipoAsistenciaChartData$ =
		this.tipoAsistenciaChartDataSource.asObservable();

	// Tipo Unidad
	private tipoUnidadChartOptionsSource =
		new BehaviorSubject<ChartOptions | null>(null);
	public tipoUnidadChartOptions$ =
		this.tipoUnidadChartOptionsSource.asObservable();
	private tipoUnidadChartDataSource = new BehaviorSubject<ChartData | null>(
		null,
	);
	public tipoUnidadChartData$ = this.tipoUnidadChartDataSource.asObservable();

	filters: IStatsFilterDTO = {
		estatus: 0,
		initial: new Date(),
		final: new Date(),
	};

	constructor(private _reportes: ReportsService) {}

	ngOnInit(): void {
		this.onFilterChange();
	}

	ngAfterViewInit(): void {}

	onFilterChange(): void {
		this.hasError = false;
		this.errorMessage = '';
		this.getStadisticasRegiones();
		this.getStadisticasTramos();
		this.getStadisticasProvincias();
		this.getStadisticasTipoVehiculo();
		this.getStadisticasEstatus();
		this.getStadisticasReportadoPor();
		this.getStadisticasTipoCategoria();
		this.getStadisticasTipoAsistencia();
		this.getStadisticasTipoUnidad();
	}

	getStadisticasRegiones(): void {
		this.isLoading = true;
		this._reportes.getStatsRegiones(this.filters).subscribe({
			next: (response: IReportData[]) => {
				this.regionChartOptionsSource.next({
					...this.barChartOptions,
					plugins: {
						...this.barChartOptions.plugins,
						title: {
							...this.barChartOptions.plugins?.title,
							text: 'Asistencias por Región',
						},
					},
				});
				const xValues = response.map((x) => x.nombre);
				const yValues = response.map((x) => x.value);
				const colors = this.chartColors.slice(0, response.length);

				this.regionChartDataSource.next({
					labels: xValues,
					datasets: [
						{
							label: 'Asistencias',
							data: yValues,
							backgroundColor: colors,
							borderColor: colors,
							borderWidth: 1,
							hoverBackgroundColor: colors.map(
								(color) => color + 'CC',
							),
							borderRadius: 4,
						},
					],
				});
				this.isLoading = false;
			},
			error: (error) => {
				this.hasError = true;
				this.errorMessage = 'Error loading region statistics';
				this.isLoading = false;
				console.error('Error fetching region stats:', error);
			},
		});
	}

	getStadisticasProvincias(): void {
		this._reportes.getStatsProvincia(this.filters).subscribe({
			next: (response: IReportData[]) => {
				this.provinciasChartOptionsSource.next({
					...this.baseChartOptions,
					plugins: {
						...this.baseChartOptions.plugins,
						title: {
							...this.baseChartOptions.plugins?.title,
							text: 'Asistencias por Provincia',
						},
					},
				});
				const xValues: string[] = response.map((x) => x.nombre);
				const yValues: number[] = response.map((x) => x.value);
				const colors = this.chartColors.slice(0, response.length);

				this.provinciaChartDataSource.next({
					labels: xValues,
					datasets: [
						{
							data: yValues,
							backgroundColor: colors,
							borderColor: colors.map((color) => color + '80'),
							borderWidth: 2,
							hoverBorderWidth: 3,
							hoverBorderColor: '#333',
						},
					],
				});
			},
			error: (error) => {
				this.hasError = true;
				this.errorMessage = 'Error loading province statistics';
				console.error('Error fetching province stats:', error);
			},
		});
	}

	getStadisticasTramos(): void {
		this._reportes.getStatsTramo(this.filters).subscribe({
			next: (response: IReportData[]) => {
				this.tramosChartOptionsSource.next({
					...this.horizontalBarChartOptions,
					plugins: {
						...this.horizontalBarChartOptions.plugins,
						title: {
							...this.horizontalBarChartOptions.plugins?.title,
							text: 'Asistencias por Tramo',
						},
					},
				});
				const xValues: string[] = response.map((x) => x.nombre);
				const yValues: number[] = response.map((x) => x.value);
				const colors = this.chartColors.slice(0, response.length);

				this.tramoChartDataSource.next({
					labels: xValues,
					datasets: [
						{
							label: 'Asistencias',
							data: yValues,
							backgroundColor: colors,
							borderColor: colors,
							borderWidth: 1,
							hoverBackgroundColor: colors.map(
								(color) => color + 'CC',
							),
							borderRadius: 4,
						},
					],
				});
			},
			error: (error) => {
				this.hasError = true;
				this.errorMessage = 'Error loading section statistics';
				console.error('Error fetching section stats:', error);
			},
		});
	}

	getStadisticasTipoVehiculo(): void {
		this._reportes.getStatsTipoVehiculo(this.filters).subscribe({
			next: (response: IReportData[]) => {
				this.tipoVehiculosChartOptionsSource.next({
					...this.baseChartOptions,
					plugins: {
						...this.baseChartOptions.plugins,
						title: {
							...this.baseChartOptions.plugins?.title,
							text: 'Asistencias por Tipo de Vehículo',
						},
					},
				});
				const xValues = response.map((x) => x.nombre);
				const yValues = response.map((x) => x.value);
				const colors = this.chartColors.slice(0, response.length);

				this.tipoVehiculoChartDataSource.next({
					labels: xValues,
					datasets: [
						{
							data: yValues,
							backgroundColor: colors,
							borderColor: colors.map((color) => color + '80'),
							borderWidth: 2,
							hoverBorderWidth: 3,
							hoverBorderColor: '#333',
						},
					],
				});
			},
			error: (error) => {
				this.hasError = true;
				this.errorMessage = 'Error loading vehicle type statistics';
				console.error('Error fetching vehicle type stats:', error);
			},
		});
	}

	getStadisticasEstatus(): void {
		this._reportes.getStatsByEstatus(this.filters).subscribe({
			next: (response: IReportData[]) => {
				this.estatusChartOptionsSource.next({
					...this.baseChartOptions,
					plugins: {
						...this.baseChartOptions.plugins,
						title: {
							...this.baseChartOptions.plugins?.title,
							text: 'Asistencias por Estatus',
						},
					},
				});
				const xValues = response.map((x) => x.nombre);
				const yValues = response.map((x) => x.value);
				const colors = this.chartColors.slice(0, response.length);

				this.estatusChartDataSource.next({
					labels: xValues,
					datasets: [
						{
							data: yValues,
							backgroundColor: colors,
							borderColor: colors.map((color) => color + '80'),
							borderWidth: 2,
							hoverBorderWidth: 3,
							hoverBorderColor: '#333',
						},
					],
				});
			},
			error: (error) => {
				this.hasError = true;
				this.errorMessage = 'Error loading status statistics';
				console.error('Error fetching status stats:', error);
			},
		});
	}

	getStadisticasReportadoPor(): void {
		this._reportes.getStatsReportadoPor(this.filters).subscribe({
			next: (response: IReportData[]) => {
				this.reportadoPorChartOptionsSource.next({
					...this.barChartOptions,
					plugins: {
						...this.barChartOptions.plugins,
						title: {
							...this.barChartOptions.plugins?.title,
							text: 'Asistencias por Reportado Por',
						},
					},
				});
				const xValues = response.map((x) => x.nombre);
				const yValues = response.map((x) => x.value);
				const colors = this.chartColors.slice(0, response.length);

				this.reportadoPorChartDataSource.next({
					labels: xValues,
					datasets: [
						{
							label: 'Asistencias',
							data: yValues,
							backgroundColor: colors,
							borderColor: colors,
							borderWidth: 1,
							hoverBackgroundColor: colors.map(
								(color) => color + 'CC',
							),
							borderRadius: 4,
						},
					],
				});
			},
			error: (error) => {
				this.hasError = true;
				this.errorMessage = 'Error loading reported by statistics';
				console.error('Error fetching reported by stats:', error);
			},
		});
	}

	getStadisticasTipoCategoria(): void {
		this._reportes.getStatsTipoCategoria(this.filters).subscribe({
			next: (response: IReportData[]) => {
				this.tipoCategoriaChartOptionsSource.next({
					...this.baseChartOptions,
					plugins: {
						...this.baseChartOptions.plugins,
						title: {
							...this.baseChartOptions.plugins?.title,
							text: 'Asistencias por Tipo de Categoría',
						},
					},
				});
				const xValues = response.map((x) => x.nombre);
				const yValues = response.map((x) => x.value);
				const colors = this.chartColors.slice(0, response.length);
				this.tipoCategoriaChartDataSource.next({
					labels: xValues,
					datasets: [
						{
							data: yValues,
							backgroundColor: colors,
							borderColor: colors.map((color) => color + '80'),
							borderWidth: 2,
							hoverBorderWidth: 3,
							hoverBorderColor: '#333',
						},
					],
				});
			},
			error: (error) => {
				this.hasError = true;
				this.errorMessage = 'Error loading category type statistics';
				console.error('Error fetching category type stats:', error);
			},
		});
	}

	getStadisticasTipoAsistencia(): void {
		this._reportes.getStatsTipoAsistencia(this.filters).subscribe({
			next: (response: IReportData[]) => {
				// Implementation for Tipo Asistencia chart data and options
				this.tipoAsistenciaChartOptionsSource.next({
					...this.horizontalBarChartOptions,
					plugins: {
						...this.horizontalBarChartOptions.plugins,
						title: {
							...this.horizontalBarChartOptions.plugins?.title,
							text: 'Asistencias por Tipo de Asistencia',
						},
					},
				});
				const xValues = response.map((x) => x.nombre);
				const yValues = response.map((x) => x.value);
				const colors = this.chartColors.slice(0, response.length);

				this.tipoAsistenciaChartDataSource.next({
					labels: xValues,
					datasets: [
						{
							label: 'Asistencias',
							data: yValues,
							backgroundColor: colors,
							borderColor: colors,
							borderWidth: 1,
							hoverBackgroundColor: colors.map(
								(color) => color + 'CC',
							),
							borderRadius: 4,
						},
					],
				});
			},
			error: (error) => {
				this.hasError = true;
				this.errorMessage = 'Error loading assistance type statistics';
				console.error('Error fetching assistance type stats:', error);
			},
		});
	}

	getStadisticasTipoUnidad(): void {
		this._reportes.getStatsTipoUnidad(this.filters).subscribe({
			next: (response: IReportData[]) => {
				// Implementation for Tipo Unidad chart data and options
				this.tipoUnidadChartOptionsSource.next({
					...this.barChartOptions,
					plugins: {
						...this.barChartOptions.plugins,
						title: {
							...this.barChartOptions.plugins?.title,
							text: 'Asistencias por Tipo de Unidad',
						},
					},
				});
				const xValues = response.map((x) => x.nombre);
				const yValues = response.map((x) => x.value);
				const colors = this.chartColors.slice(0, response.length);

				this.tipoUnidadChartDataSource.next({
					labels: xValues,
					datasets: [
						{
							label: 'Asistencias',
							data: yValues,
							backgroundColor: colors,
							borderColor: colors,
							borderWidth: 1,
							hoverBackgroundColor: colors.map(
								(color) => color + 'CC',
							),
							borderRadius: 4,
						},
					],
				});
			},
			error: (error) => {
				this.hasError = true;
				this.errorMessage = 'Error loading unit type statistics';
				console.error('Error fetching unit type stats:', error);
			},
		});
	}
}
