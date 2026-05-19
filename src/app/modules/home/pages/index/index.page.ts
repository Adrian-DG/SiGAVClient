import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReportsService } from 'src/app/modules/reportes/services/reports.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';

interface ChartCardProperties {
	type: ChartType;
	title: string;
	subtitle: string;
	icon: string;
	showLegend: boolean;
	styles: {
		header: { [key: string]: string };
		icon: { [key: string]: string };
		title: { [key: string]: string };
		subtitle: { [key: string]: string };
	};
	chartOptions: ChartOptions;
}

@Component({
	selector: 'app-index',
	templateUrl: './index.page.html',
	styleUrls: ['./index.page.css'],
})
export class IndexPage implements OnInit {
	totalAsistenciasSource = new BehaviorSubject<number>(0);
	totalAsistencias$ = this.totalAsistenciasSource.asObservable();
	chartCards = {
		tipoAsistencia: this.getChartProperties(
			'pie',
			'Distribución por Tipo de Asistencia',
			'Asistencias agrupadas por tipo',
			'medical_services',
		),
		tipoUnidad: this.getChartProperties(
			'doughnut',
			'Asistencias por Tipo de Unidad',
			'Asistencias agrupadas por tipo de unidad',
			'local_shipping',
		),
	};

	tipoAsistenciaChartDataSource = new BehaviorSubject<any>(null);
	tipoAsistenciaChartData$ =
		this.tipoAsistenciaChartDataSource.asObservable();

	tipoAsistenciaChartOptionsSource = new BehaviorSubject<any>(
		this.chartCards.tipoAsistencia.chartOptions,
	);
	tipoAsistenciaChartOptions$ =
		this.tipoAsistenciaChartOptionsSource.asObservable();

	tipoUnidadChartDataSource = new BehaviorSubject<any>(null);
	tipoUnidadChartData$ = this.tipoUnidadChartDataSource.asObservable();

	tipoUnidadChartOptionsSource = new BehaviorSubject<any>(
		this.chartCards.tipoUnidad.chartOptions,
	);
	tipoUnidadChartOptions$ = this.tipoUnidadChartOptionsSource.asObservable();

	constructor(
		private _reportsService: ReportsService,
		private _cdr: ChangeDetectorRef,
		private $router: Router,
	) {}

	ngOnInit(): void {
		this.loadReportData();
	}

	getChartProperties(
		type: ChartType,
		title: string,
		subtitle: string,
		icon: string,
	): ChartCardProperties {
		const isPieChart = type === 'pie' || type === 'doughnut';
		const isDoughnutChart = type === 'doughnut';
		const isBarChart = type === 'bar';

		return {
			type,
			title,
			subtitle,
			icon,
			showLegend: isPieChart,
			styles: {
				header: {
					background:
						'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
				},
				icon: {
					color: '#667eea',
					fontSize: '24px',
					width: '24px',
					height: '24px',
				},
				title: {
					fontSize: '1.3rem',
					fontWeight: '600',
					color: '#2c3e50',
					margin: '0',
				},
				subtitle: {
					fontSize: '0.85rem',
					fontWeight: '500',
					color: '#7f8c8d',
					margin: '0.25rem 0 0 0',
				},
			},
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				resizeDelay: 200,
				scales: isBarChart
					? {
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
						}
					: undefined,
				plugins: {
					legend: {
						display: isPieChart,
						position: isPieChart ? 'right' : 'bottom',
						align: 'center',
						labels: {
							boxWidth: 12,
							padding: 12,
							usePointStyle: true,
							font: {
								size: 12,
							},
						},
					},
					title: {
						display: false,
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
						top: 6,
						bottom: 6,
						left: 6,
						right: 6,
					},
				},
			},
		};
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
								radius: '92%',
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

		// Load tipo unidad chart data
		this._reportsService.getStatsTipoUnidad(null).subscribe({
			next: (data) => {
				console.log('Tipo unidad data:', data);
				if (data && data.length > 0) {
					const chartData = {
						labels: data.map((d) => d.nombre),
						datasets: [
							{
								data: data.map((d) => d.value),
								backgroundColor: [
									'#0EA5E9',
									'#10B981',
									'#F59E0B',
									'#EF4444',
									'#8B5CF6',
									'#14B8A6',
								],
								borderColor: [
									'#0284C7',
									'#059669',
									'#D97706',
									'#DC2626',
									'#7C3AED',
									'#0F766E',
								],
								borderWidth: 1,
								radius: '92%',
								cutout: '58%',
							},
						],
					};
					console.log('Tipo unidad chart data:', chartData);
					this.tipoUnidadChartDataSource.next(chartData);
					this._cdr.detectChanges();
				} else {
					console.warn('No data received for tipo unidad');
				}
			},
			error: (error) => {
				console.error('Error loading tipo unidad data:', error);
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
