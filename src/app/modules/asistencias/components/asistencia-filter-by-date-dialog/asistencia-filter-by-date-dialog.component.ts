import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsistenciasService } from '../../services/asistencias.service';
import { IDateFilter } from '../../DTO/idate-filter';

@Component({
	selector: 'app-asistencia-filter-by-date-dialog',
	templateUrl: './asistencia-filter-by-date-dialog.component.html',
	styleUrls: ['./asistencia-filter-by-date-dialog.component.scss'],
})
export class AsistenciaFilterByDateDialogComponent {
	private currentDate = new Date();

	dateFilter: IDateFilter = {
		initialDate: this.currentDate,
		finalDate: this.currentDate,
	};

	constructor(
		public dialogRef: MatDialogRef<AsistenciaFilterByDateDialogComponent>,
		private _asistencias: AsistenciasService
	) {}

	generateReport(): void {
		this.dialogRef.close();
		this._asistencias
			.getReporteResumenAsistenciasPorFecha(this.dateFilter)
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
