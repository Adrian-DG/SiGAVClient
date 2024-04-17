import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IGenericData } from 'src/app/modules/generic/Responses/igeneric-data';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { IReassignUnidadDenominacion } from '../../dto/ireassign-unidad-denominacion';
import { FormControl, Validators } from '@angular/forms';
import { UnidadesService } from '../../services/unidades.service';
import { TramoService } from 'src/app/modules/tramos/services/tramo.service';

@Component({
	selector: 'app-reassign-unidad-dialog',
	templateUrl: './reassign-unidad-dialog.component.html',
	styleUrls: ['./reassign-unidad-dialog.component.scss'],
})
export class ReassignUnidadDialogComponent implements OnInit, AfterViewInit {
	selectedDenominacion: FormControl = new FormControl('', [
		Validators.required,
	]);

	constructor(
		public dialogRef: MatDialogRef<ReassignUnidadDialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public params: { unidadId: number; ficha: string },
		public _cache: CacheService,
		private _unidades: UnidadesService
	) {}

	ngOnInit(): void {
		this.selectedDenominacion.valueChanges.subscribe((value: string) => {
			setTimeout(() => this._cache.getDenominaciones(value), 2000);
		});
	}

	ngAfterViewInit(): void {}

	displayFn(item: IGenericData): string {
		return item.nombre;
	}

	ReasignarUnidadDenominacion(): void {
		this._unidades
			.ReasignarUnidadDenominacion({
				unidadId: this.params.unidadId,
				denominacionId: this.selectedDenominacion.value.id,
			})
			.subscribe((response: boolean) => {
				alert(
					response
						? 'Se guardaron los cambios correctamente'
						: 'Error: hubo un error durante el proceso'
				);
				this.dialogRef.close();
			});
	}
}
