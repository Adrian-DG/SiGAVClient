import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IGenericData } from 'src/app/modules/generic/Responses/igeneric-data';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { IReassignUnidadDenominacion } from '../../dto/ireassign-unidad-denominacion';
import { FormControl } from '@angular/forms';
import { UnidadesService } from '../../services/unidades.service';
import { TramoService } from 'src/app/modules/tramos/services/tramo.service';

@Component({
	selector: 'app-reassign-unidad-dialog',
	templateUrl: './reassign-unidad-dialog.component.html',
	styleUrls: ['./reassign-unidad-dialog.component.scss'],
})
export class ReassignUnidadDialogComponent implements OnInit, AfterViewInit {
	selectedDenominacion: FormControl = new FormControl('');
	selectedTramo: FormControl = new FormControl('');

	trasladoFicha = {
		denominacion: '',
		tramoId: 0,
	};

	constructor(
		public dialogRef: MatDialogRef<ReassignUnidadDialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public params: { unidadId: number; ficha: string },
		public _cache: CacheService,
		private _unidades: UnidadesService,
		private _tramos: TramoService
	) {}

	ngOnInit(): void {
		//this._cache.getData('Denominaciones');

		this.selectedDenominacion.valueChanges.subscribe((value: string) => {
			setTimeout(() => this._cache.getDenominaciones(value), 1000);
		});

		this.selectedTramo.valueChanges.subscribe((value: string) => {
			setTimeout(() => this._cache.getTramos(value), 1000);
		});
	}

	ngAfterViewInit(): void {}

	displayFn(item: IGenericData): string {
		return item.nombre;
	}

	// confirm(): void {
	// 	const denominacion: IGenericData = this.selectedDenominacion.value;
	// 	const newAssign: IReassignUnidadDenominacion = {
	// 		unidadId: this.params.unidadId,
	// 		denominacionId: denominacion.id,
	// 	};
	// 	this._unidades.ReasignarUnidadDenominacion(newAssign);
	// }

	ReasignarFichaTramo(): void {
		const newReassign = {
			unidadId: this.params.unidadId as number,
			denominacion: this.trasladoFicha.denominacion,
			tramoId: this.selectedTramo.value as number,
		};
		this._unidades.ReasignarFichaTramo(newReassign);
	}

	ReasignarUnidadDenominacion(): void {
		const denominacion: IGenericData = this.selectedDenominacion.value;
		const newAssign: IReassignUnidadDenominacion = {
			unidadId: this.params.unidadId as number,
			denominacionId: denominacion.id,
		};
		this._unidades.ReasignarUnidadDenominacion(newAssign);
	}
}
