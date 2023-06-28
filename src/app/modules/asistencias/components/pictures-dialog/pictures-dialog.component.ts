import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { AsistenciasService } from '../../services/asistencias.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDialogData } from '../../pages/list/list.component';

@Component({
	selector: 'app-pictures-dialog',
	templateUrl: './pictures-dialog.component.html',
	styleUrls: ['./pictures-dialog.component.scss'],
})
export class PicturesDialogComponent implements OnInit {
	pictures!: string[];
	hasPictures!: boolean;
	isLoading!: boolean;
	constructor(
		private _asistencias: AsistenciasService,
		public dialogRef: MatDialogRef<PicturesDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IDialogData
	) {}

	ngOnInit(): void {
		this.isLoading = true;
		this.hasPictures = false;
		this._asistencias.GetImagenes(this.data.id).subscribe(
			(data: string[]) => {
				setTimeout(() => {
					this.isLoading = false;
					if (data.length > 0) {
						this.hasPictures = true;
						this.pictures = data;
					}
				}, 2000);
			},
			(error) => console.log(error)
		);
	}
}
