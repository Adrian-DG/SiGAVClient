import { Component, Inject } from '@angular/core';
import { DenominacionesService } from '../../services/denominaciones.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-denominaciones-edit-dialog',
	templateUrl: './denominaciones-edit-dialog.component.html',
	styleUrls: ['./denominaciones-edit-dialog.component.scss'],
})
export class DenominacionesEditDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { id: number; nombre: string },
		public _dialogRef: MatDialogRef<DenominacionesEditDialogComponent>,
		private _denominaciones: DenominacionesService
	) {}

	saveChanges(): void {}
}
