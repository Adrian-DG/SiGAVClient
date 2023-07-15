import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TramoService } from 'src/app/modules/tramos/services/tramo.service';
import { ITramoViewModel } from 'src/app/modules/tramos/viewModels/itramo-view-model';
import { IReassignUnit } from '../../DTO/ireassign-unit';
import { UnidadesService } from 'src/app/modules/unidades/services/unidades.service';
import { IUnidad } from 'src/app/modules/unidades/entities/iunidad';
import { AsistenciasService } from '../../services/asistencias.service';

@Component({
	selector: 'app-reasignar-unidad-dialog',
	templateUrl: './reasignar-unidad-dialog.component.html',
	styleUrls: ['./reasignar-unidad-dialog.component.scss'],
})
export class ReasignarUnidadDialogComponent implements OnInit {
	selectedTramoId!: number;

	public newUnitAssign: IReassignUnit = {
		idAsistencia: this.data.idAsistencia,
		newUnidadId: 0,
		usuarioId: 0,
	};

	public tramosList!: ITramoViewModel[];
	public unidadesList!: IUnidad[];

	constructor(
		private _tramos: TramoService,
		private _unidades: UnidadesService,
		private _asistencias: AsistenciasService,
		public dialogRef: MatDialogRef<ReasignarUnidadDialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			idAsistencia: number;
			tramo: string;
			denominacion: string;
			ficha: string;
		}
	) {}

	ngOnInit(): void {
		this._tramos
			.getFilteredTramosByNombre()
			.subscribe((data: ITramoViewModel[]) => (this.tramosList = data));
	}

	onTramoSelectionChange(): void {
		this._unidades
			.GetUnidadesPorTramo(this.selectedTramoId)
			.subscribe((data: IUnidad[]) => (this.unidadesList = data));
	}

	confirmNewAssignment(): void {
		if (confirm('¿Esta seguro de reasignar esta unidad?')) {
			this._asistencias
				.changeUnidadAsignada(this.newUnitAssign)
				.subscribe((respose: boolean) => {
					alert(
						respose
							? 'Se han guardado los cambios con exito'
							: 'Error: algo salio mal'
					);
				});
		}
	}
}
