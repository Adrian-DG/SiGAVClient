import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsistenciPreHospitalariaService } from '../../services/asistenci-pre-hospitalaria.service';

@Component({
	selector: 'app-edit-modal',
	templateUrl: './edit-modal.component.html',
	styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit, AfterViewInit {
	editModel: any = null;

	constructor(
		public dialogRef: MatDialogRef<EditModalComponent>,
		@Inject(MAT_DIALOG_DATA)
		public params: { id: number },
		private _asistenciaPreHospitalaria: AsistenciPreHospitalariaService
	) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this._asistenciaPreHospitalaria
			.GetAsistenciaPreHospitalariaById(this.params.id)
			.subscribe((data: any) => {
				this.editModel = data;
			});
	}
}
