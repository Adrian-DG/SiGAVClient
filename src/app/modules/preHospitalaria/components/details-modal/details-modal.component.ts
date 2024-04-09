import { Component, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsistenciPreHospitalariaService } from '../../services/asistenci-pre-hospitalaria.service';
import { IAsistenciaPreHospitalariaDetails } from '../../interfaces/iasistencia-pre-hospitalaria-details';

@Component({
	selector: 'app-details-modal',
	templateUrl: './details-modal.component.html',
	styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent implements AfterViewInit {
	asistencia!: IAsistenciaPreHospitalariaDetails | null;

	constructor(
		public dialogRef: MatDialogRef<DetailsModalComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: { id: number },
		private _asistenciaPreHospitalaria: AsistenciPreHospitalariaService
	) {}

	ngAfterViewInit(): void {
		this._asistenciaPreHospitalaria
			.GetAsistenciaPreHospitalariaDetails(this.data.id)
			.subscribe(
				(response: IAsistenciaPreHospitalariaDetails) =>
					(this.asistencia = response)
			);
	}
}
