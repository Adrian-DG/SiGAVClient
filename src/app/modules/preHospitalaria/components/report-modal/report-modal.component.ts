import { Component } from '@angular/core';
import { IDateFilter } from 'src/app/modules/asistencias/DTO/idate-filter';
import { AsistenciPreHospitalariaService } from '../../services/asistenci-pre-hospitalaria.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-report-modal',
	templateUrl: './report-modal.component.html',
	styleUrls: ['./report-modal.component.scss'],
})
export class ReportModalComponent {
	dateFilter: IDateFilter = {
		initialDate: new Date(),
		finalDate: new Date(),
	};

	optionSelected: number = 0;

	constructor(
		private _asistenciasPreHospitalaria: AsistenciPreHospitalariaService,
		private _dialogRef: MatDialogRef<ReportModalComponent>
	) {}

	getExcelAsistenciasDetalles(): void {
		this._asistenciasPreHospitalaria
			.GetListadoAsistenciaDetallesPorFecha(this.dateFilter)
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

	onSelectionChange(): void {
		this._dialogRef.close();
		switch (this.optionSelected) {
			case 1:
				this.getExcelAsistenciasDetalles();
				break;
			default:
				break;
		}
	}
}
