import { Component } from '@angular/core';
import { IDateFilter } from '../../DTO/idate-filter';
import { AsistenciasService } from '../../services/asistencias.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-reporte-estadistico-dialog',
	templateUrl: './reporte-estadistico-dialog.component.html',
	styleUrls: ['./reporte-estadistico-dialog.component.scss'],
})
export class ReporteEstadisticoDialogComponent {
	private currentDate = new Date();
	filterType!: number;
	dateFilter: IDateFilter = {
		initialDate: this.currentDate,
		finalDate: this.currentDate,
	};

	constructor(
		public dialogRef: MatDialogRef<ReporteEstadisticoDialogComponent>,
		private _asistencias: AsistenciasService
	) {}

	generateReport(): void {
		this.dialogRef.close();
		this._asistencias
			.GetReporteEstadistico(this.filterType, this.dateFilter)
			.subscribe((response: any) => {
				let filename = response.headers
					.get('content-disposition')
					?.split(';')[1]
					.split('=')[1];
				let blob: Blob = response.body as Blob;
				let a = document.createElement('a');

				a.download = filename ?? '';
				a.href = window.URL.createObjectURL(blob);
				a.click();
			});
	}
}
