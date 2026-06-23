import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MatDialogModule,
	MAT_DIALOG_DATA,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface ErrorDialogData {
	title: string;
	message: string;
	status: boolean;
}

@Component({
	selector: 'app-error-dialog',
	standalone: true,
	imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
	templateUrl: './error-dialog.component.html',
	styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent {
	constructor(
		private _dialogRef: MatDialogRef<ErrorDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ErrorDialogData,
	) {}

	close(): void {
		this._dialogRef.close();
	}
}
