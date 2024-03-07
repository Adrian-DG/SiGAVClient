import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IGenericData } from 'src/app/modules/generic/Responses/igeneric-data';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { IReassignUnidadDenominacion } from '../../dto/ireassign-unidad-denominacion';
import { FormControl } from '@angular/forms';
import { UnidadesService } from '../../services/unidades.service';

@Component({
	selector: 'app-reassign-unidad-dialog',
	templateUrl: './reassign-unidad-dialog.component.html',
	styleUrls: ['./reassign-unidad-dialog.component.scss'],
})
export class ReassignUnidadDialogComponent implements OnInit {
	selectedDenominacion: FormControl = new FormControl('');

	constructor(
		public dialogRef: MatDialogRef<ReassignUnidadDialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public params: { unidadId: number; ficha: string },
		public _cache: CacheService,
		private _unidades: UnidadesService
	) {}

	ngOnInit(): void {
		this._cache.getData('Denominaciones');
		this.selectedDenominacion.valueChanges.subscribe((value: string) => {
			setTimeout(() => this._cache.getDenominaciones(value), 1000);
		});
	}

	displayFn(item: IGenericData): string {
		return item.nombre;
	}

	confirm(): void {
		const denominacion: IGenericData = this.selectedDenominacion.value;
		const newAssign: IReassignUnidadDenominacion = {
			unidadId: this.params.unidadId,
			denominacionId: denominacion.id,
		};
		this._unidades.ReasignarUnidadDenominacion(newAssign);
	}
}
