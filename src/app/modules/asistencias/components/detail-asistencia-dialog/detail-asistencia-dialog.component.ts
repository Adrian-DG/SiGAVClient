import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-detail-asistencia-dialog',
	templateUrl: './detail-asistencia-dialog.component.html',
	styleUrls: ['./detail-asistencia-dialog.component.scss'],
})
export class DetailAsistenciaDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<DetailAsistenciaDialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: { id: number; comment: string; types: string[] }
	) {}
}
