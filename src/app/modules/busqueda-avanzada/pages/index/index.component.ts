import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
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
						'pdfViewer'
					) as HTMLIFrameElement;
					if (iframe) {
						iframe.setAttribute('src', url);
					}
				}
			});
	}
}
