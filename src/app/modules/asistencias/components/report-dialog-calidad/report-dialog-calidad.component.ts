import { Component } from '@angular/core';
import { IDateFilter } from '../../DTO/idate-filter';
import { MatDialogRef } from '@angular/material/dialog';
import { AsistenciasService } from '../../services/asistencias.service';

@Component({
	selector: 'app-report-dialog-calidad',
	templateUrl: './report-dialog-calidad.component.html',
	styleUrls: ['./report-dialog-calidad.component.scss'],
})
export class ReportDialogCalidadComponent {
	private currentDate = new Date();
	dateFilter: IDateFilter = {
		initialDate: this.currentDate,
		finalDate: this.currentDate,
	};

	constructor(
		public dialogRef: MatDialogRef<ReportDialogCalidadComponent>,
		private _asistencias: AsistenciasService
	) {}

	generateReport(): void {
		this._asistencias
			.GetReporteAsistenciaCalidadPorFecha(this.dateFilter)
			.subscribe((response: any) => {
				this.dialogRef.close();
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
