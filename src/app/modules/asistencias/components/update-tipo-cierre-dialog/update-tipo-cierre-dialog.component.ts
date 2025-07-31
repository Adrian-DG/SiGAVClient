import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AsistenciasService } from '../../services/asistencias.service';
import { CommonModule } from '@angular/common';
import { MatDivider, MatDividerModule } from '@angular/material/divider';

@Component({
	selector: 'app-update-tipo-cierre-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatSelectModule,
		MatFormFieldModule,
		MatButtonModule,
		MatDividerModule,
		FormsModule,
		CommonModule,
	],
	template: `
		<h1 mat-dialog-title>
			Actualizar Tipo de Cierre, Asistencia #{{ data.asistenciaId }}
		</h1>
		<div mat-dialog-content>
			<p>Seleccione el nuevo tipo de cierre:</p>
			<mat-form-field appearance="fill" style="width: 100%;">
				<mat-label>Tipo de Cierre</mat-label>
				<mat-select [(ngModel)]="tipoCierreSelected">
					<mat-option
						*ngFor="let tipo of tipoCierreArray"
						[value]="tipo.value"
					>
						{{ tipo.name }}
					</mat-option>
				</mat-select>
			</mat-form-field>
		</div>
		<div mat-dialog-actions style="justify-content: flex-end">
			<button mat-button mat-dialog-close>Cancelar</button>
			<button
				mat-flat-button
				color="primary"
				(click)="updateTipoCierre()"
				[disabled]="!isSelectValid"
			>
				Actualizar
			</button>
		</div>
	`,
	styleUrls: ['./update-tipo-cierre-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AsistenciasService],
})
export class UpdateTipoCierreDialogComponent {
	tipoCierreArray = [
		{ name: 'Seleccione un tipo de cierre', value: 0 },
		{ name: 'Asistencia Completada por MOPC', value: 1 },
		{ name: 'Asistencia Transferida por 911', value: 2 },
		{ name: 'Asistencia Transferida por Policía Nacional', value: 3 },
		{ name: 'El ciudadano resolvio sin la unidad presente', value: 4 },
		{
			name: 'La unidad no hizo contacto con el ciudadano (no estaba)',
			value: 5,
		},
		{
			name: 'La asistencia estaba fuera de la jurisdiccion de la unidad',
			value: 6,
		},
	];

	tipoCierreSelected: number = 0;

	constructor(
		private asistenciasService: AsistenciasService,
		private _dialogRef: MatDialogRef<UpdateTipoCierreDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { asistenciaId: number }
	) {}

	get isSelectValid(): boolean {
		return this.tipoCierreSelected !== 0;
	}

	updateTipoCierre(): void {
		if (this.tipoCierreSelected === 0) {
			alert('Por favor, seleccione un tipo de cierre válido.');
			return;
		}

		this.asistenciasService
			.updateAsistenciaTipoCierre(
				this.data.asistenciaId,
				this.tipoCierreSelected
			)
			.subscribe((response) => {
				alert(response.message);
				if (response.status) {
					this._dialogRef.close(true);
				}
			});
	}
}
