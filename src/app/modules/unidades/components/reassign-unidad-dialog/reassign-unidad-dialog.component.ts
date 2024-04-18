import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IGenericData } from 'src/app/modules/generic/Responses/igeneric-data';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { IReassignUnidadDenominacion } from '../../dto/ireassign-unidad-denominacion';
import { FormControl, Validators } from '@angular/forms';
import { UnidadesService } from '../../services/unidades.service';
import { TramoService } from 'src/app/modules/tramos/services/tramo.service';
import { IUnidadEditDto } from '../../dto/iunidad-edit-dto';
import { IServerResponse } from 'src/app/modules/generic/Responses/iserver-response';

@Component({
	selector: 'app-reassign-unidad-dialog',
	templateUrl: './reassign-unidad-dialog.component.html',
	styleUrls: ['./reassign-unidad-dialog.component.scss'],
})
export class ReassignUnidadDialogComponent implements OnInit, AfterViewInit {
	editUnidad: IUnidadEditDto = {
		unidadId: 0,
		ficha: '',
		placa: '',
		denominacion: '',
		denominacionId: 0,
	};

	selectedDenominacion: FormControl = new FormControl('', [
		Validators.required,
	]);

	constructor(
		public dialogRef: MatDialogRef<ReassignUnidadDialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public params: {
			unidadId: number;
			ficha: string;
			denominacion: string;
			placa: string;
		},
		public _cache: CacheService,
		private _unidades: UnidadesService
	) {}

	ngOnInit(): void {
		this.selectedDenominacion.valueChanges.subscribe((value: string) => {
			setTimeout(() => this._cache.getDenominaciones(value), 2000);
		});
	}

	ngAfterViewInit(): void {
		this.editUnidad = {
			unidadId: this.params.unidadId,
			ficha: this.params.ficha,
			placa: this.params.placa,
			denominacion: this.params.denominacion,
			denominacionId: 0,
		};
	}

	displayFn(item: IGenericData): string {
		return item.nombre;
	}

	// ReasignarUnidadDenominacion(): void {
	// 	this._unidades
	// 		.ReasignarUnidadDenominacion({
	// 			unidadId: this.params.unidadId,
	// 			denominacionId: this.selectedDenominacion.value.id,
	// 		})
	// 		.subscribe((response: boolean) => {
	// 			alert(
	// 				response
	// 					? 'Se guardaron los cambios correctamente'
	// 					: 'Error: hubo un error durante el proceso'
	// 			);
	// 			this.dialogRef.close();
	// 		});
	// }

	editarUnidad(): void {
		const model: IUnidadEditDto = this.editUnidad;
		model.denominacionId = this.selectedDenominacion.value.id;
		this._unidades
			.editarUnidad(model)
			.subscribe((response: IServerResponse) => {
				alert(response.message);
				if (response.status) {
					this.dialogRef.close();
				}
			});
	}
}
