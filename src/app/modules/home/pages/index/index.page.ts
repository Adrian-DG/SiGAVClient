import {
	ChangeDetectorRef,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReportsService } from 'src/app/modules/reportes/services/reports.service';
import { ChartType, ChartData, ChartOptions, ChartDataset } from 'chart.js';
import { Router } from '@angular/router';

@Component({
	selector: 'app-index',
	templateUrl: './index.page.html',
	styleUrls: ['./index.page.css'],
})
export class IndexPage implements OnInit {
	totalAsistenciasSource = new BehaviorSubject<number>(0);
	totalAsistencias$ = this.totalAsistenciasSource.asObservable();

	tipoAsistenciaChartDataSource = new BehaviorSubject<any>(null);
	tipoAsistenciaChartData$ =
		this.tipoAsistenciaChartDataSource.asObservable();

	tipoAsistenciaChartOptionsSource = new BehaviorSubject<any>({
		responsive: true,
		maintainAspectRatio: false,
		resizeDelay: 200,
		plugins: {
			legend: {
				position: 'bottom',
				labels: {
					boxWidth: 12,
					padding: 15,
					usePointStyle: true,
					font: {
						size: 12,
					},
				},
			},
			title: {
				display: true,
				text: 'Asistencias Por Tipo de Asistencia',
				font: {
					size: 16,
					weight: 'bold',
				},
				padding: {
					bottom: 20,
				},
			},
			tooltip: {
				enabled: true,
				backgroundColor: 'rgba(0,0,0,0.8)',
				titleFont: {
					size: 14,
				},
				bodyFont: {
					size: 12,
				},
			},
		},
		layout: {
			padding: {
				top: 10,
				bottom: 10,
				left: 10,
				right: 10,
			},
		},
	});
	tipoAsistenciaChartOptions$ =
		this.tipoAsistenciaChartOptionsSource.asObservable();

	tipoCategoriaChartDataSource = new BehaviorSubject<any>(null);
	tipoCategoriaChartData$ = this.tipoCategoriaChartDataSource.asObservable();

	tipoCategoriaChartOptionsSource = new BehaviorSubject<any>({
		responsive: true,
		maintainAspectRatio: false,
		resizeDelay: 200,
		plugins: {
			legend: {
				position: 'bottom',
				labels: {
					boxWidth: 12,
					padding: 15,
					usePointStyle: true,
					font: {
						size: 12,
					},
				},
			},
			title: {
				display: true,
				text: 'Asistencias Por Categoria',
				font: {
					size: 16,
					weight: 'bold',
				},
				padding: {
					bottom: 20,
				},
			},
			tooltip: {
				enabled: true,
				backgroundColor: 'rgba(0,0,0,0.8)',
				titleFont: {
					size: 14,
				},
				bodyFont: {
					size: 12,
				},
			},
		},
		layout: {
			padding: {
				top: 10,
				bottom: 10,
				left: 10,
				right: 10,
			},
		},
	});
	tipoCategoriaChartOptions$ =
		this.tipoCategoriaChartOptionsSource.asObservable();

	tipoAsistenciaHorizontalChartOptionsSource = new BehaviorSubject<any>({
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
					font: {
						size: 11,
					},
				},
			},
			x: {
				beginAtZero: true,
				grid: {
					color: '#f0f0f0',
				},
				ticks: {
					color: '#666',
					font: {
						size: 11,
					},
				},
			},
		},
		plugins: {
			title: {
				display: true,
				text: 'Asistencias Por Tipo de Asistencia',
				align: 'center',
				color: '#333',
				font: {
					size: 16,
					weight: 'bold',
				},
				padding: {
					bottom: 20,
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
				titleFont: {
					size: 14,
				},
				bodyFont: {
					size: 12,
				},
			},
		},
		animation: {
			duration: 1000,
			easing: 'easeInOutQuart',
		},
		layout: {
			padding: {
				top: 10,
				bottom: 10,
				left: 10,
				right: 10,
			},
		},
	});
	tipoAsistenciaHorizontalChartOptions$ =
		this.tipoAsistenciaHorizontalChartOptionsSource.asObservable();

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

	constructor(
		private _reportsService: ReportsService,
		private _cdr: ChangeDetectorRef,
		private $router: Router,
	) {}

	ngOnInit(): void {
		this.loadReportData();
	}

	loadReportData(): void {
		// Load total asistencias
		this._reportsService.getTotalAsistencias().subscribe({
			next: (total) => {
				console.log('Total asistencias:', total);
				this.totalAsistenciasSource.next(total);
				this._cdr.detectChanges();
			},
			error: (error) => {
				console.error('Error loading total asistencias:', error);
			},
		});

		// Load tipo asistencia chart data
		this._reportsService.getStatsTipoAsistencia(null).subscribe({
			next: (data) => {
				console.log('Tipo asistencia data:', data);
				if (data && data.length > 0) {
					const chartData = {
						labels: data.map((d) => d.nombre),
						datasets: [
							{
								label: 'Cantidad',
								data: data.map((d) => d.value),
								backgroundColor: [
									'#4F46E5',
									'#059669',
									'#DC2626',
									'#D97706',
									'#7C3AED',
									'#0891B2',
								],
								borderColor: [
									'#4338CA',
									'#047857',
									'#B91C1C',
									'#B45309',
									'#6D28D9',
									'#0E7490',
								],
								borderWidth: 1,
								borderRadius: 4,
								barThickness: 10,
							},
						],
					};
					console.log('Tipo asistencia chart data:', chartData);
					this.tipoAsistenciaChartDataSource.next(chartData);
					this._cdr.detectChanges();
				} else {
					console.warn('No data received for tipo asistencia');
				}
			},
			error: (error) => {
				console.error('Error loading tipo asistencia data:', error);
			},
		});

		// Load tipo categoria chart data
		this._reportsService.getStatsTipoCategoria(null).subscribe({
			next: (data) => {
				console.log('Tipo categoria data:', data);
				if (data && data.length > 0) {
					const chartData = {
						labels: data.map((d) => d.nombre),
						datasets: [
							{
								data: data.map((d) => d.value),
								backgroundColor: [
									'#FF6384',
									'#36A2EB',
									'#FFCE56',
									'#4BC0C0',
									'#9966FF',
								],
							},
						],
					};
					console.log('Tipo categoria chart data:', chartData);
					this.tipoCategoriaChartDataSource.next(chartData);
					this._cdr.detectChanges();
				} else {
					console.warn('No data received for tipo categoria');
				}
			},
			error: (error) => {
				console.error('Error loading tipo categoria data:', error);
			},
		});
	}

	navigateToAsistenciasList(): void {
		this.$router.navigateByUrl('/asistencias/listado');
	}

	navigateToEstadisticas(): void {
		this.$router.navigateByUrl('/reportes');
	}
}
