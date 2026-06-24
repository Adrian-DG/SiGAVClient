import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { IAsistenciaReportField } from 'src/app/modules/asistencias/DTO/iasistencia-report-field';
import { AsistenciasService } from 'src/app/modules/asistencias/services/asistencias.service';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
	filters: IPaginationFilters = {
		page: 1,
		size: 10,
		searchTerm: '',
		status: true,
	};

	parameters = {
		noAsistencia: '',
		identificacion: '',
		nombre: '',
		apellido: '',
		telefono: '',
		marca: '',
		modelo: '',
		tipo: '',
		color: '',
		placa: '',
		denominacion: '',
		ficha: '',
		tramo: '',
		agente: '',
	};

	displayedColumns: string[] = [
		'id',
		'ciudadano',
		'vehiculo',
		'patrulla',
		'acciones',
	];

	dataSource = new MatTableDataSource<any>();
	timeOptions = this.buildTimeOptions();

	reportData: IAsistenciaReportField = {
		noAsistencia: 0,
		identificacion: '',
		nombre: '',
		apellido: '',
		telefono: '',
		cantidadPersonas: '',
		ubicacion: '',
		provincia: '',
		municipio: '',
		tramo: '',
		marca: '',
		modelo: '',
		tipo: '',
		ano: 0,
		color: '',
		placa: '',
		tipoAsistencia: '',
		denominacion: '',
		ficha: '',
		agente: '',
		asistenciaEnCampo: '',
		fechaCreacion: '',
		horaDespacho: '',
		horaLlegada: '',
		horaSalida: '',
		observaciones: '',
		usuario: '',
		estatus: true,
	};

	constructor(private _asistencias: AsistenciasService) {}

	get hasValidParameter(): boolean {
		return Object.values(this.parameters).some((value) => value !== '');
	}

	search(): void {
		this._asistencias
			.filtrarAsistenciasAvanzada(this.filters, this.parameters)
			.subscribe((response) => {
				this.dataSource.data = response;
			});
	}

	generateReport(id: number): void {
		this._asistencias
			.generarReporteAsistenciaPDF(id)
			.subscribe((response: HttpResponse<Blob>) => {
				if (response.body) {
					const blob = new Blob([response.body], {
						type: 'application/pdf',
					});
					const url = window.URL.createObjectURL(blob);
					const iframe = document.getElementById(
						'pdfViewer',
					) as HTMLIFrameElement;
					if (iframe) {
						iframe.setAttribute('src', url);
					}
				}
			});
	}

	get fechaCreacionDate(): Date | null {
		if (!this.reportData.fechaCreacion) {
			return null;
		}

		const parsedDate = new Date(this.reportData.fechaCreacion);
		return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
	}

	onFechaCreacionChange(event: MatDatepickerInputEvent<Date>): void {
		this.reportData.fechaCreacion = event.value
			? event.value.toISOString()
			: '';
	}

	get hasValidReportData(): boolean {
		return (
			Object.values(this.reportData).some(
				(value) => value !== '' && value !== true && value !== 0,
			) || this.reportData.noAsistencia !== 0
		);
	}

	submitReport(): void {
		if (!this.hasValidReportData) {
			alert('Por favor ingrese al menos un campo del reporte');
			return;
		}

		this._asistencias
			.generatePdfReportFromInput(this.reportData)
			.subscribe((response: HttpResponse<Blob>) => {
				if (response.body) {
					const blob = new Blob([response.body], {
						type: 'application/pdf',
					});
					const url = window.URL.createObjectURL(blob);
					const iframe = document.getElementById(
						'pdfViewer',
					) as HTMLIFrameElement;
					if (iframe) {
						iframe.setAttribute('src', url);
					}
				}
			});
		this.resetReportData();
	}

	resetReportData(): void {
		this.reportData = {
			noAsistencia: 0,
			identificacion: '',
			nombre: '',
			apellido: '',
			telefono: '',
			cantidadPersonas: '',
			ubicacion: '',
			provincia: '',
			municipio: '',
			tramo: '',
			marca: '',
			modelo: '',
			tipo: '',
			ano: 0,
			color: '',
			placa: '',
			tipoAsistencia: '',
			denominacion: '',
			ficha: '',
			agente: '',
			asistenciaEnCampo: '',
			fechaCreacion: '',
			horaDespacho: '',
			horaLlegada: '',
			horaSalida: '',
			observaciones: '',
			usuario: '',
			estatus: true,
		};
	}

	private buildTimeOptions(): string[] {
		const options: string[] = [];

		for (let hour = 0; hour < 24; hour++) {
			for (let minute = 0; minute < 60; minute += 15) {
				const hh = String(hour).padStart(2, '0');
				const mm = String(minute).padStart(2, '0');
				options.push(`${hh}:${mm}`);
			}
		}

		return options;
	}
}
